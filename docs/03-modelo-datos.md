# Modelo de datos

## 1. Objetivo

Definir el modelo de datos lógico y físico de la plataforma, incluyendo distribución entre D1, R2, KV, Durable Objects y Vectorize, entidades, relaciones, índices, claves, y estrategia multi-tenant shared/siloed.

## 2. Principios

1. D1 contiene verdad relacional y persistencia duradera del negocio.
2. R2 almacena binarios y exportaciones pesadas.
3. KV se usa para caché y acceso rápido no crítico.
4. Durable Objects se usa para coordinación consistente y estado activo.
5. Vectorize almacena embeddings e índices RAG.
6. Toda entidad tenant-scoped incluye `tenant_id`.
7. Los datos sensibles se minimizan y cifran según política.

## 3. Distribución de datos por tecnología

## 3.1 D1
Almacena:
- tenants
- users
- roles
- permissions
- policies
- plans
- plan_limits
- tenant_plan_assignments
- assistants
- agents
- automations
- conversations
- messages
- checkpoints
- rag_sources metadata
- billing usage ledger
- audit events
- exports/imports metadata
- notifications metadata

## 3.2 R2
Almacena:
- documentos subidos
- binarios asociados al RAG
- adjuntos de soporte
- exportaciones JSON
- reportes generados

## 3.3 KV
Almacena:
- respuestas cacheadas
- feature flags de lectura rápida
- estados efímeros no críticos
- throttling hints
- resúmenes compactos de acceso frecuente

## 3.4 Durable Objects
Almacena/coordina:
- locks de conversación
- sesión activa por canal
- contador de uso near-real-time
- serialización de automatizaciones sensibles
- runtime state efímero

## 3.5 Vectorize
Almacena:
- embeddings por tenant
- metadata de chunk
- referencias a fuente/documento

## 4. Modelo lógico principal

## 4.1 Tenant

Campos:
- id (uuid)
- code
- name
- status
- plan_assignment_id
- billing_status
- created_at
- updated_at
- deleted_at

## 4.2 TenantSettings
- id
- tenant_id
- locale
- timezone
- retention_policy_days
- export_policy
- security_profile
- advanced_ai_enabled
- created_at
- updated_at

## 4.3 TenantBranding
- id
- tenant_id
- logo_r2_key
- primary_color
- secondary_color
- product_name
- support_email

## 4.4 User
- id
- tenant_id nullable (null solo para admin global)
- email
- name
- status
- password_hash / external_identity_ref
- mfa_enabled
- last_login_at
- created_at
- updated_at

## 4.5 Role
- id
- tenant_id nullable (null para roles globales)
- code
- name
- is_system
- description

## 4.6 Permission
- id
- code
- resource
- action
- description

## 4.7 RolePermission
- id
- role_id
- permission_id

## 4.8 UserRoleAssignment
- id
- user_id
- role_id
- assigned_by
- assigned_at

## 4.9 Policy
- id
- tenant_id nullable
- name
- effect
- resource_pattern
- action_pattern
- condition_json
- priority
- enabled

## 4.10 PlanDefinition
- id
- code
- name
- tier
- is_custom
- version
- metadata_json

## 4.11 PlanLimit
- id
- plan_id
- metric_code
- hard_limit
- soft_limit
- period_type
- overage_enabled
- overage_rate_json

## 4.12 TenantPlanAssignment
- id
- tenant_id
- plan_id
- starts_at
- ends_at nullable
- custom_overrides_json
- billing_mode

## 4.13 Assistant
- id
- tenant_id
- name
- status
- description
- prompt_profile_id
- channel_policy_json
- config_json
- created_by
- created_at
- updated_at

## 4.14 Agent
- id
- tenant_id
- name
- status
- graph_key
- config_json
- tools_json
- hitl_enabled
- created_by
- created_at
- updated_at

## 4.15 Automation
- id
- tenant_id
- name
- status
- trigger_type
- workflow_json
- target_type
- created_by
- created_at
- updated_at

## 4.16 Conversation
- id
- tenant_id
- user_id nullable
- channel
- channel_external_id
- engine_type
- assistant_id nullable
- agent_id nullable
- status
- started_at
- ended_at nullable
- trace_id

## 4.17 Message
- id
- conversation_id
- tenant_id
- direction
- actor_type
- content_text
- content_json
- token_count nullable
- model_name nullable
- created_at

## 4.18 ConversationSummary
- id
- conversation_id
- tenant_id
- summary_text
- version
- created_at

## 4.19 Checkpoint
- id
- tenant_id
- conversation_id nullable
- agent_id nullable
- thread_id
- step_key
- state_json
- checkpoint_hash
- created_at

## 4.20 RagSource
- id
- tenant_id
- source_type
- display_name
- r2_key nullable
- external_ref nullable
- file_hash nullable
- mime_type nullable
- indexing_status
- indexed_at nullable
- uploaded_by
- created_at
- updated_at

## 4.21 RagChunkManifest
- id
- source_id
- tenant_id
- chunk_count
- embedding_model
- metadata_json
- created_at

