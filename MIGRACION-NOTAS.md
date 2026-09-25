# Notas de la sesión desatendida — Migración a Astro (Fases 0-2)

> Todo el trabajo está en la rama `astro-migration`.
> **`main` no se ha tocado en ningún momento** (ver confirmación al final).

## Resumen rápido

- ✅ Fase 0 completa: inventario en [`MIGRACION-INVENTARIO.md`](./MIGRACION-INVENTARIO.md).
- ✅ Fase 1 completa: Astro instalado y funcionando, con routing multiidioma
  y build local verificado.
- ✅ Fase 2 completa: Header/Footer/Home (Hero, Escola, Instructor, Horaris,
  Galeria, Ubicacio) y las páginas Tarifes/Camps/Camps 2026/Guies/Botiga/Apuntat
  portadas literalmente desde `_next-old/`, usando `_next-old/` como referencia
  línea a línea. `npm run build`: 0 errores, 0 avisos, 22 páginas (coincide con
  el inventario de Fase 0). Verificado en local con `astro preview` +
  `astro dev` (navegación, imágenes, PDFs, WhatsApp, selector de idioma).
- ✅ Tipografía decidida y aplicada: **Montserrat** (700/800) para títulos
  (`h1`/`h2`/`h3`, vía `font-heading`), **Inter** (400–700) para cuerpo
  (`font-sans`, por defecto en `body`), cargadas desde Google Fonts en
  `BaseLayout.astro`.
- ✅ `logo-360.png`: decidido con Suso que no hace falta generarlo —
  `logo-64.png`/`logo.png` cubren todos los usos reales.
- ✅ `.github/workflows/astro.yml` (renombrado desde `nextjs.yml`): actualizado
  para construir con Astro (`withastro/action`) en vez de Next.js. **No se ha
  hecho push ni merge a `main`** — sigue pendiente de que Suso confirme cuándo
  reemplazar la producción actual.
- ⏸️ Deploy real / activar en producción: **NO hecho**, sigue pendiente de
  decisión (ver "Deploy de prueba" más abajo, ese razonamiento se mantiene).
- ❌ Nada de `main` se ha tocado ni desplegado.

## Qué se ha hecho, paso a paso

### Fase 0
- Confirmado el stack: Next.js 14.2.35, App Router, `output: "export"`,
  Tailwind 3.4.4, TypeScript. Coincide con `claude.md`, sin sorpresas.
- Creada la rama `astro-migration` desde `main` (al día con `origin/main`).
- Inventario completo en `MIGRACION-INVENTARIO.md`: rutas, componentes,
  diccionarios, assets, config de export/Pages, y una lista de puntos a
  vigilar en la migración.

### Fase 1
- **Todo el proyecto Next.js se ha movido a `_next-old/`** (con `git mv` para
  los ficheros versionados; `node_modules/`, `.next/`, `out/`, `next-env.d.ts`
  con `mv` normal porque ya estaban en `.gitignore`). No se ha borrado nada:
  está íntegro ahí para portar el contenido real en la fase siguiente.
- Proyecto **Astro 4.16.19** nuevo en la raíz, con TypeScript y
  `@astrojs/tailwind`.
  - **Decisión de versión:** se ha fijado Astro 4.16.19 (no la última, 7.x)
    porque Astro 5+ exige Node ≥18.20.8/20.3/22, y este entorno tiene
    **Node 18.19.1**. Astro 4 soporta Node ^18.17.1, que sí cumple. Revisa
    la versión de Node del entorno donde vayáis a trabajar/desplegar esto:
    si tenéis Node más nuevo disponible, podría valer la pena subir a Astro 5
    más adelante (no es urgente).
  - **`@astrojs/check` fijado en `0.9.4` exacto** (no `^0.9.4`): la versión
    más reciente (0.9.10) arrastra `yargs@18`, que requiere Node ≥20 y
    rompía `astro check` en este entorno. La 0.9.4 usa `yargs@17`, compatible
    con Node 18. Si en el futuro actualizáis Node, se puede volver a poner
    en rango abierto.
