# REPORTE DE ESPECIFICACIONES PARA AGENTE CODIFICADOR
## Sitio Web Thinka — Rediseño de Contenido y Arquitectura
**Versión:** 1.0  
**Basado en:** Diagnóstico de rediseño Thinka (evaluación de atractivo para licitaciones y mercado tecnológico)  
**Propósito:** Instrucciones de implementación concretas, sin cambios visuales. Solo estructura, contenido y copywriting.

---

## 0. CONTEXTO Y PRINCIPIOS RECTORES

### Modelo de negocio ampliado (IMPORTANTE)
El sitio debe comunicar **tres líneas de negocio**, en este orden de peso e importancia:

| Prioridad | Línea | Canales principales |
|-----------|-------|---------------------|
| ① Principal | Licitaciones públicas + Compra Ágil (MercadoPúblico) | Municipios, GORE, Ministerios, Salud, Educación |
| ② Secundario | Consultoría TI y proyectos sector privado | Empresas financieras, retail, industria, pymes |
| ③ Complementario | Licitaciones y concursos sector privado | Empresas con procesos formales de adquisición TI |

> **Regla de contenido:** El 60% del lenguaje y propuestas de valor deben apuntar al sector público. El 40% restante al privado. NUNCA eliminar el foco público para balancear. Agregar privado es aditivo, no sustitutivo.

### Tres nichos técnicos a posicionar (nuevo enfoque)
Estos nichos deben aparecer como **servicios destacados** y como **eje de los casos de éxito y la propuesta de valor**:

1. **INTEGRACIÓN E INTEROPERABILIDAD** — Demanda alta (Municipios, GORE)
2. **MIGRACIÓN DE SISTEMAS LEGADOS** — Demanda media-alta (Instituciones públicas)
3. **API Y MICROSERVICIOS ÁGILES** — Demanda alta (Empresas financieras, telecom)

---

## 1. CAMBIOS EN EL HERO (SECCIÓN PRINCIPAL)

### 1.1 Tagline principal
**Texto actual:** `"Automatización de procesos con IA"`  
**Texto nuevo:**
```
Tecnología e Inteligencia Artificial para el Sector Público y Privado
```

**Subtítulo actual:** (lenguaje de ROI y ahorro de tokens)  
**Subtítulo nuevo:**
```
Desarrollamos software a medida, integramos sistemas y modernizamos 
infraestructura tecnológica. Proveedores habilitados en MercadoPúblico.
```

### 1.2 Badge nuevo (elemento inline, sin diseño nuevo, usar estilo de badge existente)
Agregar badge visible en el hero con el texto:
```
✓ Proveedor habilitado en MercadoPúblico
```
- Enlazar a la ficha de proveedor en ChileCompra cuando esté disponible.
- Si no hay URL aún, el badge puede ser estático (sin `href`), solo visual.

### 1.3 CTAs del hero
**CTA primario** (mantener botón principal):
```
Solicitar cotización
```
**CTA secundario** (agregar, texto plano o botón secundario):
```
Ver soluciones para organismos públicos
```
→ Este CTA ancla a la sección `#sector-publico` de la misma página (o a `/sector-publico` si se crea como página separada).

---

## 2. SECCIÓN DE SERVICIOS — RENOMBRAR Y AMPLIAR

### 2.1 Servicios a renombrar (existentes)
Los servicios actuales deben actualizarse con nombres que coincidan con los rubros de búsqueda en MercadoPúblico y con lenguaje del sector privado formal:

| Nombre actual | Nombre nuevo | Notas |
|---------------|--------------|-------|
| Automatización | Desarrollo de Software a Medida | Rubro MP más buscado en licitaciones TI |
| Consultoría | Consultoría TI y Transformación Digital | Aplica público y privado |
| Dev / Desarrollo | (subsumido en los servicios nuevos) | Ver sección 2.2 |

### 2.2 Servicios nuevos a agregar

Cada servicio debe tener: **nombre**, **descripción corta** (2–3 líneas), **a quién aplica** (público/privado/ambos), y **keywords SEO** embebidos en el texto.

---

