/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "static.theenglishcoach.vn"
      },
      { hostname: `iotcdn.oss-ap-southeast-1.aliyuncs.com` }
    ],
    // The config below must be coupled to:
    // apps/kreate-web/modules/kreate-components/components/ImageViewer/utils.ts
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 192, 256, 384],
    deviceSizes: [512, 768, 1024, 1536, 2048, 3072, 4096]
  }
};

module.exports = nextConfig;
