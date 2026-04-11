# Plan de Rediseño y Desarrollo - thinka.cl

## 1. Hallazgos de la Auditoría Actual
- **Propuesta de Valor Vaga**: "Construimos el futuro digital" es demasiado genérico para B2B.
- **Jerarquía Visual**: Los servicios y productos compiten por atención sin un flujo claro.
- **SEO Técnico**: Falta de Schema Markup específico (SoftwareApplication, ProfessionalService). Imágenes sin dimensiones explícitas (posible CLS).
- **Copy**: Demasiado centrado en "qué hacemos" y no en "qué gana el cliente".
- **Accesibilidad**: Falta de etiquetas ARIA en elementos complejos y estados de foco poco visibles.

## 2. Nueva Arquitectura Orientada a Conversión (B2B)
1. **Hero**: Headline de impacto ("Ingeniería de Software potenciada por IA para empresas que escalan"). Subheadline con beneficio directo (ROI, velocidad, escalabilidad).
2. **Social Proof (Trust Bar)**: Logos de empresas reales y partners tecnológicos (OpenAI, Anthropic, etc.).
3. **Sección "The AI Advantage"**: Cómo nuestra metodología reduce el time-to-market y mejora la calidad.
4. **Servicios Core (Tarjetas enfocadas a beneficio)**:
   - Desarrollo SaaS Global.
   - Integración de IA & Agentes Autónomos.
   - Consultoría Estratégica & CTO-as-a-Service.
5. **Ecosistema de Productos (Thinka Suite)**: Demostración de capacidad técnica con productos reales.
6. **Sección de Resultados**: Testimonios y métricas de éxito.
7. **Lead Capture (Final CTA)**: Formulario simplificado con microcopy persuasivo.

## 3. Stack Tecnológico & Optimizaciones
- **Framework**: Astro 5.0 (Base).
- **CSS**: Tailwind CSS + Animaciones sutiles (framer-motion o similar si es necesario, pero priorizando carga mínima de JS).
- **Imágenes**: Formato WebP/AVIF con `astro:assets`.
- **SEO**: JSON-LD completo, OpenGraph dinámico, Sitemap & Robots.txt.
- **Accesibilidad**: Cumplimiento WCAG 2.1 AA (contraste, navegación teclado, roles ARIA).

## 4. Checklist Final de Calidad
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms.
- [ ] Título y meta-description optimizados para CTR.
- [ ] Schema Markup verificado.
- [ ] Responsive design perfecto (Mobile-first).
- [ ] Eventos de tracking en CTAs (GTM/GA4).
