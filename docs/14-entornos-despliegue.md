# Documento de entornos y despliegue

## 1. Objetivo

Definir ambientes, configuración, bindings, despliegue, migraciones, smoke tests, rollback y consideraciones operativas.

## 2. Entornos

- local
- dev
- staging
- prod

## 3. Principios

1. Config por entorno aislada.
2. Secrets separados.
3. Infra declarativa/versionada.
4. Migraciones controladas.
5. Despliegues repetibles.
6. Smoke tests post-deploy.

## 4. Apps desplegables

- admin-web
- tenant-web
- api-gateway
- worker-identity
- worker-billing
- worker-files
- worker-rag
- worker-basic-assistant
- worker-advanced-agent
- worker-automation
- worker-export-import
- worker-observability
- worker-channel-ingress
- durable-objects

## 5. Bindings típicos

Por worker, según necesidad:
- D1
- R2
- KV
- Durable Objects
- Vectorize
- AI Gateway
- Secrets
- Service Bindings a otros workers

## 6. Wrangler structure sugerida

- `wrangler/common/`
- `wrangler/dev/`
- `wrangler/staging/`
- `wrangler/prod/`

## 7. Variables/configuración

Separar:
- variables no sensibles
- secrets
- feature flags
- IDs de recursos por entorno

## 8. Migraciones

## 8.1 D1
- migraciones versionadas
- forward-only preferente
- script de seed no productivo separado

## 8.2 R2/KV/Vectorize
- naming convention consistente
- bootstrap scripts
- validación post-creación

## 9. Pipeline de despliegue

1. lint
2. typecheck
3. tests unitarios
4. tests de integración
5. build
6. apply migrations seguras
7. deploy workers/pages
8. smoke tests
9. monitoreo reforzado post-release

## 10. Estrategia de promoción

- local -> dev
- dev -> staging
- staging -> prod

No promover sin:
- smoke tests verdes
- migraciones verificadas
- bindings correctos
- secrets presentes

## 11. Smoke tests mínimos

- login
- tenant resolution
- assistant chat
- agent run start
- rag upload metadata
- billing usage read
- audit endpoint read
- export validate

## 12. Rollback

### Frontends
- revert deploy a versión previa

### Workers
- redeploy versión anterior conocida

### Migraciones D1
- preferir migraciones compatibles
- si no es reversible, usar compensación o plan de recovery
- backups/export previos en cambios críticos

## 13. Estrategia de release

- cambios pequeños y frecuentes
- feature flags para módulos sensibles
- despliegue progresivo cuando aplique
- monitoreo intensivo en releases de IA/billing

## 14. Entorno local

Debe permitir:
- emulación razonable de workers
- D1 local
- KV/DO simulados cuando aplique
- seeds de demo
- datos sintéticos

## 15. Staging

Debe ser lo más parecido a prod posible:
- mismos contratos
- mismas migraciones
- secrets separados
- datos no productivos

## 16. Producción

Requisitos:
- bindings productivos validados
- observabilidad activa
- alertas activas
- acceso administrativo restringido
- runbooks actualizados

## 17. Documentación asociada

- runbooks
- ADRs
- changelog
- inventario de bindings
