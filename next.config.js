/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		deviceSizes: [768, 1370],
		domains: ['pub-85c0bb17a41e4bd2b0f173e53fdcf568.r2.dev'],
	},
};

module.exports = nextConfig;
