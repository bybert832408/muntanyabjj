# Notas de la sesión desatendida — Migración a Astro (Fases 0-1)

> Sesión ejecutada sin supervisión por Claude Code. Todo el trabajo está en la
> rama `astro-migration`. **`main` no se ha tocado en ningún momento** (ver
> confirmación al final).

## Resumen rápido

- ✅ Fase 0 completa: inventario en [`MIGRACION-INVENTARIO.md`](./MIGRACION-INVENTARIO.md).
- ✅ Fase 1 completa: Astro instalado y funcionando, con routing multiidioma
  y build local verificado.
- ⏸️ Deploy de prueba: **NO se ha hecho**, por decisión explícita (ver abajo).
  Pendiente de decidir contigo.
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

1. **Contenido real no portado todavía** (a propósito, es la fase siguiente):
   Header, Footer, Hero, Escola, Instructor, Horaris, Galeria, Ubicacio,
   y las páginas Tarifes/Camps/Guies/Botiga/Apuntat siguen solo en
   `_next-old/`, no en Astro.
2. **Fuentes de título/cuerpo**: sin decidir (ver arriba). El proyecto Next
   tampoco las tenía implementadas de verdad, así que no se pierde nada
   respecto al estado anterior, pero conviene cerrarlo antes de portar el
   contenido real.
3. **`assetPath()` / helper de rutas para imágenes y PDFs**: en Next hacía
   falta un helper explícito para anteponer el `basePath` a `/images/...` y
   `/docs/...`. En Astro, con `base` fijo en `astro.config.mjs`, el
   equivalente más directo es `import.meta.env.BASE_URL` (usado ya en el
   selector de idioma de la home de prueba) — falta decidir el patrón
   exacto (helper propio vs. usar `BASE_URL` directamente) cuando se porten
   las imágenes reales.
4. **Discrepancia `logo-360.png`** (detectada en el inventario, Fase 0): la
   instrucción original mencionaba `logo-360.png` como asset de la web, pero
   el fichero realmente usado en `public/` (ahora en `_next-old/public/`) es
   `logo-64.png`; `logo-360.png` solo existe como material sin procesar en
   `BJJ/`. No se ha generado ni inventado nada — **queda para revisar
   contigo** si hace falta crear un `logo-360.png` de verdad.
5. **Deploy de prueba** — ver sección anterior, pendiente de decisión.
6. **SEO / metadata dinámica** (`generateMetadata` de Next, con OG por
   idioma) — no portado todavía a la página de prueba mínima; se hará al
   portar el layout real con Header/Footer.

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
- El workflow `.github/workflows/nextjs.yml` (el que despliega producción)
  no se ha modificado.
- Se ha hecho `git push origin astro-migration` (rama nueva, no `main`) tal
  como pedía la instrucción de la sesión — no afecta a producción.
- La web de producción en GitHub Pages sigue sirviéndose desde `main` sin
  ningún cambio.

## Siguiente paso sugerido (para cuando lo revises)

1. Revisar y decidir lo pendiente de la lista de arriba (sobre todo fuentes
   y estrategia de preview).
2. Continuar con la Fase 2: portar Header/Footer/Hero y el resto de
   secciones de la Home, luego las páginas Tarifes/Camps/Guies/Botiga/Apuntat,
   usando `_next-old/` como referencia línea a línea.
