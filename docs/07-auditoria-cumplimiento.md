# Documento de auditoría y cumplimiento

## 1. Objetivo

Definir la estrategia de auditoría inmutable y cumplimiento para la plataforma, incluyendo eventos auditables, acceso a auditoría, retención, export regulatorio, separación entre auditoría técnica y de negocio, y soporte para obligaciones de privacidad.

## 2. Principios

1. Auditoría append-only.
2. Toda acción sensible queda registrada.
3. La auditoría debe ser consultable por trace_id.
4. La auditoría no debe exponer más datos de los necesarios.
5. Los tenants solo ven su propia auditoría.
6. Thinka puede operar auditoría global solo desde contexto ADMIN.
7. El sistema debe facilitar exportación regulatoria.

## 3. Qué se audita

## 3.1 Gestión de acceso
- inicios de sesión exitosos
- inicios de sesión fallidos
- cambios de contraseña/sesión
- asignación y revocación de roles
- cambios de permisos y políticas

## 3.2 Gestión del tenant
- creación/actualización/suspensión/reactivación
- cambio de plan
- actualización de settings
- cambios de branding o canales

## 3.3 IA y automatización
- creación/edición/eliminación de assistants/agents/automations
- ejecuciones críticas
- aprobaciones HITL
- uso de tools sensibles
- fallos relevantes

## 3.4 RAG y documentos
- subida/eliminación de fuentes
- indexación/reindexación
- exportación de manifest RAG
- accesos/descargas de documentos sensibles

## 3.5 Billing
- ajustes manuales
- overages aplicados
- bloqueos/cortes de servicio
- cambios de límites

## 3.6 Export/import
- solicitud, validación, ejecución y resultado
- hash o referencia del artefacto generado
- actor y tenant asociado

## 4. Estructura mínima del evento auditado

- audit_event_id
- tenant_id nullable
- actor_user_id nullable
- actor_role_code
- action
- resource_type
- resource_id
- trace_id
- occurred_at
- result
- metadata_json

## 5. Inmutabilidad

Requisitos:
- registros append-only
- sin updates destructivos sobre eventos ya escritos
- correcciones solo vía eventos compensatorios
- controles de acceso estrictos de lectura

## 6. Separación de auditoría y logs

- **Auditoría**: orientada a evidencia, cumplimiento y cambios relevantes.
- **Logs**: orientados a troubleshooting técnico.

Un mismo hecho puede producir ambos, pero no son equivalentes.

## 7. Acceso a auditoría

## 7.1 ADMIN
- acceso global
- filtros por tenant, rango, evento, recurso, actor, trace_id

## 7.2 MANAGER
- acceso solo al tenant propio
- visibilidad según política de plan y sensibilidad

## 7.3 CLIENT / VIEWER
- acceso resumido o nulo, según política

## 8. Casos regulatorios soportados

- solicitud de exportación de datos
- trazabilidad de acceso/cambio
- reconstrucción de incidente
- evidencia de enforcement de autorización
- soporte para borrado lógico y bloqueo
- soporte para derechos del titular de datos

## 9. Exportación regulatoria

Debe poder generarse un paquete que incluya:
- eventos auditables relacionados al tenant
- acciones sobre usuarios y recursos
- historial de export/import
- referencias a solicitudes de eliminación o bloqueo

Debe excluir:
- secretos
- trazas no pertinentes
- datos de otros tenants

## 10. Retención

Recomendación:
- auditoría crítica: larga retención
- auditoría operativa: según plan/política
- exportaciones regulatorias: conservar evidencia de generación

## 11. Clasificación de eventos

### Críticos
- cambios de plan
- revocaciones críticas
- exports/imports
- accesos administrativos globales
- aprobaciones HITL sensibles
- cortes de servicio

### Altos
- cambios en agentes/automatizaciones
- cambios en RAG
- reasignación de roles

### Medios
- cambios de branding/settings
- eventos de consulta

## 12. Borrado y supresión

La auditoría debe mantenerse conforme a la política legal y contractual. Cuando el recurso base se elimina lógicamente:
- la auditoría conserva referencia,
- los metadatos sensibles pueden minimizarse o pseudonimizarse según política,
- nunca debe romperse la integridad del historial.

## 13. Cadena de custodia lógica

Para incidentes:
1. identificar trace_id,
2. obtener AuditEvent relacionados,
3. correlacionar con logs y LangSmith si aplica,
4. reconstruir secuencia de actor, recurso, acción y resultado.

## 14. Consultas mínimas

- auditoría por trace_id
- auditoría por recurso
- auditoría por actor
- auditoría por tipo de evento
- auditoría por rango temporal

## 15. Controles

- autorización fuerte para lectura
- masking donde corresponda
- trazabilidad del propio acceso a auditoría
- exportación auditada
