# Muntanya Jiu-Jitsu — Instrucciones del proyecto

## Contexto

Web para la escuela **Muntanya Jiu-Jitsu** de Sort (Pallars Sobirà, Catalunya), afiliada a **Team Ganbaru** ("Do your best"). Es un regalo para el instructor de la escuela, Pablo. Antes de comprar dominio se publicará una versión navegable en GitHub Pages para enseñársela.

**Objetivo de la web:** informar y captar alumnos nuevos (adultos y niños).

## Regla de trabajo obligatoria

**Antes de ejecutar cualquier cambio estructural, instalación de dependencias, generación o redimensionado de imágenes, o despliegue: proponerlo y esperar el visto bueno del usuario.** Nunca generar ni redimensionar assets de imagen sin aprobación previa explícita.

Trabajamos por fases. No adelantar fases sin que el usuario lo pida.

## Stack técnico

- **Next.js** (App Router) con **`output: 'export'`** — web 100% estática, sin servidor.
- **TypeScript** y **Tailwind CSS**.
- Sin CMS ni base de datos en v1. Contenido en ficheros (JSON/TS por idioma).
- **Repositorio GitHub:** `muntanyabjj`.
- **Despliegue:** GitHub Pages mediante GitHub Actions (workflow oficial de Next.js static export).
  - Configurar `basePath: '/muntanyabjj'` y `assetPrefix` condicionados a producción (en local sin basePath).
  - `images: { unoptimized: true }` (obligatorio con export estático).
  - `trailingSlash: true` para rutas limpias en Pages.
- Cuando el regalo se acepte: se comprará dominio y se apuntará a Pages (o migración a Vercel). No hace falta preparar nada de esto en v1, solo no hardcodear la URL de Pages en contenido.

## Idiomas

Trilingüe: **catalán (defecto), castellano e inglés.**

- El export estático NO soporta el i18n routing nativo de Next. Implementar con segmento de ruta `[lang]` + `generateStaticParams` para `ca`, `es`, `en`.
- `/` redirige (meta refresh o página mínima) a `/ca/`.
- Selector de idioma visible en el header.
- Diccionarios en `/src/dictionaries/{ca,es,en}.json`. Todo el texto visible sale de ahí, nada hardcodeado en componentes.
- Tono: cercano, de pueblo de montaña, nada corporativo. En catalán se escribe primero y se traduce después (el público principal es del Pallars).
- `lang` y `hreflang` correctos en el HTML de cada versión.

## Identidad visual

Ya existe. **No inventar identidad nueva.**

- Logo: círculo negro con montaña blanca sobre semicírculo azul, texto "MUNTANYA JIU-JITSU / SORT". Fichero proporcionado por el usuario.
- Paleta derivada del logo:
  - Azul principal: ~`#29ABE2` (verificar con cuentagotas sobre el logo real)
  - Negro `#0A0A0A` / blanco `#FFFFFF`
  - Acento secundario: usar el azul sobre fondos oscuros; evitar más colores.
- Tipografía: sans geométrica bold para títulos (estilo del logo), sans legible para cuerpo.
- Estética: sobria, deportiva, de montaña. Fondos oscuros funcionan bien con las fotos de tatami.
- Incluir siempre el sello de Team Ganbaru en el footer y en la sección de la escuela (afiliación real).

## Arquitectura de la información

**Home (landing con secciones) + 4 pestañas + CTA global.**

### Navegación (header)
1. **Inici / Inicio / Home** (la landing)
2. **Tarifes / Tarifas / Prices**
3. **Camps / Camps / Camps**
4. **Guies / Guías / Guides**
5. **Botiga / Tienda / Shop**
6. CTA destacado (botón): **"Apunta't" / "Apúntate" / "Join"**

### Home (secciones en orden)
1. **Hero:** logo, foto de grupo, claim breve, doble CTA ("Apunta't" + WhatsApp).
2. **L'escola:** qué es Muntanya Jiu-Jitsu, valores (respeto, esfuerzo, comunidad), afiliación Team Ganbaru.
3. **L'instructor:** Pablo. Foto de las medallas (Valencia Cup BJJ 2026, plata y bronce, SpainBJJ Tour / FIJJD).
   - Presentarlo como **"Instructor"**, NUNCA como "Mestre" (es cinturón azul; en BJJ ese título no corresponde y restaría credibilidad).
   - Linaje: formado con ~~Ecequiel~~ **[PENDIENTE: verificar nombre exacto y graduación]** de la escuela **ASES (València)**, dentro de **Team Ganbaru**.
   - **No publicar la sección de linaje hasta verificar el dato con Pablo.** Dejarla maquetada con placeholder.
