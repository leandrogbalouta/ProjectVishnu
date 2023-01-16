/** @type {import('next').NextConfig} */
const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:4000/:path*",
    },
  ];
};



const nextConfig = {
  swcMinify : false,
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  rewrites,
}

module.exports = nextConfig
