# Documento de seguridad

## 1. Objetivo

Definir la postura de seguridad del sistema, amenazas relevantes, controles técnicos, reglas de hardening y principios de seguridad para la plataforma SaaS multi-tenant.

## 2. Principios

1. Zero Trust.
2. Least privilege.
3. Defense in depth.
4. Secure by default.
5. Tenant isolation first.
6. Secrets nunca en texto plano.
7. Toda operación sensible requiere trazabilidad.

## 3. Amenazas principales

- Broken access control
- Cross-tenant data exposure
- Prompt injection
- Tool abuse
- Webhook forgery
- SSRF vía tools externas
- Exfiltración mediante export/import
- Uso abusivo de recursos IA
- Replay e idempotency abuse
- Secrets leakage
- Malicious document uploads
- Session hijacking

## 4. Controles base

## 4.1 Perímetro
- WAF
- rate limiting
- bot protection
- validación de dominios y custom hostnames controlados

## 4.2 AuthN
- proveedor confiable o auth in-house endurecida
- expiración corta de access tokens
- refresh tokens con revocación
- MFA para operaciones críticas si se implementa

## 4.3 AuthZ
- RBAC + ABAC
- tenant_id obligatorio
- controles de ownership y feature flags

## 4.4 Datos
- prepared statements
- validación Zod
- cifrado lógico de campos sensibles
- separación D1/R2/KV/Vectorize con reglas

## 4.5 IA
- system prompts con reglas de no fuga
- tool allowlists
- input sanitization
- human-in-the-loop para flujos sensibles
- no exponer tools no autorizadas al modelo

## 5. Seguridad multi-tenant

### Reglas duras
1. Todo query con `tenant_id`.
2. Todo vector search con metadata filter.
3. Toda export/import scoped al tenant.
4. Toda memoria y checkpoint con tenant affinity.
5. Toda URL o key de R2 tenant-scoped.

### Pruebas obligatorias
- tests de aislamiento por endpoint
- tests de aislamiento por retrieval
- tests de aislamiento por export
- tests de aislamiento por cache key

## 6. Gestión de secretos

- usar bindings/secrets de plataforma
- nunca almacenar claves en repositorio
- rotación planificada
- segregación por entorno
- logs nunca deben mostrar secretos

## 7. Seguridad de webhooks

- validación de firma/HMAC
- idempotencia
- tolerancia a clock skew definida
- allowlist de proveedores cuando aplique
- rate limiting específico por endpoint
- auditoría de firmas inválidas

## 8. Seguridad de archivos

- validación de mime type
- validación de tamaño
- nombre lógico no confiable
- hash del archivo
- escaneo adicional si se incorpora
- no ejecutar contenido subido
- política para PDFs/documentos maliciosos

## 9. Seguridad RAG

- metadata de tenant obligatoria
- reindexaciones autorizadas
- acceso a documentos restringido
- retrieval limitado por contexto
- chunking no debe filtrar datos fuera del tenant

## 10. Seguridad de agentes y tools

- tools con permisos mínimos
- separar tools lectura vs escritura
- bloquear tools peligrosas por defecto
- aprobación humana para acciones críticas
- logs de tool-call con metadata
- sanitizar inputs hacia tools externas

## 11. Seguridad de sesiones

- access tokens de corta duración
- refresh tokens rotables
- invalidación en cambio de rol crítico
- logout server-side
- protección CSRF si aplica a cookies
- secure headers

## 12. OWASP alignment

Cubrir especialmente:
- Broken Access Control
- Cryptographic Failures
- Injection
- Security Misconfiguration
- Identification and Authentication Failures
- Vulnerable Components
- Logging and Monitoring Failures
- SSRF

## 13. Cabeceras y hardening HTTP

- Strict-Transport-Security
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- Cache-Control adecuado para contenido sensible

## 14. Gestión de dependencias

- lockfiles
- escaneo de dependencias
- actualización periódica
- revisión de componentes críticos
- pinning razonable en piezas sensibles

## 15. Respuesta a incidentes

Pasos mínimos:
1. detectar
2. contener
3. identificar trace_id/tenant/recurso
4. revocar accesos si aplica
5. preservar auditoría/logs
6. remediar
7. emitir postmortem

## 16. Seguridad en entornos

- dev con datos ficticios o minimizados
- staging sin secretos productivos
- prod aislado y con access controls
- bindings separados por entorno

## 17. Riesgos específicos de IA

- prompt injection
- context poisoning
- jailbreaks operativos
- PII leakage
- unsafe tool sequencing
- hallucinated actions

Mitigaciones:
- policies de tool access
- prompts defensivos
- validación de outputs estructurados
- revisión humana
- constraints por plan/recurso
