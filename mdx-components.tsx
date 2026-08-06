import type { MDXComponents } from 'mdx/types';
import CodePre from '@/components/posts/CodePre';
import MarkdownImage from '@/components/posts/MarkdownImage';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		pre: CodePre,
		blockquote: ({ children }) => (
			<blockquote className="my-4 border-l-4 border-l-main bg-[#F8F9FA] p-4 dark:bg-[#282C34]">{children}</blockquote>
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
		hr: (props) => <hr className="text-grey dark:text-greyLight" {...props} />,
		img: MarkdownImage,
		...components,
	};
}
