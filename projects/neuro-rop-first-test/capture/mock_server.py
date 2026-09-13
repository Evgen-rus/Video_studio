"""Safe, read-only local server for the product screenshot capture.

It serves the already-built Neuro ROP frontend and a fixed fictional API
fixture. No CRM, Bitrix, OpenAI, or product backend is started.
"""

from __future__ import annotations

import json
import mimetypes
import os
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


HOST = "127.0.0.1"
PORT = 4173
DIST = Path(r"D:\My_dev_project\Neuro_rop_practice\frontend\dist")


def communications() -> dict:
    return {
        "date": "2026-09-13",
        "available": True,
        "target": 1,
        "completed": 0,
        "progress_percent": 0,
        "calls": 0,
        "messages": 0,
        "duration_seconds": 0,
        "calls_total": 0,
        "calls_connected": 0,
        "calls_no_answer": 0,
        "calls_unknown": 0,
        "emails": 0,
        "messenger_messages": 0,
        "conversation_duration_seconds": None,
        "last_activity": None,
        "last_confirmed_contact": None,
        "items": [],
    }


def task(activity_id: str, subject: str, bucket: str, deadline: str) -> dict:
    return {
        "activity_id": activity_id,
        "task_id": activity_id,
        "responsible_id": "demo-manager",
        "subject": subject,
        "description": subject,
        "deadline": deadline,
        "time_bucket": bucket,
        "completed": False,
        "bitrix_completed_at": None,
        "local_completed": False,
        "local_completed_at": None,
        "local_completed_by": None,
        "completion_state": "open",
        "provider_id": "demo-provider",
        "day_result": {
            "key": activity_id,
            "task_id": activity_id,
            "activity_id": activity_id,
            "subject": subject,
            "deadline": deadline,
            "status": "open",
            "completion_source": None,
            "completed_today": False,
            "overdue": bucket == "overdue",
            "was_due": bucket == "overdue",
            "reschedules": [],
        },
    }


def review(status: str, status_label: str, summary: str, direct_question: str) -> dict:
    return {
        "deal_id": "DEMO-PILOT-SEVER",
        "title": "Пилот — Север",
        "manager_id": "demo-manager",
        "manager_name": "Демо-менеджер",
        "stage_id": "NEGOTIATION",
        "stage_name": "Переговоры",
        "pipeline_id": "DEMO",
        "pipeline_name": "Демо-воронка",
        "amount": "0",
        "currency_id": "RUB",
        "status": status,
        "status_label": status_label,
        "attention_reason": summary,
        "quality": {
            "status": "assessed",
            "business_date": "2026-09-13",
            "cutoff_at": "2026-09-13T09:00:00+03:00",
            "source": "system",
            "criteria": {
                "next_action": {"score": 0, "verdict": "Следующий шаг не зафиксирован."},
                "value_development": {"score": 1, "verdict": "Ценность контакта зафиксирована."},
                "data_collection": {"score": 0, "verdict": "Нужно уточнить договорённости."},
            },
            "confirmed_count": 1,
            "total": 3,
            "scope_summary": "Проверка ведения сделки по доступным событиям.",
            "zero_reasons": [
                {
                    "criterion": "next_action",
                    "explanation": "Следующий шаг после последнего контакта не зафиксирован.",
                    "quote": "Следующий шаг после последнего контакта не зафиксирован.",
                },
                {
                    "criterion": "data_collection",
                    "explanation": "Нужно уточнить, что согласовано с клиентом и когда следующий контакт.",
                    "quote": "Что согласовано с клиентом и когда следующий контакт?",
                },
            ],
            "summary_for_rop": summary,
            "insufficient_reason": "Недостаёт подтверждённой даты следующего контакта.",
            "pending_message": None,
            "pending_events_count": 0,
            "next_action_warning": None,
        },
        "summary_for_rop": summary,
        "direct_question": direct_question,
        "generic_question": "Какой результат нужно получить на следующем контакте?",
        "ai_context": {
            "current_situation": "Сделка находится на этапе переговоров. Следующий шаг после последнего контакта не зафиксирован.",
            "rop_focus": "Зафиксировать следующий шаг и дату контакта.",
            "what_to_check_now": "Проверить, что согласовано с клиентом и когда следующий контакт.",
            "manager_coaching": "Уточнить договорённости с клиентом и внести следующий шаг в CRM.",
            "known": ["Этап сделки: Переговоры."],
            "unknowns": ["Дата следующего контакта не зафиксирована."],
            "strengths": ["Есть активный переговорный этап."],
            "weaknesses": ["Нет подтверждённого следующего шага."],
        },
        "script": "Уточнить договорённости и дату следующего контакта.",
        "script_variants": [],
        "communications_today": communications(),
        "has_analysis": False,
        "day_scope": {
            "business_date": "2026-09-13",
            "cutoff_at": "2026-09-13T09:00:00+03:00",
            "task_buckets": ["overdue", "today"],
            "activity_kinds": ["comment", "bitrix_task_completed"],
            "had_day_obligation": True,
            "untouched": False,
            "legacy": False,
        },
    }


