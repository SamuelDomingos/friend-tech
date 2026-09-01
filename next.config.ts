import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.gtgestao.cloud",
      },
    ],
  },
}

export default nextConfig
