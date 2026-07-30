/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/self-closing-comp */

import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

import { generateSlug } from '~/utils/format';
import CodeBlock from './CodeBlock';
import MarkdownImage from './MarkdownImage';

const extractHeadingText = (node: ReactNode): string => {
	if (typeof node === 'string' || typeof node === 'number') return String(node);
	if (Array.isArray(node)) return node.map(extractHeadingText).join('');
	if (React.isValidElement(node)) return extractHeadingText((node.props as { children?: ReactNode }).children);
	return '';
};

const MarkdownComponents: object = {
	code({
		inline,
		className,
		children,
		node,
		...props
	}: {
		inline: boolean;
		className: string;
		children: string | string[];
		node?: unknown;
	}) {
		const match = /language-(\w+)/.exec(className || '');

		const formattedChildren = Array.isArray(children)
			? children.map((item) => {
					return item.replace(/\n\n&nbsp;\n\n/g, '\n');
			  })
			: children.replace(/\n\n&nbsp;\n\n/g, '\n');

		return !inline && match ? (
			<CodeBlock children={formattedChildren} match={match} />
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
	blockquote({ children, node, ...props }: { children: ReactNode; node?: unknown }) {
		return (
			<blockquote className="my-4 border-l-4 border-l-[#8491D9] bg-[#F8F9FA] p-4 dark:bg-[#282C34]" {...props}>
				{children}
			</blockquote>
		);
	},
	a: (anchor: { href: string; children: Array<any> }) => {
		if (anchor.href.match('http')) {
			return (
				<a
					href={anchor.href}
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: '#8491D9', fontWeight: 700, wordBreak: 'break-word', textDecoration: 'underline' }}
				>
					{anchor.children}
				</a>
			);
		}
		return <a href={anchor.href}>{anchor.children}</a>;
	},
	ol: ({ children, node, ...props }: { children: ReactNode; node?: unknown }) => {
		return (
			<ol
				style={{
					listStyle: 'decimal',
					marginLeft: '1rem',
				}}
				{...{ ...props, ordered: 'true' }}
			>
				{children}
			</ol>
		);
	},
	hr: ({ node, ...props }: { node?: unknown }) => {
		return <hr className="text-[rgba(41,69,105,0.1)] dark:text-[#EAEAEA]" {...props} />;
	},
	h2: ({ node, ...props }: any) => {
		const heading = extractHeadingText(props?.children);

		const slug = generateSlug(heading ?? '');

		return <h2 id={slug} {...props}></h2>;
	},
	h3: ({ node, ...props }: any) => {
		const heading = extractHeadingText(props?.children);

		const slug = generateSlug(heading ?? '');

		return <h3 id={slug} {...props}></h3>;
	},
	h4: ({ node, ...props }: any) => {
		const heading = extractHeadingText(props?.children);

		const slug = generateSlug(heading ?? '');

		return <h4 id={slug} {...props}></h4>;
	},
	img: MarkdownImage,
	strong: ({ node, ...props }: any) => {
		return (
			<strong
				style={{
					fontFamily: `Monaco, Spoqa Han Sans Neo, Noto Sans KR, sans-serif`,
					fontWeight: 600,
					verticalAlign: '0.5px',
					fontSize: '1rem',
				}}
				{...props}
			></strong>
		);
	},
	ul: ({ node, ...props }: any) => {
		return <ul {...props} style={{ listStyle: 'disc', marginLeft: '2rem', paddingBottom: '0.5rem' }}></ul>;
	},
};

const PostMarkdown = ({ content }: { content: string }) => {
	return <ReactMarkdown children={content.replace(/\n\s/gi, '\n\n&nbsp;\n\n')} components={MarkdownComponents} />;
};

export default PostMarkdown;
