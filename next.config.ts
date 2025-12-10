import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    // @ts-expect-error - appIsrStatus is valid but types may be missing
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
