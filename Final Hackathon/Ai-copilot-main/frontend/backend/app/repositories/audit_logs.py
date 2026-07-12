from typing import Any

from app.repositories.jobs import now_utc, require_db


def log_event(action: str, entity_type: str, entity_id: str, actor: str = "demo-hr-user", metadata: dict[str, Any] | None = None) -> None:
    db = require_db()
    db.audit_logs.insert_one(
        {
            "action": action,
            "entityType": entity_type,
            "entityId": entity_id,
            "actor": actor,
            "metadata": metadata or {},
            "createdAt": now_utc(),
        }
    )
