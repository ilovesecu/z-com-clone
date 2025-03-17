import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "loremflickr.com",
                port: "",
                pathname: "/640/480/**",
            },
        ],
    },
};

export default nextConfig;
