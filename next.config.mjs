/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: "/api/card.png",
				destination: "/api/card",
			},
		]
	},
	images: {
		domains: ["localhost"],
	},
}

module.exports = nextConfig
