# Documento de observabilidad

## 1. Objetivo

Definir la estrategia de observabilidad de la plataforma para debugging, operación, soporte, optimización de costos y seguimiento de agentes, incluyendo logs, métricas, traces, dashboards y alertas.

## 2. Objetivos operativos

- detectar fallos rápidamente,
- seguir una request end-to-end con `trace_id`,
- medir latencia, errores y consumo,
- diagnosticar agentes complejos con LangSmith,
- identificar abuso, degradaciones y límites alcanzados.

## 3. Pilares

1. Logs estructurados
2. Métricas
3. Tracing
4. Auditoría técnica y de negocio
5. Observabilidad IA

## 4. Correlación

Toda request debe llevar:
- `trace_id`
- `tenant_id`
- `user_id` cuando exista
- `conversation_id`/`thread_id` si aplica
- `service_name`
- `operation_name`

## 5. Estructura de log recomendada

```json
{
  "timestamp": "2026-04-16T20:00:00Z",
  "level": "INFO",
  "service": "api-gateway",
  "operation": "assistant.chat",
  "trace_id": "trc_123",
  "tenant_id": "ten_1",
  "user_id": "usr_1",
  "conversation_id": "conv_1",
  "duration_ms": 142,
  "status": "ok",
  "message": "Assistant chat completed",
  "metadata": {
    "engine": "basic",
    "assistant_id": "asst_1"
  }
}
```

## 6. Qué se debe medir

## 6.1 Gateway
- request_count
- error_rate
- p50/p95/p99 latency
- auth_failures
- tenant_resolution_failures
- limit_enforcement_blocks

## 6.2 Basic Assistant
- chats_started
- chats_completed
- cache_hit_rate
- rag_lookup_latency
- model_latency
- input_tokens
- output_tokens
- cost_per_chat

## 6.3 Advanced Agent
- runs_started
- runs_completed
- runs_failed
- checkpoint_count
- hitl_required_count
- tool_call_count
- average_steps_per_run
- run_duration_ms
- cost_per_run

## 6.4 RAG
- documents_uploaded
- indexing_duration_ms
- indexing_failures
- search_count
- retrieval_latency_ms
- avg_chunks_returned

## 6.5 Billing
- usage_records_written
- overage_events
- hard_limit_blocks
- degraded_service_events

## 6.6 Export / Import
- exports_started
- exports_completed
- imports_validated
- imports_failed

## 7. Dashboards recomendados

## 7.1 Dashboard global Thinka
- salud global
- top tenants por consumo
- top errores
- latencia por servicio
- uso IA total
- tenants cerca de límite
- fallos de indexación RAG
- agent failures

## 7.2 Dashboard por tenant
- conversaciones
- consumo tokens
- uso por usuario
- agentes activos
- automatizaciones fallidas
- fuentes RAG indexadas
- límites actuales y proyectados

## 7.3 Dashboard de seguridad
- accesos denegados
- anomalías
- webhooks inválidos
- exports sensibles
- uso inusual por IP/tenant

## 8. Alertas

## 8.1 Severidad crítica
- gateway unavailable
- billing hard block masivo
- cross-tenant anomaly sospechosa
- export/import corruption
- failure rate alta sostenida
- D1 errors persistentes
- RAG indexing global caída

## 8.2 Alta
- p95 latencia > umbral
- agent run failures > umbral
- webhook signature failures > umbral
- cache hit rate cae abruptamente
- tenant premium sin respuesta IA

## 8.3 Media
- tenant cercano al 80% de cuota
- import validation warnings
- automation retries crecientes

## 9. LangSmith

Aplicar a capa avanzada:
- trazas completas por ejecución
- visibilidad de nodos
- inputs/outputs sanitizados
- time-to-step
- tool call tracing
- checkpoints correlacionados

Campos a correlacionar:
- trace_id interno
- langsmith_run_id
- tenant_id
- thread_id
- agent_id

## 10. Sanitización

No loggear:
- secretos
- tokens completos
- documentos completos
- datos personales innecesarios
- prompts con PII sin masking

Aplicar masking sobre:
- emails
- rut/teléfonos
- payloads sensibles
- contenidos exportables

## 11. Fuentes de observabilidad

- Workers logs
- Tail workers / real-time logs
- métricas agregadas propias
- LangSmith
- D1 analytics cuando aplique
- audit events

## 12. Runbooks mínimos relacionados

- investigar trace_id
- investigar agent failure
- investigar rag indexing failure
- investigar limit block
- investigar import failure

## 13. KPIs operacionales

- availability by service
- p95 latency by endpoint
- success rate by engine
- cost per tenant/day
- average retrieval latency
- average tokens per interaction
- mean time to detect
- mean time to recover

## 14. Retención sugerida

- logs operacionales crudos: corto/medio plazo
- métricas agregadas: medio/largo plazo
- auditoría técnica mínima: según política
- trazas críticas: retención más extensa

## 15. Criterios de aceptación

1. Toda request produce trace_id.
2. Toda ejecución IA registra costo aproximado o real.
3. Todo fallo importante se puede localizar por servicio.
4. Todo agente avanzado tiene correlación con LangSmith.
5. Se pueden construir dashboards globales y por tenant.
