import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     loader: "default",
//     minimumCacheTTL: 60,
//     domains: ["image.tmdb.org"], // <-- разрешаем TMDB
//   },
// };

// export default nextConfig;
