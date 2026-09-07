import { basePath, isGithubActions } from "./basepath.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
};

export default nextConfig;
