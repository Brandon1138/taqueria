/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [],
	},
	experimental: {
		turbo: true,
	},
};

module.exports = nextConfig;
