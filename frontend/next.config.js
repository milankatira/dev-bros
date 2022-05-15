/** @type {import('next').NextConfig} */
 
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
  env: {
    ENV: process.env.ENV,
  },
};