#### SERVICIO 1: Integración e Interoperabilidad de Sistemas
```
NOMBRE: Integración e Interoperabilidad de Sistemas

DESCRIPCIÓN:
Conectamos sistemas heterogéneos mediante APIs REST, protocolos estándar y 
middleware especializado. Integramos plataformas del Estado (SIGFE, Registro Civil, 
SII, ChileAtiende, ClaveÚnica) con sistemas propios de la institución, eliminando 
silos de información y automatizando flujos entre unidades.

APLICA A: Municipalidades, GORE, Servicios públicos, Ministerios / Empresas con 
múltiples plataformas tecnológicas desconectadas.

KEYWORDS SEO: integración de sistemas Chile · interoperabilidad sector público · 
API estado · integración SIGFE · middleware institucional
```

---

#### SERVICIO 2: Migración de Sistemas Legados
```
NOMBRE: Migración y Modernización de Sistemas Legados

DESCRIPCIÓN:
Migramos sistemas obsoletos (AS/400, sistemas propietarios, aplicaciones monolíticas) 
a arquitecturas modernas sin interrumpir la operación. Realizamos levantamiento de 
requerimientos, migración de datos con validación de integridad, y acompañamiento 
post-migración. Cumplimos con los estándares de continuidad operacional exigidos 
en licitaciones públicas.

APLICA A: Instituciones públicas con sistemas legados · Empresas privadas en 
proceso de modernización TI.

KEYWORDS SEO: migración sistemas legados Chile · modernización software institucional · 
migración AS400 · reemplazo sistema informático
```

---

#### SERVICIO 3: APIs y Microservicios Ágiles
```
NOMBRE: APIs y Microservicios para Aplicaciones Escalables

DESCRIPCIÓN:
Diseñamos e implementamos arquitecturas de microservicios y APIs RESTful para 
empresas que requieren escalabilidad, velocidad de despliegue y resiliencia. 
Especialidad en sectores de alta transaccionalidad: fintech, telecomunicaciones 
y servicios digitales. Entornos cloud (AWS, GCP, Azure) o infraestructura on-premise 
según requerimientos de soberanía de datos.

APLICA A: Empresas financieras, telecom, startups de escala · Organismos públicos 
que necesitan exponer o consumir servicios digitales.

KEYWORDS SEO: desarrollo APIs REST Chile · microservicios fintech · arquitectura 
de microservicios · backend escalable · API gateway
```

---

#### SERVICIO 4: Soporte Técnico y Mantención (agregar si no existe)
```
NOMBRE: Soporte Técnico y Mantención de Software

DESCRIPCIÓN:
Brindamos soporte post-implementación con SLA definido, helpdesk técnico y 
mantención evolutiva de sistemas. Requisito habitual en bases de licitación. 
Modalidades: soporte mensual, banco de horas o contrato de mantención anual.

APLICA A: Instituciones públicas y privadas que requieren continuidad operacional.
```

---

#### SERVICIO 5: Capacitación en Tecnología e IA (agregar si no existe)
```
NOMBRE: Capacitación en Tecnología e Inteligencia Artificial

DESCRIPCIÓN:
Talleres y programas de formación para equipos técnicos y directivos. Contenidos: 
automatización de procesos, uso de herramientas de IA, transformación digital y 
desarrollo ágil. Modalidad presencial, remota o híbrida. Alta demanda post-modernización 
del aparato público.

APLICA A: Organismos del Estado, corporaciones municipales, empresas privadas.
```

---

## 3. NUEVA SECCIÓN: SECTOR PÚBLICO

### 3.1 Ruta / ubicación
- Crear como **sección dentro del home** con ID `sector-publico` (`<section id="sector-publico">`)
- Opcionalmente: también como página separada `/sector-publico` si el sitio soporta rutas

### 3.2 Encabezado de sección
```
ETIQUETA: Sector Público
TÍTULO: Soluciones tecnológicas para organismos del Estado

PÁRRAFO INTRO:
Apoyamos la transformación digital de municipalidades, gobiernos regionales, 
hospitales y servicios del gobierno central. Somos proveedores habilitados en 
MercadoPúblico y participamos en procesos de Compra Ágil, licitaciones L1, L2 
y licitaciones de gran escala, cumpliendo la normativa vigente (Ley 19.886, 
Ley 19.628, estándares GobDigital).
```

### 3.3 Sub-segmentos públicos (mostrar como tarjetas o lista)
```
① Municipalidades y Gobiernos Regionales (GORE)
   → Integración de sistemas, portales ciudadanos, plataformas de gestión interna.

② Ministerios y Servicios Públicos
   → Desarrollo a medida, migración de sistemas, implementación de IA institucional.

③ Salud Pública (hospitales, CESFAM, Servicios de Salud)
   → Sistemas clínicos, interoperabilidad con MINSAL, gestión de agenda.

④ Educación (DAEM, Corporaciones municipales)
   → Plataformas educativas, sistemas de matrícula, gestión académica digital.
```