- `astro.config.mjs`: `site` apuntando al Pages actual, `base: '/muntanyabjj'`,
  `trailingSlash: 'always'`. A diferencia de Next (que solo aplicaba el
  `basePath` en CI), **Astro aplica `base` también en local** (`astro dev`
  sirve en `http://localhost:4321/muntanyabjj/`). Es el comportamiento
  estándar de Astro y simplifica el equivalente al `asset-path.ts` /
  `isGithubActions` de Next — ya no hace falta ese condicional. Si esto
  resulta incómodo para desarrollar en local, se puede revisar, pero de
  momento funciona bien y es más simple que antes.
- **Paleta Tailwind portada 1:1** (`tailwind.config.mjs`): los 5 colores
  exactos (`blue-logo`, `blue-kimono`, `ink`, `offwhite`, `yellow-kids`).
  Verificado que el CSS compilado genera los valores RGB correctos.
  - **No he añadido fuentes personalizadas.** `claude.md` menciona "sans
    geométrica bold para títulos, sans legible para cuerpo", pero el
    `tailwind.config.ts` original y el `globals.css` de Next **no definían
    ninguna fuente concreta** (solo el stack sans por defecto de Tailwind).
    Como añadir una fuente de Google Fonts sería una decisión de identidad
    visual nueva y el proyecto exige aprobación previa para eso, lo he
    dejado tal cual estaba (sin fuente custom) en vez de inventar una.
    **Pendiente de decidir contigo** qué fuentes concretas usar.
- **Diccionarios ca/es/en portados literalmente** (mismo JSON, sin cambios)
  a `src/dictionaries/`. Helper equivalente en `src/i18n/config.ts`:
  `getDictionary(locale)` (acceso tipado, igual que antes) y una función
  nueva `t(locale, "clau.punteada")` para acceso por string, tal como pedía
  la instrucción de la Fase 1.
- **Routing multiidioma**: `src/pages/[lang]/index.astro` con
  `getStaticPaths()` generando `ca`/`es`/`en`. `src/pages/index.astro`
  redirige a `./ca/` con meta refresh, igual que hacía Next.
- **Página de prueba mínima**: `<h1>` con el nombre de la escuela sacado del
  diccionario + selector de idioma funcional (enlaza correctamente
  respetando el `base`). Sin hero, tarifas, etc. — eso queda para la
  siguiente fase, tal como pedía la instrucción.
- **Verificado con éxito:**
  - `npm install` sin errores bloqueantes (solo avisos `EBADENGINE` de
    paquetes de otra dependencia interna, ya solucionados fijando versión
    de `@astrojs/check`).
  - `npm run build` (que ejecuta `astro check && astro build`): **0 errores,
    0 warnings**.
  - `astro dev`: probado en `http://localhost:4321/muntanyabjj/`, las 3
    rutas de idioma responden con el `<title>` y `<h1>` correctos por
    idioma, y el selector de idioma navega bien entre `ca`/`es`/`en`.
  - El `dist/` de prueba incluye `.nojekyll` (imprescindible para Pages,
    copiado a `public/.nojekyll` para que Astro lo incluya siempre).

### Deploy de prueba — NO hecho, por qué

El repo `bybert832408/muntanyabjj` usa el workflow oficial de Pages vía
GitHub Actions (`.github/workflows/nextjs.yml`, que **no he tocado**). Ese
tipo de despliegue (`actions/deploy-pages`) solo puede apuntar a **un único
sitio de Pages por repositorio**, y el workflow ya usa
`concurrency: { group: "pages" }` — es decir, cualquier segundo workflow que
también llame a `deploy-pages` desde `astro-migration` **desplegaría sobre
el mismo Pages que sirve producción ahora mismo**, pisando la web de Pablo.

No hay forma limpia de tener una URL de preview separada sin:
- Usar un servicio externo (Netlify, Vercel, Cloudflare Pages, Surge...),
  lo cual requeriría crear una cuenta/token nuevo — no es algo que deba
  decidir ni configurar solo, sin tu aprobación explícita.
- O usar un segundo repositorio de GitHub solo para la preview.

