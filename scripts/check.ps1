$ErrorActionPreference = "Continue"
Set-StrictMode -Version Latest

$Root = Split-Path -Parent $PSScriptRoot
$ReportDir = Join-Path $Root "reports"
$Report = Join-Path $ReportDir "check-report.txt"
$SkillsDir = Join-Path $Root ".agents\skills"
$SmokeDir = Join-Path $Root "tools\remotion-smoke"
$VideoVendorDir = Join-Path $Root ".vendor\video-shotcraft"

New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null
$lines = New-Object System.Collections.Generic.List[string]
$failed = $false


function Invoke-NativeLogged {
    param(
        [Parameter(Mandatory=$true)][string]$Exe,
        [Parameter(Mandatory=$true)][string[]]$Arguments,
        [Parameter(Mandatory=$true)][string]$LogPath
    )
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

function Add-Line([string]$text) {
    $script:lines.Add($text)
    Write-Host $text
}

function Check-Command([string]$name, [string]$arg="--version") {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if (-not $cmd) {
        $script:failed = $true
        Add-Line ("[FAIL] {0}: not found" -f $name)
        return
    }
    $value = (& $name $arg 2>&1 | Out-String).Trim()
    Add-Line ("[OK]   {0}: {1}" -f $name, $value)
}

Add-Line "VIDEO STUDIO CHECK REPORT"
Add-Line ("Timestamp: {0}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss K"))
Add-Line ("Root: {0}" -f $Root)
Add-Line ""

Check-Command "node"
Check-Command "npm"
Check-Command "git"

Add-Line ""

$expectedSkills = @(
    "video-shotcraft",
    "remotion-best-practices",
    "remotion-create",
    "remotion-markup",
    "remotion-studio",
    "remotion-render",
    "remotion-docs",
    "remotion-interactivity"
)

foreach ($skill in $expectedSkills) {
    $skillFile = Join-Path $SkillsDir ($skill + "\SKILL.md")
    if (Test-Path $skillFile) {
        Add-Line ("[OK]   skill/{0}: present" -f $skill)
    } else {
        $failed = $true
        Add-Line ("[FAIL] skill/{0}: missing SKILL.md" -f $skill)
    }
}

if (Test-Path (Join-Path $VideoVendorDir "SKILL.md")) {
    Add-Line "[OK]   video-shotcraft canonical vendor source: present"
} else {
    $failed = $true
    Add-Line "[FAIL] video-shotcraft canonical vendor source: missing .vendor/video-shotcraft/SKILL.md"
}

$lock = Join-Path $Root "skills-lock.json"
if (Test-Path $lock) {
    Add-Line "[OK]   skills-lock.json: present"
} else {
    $failed = $true
    Add-Line "[FAIL] skills-lock.json: missing (run SETUP.bat)"
}

Add-Line ""

if (Test-Path (Join-Path $SmokeDir "node_modules")) {
    Add-Line "[OK]   Remotion smoke dependencies: installed"
    Push-Location $SmokeDir
    try {
        $npmListCode = Invoke-NativeLogged -Exe "npm" -Arguments @("run","list") -LogPath (Join-Path $ReportDir "check-smoke-list.log")
        if ($npmListCode -eq 0) {
            Add-Line "[OK]   Remotion composition discovery: passed"
        } else {
            $failed = $true
            Add-Line "[FAIL] Remotion composition discovery: see reports/check-smoke-list.log"
        }
    } finally {
        Pop-Location
    }
} else {
    $failed = $true
    Add-Line "[FAIL] Remotion smoke dependencies: node_modules missing (run SETUP.bat)"
}

if (Test-Path (Join-Path $SmokeDir "out\smoke.mp4")) {
    Add-Line "[OK]   Previous MP4 smoke render: present"
} else {
    Add-Line "[WARN] Previous MP4 smoke render: not present"
}

Add-Line ""

if (Test-Path (Join-Path $Root ".git")) {
    Add-Line "[INFO] Root Git: initialized by user or another process"
    try {
        $status = (& git -C $Root status --short 2>&1 | Out-String).Trim()
        if ($status) {
            Add-Line "[INFO] Git status has changes (expected before first commit)."
        } else {
            Add-Line "[OK]   Git working tree: clean"
        }
    } catch {}
} else {
    Add-Line "[OK]   Root Git: not initialized"
}

Add-Line "[OK]   Check script does not modify ~/.codex, ~/.agents or Ponytail."

Add-Line ""
if ($failed) {
    Add-Line "RESULT: FAIL"
    $code = 1
} else {
    Add-Line "RESULT: OK"
    $code = 0
}

$lines | Set-Content -LiteralPath $Report -Encoding UTF8
exit $code
