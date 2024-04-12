/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        hostname:"openweathermap.org",
        protocol:"https"
      }
    ]
  }
};

export default nextConfig;