4. **Horaris:**
   - Dilluns 10:30 — BJJ · 20:00 — BJJ infantil
   - Dimecres 10:30 — BJJ
   - Divendres 10:30 — BJJ
   - Destacar visualmente el **BJJ infantil** (diferencial para captar familias).
5. **Galeria:** fotos de clases (proporcionadas; más material disponible en Instagram @muntanyabjj).
6. **Ubicació i contacte:** Poliesportiu Municipal de Sort, mapa embebido (OpenStreetMap para no depender de API keys), teléfono/WhatsApp **+34 691 36 46 84**, enlace a Instagram @muntanyabjj.

### Tarifes
| Concepto | Precio |
|---|---|
| Mensualidad | 50,00 € |
| Sesión suelta | 8,00 € |
| Clases particulares | 25,00 €/h |

- Presentar en tarjetas, con la mensualidad como opción destacada.
- Añadir nota "Primera classe de prova gratuïta? **[PENDIENTE: confirmar con Pablo si ofrece clase de prueba]**" — no publicar sin confirmar.
- CTA de contacto al pie de la tabla.

### Camps
**[PENDIENTE: definir contenido con el usuario.]** Hipótesis de trabajo: campus/intensivos (verano, fines de semana). En v1: página con estructura (título, texto introductorio, tarjeta de "properament") lista para rellenar cuando haya un camp real. No inventar fechas ni precios.

### Guies
**[PENDIENTE: definir contenido con el usuario.]** Hipótesis: contenido educativo — qué es el BJJ, glosario básico, guía para padres (qué necesita un niño para empezar, qué es un gi, sistema de cinturones infantil). En v1: estructura + 1 guía de ejemplo como máximo, aprobada por el usuario antes de escribirla.

### Botiga
**[PENDIENTE: definir contenido con el usuario.]** En v1: página "properament". Sin pasarela de pago en ninguna fase próxima; si algún día hay productos, se empezará con pedido por WhatsApp.

### CTA "Apunta't" (formulario)
- **Fase 1:** el botón lleva a una página/sección con dos vías: (a) formulario visual (nombre, edad del alumno, adulto/infantil, teléfono, mensaje) y (b) botón directo de WhatsApp con mensaje precargado: "Hola! M'agradaria provar una classe de BJJ a Muntanya Jiu-Jitsu."
- El envío del formulario en fase 1 se hace vía **Formspree** (plan gratuito, compatible con export estático) — **[PENDIENTE: el usuario creará la cuenta y pasará el endpoint; hasta entonces, el submit muestra aviso "en construcció" o se deshabilita]**.
- Fase 2 (más adelante, no implementar aún): valorar backend propio o integración con el ecosistema After School/BySelf.

## Imágenes

Ficheros de partida (proporcionados por el usuario):
- Logo Muntanya Jiu-Jitsu (fondo desenfocado — habrá que extraer/recortar el logo limpio: **pedir aprobación antes**)
- Foto Pablo con niños en clase (lleva overlays de logos incrustados)
- Foto grupal de clase (overlay Team Ganbaru con gorro navideño — descartar el overlay o pedir versión limpia)
- Foto Pablo con medallas Valencia Cup 2026
- Flyer de horarios (solo como fuente de datos, no publicar como imagen)

Reglas:
- Optimizar a WebP y tamaños responsive, **siempre con visto bueno previo** del usuario para cada operación de recorte/redimensionado.
- Las fotos con overlays de logos incrustados: preguntar al usuario si prefiere pedir los originales sin overlay (Instagram @muntanyabjj o directamente a Pablo) antes de recortar.
- Salen menores en las fotos: **confirmar con el usuario que existe consentimiento de las familias antes de publicar cualquier foto con niños reconocibles.** Hasta confirmarlo, usar en la web pública solo la foto del instructor con medallas y tratamientos donde los menores no sean el foco.

## SEO local (mínimo v1)

- Title/description por página e idioma. Ej. ca: "Muntanya Jiu-Jitsu Sort — Brazilian Jiu-Jitsu al Pallars Sobirà".
- Schema.org `SportsActivityLocation` con dirección (Poliesportiu Municipal de Sort), teléfono y horarios.
- Open Graph con la foto de grupo.
- `sitemap.xml` y `robots.txt` estáticos.

## Fases

- **Fase 0:** scaffolding del repo, config export + Pages, estructura `[lang]`, header/footer, deploy vacío funcionando en `*.github.io/muntanyabjj`. → enseñar al usuario.
- **Fase 1:** Home completa + Tarifes + páginas placeholder (Camps/Guies/Botiga) + CTA con WhatsApp. → revisión.
- **Fase 2:** formulario con Formspree, contenido de Guies, galería ampliada con material de Instagram.
- **Fase 3+:** dominio propio, Camps y Botiga reales.

Cada fase termina con: build local sin errores, deploy a Pages, y enlace al usuario para revisar antes de continuar.
