export const repoName = "muntanyabjj";
export const isGithubActions = process.env.GITHUB_ACTIONS === "true";
export const basePath = isGithubActions ? `/${repoName}` : "";