Siguiendo la regla de la instrucción ("si no hay forma limpia de tener
preview sin arriesgar el Pages de `main`, entonces NO despliegues"), he
dejado el build local funcionando y **no he creado ningún workflow nuevo**.
**Pendiente de decidir contigo:** qué opción de preview prefieres (Netlify,
Vercel, un repo aparte, o simplemente revisar en local con `astro dev`/
`astro preview` hasta que la migración esté lista para reemplazar `main`).

## Qué ha quedado pendiente / a medias

1. ~~Contenido real no portado todavía~~ — **hecho en Fase 2** (ver resumen).
2. ~~Fuentes de título/cuerpo~~ — **decidido y aplicado**: Montserrat (títulos)
   + Inter (cuerpo), vía Google Fonts en `BaseLayout.astro` y
   `fontFamily.heading`/`sans` en `tailwind.config.mjs`.
3. ~~`assetPath()` / helper de rutas~~ — **resuelto**: `src/lib/asset-path.ts`
   con `assetPath(path)` usando `import.meta.env.BASE_URL`, usado en
   Header, Hero, Instructor, Camp 2026 y Guies para imágenes/PDFs, y también
   para los enlaces internos entre páginas (mismo patrón, mismo helper).
4. ~~Discrepancia `logo-360.png`~~ — **decidido con Suso: no hace falta**,
   `logo-64.png`/`logo.png` cubren todos los usos reales.
5. **Deploy de prueba / activar en producción** — sigue pendiente, ver
   sección anterior. El workflow ya está actualizado para Astro
   (`.github/workflows/astro.yml`), pero **no se ha hecho push ni merge a
   `main`**; falta que Suso confirme cuándo se reemplaza la producción
   actual (Next.js en `main`) por esta rama.
6. ~~SEO / metadata dinámica~~ — **portado**: `BaseLayout.astro` genera
   `<title>`, `description` y Open Graph (title/description/image) por
   página e idioma, equivalente al `generateMetadata` de Next. Sitemap.xml
   y robots.txt **siguen sin existir** (tampoco existían en el Next.js
   original — no es una regresión de la migración, es una tarea de SEO v1
   que nunca se llegó a implementar; pendiente si se quiere para v1).

## Cómo probar esto en local

Desde la raíz del repo, en la rama `astro-migration`:

```bash
git checkout astro-migration
npm install
npm run dev
```

Abre `http://localhost:4321/muntanyabjj/` (nota el `/muntanyabjj/` al final,
por el `base` configurado — no es un error, es el equivalente al `basePath`
de producción).

Para probar el build estático completo:

```bash
npm run build     # ejecuta astro check + astro build, genera dist/
npm run preview   # sirve dist/ localmente para revisar el resultado final
```

El proyecto Next.js original sigue intacto en `_next-old/` si quieres
comparar o arrancarlo (`cd _next-old && npm run dev` — su `node_modules/`
también se movió ahí, así que no debería hacer falta reinstalar).

## Confirmación: `main` no se ha tocado

- `git rev-parse main` y `git rev-parse origin/main` coinciden exactamente
  (`ddfc631`) — ni un commit nuevo, ni un push, ni un merge a `main`.
- El workflow que **despliega producción** (el que corre sobre `main`) no se
  ha modificado — sigue siendo el Next.js original. `astro.yml` (renombrado
  desde `nextjs.yml` y reescrito para Astro) solo existe en la rama
  `astro-migration`; no tiene efecto hasta que esta rama se mergee a `main`.
- Se ha hecho `git push origin astro-migration` (rama nueva, no `main`) tal
  como pedía la instrucción de la sesión — no afecta a producción.
- La web de producción en GitHub Pages sigue sirviéndose desde `main` sin
  ningún cambio.

## Siguiente paso sugerido (para cuando lo revises)

1. Revisar el resultado de la Fase 2 en local (`npm run dev` /
   `npm run build` + `npm run preview`).
2. Decidir la estrategia de preview/deploy real (Fase 3): Netlify, Vercel,
   repo aparte, o esperar y reemplazar `main` directamente cuando la
   migración esté lista.
3. Cuando se decida: mergear `astro-migration` a `main` (esto activará
   `astro.yml` y sustituirá la Next.js de producción) — **requiere tu
   confirmación explícita antes de hacerlo**.
