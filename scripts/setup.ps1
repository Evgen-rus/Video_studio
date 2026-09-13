$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Root = Split-Path -Parent $PSScriptRoot
$ReportDir = Join-Path $Root "reports"
$SkillsDir = Join-Path $Root ".agents\skills"
$SmokeDir = Join-Path $Root "tools\remotion-smoke"
$VendorDir = Join-Path $Root ".vendor"
$VideoVendorDir = Join-Path $VendorDir "video-shotcraft"
$Report = Join-Path $ReportDir "setup-report.txt"

New-Item -ItemType Directory -Force -Path $ReportDir, $SkillsDir, $VendorDir | Out-Null
$lines = New-Object System.Collections.Generic.List[string]
$hadError = $false
$hadWarning = $false

function Add-Line([string]$text) {
    $script:lines.Add($text)
    Write-Host $text
}

function Add-Ok([string]$name, [string]$value="OK") {
    Add-Line ("[OK]   {0}: {1}" -f $name, $value)
}

function Add-Warn([string]$name, [string]$value) {
    $script:hadWarning = $true
    Add-Line ("[WARN] {0}: {1}" -f $name, $value)
}

function Add-Fail([string]$name, [string]$value) {
    $script:hadError = $true
    Add-Line ("[FAIL] {0}: {1}" -f $name, $value)
}

function Require-Command([string]$name) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if (-not $cmd) {
        Add-Fail $name "not found on PATH"
        return $null
    }
    return $cmd
}


function Invoke-NativeLogged {
    param(
        [Parameter(Mandatory=$true)][string]$Exe,
        [Parameter(Mandatory=$true)][string[]]$Arguments,
        [Parameter(Mandatory=$true)][string]$LogPath
    )

    # Windows PowerShell 5.1 can convert ordinary native stderr output
    # (for example Git's "Cloning into...") into ErrorRecord objects.
    # With ErrorActionPreference=Stop that can abort a successful command.
    # Run native commands with Continue locally and judge success only by exit code.
    $oldPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = "Continue"
        & $Exe @Arguments *>&1 | Set-Content -LiteralPath $LogPath -Encoding UTF8
        return [int]$LASTEXITCODE
    }
    finally {
        $ErrorActionPreference = $oldPreference
    }
}

function Copy-RepoContents([string]$source, [string]$destination) {
    if (Test-Path $destination) {
        Remove-Item -Recurse -Force $destination
    }
    New-Item -ItemType Directory -Force -Path $destination | Out-Null
    Get-ChildItem -LiteralPath $source -Force |
        Where-Object { $_.Name -ne ".git" } |
        ForEach-Object {
            Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
        }
}

Add-Line "VIDEO STUDIO SETUP REPORT"
Add-Line ("Timestamp: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss K"))
Add-Line ("Root: {0}" -f $Root)
Add-Line ""

# Required preinstalled tools
$nodeCmd = Require-Command "node"
$npmCmd = Require-Command "npm"
$gitCmd = Require-Command "git"

if ($nodeCmd) {
    $nodeVersion = (& node --version 2>&1 | Out-String).Trim()
    Add-Ok "Node" $nodeVersion
    try {
        $nodeMajor = [int](($nodeVersion.TrimStart("v").Split("."))[0])
        if ($nodeMajor -lt 18) {
            Add-Fail "Node requirement" "Node 18+ required; found $nodeVersion"
        }
    } catch {
        Add-Warn "Node version parse" $nodeVersion
    }
}

if ($npmCmd) {
    $npmVersion = (& npm --version 2>&1 | Out-String).Trim()
    Add-Ok "npm" $npmVersion
}

if ($gitCmd) {
    $gitVersion = (& git --version 2>&1 | Out-String).Trim()
    Add-Ok "Git" $gitVersion
}

if (Test-Path (Join-Path $Root ".git")) {
    Add-Ok "Root Git repository" "already exists (setup did not create it)"
} else {
    Add-Ok "Root Git repository" "NOT initialized, as requested"
}

Add-Ok "Global Codex config policy" "not touched by this script"
Add-Ok "Global Ponytail policy" "not installed, removed, updated, or configured by this script"
Add-Line ""

if ($hadError) {
    $lines | Set-Content -LiteralPath $Report -Encoding UTF8
    Add-Line "Cannot continue until required tools are available."
    exit 1
}