### 3.4 Mecanismos de compra (listado informativo)
```
TÍTULO: Cómo contratarnos desde el Estado

- Compra Ágil (hasta 30 UTM sin licitación)
- Licitación Pública L1 (30–100 UTM)
- Licitación Pública L2 (100–1000 UTM)
- Licitación de gran escala (+1000 UTM)
- Convenio Marco (cuando corresponda al rubro)
- Trato Directo (casos calificados por excepción)
```

---

## 4. NUEVA SECCIÓN: SECTOR PRIVADO (complementaria)

### 4.1 Encabezado
```
ETIQUETA: Sector Privado
TÍTULO: Consultoría tecnológica y desarrollo para empresas

PÁRRAFO INTRO:
También trabajamos con empresas privadas que requieren modernizar su infraestructura 
tecnológica, integrar plataformas o desarrollar soluciones a medida. Nuestra 
experiencia en entornos de alta demanda —fintech, telecomunicaciones, retail— 
nos permite entregar arquitecturas escalables con estándares de calidad de nivel enterprise.
```

### 4.2 Sub-segmentos privados
```
① Empresas Financieras y Fintech
   → APIs de alta disponibilidad, microservicios, integración con core bancario.

② Telecomunicaciones
   → Backends escalables, gestión de clientes, automatización de procesos internos.

③ Retail y Comercio
   → Integración ERP/CRM, plataformas e-commerce, automatización de cadena.

④ Consultoría y Licitaciones Privadas
   → Participación en procesos formales de adquisición TI de empresas con 
     procedimientos de compra estructurados.
```

> **Nota para el agente:** Esta sección debe ocupar visualmente menos espacio que la sección de Sector Público. No igualar el peso visual entre ambas secciones.

---

## 5. NUEVA SECCIÓN: CASOS DE ÉXITO

### 5.1 Estructura de cada caso
Cada caso de éxito debe incluir los siguientes campos (no importa si el cliente es público o privado):

```
CAMPOS OBLIGATORIOS:
- Nombre del proyecto (puede ser genérico si hay confidencialidad): 
  ej. "Sistema de gestión documental — Municipalidad Región de Coquimbo"
- Tipo de cliente: [Público / Privado] + sector
- Servicio prestado (usar nombres de la sección 2)
- Problema que resolvimos (2–3 líneas)
- Resultado con métrica:
  ej. "Reducción de 65% en tiempo de procesamiento de solicitudes ciudadanas"
  ej. "Integración completada en 3 sprints sin interrupción operacional"
- Tecnologías utilizadas (keywords técnicos)
```

### 5.2 Casos mínimos requeridos
- **2 casos de proyectos de tipo público** (real o anonimizado)
- **1 caso de integración/interoperabilidad** (nicho prioritario)
- **1 caso de API o microservicios** (nicho privado)
- Los proyectos privados actuales (Alabarteam, Lubeal, Fenorte) pueden reformatearse con esta estructura si tienen métricas.

---

## 6. NUEVA SECCIÓN: CUMPLIMIENTO NORMATIVO

### 6.1 Encabezado
```
ETIQUETA: Cumplimiento y Normativa
TÍTULO: Desarrollamos con los estándares que el Estado exige
```

### 6.2 Bloques de cumplimiento (mostrar como lista o grilla de ítems)
```
① Ley 19.628 — Protección de datos personales
   Nuestros sistemas gestionan datos personales bajo los principios de la ley 
   vigente, con controles de acceso, cifrado y minimización de datos.

② Ley 21.658 — Marco regulatorio IA en Chile
   Implementamos soluciones de inteligencia artificial con transparencia, 
   trazabilidad y supervisión humana.

③ Accesibilidad Web — WCAG 2.1 / GobDigital
   Desarrollamos interfaces accesibles conforme a las pautas WCAG 2.1, 
   requeridas por el estándar GobDigital para sitios del Estado.

④ Interoperabilidad con plataformas del Estado
   API REST, estándares de intercambio de datos con SIGFE, Registro Civil, 
   SII, ClaveÚnica y ChileAtiende.

⑤ Soberanía de datos — Hosting en Chile
   Ofrecemos despliegue en infraestructura ubicada en territorio chileno 
   para organismos que lo requieran por normativa o política interna.
```

