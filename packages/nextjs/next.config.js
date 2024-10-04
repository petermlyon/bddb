// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({
      test: /\.wasm$/,
      loader: "base64-loader",
      type: "javascript/auto",
    });

    config.module.noParse = /\.wasm$/;

    config.module.rules.forEach(rule => {
      (rule.oneOf || []).forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
    };

    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }));

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
