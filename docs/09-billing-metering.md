# Documento de billing y metering

## 1. Objetivo

Definir cómo se modelan planes, límites, medición de uso, overage, corte de servicio, degradación, ledger y reglas comerciales/técnicas del sistema.

## 2. Planes

- Basic
- Pro
- Pyme (custom)
- Enterprise (custom)

## 3. Variables de un plan

- max_users
- max_agents
- max_assistants
- max_automations
- max_rag_sources
- max_rag_storage_mb
- max_tokens_period
- max_tokens_per_user_period
- max_daily_runtime_seconds
- max_conversations_period
- enabled_features[]
- overage_enabled
- cutoff_policy
- degrade_policy

## 4. Features posibles

- advanced_agents
- custom_roles
- external_channels
- hitl
- export_import
- advanced_observability
- tenant_custom_branding
- custom_tools
- dedicated_support
- siloed_tenant_mode

## 5. Meters

## 5.1 User count
Cantidad de usuarios activos.

## 5.2 Assistant count
Cantidad de asistentes creados/activos.

## 5.3 Agent count
Cantidad de agentes creados/activos.

## 5.4 Automation count
Cantidad de automatizaciones activas.

## 5.5 Token usage
Suma de input/output tokens por período.

## 5.6 Runtime usage
Segundos de ejecución de agentes/automatizaciones.

## 5.7 Conversation usage
Conversaciones iniciadas o mensajes, según política.

## 5.8 RAG storage
Megabytes o bytes lógicos de fuentes/documentos.

## 5.9 Embedding usage
Volumen de embeddings generados.

## 5.10 Tool invocation usage
Llamadas a tools externas o sensibles.

## 6. Ledger de uso

Cada consumo se registra en `BillingUsageLedger` con:
- tenant_id
- user_id opcional
- metric_code
- quantity
- unit_cost
- total_cost
- billing_period
- trace_id
- resource_type
- created_at

## 7. Periodicidad

Posibles periodizaciones:
- diaria
- mensual
- rolling window
- por conversación
- por ejecución

Recomendación base:
- mensual para contratos y límites generales
- diario para alertas y runtime
- por ejecución para costos IA finos

## 8. Límites

## 8.1 Soft limit
Umbral de alerta y aviso.

## 8.2 Hard limit
Umbral de bloqueo o degradación.

## 8.3 Override
Excepción manual por ADMIN o contrato custom.

## 9. Overage

Se aplica cuando:
- el plan lo permite
- el recurso es overageable
- existe tarifa definida

Ejemplos:
- tokens extra
- almacenamiento extra
- automatizaciones extra

## 10. Cutoff vs degradación

### Cutoff
Bloqueo de la operación.
Ejemplo: no permitir crear más usuarios.

### Degradación
Permitir operación reducida.
Ejemplo:
- deshabilitar capa avanzada
- limitar nuevos documentos
- limitar webhooks externos

## 11. Reglas por rol

- ADMIN puede ajustar/override
- MANAGER puede ver consumo y alertas
- CLIENT/VIEWER solo consumo resumido si aplica

## 12. Reglas por operación

### Crear usuario
Validar `current_active_users + 1 <= max_users`

### Crear agente
Validar feature `advanced_agents` y límite `max_agents`

### Ejecutar flujo
Validar runtime y límites diarios/mensuales

### Ingestar documento
Validar storage restante y `max_rag_sources`

## 13. Alertas de consumo

- 50%
- 80%
- 90%
- 100%
- overage en curso

## 14. Ejemplo de definición de plan JSON

```json
{
  "version": "1.0.0",
  "code": "pro",
  "name": "Plan Pro",
  "is_custom": false,
  "features": [
    "advanced_agents",
    "external_channels",
    "export_import"
  ],
  "limits": {
    "max_users": 10,
    "max_agents": 5,
    "max_assistants": 10,
    "max_automations": 20,
    "max_rag_sources": 100,
    "max_rag_storage_mb": 2048,
    "max_tokens_period": 2000000
  },
  "overage": {
    "enabled": true,
    "rates": {
      "tokens.extra_per_1k": 0.02
    }
  }
}
```

## 15. Conciliación de uso

Requisitos:
- uso near-real-time para enforcement
- uso consolidado para billing formal
- deduplicación por trace_id/idempotency key si es necesario
- posibilidad de compensación ante errores

## 16. Correcciones manuales

ADMIN puede:
- acreditar uso
- anular ledger entries mediante evento compensatorio
- ampliar límites temporalmente

Nunca debe:
- borrar ledger histórico de forma destructiva

## 17. Reportes mínimos

- consumo por tenant
- consumo por usuario
- consumo por motor basic/advanced
- consumo por tipo de métrica
- top costos
- tenants en riesgo de límite

## 18. Casos custom Pyme/Enterprise

- límites definidos por reunión comercial
- plan exportable/importable como JSON
- overrides estructurados
- features y políticas contractuales especiales

## 19. Requisitos de auditoría

Auditar:
- cambios de plan
- cambios de límite
- overages
- cutoff/degradación
- ajustes manuales
