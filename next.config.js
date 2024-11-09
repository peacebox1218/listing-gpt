/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // これを追加
    outputFileTracingIncludes: {
      '/**': ['./pages/**/*']
    }
  }
}

module.exports = nextConfig
