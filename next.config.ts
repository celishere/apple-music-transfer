import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "emojicdn.elk.sh"
            },
            {
                protocol: "https",
                hostname: "is1-ssl.mzstatic.com",
            },
            {
                protocol: "https",
                hostname: "store-033.blobstore.apple.com",
            }
        ]
    }
};

export default nextConfig;