## 4.22 BillingUsageLedger
- id
- tenant_id
- user_id nullable
- resource_type
- metric_code
- quantity
- unit_cost
- total_cost
- billing_period
- trace_id
- created_at

## 4.23 AuditEvent
- id
- tenant_id nullable
- actor_user_id nullable
- actor_role_code nullable
- event_type
- resource_type
- resource_id
- trace_id
- metadata_json
- occurred_at

## 4.24 ExportImportJob
- id
- tenant_id
- operation_type
- status
- manifest_r2_key nullable
- file_r2_key nullable
- requested_by
- created_at
- completed_at nullable

## 5. Relaciones principales

- Tenant 1:N User
- Tenant 1:N Assistant
- Tenant 1:N Agent
- Tenant 1:N Automation
- Tenant 1:N Conversation
- Tenant 1:N RagSource
- Tenant 1:N BillingUsageLedger
- Tenant 1:N AuditEvent
- Tenant 1:1 TenantSettings
- Tenant 1:1 TenantBranding
- Tenant 1:1 active TenantPlanAssignment

- User N:M Role vía UserRoleAssignment
- Role N:M Permission vía RolePermission

- Conversation 1:N Message
- Conversation 1:N Checkpoint
- Conversation 1:N ConversationSummary

- RagSource 1:N RagChunkManifest

## 6. Claves e índices

## 6.1 Índices obligatorios
- users(tenant_id, email)
- roles(tenant_id, code)
- assistants(tenant_id, status)
- agents(tenant_id, status)
- automations(tenant_id, status)
- conversations(tenant_id, channel, started_at)
- messages(conversation_id, created_at)
- checkpoints(tenant_id, thread_id, created_at)
- rag_sources(tenant_id, indexing_status, created_at)
- billing_usage_ledger(tenant_id, billing_period, metric_code)
- audit_events(tenant_id, occurred_at)
- audit_events(trace_id)
- export_import_jobs(tenant_id, status)

## 6.2 Unicidad sugerida
- tenants(code)
- users(tenant_id, email)
- roles(tenant_id, code)
- permissions(code)
- plan_definitions(code, version)

## 7. Estrategia multi-tenant

## 7.1 Shared
Una base D1 compartida, filtrada por `tenant_id`. Aplicable al modelo estándar.

Ventajas:
- menor complejidad operativa
- menor overhead de despliegue
- mejor velocidad inicial

Riesgos:
- errores de filtrado deben mitigarse con enforcement estricto

## 7.2 Siloed
Una D1 por cliente enterprise, o segmentación física equivalente.

Aplicación:
- tenants enterprise con requisitos contractuales especiales
- separación reforzada
- posibles exigencias regulatorias/comerciales

## 8. DDL ejemplo simplificado

```sql
CREATE TABLE tenants (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  billing_status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  external_identity_ref TEXT,
  mfa_enabled INTEGER NOT NULL DEFAULT 0,
  last_login_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE UNIQUE INDEX idx_users_tenant_email
  ON users (tenant_id, email);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  user_id TEXT,
  channel TEXT NOT NULL,
  channel_external_id TEXT,
  engine_type TEXT NOT NULL,
  assistant_id TEXT,
  agent_id TEXT,
  status TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  trace_id TEXT NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_conversations_tenant_channel_started
  ON conversations (tenant_id, channel, started_at);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  direction TEXT NOT NULL,
  actor_type TEXT NOT NULL,
  content_text TEXT,
  content_json TEXT,
  token_count INTEGER,
  model_name TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE INDEX idx_messages_conversation_created
  ON messages (conversation_id, created_at);
```

## 9. R2 naming convention

Recomendación:
`tenants/{tenant_id}/sources/{source_id}/{filename}`
`tenants/{tenant_id}/exports/{job_id}/tenant-export.json`

## 10. Vectorize metadata estándar

Cada vector debe incluir:
- tenant_id
- source_id
- chunk_id
- source_type
- display_name
- mime_type
- created_at
- tags[]
- sensitivity_level

## 11. KV key patterns

- `tenant:{tenant_id}:assistant:{assistant_id}:cache:{hash}`
- `tenant:{tenant_id}:flags`
- `tenant:{tenant_id}:summary:{conversation_id}:latest`

## 12. Durable Objects keys

- conversation-session:{tenant_id}:{channel}:{channel_external_id}
- tenant-runtime:{tenant_id}
- automation-lock:{tenant_id}:{automation_id}

## 13. Retención

- AuditEvent: largo plazo según política.
- Messages: configurable por tenant/plan.
- Checkpoints: configurable con política de compactación.
- BillingUsageLedger: conservar al menos por período contractual.
- ExportImportJob: metadata persistente; archivos según política.

## 14. Borrado lógico

Campos recomendados:
- deleted_at
- deleted_by
- delete_reason

Aplicar a:
- users
- assistants
- agents
- automations
- rag_sources

## 15. Campos sensibles

Tratar como sensibles:
- email
- RUT si existe
- IPs
- phone numbers
- prompt payloads con datos personales
- contenidos documentales sensibles

## 16. Compatibilidad con export/import

Toda entidad exportable debe:
- tener schema version
- ser serializable
- separar metadata de blobs
- conservar referencias de dependencia
