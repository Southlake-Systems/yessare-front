/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yessare-ecom-images.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // Keep your localhost pattern if you're still testing local images too
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
            {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
            {
        protocol: "http",
        hostname: "127.0.0.1" ,
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;