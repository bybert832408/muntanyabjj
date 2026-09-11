export const repoName = "muntanyabjj";
export const isGithubActions = process.env.GITHUB_ACTIONS === "true";
export const basePath = isGithubActions ? `/${repoName}` : "";

// Used only to resolve absolute URLs for metadata (og:image, etc.) — not
// rendered as visible content, so safe under the "no Pages URL in content"
// rule. Update this if the GitHub Pages account/org ever changes.
export const siteOrigin = isGithubActions
  ? "https://bybert832408.github.io"
  : "http://localhost:3000";