---

## 7. NUEVA SECCIÓN: EQUIPO

### 7.1 Estructura por perfil
```
CAMPOS POR INTEGRANTE:
- Nombre completo
- Rol / especialidad
- Certificaciones (AWS, GCP, Azure, Google, Microsoft, etc.)
- Años de experiencia (cuantificado)
- Foto (si está disponible)
```

### 7.2 Nota de implementación
- Si aún no hay fotos o datos definitivos, usar **placeholders con estructura real** (nombre real, rol real).
- No usar "Desarrolladores senior" como único descriptor. Cada perfil necesita especificidad.
- Agregar si aplica: experiencia previa en proyectos del Estado, aun si fue en otra empresa anterior.

---

## 8. CAMBIOS EN EL FORMULARIO DE CONTACTO

### 8.1 Campos nuevos a agregar
El formulario actual tiene campos genéricos. Agregar los siguientes sin eliminar los existentes:

```
CAMPO: tipo_institucion
TIPO: select (desplegable)
LABEL: "Tipo de organización"
OPCIONES:
  - Municipalidad
  - Gobierno Regional (GORE)
  - Ministerio / Servicio público
  - Hospital / Centro de salud
  - Empresa privada
  - Otro

CAMPO: mecanismo_compra
TIPO: select (desplegable)
LABEL: "Mecanismo de compra"
OPCIONES:
  - Compra Ágil
  - Licitación Pública L1 / L2
  - Licitación gran escala
  - Convenio Marco
  - Contratación directa (privado)
  - Aún no lo sé

CAMPO: presupuesto_estimado
TIPO: select o texto libre
LABEL: "Presupuesto estimado"
OPCIONES (si select):
  - Hasta 30 UTM
  - 30 – 100 UTM
  - 100 – 1.000 UTM
  - Más de 1.000 UTM
  - Privado (en CLP)
  - Por definir
```

### 8.2 CTA del formulario
**Texto actual:** `"Solicitar Contacto"` / `"Cotizar"`  
**Texto nuevo:**
```
Solicitar cotización o reunión inicial
```
**Párrafo breve sobre el formulario:**
```
Cuéntanos tu proyecto. Respondemos en menos de 24 horas hábiles.
Si tu proceso es una Compra Ágil o licitación con fecha límite, indícalo 
y priorizamos tu consulta.
```

---

## 9. CAMBIOS EN COPYWRITING GLOBAL

### 9.1 Reemplazos de texto directos

| Texto actual | Texto nuevo | Ubicación |
|---|---|---|
| "Agencia de IA Global" | "Empresa de Tecnología e Inteligencia Artificial — Chile" | Header / about |
| "Maximiza el ROI y ahorra tiempo automatizando tareas repetitivas" | "Desarrollamos sistemas informáticos a medida que optimizan la gestión institucional y reducen los tiempos de atención" | Hero / valor |
| "Reducimos tu factura de API de OpenAI/Anthropic hasta un 70%" | "Implementamos soluciones de IA con arquitecturas eficientes, optimizando el presupuesto tecnológico de tu organización" | Sección IA |
| "Apps IA · Scalability · Token-Efficient" | "Desarrollo a medida · Integración de sistemas · Soporte post-implementación · Cumplimiento normativo" | Tags / pills hero |
| "Solicitar Contacto" (sin contexto) | "Solicitar cotización para Compra Ágil / Licitación / Proyecto privado" | CTA formulario |

### 9.2 Palabras a eliminar del sitio
Las siguientes palabras o frases generan fricción con evaluadores del sector público y deben eliminarse o reformularse:

- `"Global"` → reemplazar por `"Chile"` o eliminar
- `"Token-Efficient"` → reemplazar por concepto en español del sector
- `"ROI"` → usar "ahorro presupuestario" o "eficiencia institucional"
- `"Startup"` o lenguaje startup → usar "empresa tecnológica" o "equipo especializado"
- `"Automatización"` como categoría principal → subordinar a "Desarrollo de software a medida"

### 9.3 Palabras clave a incorporar en el sitio (SEO + lenguaje evaluador)
```
desarrollo de software público Chile
licitación TI MercadoPúblico
integración de sistemas Chile
interoperabilidad sector público
migración sistemas legados institución
API REST servicios estatales
transformación digital municipal
proveedor ChileCompra habilitado
cumplimiento Ley 19.886
microservicios fintech Chile
desarrollo backend telecomunicaciones
consultoría TI sector privado Chile
```

