# Especificación del JSON export/import

## 1. Objetivo

Definir el formato JSON versionado para exportar e importar la configuración completa de un tenant, excluyendo contenido extenso y secretos, e incluyendo manifiestos de RAG y metadatos necesarios para restauración.

## 2. Principios

1. Tenant-scoped.
2. Versionado explícito.
3. No incluir secretos.
4. No incluir blobs extensos.
5. Incluir referencias completas a fuentes RAG.
6. Validación estricta antes de importar.
7. Soporte para modos `validate_only`, `merge`, `replace_safe`.

## 3. Alcance de exportación

Incluir:
- tenant
- branding
- settings
- roles tenant-scoped
- permisos y policies tenant-scoped
- usuarios exportables según política
- assistants
- agents
- automations
- channel integrations
- plan assignment y overrides
- features y límites
- RAG manifest (lista de fuentes)
- metadata de export

Excluir:
- secretos
- access tokens
- refresh tokens
- documentos binarios
- chunks
- embeddings
- historiales extensos salvo que se habilite un modo especial
- logs crudos

## 4. Estructura de alto nivel

```json
{
  "schema_version": "1.0.0",
  "exported_at": "2026-04-16T20:00:00Z",
  "exported_by": {
    "user_id": "usr_admin_1",
    "role_code": "MANAGER"
  },
  "tenant": {},
  "branding": {},
  "settings": {},
  "plan_assignment": {},
  "roles": [],
  "permissions": [],
  "policies": [],
  "users": [],
  "assistants": [],
  "agents": [],
  "automations": [],
  "channels": [],
  "rag_manifest": [],
  "metadata": {}
}
```

## 5. Sección tenant

```json
{
  "id": "ten_1",
  "code": "thinka-demo",
  "name": "Thinka Demo",
  "status": "active"
}
```

## 6. Sección roles/policies

Incluir:
- roles custom del tenant
- permissions referenciadas por code
- policies ABAC serializadas

## 7. Sección users

Se recomienda permitir modos:
- `exclude_users`
- `include_users_without_credentials`
- `include_users_minimal`

Nunca exportar:
- passwords
- refresh tokens
- session tokens

## 8. Sección assistants/agents

Incluir:
- config funcional
- flags
- prompts base o referencias a prompt profile
- tools declaradas (sin secretos embebidos)
- políticas de ejecución

## 9. Sección automations

Incluir:
- trigger definitions
- workflows
- retry policies
- target bindings
- estados deseados

## 10. Sección channels

Incluir:
- tipo de canal
- metadata no secreta
- flags
- mapping de tenant

Excluir:
- secrets o tokens del proveedor

## 11. Sección rag_manifest

Cada entrada debe incluir:
- source_id
- display_name
- source_type
- mime_type
- file_hash si existe
- tags
- indexed_status
- original_upload_timestamp
- notes

Ejemplo:
```json
{
  "source_id": "src_1",
  "display_name": "dossier_thinka.pdf",
  "source_type": "file",
  "mime_type": "application/pdf",
  "file_hash": "sha256:abc",
  "indexed_status": "indexed"
}
```

## 12. Modos de importación

## 12.1 validate_only
No persiste. Solo valida esquema, referencias, conflictos y límites.

## 12.2 merge
Fusiona con recursos existentes según reglas.

## 12.3 replace_safe
Reemplaza configuración lógica segura, conservando integridad y respetando exclusiones.

## 13. Reglas de conflicto

- roles: match por code
- assistants: match por id o key lógica
- agents: match por id o graph key
- automations: match por id o nombre+tipo si política lo permite
- rag_manifest: nunca intenta reinsertar binarios; solo registra pendientes

## 14. Validaciones mínimas

- schema_version soportada
- tenant code coherente
- roles válidos
- referencias de permisos existentes
- plan compatible
- features disponibles
- no exceder límites en import final si la política lo exige

## 15. Seguridad

- toda importación requiere permiso explícito
- export/import auditado
- reautenticación para operaciones sensibles si la política lo requiere
- jamás persistir secretos venidos del JSON si la política los prohíbe

## 16. JSON Schema lógico resumido

```json
{
  "type": "object",
  "required": ["schema_version", "tenant", "settings", "rag_manifest"],
  "properties": {
    "schema_version": { "type": "string" },
    "tenant": { "type": "object" },
    "branding": { "type": "object" },
    "settings": { "type": "object" },
    "plan_assignment": { "type": "object" },
    "roles": { "type": "array" },
    "policies": { "type": "array" },
    "users": { "type": "array" },
    "assistants": { "type": "array" },
    "agents": { "type": "array" },
    "automations": { "type": "array" },
    "channels": { "type": "array" },
    "rag_manifest": { "type": "array" }
  }
}
```

## 17. Compatibilidad futura

- usar migradores por versión
- documentar campos deprecated
- tolerar campos adicionales no críticos
