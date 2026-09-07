import { basePath } from "../../basepath.mjs";

export { basePath };

export function assetPath(path: string) {
  return `${basePath}${path}`;
}
