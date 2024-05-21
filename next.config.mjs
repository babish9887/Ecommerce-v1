/** @type {import('next').NextConfig} */
const nextConfig = {
      async rewrites(){
            return [
                  {
                        source: '/api/:path*',
                        destination:"https://api.resend.com/:path*"
                  }
            ]
      }
};

export default nextConfig;
