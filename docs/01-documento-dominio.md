# Documento de dominio

## 1. Propósito

Este documento define el dominio funcional y técnico de la plataforma SaaS multi-tenant de Thinka para asistentes conversacionales, agentes, automatizaciones y RAG sobre Cloudflare. Su objetivo es fijar un lenguaje ubicuo común para producto, ingeniería, seguridad, operaciones, billing y soporte.

## 2. Visión del dominio

La plataforma permite a empresas (tenants) operar asistentes, chatbots, agentes y automatizaciones con dos capas de ejecución:

- **Capa básica**: asistentes conversacionales, RAG, contexto y tool calling básico.
- **Capa avanzada**: agentes complejos, multi-step, human-in-the-loop, tool calling sofisticado y flujos sensibles.

La plataforma es **multi-tenant**, con aislamiento estricto de datos, memoria, historial, configuraciones, auditoría y consumo entre tenants.

## 3. Principios del dominio

1. Ningún dato de un tenant puede mezclarse con el de otro.
2. Todo recurso pertenece a un tenant, salvo recursos globales administrados por Thinka.
3. Toda acción relevante es trazable y auditable.
4. Todo consumo medible impacta billing o monitoreo.
5. Toda decisión de IA debe poder explicarse operacionalmente.
6. La memoria y el RAG son activos críticos del tenant y deben persistirse y aislarse.
7. Los límites de plan son reglas de negocio duras, no solo métricas decorativas.

## 4. Bounded contexts

## 4.1 Tenant Management
Responsable de:
- alta y baja de tenants,
- estado del tenant,
- branding,
- configuración general,
- asociación a plan,
- export/import de configuración.

Entidades principales:
- Tenant
- TenantSettings
- TenantBranding
- TenantPlanAssignment

## 4.2 Identity & Access
Responsable de:
- autenticación,
- sesiones,
- usuarios,
- roles,
- permisos,
- políticas RBAC/ABAC.

Entidades principales:
- User
- Role
- Permission
- Policy
- Session

## 4.3 Billing & Metering
Responsable de:
- definición de planes,
- límites,
- cuotas,
- medición de consumo,
- overage,
- corte/degradación.

Entidades principales:
- PlanDefinition
- PlanLimit
- BillingPeriod
- UsageLedger
- OveragePolicy

## 4.4 Assistants
Responsable de:
- asistentes básicos,
- prompts base,
- reglas,
- canales,
- historial simple,
- consultas RAG.

Entidades principales:
- Assistant
- AssistantConfig
- AssistantPromptProfile

## 4.5 Agents
Responsable de:
- agentes avanzados,
- grafos,
- tools,
- checkpoints,
- HITL,
- trazas LangSmith.

Entidades principales:
- Agent
- AgentGraph
- AgentToolBinding
- AgentExecution

## 4.6 Automations
Responsable de:
- triggers,
- reglas,
- workflows,
- programaciones,
- reintentos,
- fallbacks.

Entidades principales:
- Automation
- Trigger
- AutomationRun
- Schedule

## 4.7 Conversations & Memory
Responsable de:
- conversaciones,
- mensajes,
- memoria de corto plazo,
- checkpoints,
- historiales por canal,
- resúmenes.

Entidades principales:
- Conversation
- Message
- Checkpoint
- ConversationSummary
- SessionState

## 4.8 Knowledge & RAG
Responsable de:
- documentos,
- fuentes,
- indexación,
- embeddings,
- retrieval,
- metadata por tenant.

Entidades principales:
- RagSource
- RagDocument
- RagChunkManifest
- VectorReference

## 4.9 Audit & Observability
Responsable de:
- trazabilidad,
- métricas,
- logs,
- auditoría append-only,
- incidentes operacionales.

Entidades principales:
- Trace
- AuditEvent
- MetricSample
- SecurityEvent

## 5. Lenguaje ubicuo

## 5.1 Tenant
Empresa o cliente lógico de la plataforma. Es la unidad principal de aislamiento, configuración, billing y seguridad.

## 5.2 Plan
Contrato funcional y comercial que define límites, features, políticas de overage y disponibilidad de capacidades.

## 5.3 Límite
Restricción medible aplicada por plan, por tenant o por usuario. Ejemplos: usuarios máximos, tokens máximos, horas de uso, agentes activos, almacenamiento RAG.

## 5.4 Usuario
Persona autenticada que opera en nombre propio dentro de un tenant o como operador global de Thinka.

## 5.5 Rol
Agrupación de permisos. Ejemplos: ADMIN, MANAGER, CLIENT, VIEWER, DEMO.

## 5.6 Permiso
Capacidad concreta sobre recurso y acción, por ejemplo `assistant:create`, `billing:read`, `rag:reindex`.

