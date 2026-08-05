import type { MDXComponents } from 'mdx/types';
import CodePre from '@/components/posts/CodePre';
import MarkdownImage from '@/components/posts/MarkdownImage';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		pre: CodePre,
		blockquote: ({ children }) => (
			<blockquote className="my-4 border-l-4 border-l-[#8491D9] bg-[#F8F9FA] p-4 dark:bg-[#282C34]">
				{children}
			</blockquote>
		),
		a: ({ href, children }) => {
			if (href?.match('http')) {
				return (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: '#8491D9', fontWeight: 700, wordBreak: 'break-word', textDecoration: 'underline' }}
					>
						{children}
					</a>
				);
			}
			return <a href={href}>{children}</a>;
		},
		ol: ({ children }) => <ol style={{ listStyle: 'decimal', marginLeft: '1rem' }}>{children}</ol>,
		ul: ({ children }) => (
			<ul style={{ listStyle: 'disc', marginLeft: '2rem', paddingBottom: '0.5rem' }}>{children}</ul>
		),
		hr: (props) => <hr className="text-grey dark:text-greyLight" {...props} />,
		strong: ({ children }) => (
			<strong
				style={{
					fontFamily: 'Monaco, Spoqa Han Sans Neo, Noto Sans KR, sans-serif',
					fontWeight: 600,
					verticalAlign: '0.5px',
					fontSize: '1rem',
				}}
			>
				{children}
			</strong>
		),
		img: MarkdownImage,
		...components,
	};
}
