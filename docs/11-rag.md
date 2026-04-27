# Documento de RAG

## 1. Objetivo

Definir la arquitectura y operación del subsistema RAG por tenant: ingesta, parsing, chunking, embeddings, indexación, retrieval, reindexación, seguridad y métricas.

## 2. Principios

1. RAG totalmente aislado por tenant.
2. Toda búsqueda filtra por metadata `tenant_id`.
3. Los binarios viven en R2, no en D1.
4. La metadata de fuentes vive en D1.
5. Los embeddings viven en Vectorize.
6. El manifiesto de fuentes es exportable.

## 3. Fuentes soportadas

- PDF
- DOC/DOCX si se implementa
- TXT/Markdown
- HTML controlado
- catálogos o datasets estructurados
- conectores futuros

## 4. Pipeline RAG

1. Upload del binario o referencia
2. Persistencia en R2
3. Creación de metadata en D1
4. Extracción de texto
5. Normalización/limpieza
6. Chunking
7. Embeddings
8. Indexación en Vectorize con metadata
9. Marcado de `indexing_status`

## 5. Chunking

Parámetros base sugeridos:
- chunk por tokens o caracteres
- overlap moderado
- preservar jerarquía cuando sea posible
- añadir metadata del origen

Cada chunk debe poder mapearse a:
- source_id
- chunk ordinal
- tenant_id
- display_name
- section/title si existe

## 6. Metadata obligatoria del vector

- tenant_id
- source_id
- chunk_id
- source_type
- display_name
- mime_type
- uploaded_by
- created_at
- tags
- sensitivity_level

## 7. Retrieval

Entradas:
- tenant_id
- query
- top_k
- filters opcionales
- score threshold opcional

Proceso:
- embedding de query
- similarity search en Vectorize
- filtro por tenant_id
- post-processing
- ensamblado de contexto

## 8. Reglas de seguridad RAG

- ningún retrieval sin tenant filter
- no devolver chunks de otro tenant
- acceso a fuentes según permisos
- reindexación autorizada
- no exponer directamente R2 sin control

## 9. Reindexación

Casos:
- documento reemplazado
- ajuste de chunking
- cambio de embedding model
- reparación de índice

Pasos:
1. marcar en progreso
2. invalidar referencias antiguas
3. regenerar
4. actualizar manifest

## 10. Borrado

Al eliminar una fuente:
- soft delete metadata en D1
- remover/invalidar vectores
- política de retención para binario en R2
- registrar auditoría

## 11. Límites por plan

- max_rag_sources
- max_rag_storage_mb
- max_reindex_operations_period
- max_embedding_usage_period

## 12. Calidad RAG

Métricas:
- retrieval latency
- top_k returned
- average score
- source hit distribution
- no-result rate
- grounding rate si se evalúa

## 13. Políticas de respuesta

La capa IA debe:
- citar fuentes internas si la UX lo requiere
- responder “no encontrado” si el retrieval no entrega soporte suficiente
- evitar inventar contenido inexistente

## 14. Manifest RAG exportable

Cada fuente listada con:
- nombre
- tipo
- estado
- hash
- fecha de carga
- notas de reingesta

## 15. Casos de uso

- asistente de ventas con catálogo
- asistente documental interno
- agente de soporte basado en manuales
- políticas internas de empresa

## 16. Riesgos y mitigaciones

Riesgo:
- indexing incompleta
Mitigación:
- estados claros y reintentos

Riesgo:
- fuga cross-tenant
Mitigación:
- metadata filter duro + tests

Riesgo:
- retrieval pobre
Mitigación:
- calibrar chunking/top_k/threshold

## 17. Datos a persistir en D1

- RagSource
- RagChunkManifest
- indexing status
- metadata de embedding model
- referencias para export/import

## 18. Fuera de alcance inicial

- fine-tuning
- reranking complejo si no aporta inicialmente
- knowledge graph avanzado