TARGET = {
    "deal_id": "DEMO-PILOT-SEVER",
    "source": "initial",
    "title": "Пилот — Север",
    "manager_id": "demo-manager",
    "manager_name": "Демо-менеджер",
    "ownership": "own",
    "is_own": True,
    "read_only": False,
    "can_open": True,
    "can_edit": False,
    "can_run_analysis": False,
    "can_run_paid_ai": False,
    "stage_id": "NEGOTIATION",
    "stage_name": "Переговоры",
    "pipeline_id": "DEMO",
    "pipeline_name": "Демо-воронка",
    "amount": "0",
    "currency_id": "RUB",
    "created_at_crm": "2026-09-01T08:00:00+03:00",
    "modified_at_crm": "2026-09-13T08:00:00+03:00",
    "probability": None,
    "expected_payment_period": None,
    "next_control_at": "2026-09-12T15:00:00+03:00",
    "bitrix_tasks": [task("DEMO-TASK-1", "Уточнить следующий шаг", "overdue", "2026-09-12T15:00:00+03:00")],
    "primary_bitrix_task": task("DEMO-TASK-1", "Уточнить следующий шаг", "overdue", "2026-09-12T15:00:00+03:00"),
    "communications_today": communications(),
    "manager_comments_preview": {"available": True, "count": 0, "items": [], "synced_at": "2026-09-13T08:00:00+03:00"},
    "manager_worklogs": {"available": True, "count": 0, "items": []},
    "tasks": [],
    "current_task": None,
    "manager_situation": None,
    "coaching": {
        "report_id": None,
        "analysis_created_at": None,
        "analysis_checked_at": None,
        "analysis_check_status": None,
        "current_situation": "Сделка находится на этапе переговоров. Следующий шаг после последнего контакта не зафиксирован.",
        "strengths": ["Есть активный переговорный этап."],
        "weaknesses": ["Нет подтверждённого следующего шага."],
        "rop_focus": "Зафиксировать следующий шаг и дату контакта.",
        "what_to_check_now": "Проверить, что согласовано с клиентом и когда следующий контакт.",
        "manager_coaching": "Уточнить договорённости с клиентом и внести следующий шаг в CRM.",
        "known": ["Этап сделки: Переговоры."],
        "unknowns": ["Дата следующего контакта не зафиксирована."],
        "contact_goal": "Получить согласованный следующий шаг.",
        "questions": ["Что согласовано с клиентом и когда следующий контакт?"],
        "script": "Уточнить договорённости и дату следующего контакта.",
        "script_variants": [],
        "script_channel": "Внутренний разбор",
        "rop_task_hint": "Зафиксировать следующий шаг.",
        "expected_crm_update": "Добавить следующий контакт в CRM.",
        "direct_manager_question": "Что согласовано с клиентом и когда следующий контакт?",
    },
    "review": review(
        "red",
        "Требует внимания",
        "Следующий шаг после последнего контакта не зафиксирован.",
        "Что согласовано с клиентом и когда следующий контакт?",
    ),
}


def simple_deal(deal_id: str, title: str, bucket: str, deadline: str, manager: str) -> dict:
    item = dict(TARGET)
    item.update(
        {
            "deal_id": deal_id,
            "title": title,
            "manager_name": manager,
            "bitrix_tasks": [task(f"{deal_id}-TASK", "Плановый контакт", bucket, deadline)],
            "primary_bitrix_task": task(f"{deal_id}-TASK", "Плановый контакт", bucket, deadline),
            "coaching": {"strengths": [], "weaknesses": [], "known": [], "unknowns": [], "questions": [], "script_variants": []},
            "review": None,
        }
    )
    return item


DEALS = [
    TARGET,
    simple_deal("DEMO-PILOT-CENTER", "Пилот — Центр", "today", "2026-09-13T16:00:00+03:00", "Демо-менеджер"),
    simple_deal("DEMO-PILOT-SOUTH", "Пилот — Юг", "future", "2026-09-18T11:00:00+03:00", "Демо-менеджер"),
]


