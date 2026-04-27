# Catálogo de eventos

## 1. Objetivo

Definir el catálogo base de eventos de dominio, sistema y operación que utiliza la plataforma para automatización, trazabilidad, billing, observabilidad y auditoría.

## 2. Principios

1. Todo evento tiene contexto de tenant o justificación global.
2. Todo evento tiene `trace_id`.
3. Todo evento tiene versión.
4. Todo evento sensible es idempotente.
5. Los eventos no deben transportar secretos.
6. Los eventos deben poder auditarse y re-procesarse.

## 3. Envelope estándar

```json
{
  "event_id": "evt_123",
  "event_type": "assistant.created",
  "event_version": 1,
  "occurred_at": "2026-04-16T20:00:00Z",
  "trace_id": "trc_123",
  "tenant_id": "ten_1",
  "actor": {
    "user_id": "usr_1",
    "role_code": "MANAGER",
    "type": "human"
  },
  "resource": {
    "type": "assistant",
    "id": "asst_1"
  },
  "payload": {},
  "metadata": {
    "channel": "web"
  }
}
```

## 4. Tipos de eventos

### 4.1 Tenant
- tenant.created
- tenant.updated
- tenant.suspended
- tenant.reactivated
- tenant.deleted
- tenant.plan.assigned
- tenant.plan.changed

### 4.2 Identity & Access
- user.invited
- user.created
- user.updated
- user.deleted
- user.logged_in
- user.login_failed
- role.created
- role.updated
- role.deleted
- role.assigned
- role.revoked
- permission.granted
- permission.revoked
- policy.created
- policy.updated
- policy.deleted
- access.denied

### 4.3 Assistant
- assistant.created
- assistant.updated
- assistant.deleted
- assistant.executed
- assistant.failed

### 4.4 Agent
- agent.created
- agent.updated
- agent.deleted
- agent.run.started
- agent.run.completed
- agent.run.failed
- agent.hitl.required
- agent.hitl.approved
- agent.checkpoint.saved
- agent.checkpoint.loaded

### 4.5 Automation
- automation.created
- automation.updated
- automation.deleted
- automation.triggered
- automation.run.started
- automation.run.completed
- automation.run.failed
- automation.run.retried
- automation.run.cancelled

### 4.6 Conversation
- conversation.started
- conversation.message.received
- conversation.message.persisted
- conversation.message.responded
- conversation.ended
- conversation.summary.generated

### 4.7 RAG
- rag.source.uploaded
- rag.source.updated
- rag.source.deleted
- rag.indexing.started
- rag.indexing.completed
- rag.indexing.failed
- rag.reindex.started
- rag.reindex.completed
- rag.search.executed

### 4.8 Files
- file.uploaded
- file.deleted
- file.downloaded
- file.hash.verified

### 4.9 Billing
- billing.usage.recorded
- billing.limit.soft_reached
- billing.limit.hard_reached
- billing.overage.applied
- billing.service.degraded
- billing.service.cutoff
- billing.plan.exported
- billing.plan.imported

### 4.10 Export / Import
- tenant.export.started
- tenant.export.completed
- tenant.export.failed
- tenant.import.started
- tenant.import.validated
- tenant.import.completed
- tenant.import.failed

### 4.11 Security / Audit
- audit.event.appended
- security.webhook.invalid_signature
- security.rate_limit.triggered
- security.anomaly.detected
- security.secret.rotated
- security.data_export_requested
- security.data_delete_requested

### 4.12 Observability
- trace.started
- trace.completed
- service.health.degraded
- service.health.restored
- metric.threshold.crossed

## 5. Descripción de eventos críticos

## 5.1 tenant.plan.changed
Uso:
- recalcular límites,
- actualizar experience flags,
- notificar impactos.

Payload:
```json
{
  "old_plan_code": "basic",
  "new_plan_code": "pro",
  "effective_at": "2026-04-16T21:00:00Z"
}
```

## 5.2 billing.limit.hard_reached
Payload:
```json
{
  "metric_code": "users.count",
  "current_value": 11,
  "hard_limit": 10,
  "period": "2026-04"
}
```

## 5.3 agent.hitl.required
Payload:
```json
{
  "agent_id": "ag_1",
  "thread_id": "thr_1",
  "step_key": "human_review",
  "reason": "Operación sensible"
}
```

## 5.4 rag.source.uploaded
Payload:
```json
{
  "source_id": "src_1",
  "display_name": "dossier_thinka.pdf",
  "mime_type": "application/pdf"
}
```

## 6. Idempotencia

Campos recomendados:
- `event_id`
- `event_type`
- `occurred_at`
- `source_message_id` en webhooks
- `idempotency_key` cuando aplique

Casos obligatorios:
- webhooks
- import/export
- reindexación
- retries automáticos

## 7. Ordering y consistencia

No se garantiza orden global. Se debe aspirar a orden lógico por:
- conversation_id
- thread_id
- automation_run_id
- source_id

## 8. Consumidores típicos

- automation service
- billing service
- observability service
- audit service
- notification service

## 9. Retención

- eventos críticos: larga retención
- eventos operacionales de alto volumen: resumibles/aggregables
- duplicados: deduplicación por idempotency metadata

## 10. Eventos mínimos para MVP

- tenant.created
- user.created
- role.assigned
- assistant.created
- agent.run.started
- agent.run.completed
- rag.source.uploaded
- rag.indexing.completed
- conversation.message.received
- billing.usage.recorded
- billing.limit.hard_reached
- tenant.export.completed

## 11. Versionado del catálogo

Regla:
- nuevos campos no rompen compatibilidad
- cambios breaking elevan `event_version`
- consumidor debe tolerar campos desconocidos