# Remotion skills are cloned to TEMP and copied without .git. video-shotcraft stays as a shallow, Git-ignored vendor checkout.
$tempRoot = Join-Path $env:TEMP ("video-studio-setup-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null

$videoRepo = "https://github.com/Vincentwei1021/video-shotcraft.git"
$remotionRepo = "https://github.com/remotion-dev/skills.git"
$selectedRemotionSkills = @(
    "remotion-best-practices",
    "remotion-create",
    "remotion-markup",
    "remotion-studio",
    "remotion-render",
    "remotion-docs",
    "remotion-interactivity"
)

$videoCommit = $null
$remotionCommit = $null

try {
    Add-Line "Installing project-local skills..."

    if (Test-Path $VideoVendorDir) {
        Remove-Item -Recurse -Force $VideoVendorDir
    }
    $cloneVideoCode = Invoke-NativeLogged -Exe "git" -Arguments @("clone","--depth","1",$videoRepo,$VideoVendorDir) -LogPath (Join-Path $ReportDir "clone-video-shotcraft.log")
    if ($cloneVideoCode -ne 0) { throw "video-shotcraft git clone failed; see reports/clone-video-shotcraft.log" }

    $videoCommit = (& git -C $VideoVendorDir rev-parse HEAD 2>&1 | Out-String).Trim()
    $canonicalSkill = Join-Path $VideoVendorDir "SKILL.md"
    $adapterSkill = Join-Path $SkillsDir "video-shotcraft\SKILL.md"
    if ((Test-Path $canonicalSkill) -and (Test-Path $adapterSkill)) {
        Add-Ok "video-shotcraft canonical" (".vendor/video-shotcraft @ " + $videoCommit)
        Add-Ok "video-shotcraft adapter" ".agents/skills/video-shotcraft/SKILL.md"
    } else {
        throw "video-shotcraft canonical SKILL.md or project adapter is missing"
    }

    $remotionSrc = Join-Path $tempRoot "remotion-skills"
    $cloneRemotionCode = Invoke-NativeLogged -Exe "git" -Arguments @("clone","--depth","1",$remotionRepo,$remotionSrc) -LogPath (Join-Path $ReportDir "clone-remotion-skills.log")
    if ($cloneRemotionCode -ne 0) { throw "Remotion skills git clone failed; see reports/clone-remotion-skills.log" }

    $remotionCommit = (& git -C $remotionSrc rev-parse HEAD 2>&1 | Out-String).Trim()

    foreach ($skill in $selectedRemotionSkills) {
        $src = Join-Path $remotionSrc ("skills\" + $skill)
        $dst = Join-Path $SkillsDir $skill
        if (-not (Test-Path (Join-Path $src "SKILL.md"))) {
            throw "Missing upstream SKILL.md for $skill"
        }
        Copy-RepoContents $src $dst
        Add-Ok $skill $remotionCommit
    }

    $lock = [ordered]@{
        generated_at = (Get-Date).ToString("o")
        video_shotcraft = [ordered]@{
            source = "https://github.com/Vincentwei1021/video-shotcraft"
            commit = $videoCommit
            vendor_destination = ".vendor/video-shotcraft"
            adapter = ".agents/skills/video-shotcraft/SKILL.md"
        }
        remotion_skills = [ordered]@{
            source = "https://github.com/remotion-dev/skills"
            commit = $remotionCommit
            selected = $selectedRemotionSkills
            destination = ".agents/skills"
        }
        global_skills_modified = $false
        ponytail_modified = $false
    }
    $lock | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $Root "skills-lock.json") -Encoding UTF8
    Add-Ok "skills-lock.json" "written"
}
catch {
    Add-Fail "Skill installation" $_.Exception.Message
}

Add-Line ""

# Local Remotion smoke environment
if (-not $hadError) {
    try {
        Add-Line "Installing local Remotion smoke-test dependencies..."
        Push-Location $SmokeDir
        try {
            $npmInstallCode = Invoke-NativeLogged -Exe "npm" -Arguments @("install") -LogPath (Join-Path $ReportDir "smoke-npm-install.log")
            if ($npmInstallCode -ne 0) { throw "npm install failed; see reports/smoke-npm-install.log" }
            Add-Ok "Remotion smoke npm install" "completed"

            $npmListCode = Invoke-NativeLogged -Exe "npm" -Arguments @("run","list") -LogPath (Join-Path $ReportDir "smoke-list.log")
            if ($npmListCode -ne 0) { throw "Remotion composition discovery failed; see reports/smoke-list.log" }
            Add-Ok "Remotion composition discovery" "Smoke composition detected"

            $npmRenderCode = Invoke-NativeLogged -Exe "npm" -Arguments @("run","render") -LogPath (Join-Path $ReportDir "smoke-render.log")
            if ($npmRenderCode -ne 0) {
                Add-Warn "Remotion MP4 render" "failed; see reports/smoke-render.log. Skills are installed, but render environment needs diagnosis."
            } elseif (Test-Path (Join-Path $SmokeDir "out\smoke.mp4")) {
                Add-Ok "Remotion MP4 render" "tools/remotion-smoke/out/smoke.mp4"
            } else {
                Add-Warn "Remotion MP4 render" "command returned success but output file was not found"
            }
        }
        finally {
            Pop-Location
        }
    }
    catch {
        Add-Fail "Remotion smoke environment" $_.Exception.Message
    }
}

# Validate expected local skill files.
Add-Line ""
Add-Line "Final local skill validation:"
$expectedSkills = @("video-shotcraft") + $selectedRemotionSkills
foreach ($skill in $expectedSkills) {
    $skillFile = Join-Path $SkillsDir ($skill + "\SKILL.md")
    if (Test-Path $skillFile) {
        Add-Ok ("skill/" + $skill) "SKILL.md present"
    } else {
        Add-Fail ("skill/" + $skill) "SKILL.md missing"
    }
}
if (Test-Path (Join-Path $VideoVendorDir "SKILL.md")) {
    Add-Ok "video-shotcraft vendor source" ".vendor/video-shotcraft/SKILL.md present"
} else {
    Add-Fail "video-shotcraft vendor source" "missing canonical SKILL.md"
}

Add-Line ""
Add-Line "Isolation:"
Add-Ok "git init" "NOT executed"
Add-Ok "~/.codex" "NOT modified"
Add-Ok "~/.agents" "NOT modified"
Add-Ok "Ponytail" "NOT modified"
Add-Ok "Other repositories" "NOT modified"

if ($hadError) {
    Add-Line ""
    Add-Line "RESULT: FAIL - send this report and referenced logs to ChatGPT."
    $exitCode = 1
} elseif ($hadWarning) {
    Add-Line ""
    Add-Line "RESULT: WARNING - setup mostly completed; send this report and referenced logs to ChatGPT."
    $exitCode = 2
} else {
    Add-Line ""
    Add-Line "RESULT: OK"
    $exitCode = 0
}

$lines | Set-Content -LiteralPath $Report -Encoding UTF8

try {
    if (Test-Path $tempRoot) { Remove-Item -Recurse -Force $tempRoot }
} catch {
    # Cleanup failure is non-critical and temp path is outside the project.
}

exit $exitCode