## 5.7 Política ABAC
Regla adicional que evalúa contexto, atributos y restricciones como `tenant_id`, ownership, plan, estado del tenant, tipo de recurso y criticidad.

## 5.8 Asistente
Recurso de capa básica orientado a conversación, RAG y tareas simples con baja latencia.

## 5.9 Agente
Recurso de capa avanzada que puede ejecutar grafos, herramientas, branching, checkpoints y procesos sensibles.

## 5.10 Automatización
Flujo gatillado por evento, horario, webhook o condición, que ejecuta acciones o delega en asistentes/agentes.

## 5.11 Conversación
Unidad lógica de interacción entre actor humano/canal y sistema de IA, asociada a tenant, usuario, canal y motor.

## 5.12 Checkpoint
Snapshot persistido del estado de un agente o flujo conversacional, necesario para durable execution y reanudación.

## 5.13 Fuente RAG
Documento, dataset o conector de conocimiento incorporado al índice del tenant.

## 5.14 Manifest RAG
Listado estructurado de fuentes asociadas al tenant exportable a JSON sin incluir el contenido completo ni embeddings.

## 5.15 Consumo facturable
Uso que impacta métricas, límites o costos: tokens, embeddings, almacenamiento, invocaciones, tiempo de ejecución, mensajes, automatizaciones.

## 5.16 Trace ID
Identificador de correlación transversal entre frontends, gateway, servicios, tools, auditoría y observabilidad.

## 6. Roles del dominio

## 6.1 ADMIN
Operador global Thinka. Puede administrar todos los tenants, planes, usos, auditorías y configuraciones.

## 6.2 MANAGER
Administrador del tenant. Puede gestionar recursos dentro de su tenant bajo límites del plan.

## 6.3 CLIENT
Usuario operativo del tenant con permisos delegados por el MANAGER.

## 6.4 VIEWER
Usuario de solo lectura.

## 6.5 DEMO
Usuario con experiencia limitada de prueba gratuita.

## 7. Casos de uso núcleo

1. Alta de tenant y asignación de plan.
2. Alta de usuarios del tenant.
3. Creación de asistentes básicos.
4. Creación de agentes avanzados.
5. Ingesta documental al RAG.
6. Conversación por webchat o webhook.
7. Ejecución de automatización.
8. Consulta de métricas, trazas y auditoría.
9. Exportación/importación de configuración JSON.
10. Aplicación de límites y overage.

## 8. Reglas invariantes

1. Todo recurso tenant-scoped debe tener `tenant_id`.
2. Ninguna búsqueda vectorial se ejecuta sin filtro de tenant.
3. Ninguna conversación se persiste sin referencia a tenant y canal.
4. Ningún usuario crea recursos fuera de su ámbito autorizado.
5. Ninguna operación sensible ocurre sin traza y auditoría.
6. Ningún servicio de IA se ejecuta si el plan lo bloquea.
7. Ninguna exportación incluye secretos en texto plano.
8. Ningún checkpoint puede restaurarse cruzando tenants.

## 9. Agregados sugeridos

- **Tenant Aggregate**: Tenant, settings, branding, plan assignment.
- **User Access Aggregate**: User, role assignments, policies.
- **Assistant Aggregate**: assistant config, prompt profile, channel bindings.
- **Agent Aggregate**: graph config, tools, policy profile.
- **Conversation Aggregate**: conversation, messages, summaries.
- **Rag Aggregate**: source, metadata, indexing status.
- **Billing Aggregate**: plan, usage ledger, billing period.
- **Automation Aggregate**: trigger, workflow, run history.

## 10. Eventos de dominio principales

- TenantCreated
- TenantPlanAssigned
- UserInvited
- UserRoleAssigned
- AssistantCreated
- AgentCreated
- RagSourceUploaded
- RagSourceIndexed
- ConversationStarted
- MessagePersisted
- CheckpointSaved
- BillingLimitReached
- ServiceDegraded
- TenantExported
- TenantImported

## 11. Fuera de alcance del dominio base

- Marketplace público de agentes.
- Facturación tributaria local completa.
- CRM avanzado nativo.
- Entrenamiento de modelos propios.
- Multi-region active-active a nivel de negocio.

## 12. Criterios de consistencia

- Consistencia fuerte donde hay coordinación, límites o sesiones: Durable Objects / D1.
- Consistencia eventual donde aplique caché, observabilidad o recomputación.
- Idempotencia obligatoria en webhooks, automatizaciones y export/import.

## 13. Decisiones operativas que impactan dominio

- Doble frontend: Thinka Admin y Tenant Client.
- Monorepo modular con múltiples apps y packages.
- Orquestador central que decide capa básica o avanzada.
- Persistencia de checkpoints en D1 desde el inicio.
- Export/import JSON como respaldo contractual del tenant.
