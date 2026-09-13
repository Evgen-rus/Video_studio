"""Safe, read-only local server for the product screenshot capture.

It serves the already-built Neuro ROP frontend and a fixed fictional API
fixture. No CRM, Bitrix, OpenAI, or product backend is started.
"""

from __future__ import annotations

import json
import mimetypes
import os
import re
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse


HOST = "127.0.0.1"
PORT = 4173
DIST = Path(r"D:\My_dev_project\Neuro_rop_practice\frontend\dist")
DEMO_DATE = "2026-09-13"
CAPTURE_DIR = Path(__file__).resolve().parent / "screens"


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
    "analysis": {"status": "assessed", "summary": "DEMO: следующий шаг требует подтверждения."},
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


def manager_demo_deal(refined: bool) -> dict:
    deal = json.loads(json.dumps(TARGET))
    situation = {
        "state": "confirmed" if refined else "pending",
        "review_id": 1,
        "source_report_id": 1,
        "revision": 2 if refined else 1,
        "manager_context": "DEMO: клиент ждёт согласования даты следующего контакта." if refined else None,
        "confirmed_at": "2026-09-13T12:20:00+03:00" if refined else None,
        "business_date": DEMO_DATE,
        "last_confirmation_business_date": DEMO_DATE if refined else None,
        "is_current": True,
    }
    deal["manager_situation"] = situation
    deal["coaching"].update({
        "report_id": 1,
        "manager_situation": situation,
        "current_situation": (
            "Менеджер уточнил: клиент готов согласовать дату следующего контакта после внутренней сверки."
            if refined else "Клиент ждёт уточнения условий; дата следующего контакта пока не зафиксирована."
        ),
    })
    return deal


def dashboard(filtered: bool = False, manager: bool = False) -> dict:
    visible_deals = [TARGET] if filtered else DEALS
    if manager:
        visible_deals = [manager_demo_deal(filtered), *visible_deals[1:]]
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


def ai_event(day: str = DEMO_DATE, kind: str = "deal_manager_quick_help") -> dict:
    return {"at": f"{day}T15:42:00+07:00", "time": "15:42", "datetime_label": "13 сентября, 15:42",
            "kind": kind, "kind_label": "Quick Help", "kind_group": "quick_help", "kind_group_label": "Quick Help",
            "entity_type": "deal", "entity_id": "DEMO-PILOT-SEVER", "entity_label": "Пилот — Север", "bitrix_url": None,
            "model": "demo-model", "model_label": "Демо-модель", "estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02,
            "estimated_cost_rub_label": "1,84 ₽", "status": "success", "status_label": "Успешно", "attempt": 1,
            "run_id": "DEMO-RUN-1", "job_id": "DEMO-JOB-1", "input_tokens": 420, "cached_input_tokens": 0,
            "cache_write_tokens": 0, "output_tokens": 180, "reasoning_tokens": 0, "token_total": 600,
            "cache_hit_percent": 0, "duration_seconds": 2.1, "day": day, "event_key": f"{day}-demo-1", "attention": []}


