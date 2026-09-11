import { basePath, siteOrigin } from "../../basepath.mjs";

export { basePath, siteOrigin };

export function assetPath(path: string) {
  return `${basePath}${path}`;
}
