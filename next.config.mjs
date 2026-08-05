import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	images: {
		deviceSizes: [768, 1370],
		remotePatterns: [{ hostname: 'hfjaydlcifnsisqntesa.supabase.co' }],
	},
};

const withMDX = createMDX({
	options: {
		rehypePlugins: [['rehype-pretty-code', { theme: 'material-theme-palenight' }], ['rehype-slug']],
	},
});

export default withMDX(nextConfig);
