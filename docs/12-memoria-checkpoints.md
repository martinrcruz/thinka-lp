# Documento de memoria y checkpoints

## 1. Objetivo

Definir la estrategia de memoria conversacional, resúmenes, checkpoints y durable execution de agentes, separando responsabilidades entre D1, Durable Objects y KV.

## 2. Principios

1. Checkpoints en D1 desde el día 1.
2. El historial conversacional es un activo del tenant.
3. DO coordina estado activo; D1 persiste verdad.
4. KV solo acelera; no es fuente de verdad.
5. Toda memoria está aislada por tenant.

## 3. Tipos de memoria

## 3.1 Historial
Lista de mensajes persistidos de una conversación.

## 3.2 Resumen
Compresión de conversación/hilo para ventanas largas.

## 3.3 Checkpoint
Snapshot del estado del agente/grafo por thread y paso.

## 3.4 Estado activo
Estado efímero en ejecución, coordinado por DO.

## 4. Ubicación por tecnología

## 4.1 D1
- messages
- conversations
- summaries
- checkpoints
- thread metadata

## 4.2 Durable Objects
- session locks
- current execution coordination
- websocket/session attached state
- per-thread in-flight state

## 4.3 KV
- caché de resumen reciente
- hints temporales
- last response reuse

## 5. Historial

Cada mensaje debe guardar:
- conversation_id
- tenant_id
- direction
- actor_type
- content
- model/tokens si aplica
- timestamp

## 6. Resúmenes

Generación:
- al superar umbral de mensajes
- al cerrar conversación
- por política del tenant

Objetivo:
- reducir contexto
- mantener continuidad
- mejorar costo y latencia

## 7. Checkpoints

Cada checkpoint debe incluir:
- tenant_id
- thread_id
- step_key
- state_json
- checkpoint_hash
- created_at
- related conversation/agent ids si aplica

## 8. Durable execution

Para agentes LangGraph:
- cargar checkpoint previo si existe
- guardar snapshot por paso importante
- permitir reanudar tras interrupción o HITL
- correlacionar con trace_id y LangSmith

## 9. Thread model

Todo agente avanzado debe operar sobre:
- `thread_id`
- `tenant_id`
- `agent_id`
- `conversation_id` opcionalmente vinculado

## 10. Reglas de aislamiento

- thread_id no basta; siempre combinar con tenant_id
- ningún restore cruzado entre tenants
- ningún DO comparte memoria entre tenants sin key scoping estricto

## 11. Estrategia de compactación

- checkpoints antiguos pueden compactarse
- conservar hitos relevantes
- mantener los últimos N completos
- preservar checkpoints asociados a incidentes o auditorías

## 12. Failure recovery

Si una ejecución cae:
1. cargar último checkpoint consistente
2. verificar step_key y version
3. reintentar o quedar pendiente de intervención

## 13. Casos HITL

Cuando se requiere aprobación humana:
- persistir checkpoint antes de la pausa
- registrar estado `waiting_human_approval`
- reanudar con el mismo thread_id

## 14. CloudflareD1MessageHistory

Usar como historial base de conversaciones cuando aplique, integrándolo con el modelo de conversación del sistema y scoping tenant.

## 15. Métricas

- checkpoint save latency
- checkpoint restore latency
- summary generation count
- context load time
- resumptions count
- lost-state incidents

## 16. Consideraciones de seguridad

- no guardar secretos innecesarios en state_json
- masking si el checkpoint podría contener PII
- acceso restringido a lectura de checkpoints

## 17. Retención

- mensajes: según política
- resúmenes: medio/largo plazo
- checkpoints: configurable según plan y criticidad

## 18. Acceptance criteria

1. Todo agente avanzado puede reanudarse.
2. Toda conversación conserva continuidad.
3. Todo checkpoint tiene tenant affinity.
4. No se depende de KV para verdad crítica.
