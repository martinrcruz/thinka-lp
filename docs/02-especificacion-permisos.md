# Especificación de permisos

## 1. Objetivo

Definir el modelo de autorización de la plataforma combinando **RBAC** y **ABAC**, incluyendo roles base, recursos, acciones, restricciones contextuales, reglas de delegación y enforcement técnico.

## 2. Principios

1. Deny by default.
2. Toda evaluación requiere contexto de tenant.
3. RBAC define permisos base; ABAC restringe o amplía según contexto.
4. ADMIN global es excepcional y solo para Thinka.
5. MANAGER nunca sale de su tenant.
6. DEMO opera en un tenant demo o espacio aislado de prueba.
7. Toda decisión de autorización se audita.

## 3. Roles base

- ADMIN
- MANAGER
- CLIENT
- VIEWER
- DEMO

## 4. Recursos

- tenant
- tenant_settings
- plan
- plan_limit
- user
- role
- permission
- policy
- assistant
- agent
- automation
- conversation
- message
- rag_source
- rag_index
- document
- channel_integration
- billing_usage
- audit_event
- export_import_job
- notification
- dashboard
- observability_metric

## 5. Acciones estándar

- create
- read
- update
- delete
- list
- assign
- revoke
- execute
- retry
- cancel
- export
- import
- reindex
- monitor
- impersonate (solo si existe política explícita)
- approve_human_step
- manage_limits
- manage_plan

## 6. Matriz de permisos por rol

## 6.1 ADMIN

Permisos globales:
- tenant: create/read/update/delete/list
- tenant_settings: read/update
- plan: create/read/update/delete/list/assign/manage_plan
- plan_limit: create/read/update/delete/manage_limits
- user: create/read/update/delete/list global
- role: create/read/update/delete/assign/revoke
- permission: create/read/update/delete/list
- policy: create/read/update/delete/list
- assistant: create/read/update/delete/list/execute
- agent: create/read/update/delete/list/execute
- automation: create/read/update/delete/list/execute/retry/cancel
- conversation: read/list
- message: read/list
- rag_source: create/read/update/delete/list/reindex
- billing_usage: read/list/manage_limits
- audit_event: read/list/export
- export_import_job: create/read/update/list/export/import
- dashboard: read/monitor
- observability_metric: read/list/monitor

Restricciones:
- acceso solo desde frontends/admin endpoints autorizados;
- toda acción de alto impacto debe quedar auditada;
- capacidades de impersonation solo bajo política explícita.

## 6.2 MANAGER

Permisos tenant-scoped:
- tenant: read
- tenant_settings: read/update
- plan: read
- plan_limit: read
- user: create/read/update/delete/list dentro de su tenant
- role: read/list (y create/update si plan/política lo permite para roles custom internos)
- permission: read/list
- assistant: create/read/update/delete/list/execute
- agent: create/read/update/delete/list/execute
- automation: create/read/update/delete/list/execute/retry/cancel
- conversation: read/list
- message: read/list
- rag_source: create/read/update/delete/list/reindex
- document: create/read/update/delete/list
- channel_integration: create/read/update/delete/list
- billing_usage: read/list
- audit_event: read/list/export si está permitido
- export_import_job: create/read/list/export/import si está permitido
- dashboard: read
- observability_metric: read/list

Restricciones ABAC:
- `user.tenant_id == principal.tenant_id`
- no puede superar `plan.max_users`
- no puede habilitar features no contratadas
- no puede modificar planes globales
- no puede ver auditoría de otros tenants
- no puede acceder a políticas globales Thinka

## 6.3 CLIENT

Permisos base:
- tenant: read resumido
- assistant: read/list/execute; create/update/delete solo si policy lo permite
- agent: read/list/execute; create/update/delete solo si policy lo permite
- automation: read/list; create/update/delete/execute solo si policy lo permite
- conversation: create/read/list sobre conversaciones autorizadas
- message: create/read/list sobre conversaciones autorizadas
- rag_source: read/list si está permitido
- dashboard: read
- audit_event: read mínimo si está permitido

Restricciones:
- solo tenant propio
- visibilidad limitada por feature flags y políticas delegadas
- no acceso a billing salvo panel resumido si se habilita

## 6.4 VIEWER

Permisos:
- dashboard: read
- assistant: read/list
- agent: read/list
- automation: read/list
- conversation: read/list si está autorizado
- audit_event: read/list resumido si está autorizado
- observability_metric: read/list

Restricciones:
- sin create/update/delete/execute administrativo
- sin modificar configuraciones
- sin export/import

## 6.5 DEMO

