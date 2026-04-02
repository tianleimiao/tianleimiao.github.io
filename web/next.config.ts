import type { NextConfig } from "next";

// GitHub project pages: https://<user>.github.io/<repo>/
// Set GITHUB_REPOSITORY=owner/repo in CI; local dev leaves basePath empty.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repoName.endsWith(".github.io");
const inferredBase =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : repoName && !isUserSite
      ? `/${repoName}`
      : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: inferredBase || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
