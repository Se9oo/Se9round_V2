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
		domains: ['hfjaydlcifnsisqntesa.supabase.co'],
	},
};

module.exports = nextConfig;
