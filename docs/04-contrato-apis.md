# Contrato de APIs

## 1. Objetivo

Definir el contrato HTTP del API Gateway principal y los contratos internos lógicos entre servicios, usando un estilo consistente, versionado y preparado para OpenAPI 3.1.

## 2. Principios

1. Gateway único expuesto públicamente.
2. Servicios internos preferentemente vía Service Bindings.
3. JSON por defecto.
4. Idempotencia para operaciones sensibles.
5. Todas las respuestas relevantes incluyen `trace_id`.
6. Todos los endpoints tenant-scoped resuelven contexto de tenant antes de ejecutar lógica.
7. Los errores de negocio son explícitos y tipificados.

## 3. Convenciones

Base path pública:
`/api/v1`

Headers estándar:
- `Authorization: Bearer <token>`
- `X-Trace-Id: <uuid>` opcional entrada, generado si no existe
- `X-Idempotency-Key: <string>` para import/export, triggers sensibles y operaciones de riesgo
- `X-Tenant-Code` opcional si aplica en casos controlados
- `Content-Type: application/json`

## 4. Envelope de respuesta

Éxito:
```json
{
  "success": true,
  "trace_id": "trc_123",
  "data": {},
  "meta": {}
}
```

Error:
```json
{
  "success": false,
  "trace_id": "trc_123",
  "error": {
    "code": "PLAN_LIMIT_EXCEEDED",
    "message": "Se excedió el límite de usuarios del plan.",
    "details": {}
  }
}
```

## 5. Códigos de error estándar

- `UNAUTHORIZED`
- `FORBIDDEN`
- `TENANT_NOT_FOUND`
- `TENANT_SUSPENDED`
- `PLAN_LIMIT_EXCEEDED`
- `FEATURE_NOT_ENABLED`
- `VALIDATION_ERROR`
- `RESOURCE_NOT_FOUND`
- `CONFLICT`
- `IDEMPOTENCY_CONFLICT`
- `RAG_INDEXING_IN_PROGRESS`
- `AGENT_CHECKPOINT_NOT_FOUND`
- `EXPORT_SCHEMA_UNSUPPORTED`
- `IMPORT_VALIDATION_FAILED`
- `INTERNAL_ERROR`

## 6. Endpoints públicos del gateway

## 6.1 Auth

### POST `/api/v1/auth/login`
Body:
```json
{
  "email": "user@tenant.cl",
  "password": "****"
}
```

Respuesta:
```json
{
  "success": true,
  "trace_id": "trc_1",
  "data": {
    "access_token": "jwt",
    "refresh_token": "jwt",
    "user": {
      "id": "usr_1",
      "role_codes": ["MANAGER"],
      "tenant_id": "ten_1"
    }
  }
}
```

### POST `/api/v1/auth/refresh`
### POST `/api/v1/auth/logout`

## 6.2 Tenant

### GET `/api/v1/tenant/me`
Devuelve resumen del tenant actual.

### PATCH `/api/v1/tenant/settings`
Actualiza settings del tenant.

## 6.3 Users

### GET `/api/v1/users`
Query:
- `page`
- `page_size`
- `status`
- `role_code`

### POST `/api/v1/users`
Crea usuario tenant-scoped.

Body:
```json
{
  "email": "nuevo@tenant.cl",
  "name": "Nuevo Usuario",
  "role_codes": ["CLIENT"]
}
```

### PATCH `/api/v1/users/{userId}`
### DELETE `/api/v1/users/{userId}`

## 6.4 Roles y permisos

### GET `/api/v1/roles`
### POST `/api/v1/roles`
### POST `/api/v1/roles/{roleId}/permissions`
### DELETE `/api/v1/roles/{roleId}/permissions/{permissionCode}`

## 6.5 Assistants

### GET `/api/v1/assistants`
### POST `/api/v1/assistants`
Body:
```json
{
  "name": "Asistente Ventas",
  "description": "Asistente web de ventas",
  "config": {
    "rag_enabled": true,
    "streaming": true
  }
}
```

### GET `/api/v1/assistants/{assistantId}`
### PATCH `/api/v1/assistants/{assistantId}`
### DELETE `/api/v1/assistants/{assistantId}`

### POST `/api/v1/assistants/{assistantId}/chat`
Body:
```json
{
  "conversation_id": "conv_1",
  "message": "¿Tienen stock del producto X?",
  "channel": "webchat"
}
```

Respuesta:
```json
{
  "success": true,
  "trace_id": "trc_2",
  "data": {
    "conversation_id": "conv_1",
    "engine": "basic",
    "reply": "Sí, hay stock disponible.",
    "usage": {
      "input_tokens": 120,
      "output_tokens": 90
    }
  }
}
```

## 6.6 Agents

### GET `/api/v1/agents`
### POST `/api/v1/agents`
### GET `/api/v1/agents/{agentId}`
### PATCH `/api/v1/agents/{agentId}`
### DELETE `/api/v1/agents/{agentId}`