Permisos:
- assistant: execute/create limitado
- conversation/message: create/read/list limitado
- rag_source: create/list limitado si la experiencia demo lo permite
- dashboard: read muy resumido

Restricciones:
- límites estrictos de uso
- sin features enterprise
- sin export/import
- sin canales externos productivos

## 7. Modelo RBAC

## 7.1 Estructuras
- Role
- Permission
- RolePermission
- UserRoleAssignment

Un permiso se representa como:
`<resource>:<action>`

Ejemplos:
- `assistant:create`
- `agent:execute`
- `billing_usage:read`
- `export_import_job:export`

## 7.2 Roles custom

ADMIN puede crear roles adicionales. MANAGER puede crear roles internos del tenant solo si:
- el plan lo permite,
- existe flag `custom_roles_enabled`,
- el rol no otorga privilegios reservados a Thinka/Admin.

## 8. Modelo ABAC

## 8.1 Atributos del principal
- principal.user_id
- principal.tenant_id
- principal.role_codes[]
- principal.plan_code
- principal.permissions[]
- principal.is_demo
- principal.is_suspended

## 8.2 Atributos del recurso
- resource.tenant_id
- resource.owner_user_id
- resource.sensitivity_level
- resource.feature_required
- resource.plan_required
- resource.status
- resource.created_by

## 8.3 Atributos del entorno
- env.request_ip
- env.channel
- env.trace_id
- env.time_window
- env.region
- env.is_internal_admin_ui
- env.requires_human_approval

## 8.4 Reglas ABAC ejemplo

### Regla 1: Aislamiento tenant
Permitir solo si:
`principal.tenant_id == resource.tenant_id`
excepto ADMIN global.

### Regla 2: Límite de usuarios
`user:create` permitido solo si:
`current_tenant_user_count < tenant_plan.max_users`

### Regla 3: Feature contratada
`agent:create` permitido solo si:
`tenant_plan.features.contains("advanced_agents") == true`

### Regla 4: Reindexación sensible
`rag_index:reindex` requiere:
- permiso RBAC,
- tenant coincidente,
- usuario no suspendido,
- operación dentro de ventana permitida o con override administrativo.

### Regla 5: Exportación
`export_import_job:export` permitido solo si:
- permiso RBAC,
- tenant coincidente,
- recurso no bloqueado,
- factor adicional o reautenticación si la política lo exige.

## 9. Recursos y acciones recomendadas

## 9.1 Tenant
- `tenant:read`
- `tenant:update`
- `tenant:list`
- `tenant:create`
- `tenant:delete`

## 9.2 User
- `user:create`
- `user:read`
- `user:update`
- `user:delete`
- `user:list`
- `user:assign_role`

## 9.3 Assistant
- `assistant:create`
- `assistant:read`
- `assistant:update`
- `assistant:delete`
- `assistant:list`
- `assistant:execute`

## 9.4 Agent
- `agent:create`
- `agent:read`
- `agent:update`
- `agent:delete`
- `agent:list`
- `agent:execute`
- `agent:approve_human_step`

## 9.5 Automation
- `automation:create`
- `automation:read`
- `automation:update`
- `automation:delete`
- `automation:list`
- `automation:execute`
- `automation:retry`
- `automation:cancel`

## 9.6 Billing
- `billing_usage:read`
- `billing_usage:list`
- `plan:read`
- `plan:assign`
- `plan:update`
- `plan_limit:manage_limits`

## 10. Políticas de visibilidad

- **VIEWER** solo lectura.
- **CLIENT** lectura + operación delegada.
- **MANAGER** administración tenant.
- **ADMIN** administración global.
- **DEMO** experiencia restringida.

## 11. Enforcement técnico

## 11.1 Orden de evaluación
1. Identidad válida.
2. Tenant context resuelto.
3. Rol y permisos RBAC.
4. Políticas ABAC.
5. Límites de plan.
6. Estado del tenant/usuario.
7. Auditoría de decisión.

## 11.2 Dónde se evalúa
- Gateway middleware para decisiones transversales.
- Servicios internos para enforcement de negocio fino.
- Frontend solo como ayuda UX; nunca como fuente de verdad.

## 12. Eventos auditables de autorización

- access.denied
- access.granted.sensitive
- role.assigned
- role.revoked
- policy.created
- policy.updated
- permission.override.used
- export.reauth.passed

## 13. Consideraciones de seguridad

- Nunca confiar en claims del frontend sin validación.
- No exponer políticas internas en detalle completo al cliente.
- Rotar sesiones y revocar en cambios críticos de rol.
- Registrar intentos fallidos y patrones anómalos.