def ai_analytics() -> dict:
    point = {"date": DEMO_DATE, "label": "13 сентября", "short_label": "13 сен", "estimated_cost_rub": 1.84,
             "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "paid_calls_label": "1", "total_tokens": 600,
             "total_tokens_label": "600", "unknown_cost_calls": 0}
    totals = {"estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02, "estimated_cost_rub_label": "1,84 ₽",
              "paid_calls": 1, "paid_calls_label": "1", "unknown_cost_calls": 0, "total_tokens": 600,
              "total_tokens_label": "600", "average_cost_rub": 1.84, "average_cost_rub_label": "1,84 ₽", "event_count": 1}
    row = {"id": "quick_help", "label": "Quick Help", "estimated_cost_rub": 1.84, "estimated_cost_rub_label": "1,84 ₽",
           "paid_calls": 1, "paid_calls_label": "1", "calls_label": "1 вызов", "total_tokens": 600, "share": 1, "daily": [point]}
    return {"disclaimer": "Санитизированная демонстрационная статистика; платные вызовы не выполняются.", "title": "Расходы AI",
            "period": {"preset": "7", "from": DEMO_DATE, "to": DEMO_DATE, "label": "7 дней", "days": 1, "today": DEMO_DATE},
            "previous_period": {"from": "2026-09-06", "to": "2026-09-12", "label": "6–12 сентября"}, "totals": totals,
            "today": dict(totals, date=DEMO_DATE, label="Сегодня"), "yesterday": dict(totals, date="2026-09-12", label="Вчера", estimated_cost_rub=0, estimated_cost_rub_label="0 ₽", paid_calls=0, paid_calls_label="0", total_tokens=0, total_tokens_label="0", average_cost_rub=0, average_cost_rub_label="0 ₽", event_count=0),
            "comparison": {"cost_percent": 0, "calls_percent": 0, "tokens_percent": 0, "average_cost_percent": 0}, "daily_series": [point],
            "kind_groups": [row], "by_kind": [row], "by_model": [{**row, "id": "demo-model", "label": "Демо-модель"}],
            "top_entities": [{"entity_type": "deal", "entity_id": "DEMO-PILOT-SEVER", "label": "Пилот — Север", "bitrix_url": None, "estimated_cost_rub": 1.84, "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "calls_label": "1", "primary_kind": "quick_help", "primary_kind_label": "Quick Help", "share": 1}],
            "attention": [], "skipped_lines": 0, "has_events": True, "has_unknown_cost": False}


def quick_help_entry() -> dict:
    return {
        "id": 1, "deal_id": "DEMO-PILOT-SEVER", "source_report_id": 1, "situation_review_id": 1,
        "mode": "push", "origin": "auto", "question": "Как усилить следующий шаг?",
        "created_at": "2026-09-13T15:42:00+03:00",
        "content": {
            "answer_contract": "strategy_v3", "mode": "push",
            "situation_summary": "Клиент готов к следующему контакту, но дата ещё не закреплена.",
            "next_action": "Предложить два конкретных времени и зафиксировать выбор в CRM.",
            "expected_result": "Согласованная дата следующего контакта.",
            "crm_checklist": ["Дата контакта", "Ответственный", "Ожидаемый результат"],
            "pressure_lever": {"title": "Конкретный выбор", "rationale": "Снижает паузу и переводит разговор к решению."},
            "strategy_labels": {"primary": "Конкретный выбор", "alternative": "Мягкое напоминание", "pattern_break": "Новый повод"},
            "client_messages": {
                "primary": "Предлагаю выбрать удобное время для следующего шага: сегодня в 16:00 или завтра в 11:00?",
                "alternative": "Подтвердим, пожалуйста, когда вернуться к обсуждению условий?",
                "pattern_break": "Подготовил короткое резюме договорённостей — какой следующий шаг удобнее?",
            },
            "lifehacks": [{"tactic_id": "demo-choice", "title": "Дайте выбор из двух дат", "action": "Предложите два времени", "why_relevant": "Убирает неопределённость", "conditions": "Если клиент не назвал дату"}],
            "fallback_action": "Если ответа нет — назначить контрольный контакт через два рабочих дня.",
        },
        "model_meta": {"model": "demo-model", "reasoning": "minimal"},
    }


def body(handler: BaseHTTPRequestHandler) -> bytes:
    parsed = urlparse(handler.path)
    path = unquote(parsed.path)
    if path == "/api/auth/me":
        cookies = handler.headers.get("Cookie", "")
        role = next((part.split("=", 1)[1] for part in cookies.split("; ") if part.startswith("mock_role=")), "rop")
        return json.dumps({"authenticated": True, "user": {"id": 7, "login": f"demo-{role}", "role": role, "manager_id": "demo-manager" if role == "manager" else None, "is_active": True, "trajectory_enabled": False}}, ensure_ascii=False).encode()
    if path == "/api/admin/llm-runtime":
        return json.dumps({"provider": "demo", "status": "blocked", "status_label": "Демо-режим", "credential_configured": False, "fallback_enabled": False, "roles": {"analysis": {"model": "demo-model", "reasoning": "minimal"}, "repair": {"model": "demo-model", "reasoning": "minimal"}, "manager": {"model": "demo-model", "reasoning": "minimal"}, "learning_shadow": {"model": "demo-model", "reasoning": "minimal"}}, "transcription": {"provider": "demo", "model": "demo-transcription"}, "last_request": None}, ensure_ascii=False).encode()
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
        return json.dumps(dashboard(filtered, "mock_role=manager" in cookie), ensure_ascii=False).encode()
    if path == "/api/admin/ai-spend/analytics":
        return json.dumps(ai_analytics(), ensure_ascii=False).encode()
    if path == "/api/admin/ai-spend/summary":
        return json.dumps({"disclaimer": "Санитизированная демонстрационная статистика.", "title": "Расходы AI", "today": {"date": DEMO_DATE, "estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02, "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "paid_calls_label": "1"}, "last_7_days": {"estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02, "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "paid_calls_label": "1"}, "last_30_days": {"estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02, "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "paid_calls_label": "1"}, "days": [], "skipped_lines": 0}, ensure_ascii=False).encode()
    if path == "/api/admin/ai-spend/events":
        return json.dumps({"disclaimer": "Демо-журнал.", "period": {"preset": "7", "from": DEMO_DATE, "to": DEMO_DATE, "label": "7 дней"}, "q": "", "kind_group": None, "status": None, "attention": None, "page": 1, "page_size": 25, "total": 1, "pages": 1, "skipped_lines": 0, "events": [ai_event()] , "empty_reason": None}, ensure_ascii=False).encode()
    if path == "/api/admin/ai-spend/day":
        return json.dumps({"disclaimer": "Демо-журнал.", "date": DEMO_DATE, "label": "13 сентября", "estimated_cost_rub": 1.84, "estimated_cost_usd": 0.02, "estimated_cost_rub_label": "1,84 ₽", "paid_calls": 1, "paid_calls_label": "1", "skipped_lines": 0, "events": [ai_event()]}, ensure_ascii=False).encode()
    if path.startswith("/api/daily-control/reports"):
        late = "mock_state=after" in handler.headers.get("Cookie", "")
        reports = [
            {"id": 1, "business_date": DEMO_DATE, "creation_kind": "automatic_planning", "heading": "Состояние команды на 13 сентября — срез на 15:45", "started_at": "2026-09-13T15:45:00+03:00", "cutoff_at": "2026-09-13T15:45:00+03:00", "created_at": "2026-09-13T15:46:00+03:00", "source_watermark": "DEMO-WATERMARK-1545", "warnings": [], "position": 1, "total": 2},
            {"id": 2, "business_date": DEMO_DATE, "creation_kind": "automatic_day_end", "heading": "Состояние команды на 13 сентября — срез на 23:00", "started_at": "2026-09-13T23:00:00+03:00", "cutoff_at": "2026-09-13T23:00:00+03:00", "created_at": "2026-09-13T23:01:00+03:00", "source_watermark": "DEMO-WATERMARK-2300", "warnings": [], "position": 2, "total": 2},
        ]
        meta = reports[1 if late else 0]
        if path == "/api/daily-control/reports":
            return json.dumps({"default_id": meta["id"], "missing_morning_final": False, "reports": reports, "latest_id": 2, "total": 2, "generation": None}, ensure_ascii=False).encode()
        return json.dumps({**meta, "snapshot": {"business_date": DEMO_DATE, "cutoff_at": meta["cutoff_at"], "deals": [review("red", "Требует внимания", "Следующий шаг после последнего контакта не зафиксирован.", "Что согласовано с клиентом и когда следующий контакт?")], "summary": dashboard()["summary"], "warnings": []}, "reviewed_deal_ids": [], "previous_id": None, "next_id": None, "generation": None}, ensure_ascii=False).encode()
    if path.startswith("/api/daily-summaries"):
        return json.dumps({"items": [{"id": "DEMO-DAILY-2300", "business_date": DEMO_DATE, "status": "completed", "label": "23:00 — дневной отчёт"}]}, ensure_ascii=False).encode()
    if path.endswith("/assistant-workspace"):
        entry = quick_help_entry()
        return json.dumps({"started": True, "entries": [entry], "current_by_mode": {"push": entry, "reanimator": None}, "source_report_id": 1, "situation_review_id": 1, "timeline": [{"id": "DEMO-TIMELINE-1", "kind": "assistant_request", "occurred_at": entry["created_at"], "text": "Сформирована рекомендация по следующему шагу."}], "disc_profile": {"primary_style": "S", "secondary_style": "C", "profile_confidence": "medium"}, "context": {"stage": "Переговоры", "current_task": "Уточнить следующий шаг", "last_communication": None, "main_risk": "Дата контакта не зафиксирована", "deal_context": None, "report": {"report_id": 1, "markdown_available": True}}}, ensure_ascii=False).encode()
    if path.endswith("/quick-help-history"):
        return json.dumps({"items": [{"id": 1, "question": "Как усилить следующий шаг?", "answer": "DEMO: назначить дату следующего контакта.", "status": "done", "created_at": "2026-09-13T15:42:00+07:00"}]}, ensure_ascii=False).encode()
    if path.endswith("/companion"):
        return json.dumps({"last_contact": None, "companion": {"id": 1, "content": {"message_text": "Здравствуйте! DEMO: подтверждаем следующий шаг и дату контакта."}, "status": "done"}, "source_report_id": 1}, ensure_ascii=False).encode()
    if path.endswith("/situation") or path.endswith("/quick-help-history") or path.endswith("/companion"):
        return json.dumps({"situation_status": "confirmed", "situation": {"id": 1, "status": "confirmed", "text": "Клиент ждёт уточнение условий и следующего шага."}, "items": [], "history": [], "workspace": {}}, ensure_ascii=False).encode()
    if path.startswith("/api/deal-control/deals/") and not any(path.endswith(suffix) for suffix in ("/assistant-workspace", "/companion", "/quick-help-history", "/situation")):
        deal_id = path.rsplit("/", 1)[-1]
        cookie = handler.headers.get("Cookie", "")
        if deal_id == "DEMO-PILOT-SEVER" and "mock_role=manager" in cookie:
            return json.dumps(manager_demo_deal("mock_state=after" in cookie), ensure_ascii=False).encode()
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
            bootstrap = '<script>(function(){const q=new URLSearchParams(location.search),s=q.get("state")||"before",r=q.get("role")||"rop",v=q.get("view")||"dashboard";document.cookie="mock_state="+encodeURIComponent(s)+";path=/";document.cookie="mock_role="+encodeURIComponent(r)+";path=/";try{sessionStorage.setItem("rop-assistant:deal-control-view:7",v)}catch(e){}let tries=0;const id=setInterval(function(){const label=v==="dashboard"?(s==="after"?"Требуют внимания":"Все сделки"):(v==="daily"?"Дневной контроль":v==="spend"?"Расходы AI":v==="rop"?"Мои сделки":"Сделки");const b=Array.from(document.querySelectorAll("button,a")).find(function(x){return x.textContent.trim().startsWith(label)});if(b){b.click();clearInterval(id)}if(++tries>80)clearInterval(id)},50)})();</script>'.encode()
            data = data.replace(marker, bootstrap + marker, 1)
        # Keep any bundled links safe for offline capture; product assets stay untouched.
        data = data.replace(b"obtorg.bitrix24.ru", b"demo.invalid")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", mimetypes.guess_type(str(file_path))[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self) -> None:  # noqa: N802
        path = unquote(urlparse(self.path).path)
        match = re.fullmatch(r"/capture/([a-z0-9-]+\.(?:png|jpg))", path)
        if match:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 20_000_000:
                self.send_error(HTTPStatus.BAD_REQUEST, "invalid capture size")
                return
            payload = self.rfile.read(length)
            is_png = payload.startswith(b"\x89PNG\r\n\x1a\n")
            is_jpeg = payload.startswith(b"\xff\xd8\xff")
            if not is_png and not is_jpeg:
                self.send_error(HTTPStatus.BAD_REQUEST, "PNG or JPEG required")
                return
            CAPTURE_DIR.mkdir(parents=True, exist_ok=True)
            (CAPTURE_DIR / match.group(1)).write_bytes(payload)
            self.send_response(HTTPStatus.CREATED)
            self.end_headers()
            return
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(b'{"ok":true,"status":"completed","job_id":"DEMO-JOB-1","id":"DEMO-1"}')

    def do_PUT(self) -> None:  # noqa: N802
        self.do_POST()


if __name__ == "__main__":
    os.chdir(DIST)
    print(f"Serving fictional Neuro ROP capture at http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
