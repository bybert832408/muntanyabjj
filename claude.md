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
- Paleta (5 tokens Tailwind, verificados con cuentagotas sobre el logo real — no añadir más colores):
  - `blue-logo` `#00AEF0` — cian del logo. Uso: fondos de elementos rellenos (botones, chips, iconos) combinados con texto `ink`. **Nunca como texto suelto ni borde fino sobre fondo claro** (falla contraste AA, 2.4-2.5:1); sobre `blue-kimono` sirve para texto/acentos grandes (≥3:1 AA-large).
  - `blue-kimono` `#1E3A8A` — azul royal profundo (kimono de competición). Fondos de secciones oscuras (hero, header, footer, franja de contacto), en sustitución del negro casi total.
  - `ink` `#0A0A0A` — texto sobre fondo claro y detalles. Ya no es el color de fondo dominante del sitio.
  - `offwhite` `#F7F9FB` — fondo base de la mayoría de secciones (claro).
  - `yellow-kids` `#FACC15` — uso EXCLUSIVO para lo infantil (badge "BJJ infantil" en horaris). No usar en ningún otro contexto.
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
   - **Linaje (VERIFICADO, publicable):** Pablo se formó en **Ases Jiu-Jitsu (València)** bajo **Ezekiel Zayas**, cinturón negro desde 2010, fundador de Ases Jiu-Jitsu y director técnico de **Team Ganbaru** (con filiales en España, Alemania e Italia).
     - Presentar como línea de linaje elegante y breve (2-3 frases máx.): Pablo → Ases Jiu-Jitsu / Ezekiel Zayas → Team Ganbaru. El protagonista de la sección es Pablo, no Zayas.
     - Palmarés de Zayas: mencionar en genérico y verdadero ("multicampeón europeo IBJJF en cinturón negro, árbitro internacional"), sin cifras exactas de títulos (no verificadas una a una en registros IBJJF).
     - Grafías correctas: **Ezekiel Zayas** y **Ases Jiu-Jitsu**.
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
- **Clase de prueba (CONFIRMADA):** destacar "Primera classe de prova gratuïta" / "Primera clase de prueba gratuita" / "First trial class free". Es el gancho principal de captación: debe aparecer también en el hero de la Home y en el CTA "Apunta't".
- CTA de contacto al pie de la tabla.

### Camps
**[PENDIENTE: definir contenido con el usuario.]** Hipótesis de trabajo: campus/intensivos (verano, fines de semana). En v1: página con estructura (título, texto introductorio, tarjeta de "properament") lista para rellenar cuando haya un camp real. No inventar fechas ni precios.

### Guies
**[PENDIENTE: definir contenido con el usuario.]** Hipótesis: contenido educativo — qué es el BJJ, glosario básico, guía para padres (qué necesita un niño para empezar, qué es un gi, sistema de cinturones infantil). En v1: estructura + 1 guía de ejemplo como máximo, aprobada por el usuario antes de escribirla.

### Botiga
**[PENDIENTE: definir contenido con el usuario.]** En v1: página "properament". Sin pasarela de pago en ninguna fase próxima; si algún día hay productos, se empezará con pedido por WhatsApp.

### CTA "Apunta't" (formulario)
- **Fase 1:** el botón lleva a una página/sección con dos vías: (a) formulario visual (nombre, edad del alumno, adulto/infantil, teléfono, mensaje) y (b) botón directo de WhatsApp con mensaje precargado (traducido según idioma activo): ca "Hola! M'agradaria provar la classe de prova gratuïta de BJJ a Muntanya Jiu-Jitsu.", es "¡Hola! Me gustaría probar la clase de prueba gratuita de BJJ en Muntanya Jiu-Jitsu.", en "Hi! I'd like to try the free trial BJJ class at Muntanya Jiu-Jitsu."
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
