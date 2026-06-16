import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile le package partagé (code TS non pré-compilé).
  transpilePackages: ["@batchcooking/core"],
};

export default nextConfig;