def dashboard(filtered: bool = False) -> dict:
    visible_deals = [TARGET] if filtered else DEALS
    summary = {
        "active_deals": len(visible_deals),
        "portfolio_amount": 0,
        "tasks_total": len(visible_deals),
        "tasks_today": 0 if filtered else 1,
        "tasks_tomorrow": 0,
        "tasks_future": 0 if filtered else 1,
        "tasks_overdue": 1 if filtered else 1,
        "tasks_completed_today": 0,
        "tasks_rescheduled_today": 0,
        "tasks_missing": 0,
        "tasks_plan_today": 0 if filtered else 2,
        "average_probability": None,
    }
    return {
        "scope": {
            "initial_deal_ids": ["DEMO-PILOT-SEVER", "DEMO-PILOT-CENTER", "DEMO-PILOT-SOUTH"],
            "manager_ids": ["demo-manager"],
            "pipeline_id": "DEMO",
            "pipeline_ids": ["DEMO"],
            "configured": True,
            "updated_at": "2026-09-13T08:00:00+03:00",
        },
        "generated_at": "2026-09-13T08:00:00+03:00",
        "sync_message": None,
        "sync_errors": [],
        "summary": summary,
        "outcome_metrics": {
            "overall": {"tasks": 3, "actions_completed": 0, "confirmed_contacts": 0, "target_results": 0, "next_steps": 0, "stage_progressed": 0, "deals_won": 0},
            "with_guidance": {"tasks": 0, "actions_completed": 0, "confirmed_contacts": 0, "target_results": 0, "next_steps": 0, "stage_progressed": 0, "deals_won": 0},
            "without_guidance": {"tasks": 3, "actions_completed": 0, "confirmed_contacts": 0, "target_results": 0, "next_steps": 0, "stage_progressed": 0, "deals_won": 0},
            "cancelled_tasks": 0,
            "note": "Санитизированный демонстрационный набор.",
        },
        "deals": visible_deals,
    }


def body(handler: BaseHTTPRequestHandler) -> bytes:
    path = unquote(urlparse(handler.path).path)
    if path == "/api/auth/me":
        return json.dumps({"authenticated": True, "user": {"id": 7, "login": "demo-rop", "role": "rop", "manager_id": None, "is_active": True, "trajectory_enabled": False}}, ensure_ascii=False).encode()
    if path == "/api/pipelines":
        return b'{"deal_pipelines":[],"lead_pipeline":null}'
    if path == "/api/candidate-filters":
        return b'{"filter":{"entity_type":"deal","created_days":15,"modified_days":15,"limit":20,"priority":null,"pipeline_ids":[],"stage_ids":[],"review_view":"active","lead_categories":[],"bant_filter":""}}'
    if path == "/api/analysis-profiles":
        return b'{"items":[],"selected":null}'
    if path == "/api/reports" or path.startswith("/api/reports?"):
        return b'{"items":[]}'
    if path == "/api/automatic-analysis/latest":
        return b'{"latest":null}'
    if path == "/api/deal-control":
        cookie = handler.headers.get("Cookie", "")
        filtered = "mock_state=after" in cookie
        return json.dumps(dashboard(filtered), ensure_ascii=False).encode()
    if path.startswith("/api/deal-control/deals/"):
        deal_id = path.rsplit("/", 1)[-1]
        for deal in DEALS:
            if deal["deal_id"] == deal_id:
                return json.dumps(deal, ensure_ascii=False).encode()
        return b'{"detail":"demo deal not found"}'
    if path.endswith("/comments"):
        return b'{"deal_id":"DEMO-PILOT-SEVER","available":true,"comments":[],"files":[]}'
    return b"{}"


class Handler(BaseHTTPRequestHandler):
    server_version = "NeuroRopDemo/1.0"

    def log_message(self, format: str, *args: object) -> None:
        print(format % args)

    def do_GET(self) -> None:  # noqa: N802
        path = unquote(urlparse(self.path).path)
        if path.startswith("/api/"):
            payload = body(self)
            status = HTTPStatus.OK if path != "/api/deal-control/deals/unknown" else HTTPStatus.NOT_FOUND
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(payload)
            return

        relative = "index.html" if path in ("/", "") else path.lstrip("/")
        file_path = (DIST / relative).resolve()
        if not str(file_path).startswith(str(DIST.resolve())) or not file_path.is_file():
            file_path = DIST / "index.html"
        data = file_path.read_bytes()
        if file_path.name == "index.html":
            marker = b"</head>"
            bootstrap = '<script>(function(){const s=new URLSearchParams(location.search).get("state");try{sessionStorage.setItem("rop-assistant:deal-control-view:7","dashboard")}catch(e){}if(!s)return;document.cookie="mock_state="+encodeURIComponent(s)+";path=/";if(s!=="after")return;let tries=0;const id=setInterval(function(){const b=Array.from(document.querySelectorAll("button")).find(function(x){return x.textContent.trim().startsWith("Требуют внимания")});if(b){b.click();clearInterval(id)}if(++tries>60)clearInterval(id)},50)})();</script>'.encode()
            data = data.replace(marker, bootstrap + marker, 1)
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", mimetypes.guess_type(str(file_path))[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self) -> None:  # noqa: N802
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(b'{}')

    def do_PUT(self) -> None:  # noqa: N802
        self.do_POST()


if __name__ == "__main__":
    os.chdir(DIST)
    print(f"Serving fictional Neuro ROP capture at http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
