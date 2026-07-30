/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		deviceSizes: [768, 1370],
		remotePatterns: [{ hostname: 'hfjaydlcifnsisqntesa.supabase.co' }],
	},
};

module.exports = nextConfig;
