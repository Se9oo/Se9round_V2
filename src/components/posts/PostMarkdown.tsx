/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/self-closing-comp */

import React, { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';

import { generateSlug } from '~/utils/format';
import CodeBlock from './CodeBlock';

const MarkdownDarkComponent: object = {
	code({ inline, className, children, ...props }: { inline: boolean; className: string; children: ReactNode }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<CodeBlock children={children} match={match} />
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		);
	},
	blockquote({ children, ...props }: { children: ReactNode }) {
		return (
			<blockquote
				style={{
					background: '#282C34',
					padding: '1rem',
					borderLeft: '4px solid #439A97',
				}}
				{...props}
			>
				{children}
			</blockquote>
		);
	},
	a: (anchor: { href: string; children: Array<any> }) => {
		if (anchor.href.match('http')) {
			return (
				<a href={anchor.href} target="_blank" rel="noopener noreferrer">
					{anchor.children}
				</a>
			);
		}
		return <a href={anchor.href}>{anchor.children}</a>;
	},
	ol: ({ children, ...props }: { children: ReactNode }) => {
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
	h2: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h2 id={slug} {...props}></h2>;
	},
	h3: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h3 id={slug} {...props}></h3>;
	},
	h4: (props: any) => {
		const heading = props?.children.reduce((a: string, b: string) => a + b);

		const slug = generateSlug(heading ?? '');

		return <h4 id={slug} {...props}></h4>;
	},
};

const MarkdownLightComponent: object = {
	...MarkdownDarkComponent,
	blockquote({ children, ...props }: { children: ReactNode }) {
		return (
			<blockquote
				style={{
					background: '#F8F9FA',
					padding: '1rem',
					margin: '1rem 0',
					borderLeft: '4px solid #439A97',
				}}
				{...props}
			>
				{children}
			</blockquote>
		);
	},
};

const PostMarkdown = ({ content }: { content: string }) => {
	const { theme } = useTheme();

	return (
		<ReactMarkdown
			children={content.replace(/\n\s/gi, '\n\n&nbsp;\n\n')}
			components={theme === 'light' ? MarkdownLightComponent : MarkdownDarkComponent}
		/>
	);
};

export default PostMarkdown;
