# Documento de orquestación IA y políticas de IA

## 1. Objetivo

Definir cómo la plataforma decide entre la capa básica y la capa avanzada, y fijar políticas de IA sobre prompts, tools, seguridad, grounding, costos y comportamiento.

## 2. Capas de IA

## 2.1 Capa básica
Tecnología:
- Vercel AI SDK

Uso:
- chat conversacional
- RAG simple
- baja latencia
- tool calling básico
- UX streaming

## 2.2 Capa avanzada
Tecnología:
- LangGraph.js
- LangSmith

Uso:
- agentes complejos
- multi-step
- HITL
- flujos sensibles
- durable execution

## 3. Orquestador

Responsable de:
- clasificar la tarea
- enrutar a basic o advanced
- registrar decisión
- minimizar latencia
- respetar límites y features del plan

## 4. Criterios de routing

### Basic si:
- pregunta/respuesta simple
- retrieval simple
- no requiere múltiples tools
- no requiere checkpoints complejos
- no requiere aprobación humana
- costo y latencia deben ser mínimos

### Advanced si:
- proceso multietapa
- herramientas múltiples
- operación sensible
- necesita durable execution
- necesita HITL
- necesita branching o retry inteligente

## 5. Scoring sugerido

Variables:
- complexity_score
- sensitivity_score
- tool_count_expected
- retrieval_depth
- requires_human_review
- plan_supports_advanced
- latency_budget_ms

Regla simple:
- si `requires_human_review = true` => Advanced
- si `tool_count_expected > 1` => Advanced
- si `complexity_score >= threshold` => Advanced
- si plan no soporta advanced => Basic o reject/degrade

## 6. Políticas de IA globales

1. No mezclar datos entre tenants.
2. No inventar acceso a fuentes no disponibles.
3. No ejecutar tools no autorizadas.
4. Respetar límites de plan.
5. Persistir trazabilidad de decisiones.
6. Minimizar exposición de PII.
7. Favorecer grounding vía RAG cuando aplique.
8. Escalar a HITL si la operación lo requiere.

## 7. Prompt policy

Cada asistente/agente debe tener:
- system prompt base
- prompt profile del tenant
- reglas de tono/objetivo
- límites de herramientas
- instrucciones de grounding
- instrucciones de privacidad

## 8. Tool policy

Tools clasificadas en:
- lectura segura
- lectura sensible
- escritura segura
- escritura sensible

Reglas:
- basic usa solo tools permitidas de baja criticidad
- advanced puede usar más tools, con políticas y posiblemente HITL
- ninguna tool se habilita solo por estar implementada

## 9. Grounding policy

- usar RAG cuando la respuesta dependa de conocimiento del tenant
- si no hay suficiente contexto, responder incertidumbre controlada
- no afirmar datos no soportados

## 10. Cost policy

- basic preferido para ahorro en tareas simples
- advanced reservado para valor real
- cache cuando tenga sentido
- registrar costos por ejecución

## 11. Safety policy operativa

- bloquear acciones peligrosas no autorizadas
- exigir aprobación humana en acciones sensibles
- validar outputs estructurados
- filtrar input adversarial/prompt injection en lo posible

## 12. Política de fallback

### Caso 1: advanced no disponible
- degradar a basic solo si la tarea lo permite
- de lo contrario retornar estado pendiente/error controlado

### Caso 2: rag vacío
- informar ausencia de soporte documental
- no inventar respuesta documental

### Caso 3: tool falla
- retry controlado
- fallback
- escalar a HITL si corresponde

## 13. Política de observabilidad IA

Registrar:
- engine elegido
- motivo de routing
- modelo
- tokens
- tools usadas
- checkpoints
- fallos
- trace_id correlacionado

## 14. Política de masking

En prompts/traces:
- evitar exponer secretos
- mascar PII cuando sea posible
- limitar contenido documental sensible

## 15. Ejemplos de routing

### Pregunta de stock
Basic

### Flujo de aprobación comercial con varias validaciones
Advanced

### Revisión de caso con intervención humana
Advanced

### FAQ interna con documentos
Basic

## 16. Acceptance criteria

1. Toda ejecución conoce su engine.
2. Toda decisión del orquestador es auditable.
3. Toda operación avanzada puede persistir estado.
4. Ninguna task simple usa advanced innecesariamente por defecto.
