# NFRs formales

## 1. Objetivo

Establecer requisitos no funcionales verificables para disponibilidad, rendimiento, seguridad, escalabilidad, operabilidad, trazabilidad, costo y mantenibilidad.

## 2. Disponibilidad

### NFR-AV-01
La plataforma debe diseñarse para alta disponibilidad operacional en producción.

### NFR-AV-02
Las funciones críticas de login, chat básico y lectura de tenant deben contar con monitoreo y alertas activas.

### NFR-AV-03
Debe existir estrategia de degradación controlada para funciones no críticas o intensivas.

## 3. Rendimiento

### NFR-RE-01
Las interacciones de capa básica deben optimizarse para latencia baja.

### NFR-RE-02
Toda request debe registrar duración end-to-end.

### NFR-RE-03
Las búsquedas RAG deben ser medibles y optimizables por tenant y por índice.

### NFR-RE-04
El sistema debe distinguir entre latencia de gateway, retrieval, modelo y persistencia.

## 4. Escalabilidad

### NFR-ES-01
La arquitectura debe soportar crecimiento en tenants, usuarios, conversaciones y documentos sin rediseño del dominio base.

### NFR-ES-02
Los servicios deben poder escalar lógicamente de forma independiente.

### NFR-ES-03
La estrategia shared/siloed debe permitir evolución de tenants enterprise.

## 5. Seguridad

### NFR-SE-01
Toda operación debe pasar por autenticación y autorización centralizadas o equivalentes.

### NFR-SE-02
El sistema debe impedir acceso cross-tenant por diseño y por pruebas.

### NFR-SE-03
Los secretos no deben almacenarse en repositorios ni logs.

### NFR-SE-04
Los endpoints sensibles deben aplicar protección adicional cuando corresponda.

## 6. Privacidad y cumplimiento

### NFR-PC-01
Los datos de un tenant no deben ser visibles por otro tenant.

### NFR-PC-02
Debe existir trazabilidad suficiente para responder solicitudes regulatorias y contractuales.

### NFR-PC-03
Las exportaciones de tenant deben excluir secretos y datos de terceros.

## 7. Auditabilidad

### NFR-AU-01
Toda acción sensible debe generar AuditEvent.

### NFR-AU-02
Toda request debe tener `trace_id`.

### NFR-AU-03
Toda ejecución avanzada debe correlacionarse con checkpoint o trace equivalente.

## 8. Observabilidad

### NFR-OB-01
Cada servicio debe emitir logs estructurados.

### NFR-OB-02
Deben existir dashboards globales y por tenant.

### NFR-OB-03
Los errores críticos deben disparar alertas.

## 9. Billing y metering

### NFR-BI-01
Todo uso facturable debe ser medible.

### NFR-BI-02
El enforcement de límites debe ocurrir antes de ejecutar operaciones costosas cuando sea posible.

### NFR-BI-03
Debe existir reconciliación entre uso near-real-time y ledger consolidado.

## 10. Mantenibilidad

### NFR-MA-01
El sistema debe organizarse en módulos y contratos claros.

### NFR-MA-02
Las reglas de negocio centrales deben estar separadas de adaptadores de infraestructura.

### NFR-MA-03
El código debe ser tipado y validado con esquemas en fronteras.

## 11. Testabilidad

### NFR-TE-01
Los contextos críticos deben ser testeables de forma aislada.

### NFR-TE-02
Debe haber pruebas de aislamiento multi-tenant.

### NFR-TE-03
Debe haber pruebas de permisos y límites.

### NFR-TE-04
Debe haber pruebas de import/export y RAG.

## 12. Resiliencia

### NFR-RS-01
Los flujos avanzados deben soportar reanudación mediante checkpoints.

### NFR-RS-02
Los webhooks y triggers deben ser idempotentes.

### NFR-RS-03
Los fallos parciales no deben corromper el estado del tenant.

## 13. Portabilidad lógica

### NFR-PO-01
La configuración del tenant debe poder exportarse/importarse por JSON versionado.

### NFR-PO-02
Las decisiones críticas de arquitectura deben documentarse y no depender de conocimiento tribal.

## 14. Costos

### NFR-CO-01
Toda ejecución IA debe producir señal de costo o consumo equivalente.

### NFR-CO-02
La plataforma debe favorecer capa básica para tareas simples.

### NFR-CO-03
Deben existir límites, alertas y overages configurables.

## 15. UX operativa

### NFR-UX-01
El usuario debe recibir mensajes claros cuando un límite o feature bloquea una acción.

### NFR-UX-02
El estado de indexing, import/export y runs debe ser visible.

### NFR-UX-03
Los administradores deben tener visibilidad clara de salud y consumo.

## 16. Criterios de aceptación globales

1. Todos los NFRs críticos tienen mecanismo de medición.
2. Los NFRs de aislamiento y autorización están cubiertos por tests.
3. Los NFRs de observabilidad están soportados por dashboards/alertas.
4. Los NFRs de billing están soportados por ledger y enforcement.