### POST `/api/v1/agents/{agentId}/run`
Body:
```json
{
  "thread_id": "thr_1",
  "input": {
    "task": "Revisa este caso y decide la mejor respuesta."
  }
}
```

Respuesta:
```json
{
  "success": true,
  "trace_id": "trc_3",
  "data": {
    "execution_id": "agrun_1",
    "thread_id": "thr_1",
    "status": "running"
  }
}
```

### POST `/api/v1/agents/{agentId}/approve-step`
Para human-in-the-loop.

## 6.7 Automations

### GET `/api/v1/automations`
### POST `/api/v1/automations`
### PATCH `/api/v1/automations/{automationId}`
### DELETE `/api/v1/automations/{automationId}`
### POST `/api/v1/automations/{automationId}/execute`
### POST `/api/v1/automations/{automationId}/retry`
### POST `/api/v1/automations/{automationId}/cancel`

## 6.8 RAG / Sources

### GET `/api/v1/rag/sources`
### POST `/api/v1/rag/sources`
Subida inicial metadata + URL de upload o payload multipart según diseño.

Respuesta:
```json
{
  "success": true,
  "trace_id": "trc_4",
  "data": {
    "source_id": "src_1",
    "upload_target": {
      "type": "r2",
      "key": "tenants/ten_1/sources/src_1/dossier.pdf"
    }
  }
}
```

### POST `/api/v1/rag/sources/{sourceId}/index`
### POST `/api/v1/rag/sources/{sourceId}/reindex`
### DELETE `/api/v1/rag/sources/{sourceId}`

## 6.9 Conversations

### GET `/api/v1/conversations`
### GET `/api/v1/conversations/{conversationId}`
### GET `/api/v1/conversations/{conversationId}/messages`

## 6.10 Billing

### GET `/api/v1/billing/usage`
### GET `/api/v1/billing/plan`
### GET `/api/v1/billing/limits`
### GET `/api/v1/billing/ledger`

## 6.11 Audit / Observability

### GET `/api/v1/audit/events`
Query:
- `from`
- `to`
- `resource_type`
- `event_type`
- `trace_id`

### GET `/api/v1/observability/metrics`
### GET `/api/v1/observability/health`

## 6.12 Export / Import

### POST `/api/v1/tenant/export`
Headers:
- `X-Idempotency-Key`

Respuesta:
```json
{
  "success": true,
  "trace_id": "trc_5",
  "data": {
    "job_id": "exp_1",
    "status": "completed",
    "download_key": "tenants/ten_1/exports/exp_1/tenant-export.json"
  }
}
```

### POST `/api/v1/tenant/import`
Body:
```json
{
  "mode": "validate_only",
  "payload": {}
}
```

### GET `/api/v1/tenant/import/{jobId}`

## 7. Webhooks / ingress

### POST `/api/v1/channels/whatsapp/inbound`
### POST `/api/v1/channels/telegram/inbound`
### POST `/api/v1/channels/webchat/inbound`

Requisitos:
- validación de firma
- idempotency key derivada del proveedor
- tenant resolution segura

## 8. Ejemplo OpenAPI mínimo

```yaml
openapi: 3.1.0
info:
  title: Thinka AI SaaS API
  version: 1.0.0
servers:
  - url: https://api.example.com/api/v1
paths:
  /assistants/{assistantId}/chat:
    post:
      summary: Ejecuta una interacción básica de asistente
      parameters:
        - in: path
          name: assistantId
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [message, channel]
              properties:
                conversation_id:
                  type: string
                message:
                  type: string
                channel:
                  type: string
      responses:
        '200':
          description: OK
        '403':
          description: Forbidden
        '429':
          description: Limit exceeded
```

## 9. Contratos internos por Service Bindings

## 9.1 Identity Service
Métodos lógicos:
- `validateToken(token)`
- `resolvePrincipal(token)`
- `checkPermission(principal, resource, action, context)`

## 9.2 Billing Service
- `assertLimit(tenantId, metricCode, intendedIncrement)`
- `recordUsage(payload)`
- `getCurrentUsage(tenantId, filters)`

## 9.3 RAG Service
- `indexSource(sourceId)`
- `search(tenantId, query, options)`
- `reindexSource(sourceId)`

## 9.4 Memory Service
- `loadConversationContext(conversationId)`
- `appendMessage(payload)`
- `saveCheckpoint(payload)`
- `loadCheckpoint(threadId)`

## 10. Idempotencia

Debe aplicarse a:
- importaciones
- exportaciones
- webhooks entrantes
- triggers programados
- reindexaciones manuales
- aprobaciones HITL

## 11. Versionado

- versionado mayor en path: `/api/v1`
- cambios aditivos: compatibles
- cambios breaking: nueva versión
- export/import JSON: versionado propio de esquema

## 12. Seguridad del contrato

- no exponer secretos
- errores no deben filtrar detalles internos
- endpoints administrativos separados por autorización fuerte
- rate limiting y validación de payloads obligatorios
