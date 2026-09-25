// Equivalente al assetPath() de Next (que anteponía el basePath condicional).
// Astro expone el `base` de astro.config.mjs vía import.meta.env.BASE_URL,
// tanto en dev como en build, así que no hace falta el condicional isGithubActions.
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${path}`;
}
