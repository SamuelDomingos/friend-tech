import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.gtgestao.cloud",
      },
    ],
  },
}

export default nextConfig
