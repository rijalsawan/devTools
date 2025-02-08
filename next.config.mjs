/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

export const trailingSlash = true;
export async function redirects() {
  return [
    {
      source: "/tool?id=:id",
      destination: "/tool/:id",
      permanent: true,
    },
  ];
}