---

## 10. ARQUITECTURA DE PÁGINAS / SECCIONES (RESUMEN PARA IMPLEMENTAR)

### Secciones del home en orden recomendado:
```
1. Hero
   → Tagline + subtítulo + badge MP + CTA primario + CTA secundario

2. Servicios (renombrados + nuevos)
   → Grilla de 6 servicios con íconos y descripción corta

3. Sector Público (sección nueva)
   → Propuesta de valor pública + sub-segmentos + mecanismos de compra

4. Nichos técnicos destacados (sección nueva o subsección de servicios)
   → Integración e Interoperabilidad
   → Migración de Sistemas Legados
   → APIs y Microservicios Ágiles

5. Sector Privado (sección nueva, menor peso)
   → Propuesta de valor privada + sub-segmentos

6. Casos de Éxito (sección nueva)
   → Mínimo 3 casos con métricas

7. Cumplimiento Normativo (sección nueva)
   → 5 bloques de cumplimiento

8. Equipo (sección nueva)
   → Perfiles con nombre, rol, certificaciones

9. Clientes (sección existente expandida)
   → Agregar logos/nombres de organismos públicos si existen

10. Formulario de contacto (expandido)
    → Con campos de tipo institución y mecanismo de compra
```

### Página separada (opcional pero recomendada):
```
/sector-publico
→ Duplicar y ampliar el contenido de la sección pública del home
→ Esta URL se puede incluir en la ficha de MercadoPúblico como referencia
```

---

## 11. METADATOS Y SEO (para el `<head>`)

```html
<!-- Title -->
<title>Thinka | Desarrollo de Software e IA para el Sector Público y Privado — Chile</title>

<!-- Meta description -->
<meta name="description" content="Empresa chilena de desarrollo de software a medida, 
integración de sistemas, migración de legados y soluciones de IA. Proveedores 
habilitados en MercadoPúblico. Atendemos municipalidades, GORE, instituciones 
públicas y empresas privadas.">

<!-- Keywords (complementario, bajo impacto directo pero coherente) -->
<meta name="keywords" content="desarrollo software Chile, licitación TI, 
MercadoPúblico proveedor, integración sistemas, migración legados, 
API microservicios, transformación digital municipal, consultoría TI">

<!-- Open Graph (para redes sociales y links compartidos) -->
<meta property="og:title" content="Thinka — Tecnología e IA para el Sector Público y Privado">
<meta property="og:description" content="Desarrollo de software a medida, 
integración de sistemas y soluciones de IA. Proveedores habilitados en MercadoPúblico.">
```

---

## 12. INSTRUCCIONES FINALES PARA EL AGENTE

1. **No alterar la paleta de colores, tipografía ni componentes visuales existentes.** Todos los cambios son de contenido, estructura y texto.

2. **Aplicar los reemplazos de texto** de la sección 9.1 de forma global en el sitio (buscar y reemplazar en todos los componentes).

3. **Agregar las secciones nuevas** (Sector Público, Sector Privado, Casos de Éxito, Cumplimiento, Equipo) usando los componentes de UI ya existentes en el proyecto (cards, grids, listas). No crear componentes visuales nuevos.

4. **El formulario de contacto** debe mantener sus validaciones actuales y agregar los tres campos nuevos descritos en la sección 8.

5. **Los servicios nuevos** (sección 2.2) deben seguir el mismo patrón de componente que los servicios actuales, solo con nuevo contenido.

6. **Prioridad de implementación** (de mayor a menor urgencia):
   - P1: Cambios en hero (tagline + badge + CTAs)
   - P1: Renombrar servicios existentes
   - P2: Agregar servicios de los tres nichos (Integración, Migración, APIs)
   - P2: Crear sección Sector Público
   - P3: Crear sección Casos de Éxito (con placeholders si no hay contenido final)
   - P3: Crear sección Cumplimiento Normativo
   - P4: Crear sección Equipo
   - P4: Expandir formulario
   - P4: Crear sección Sector Privado
   - P5: Crear página `/sector-publico`
   - P5: Actualizar metadatos SEO

7. **Verificar** que en ninguna parte del sitio quede el texto "Agencia de IA Global", "token-efficient", ni referencias a ahorro de tokens de OpenAI/Anthropic como propuesta de valor principal.
