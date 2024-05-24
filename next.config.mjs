/** @type {import('next').NextConfig} */
const nextConfig = {
      async rewrites(){
            return [
                  {
                        source: '/api/:path*',
                        destination:"https://api.resend.com/:path*"
                  }
            ]
      },

      images:{
            remotePatterns:[
                  {
                        protocol:"https",
                        hostname:"firebasestorage.googleapis.com",
                        pathname:"**"
                  },
            ]
      }
};

export default nextConfig;
