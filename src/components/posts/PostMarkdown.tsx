/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/self-closing-comp */

import React, { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

import { generateSlug } from '~/utils/format';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

const MarkdownDarkComponent: object = {
	code({ inline, className, children, ...props }: { inline: boolean; className: string; children: ReactNode }) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter
				children={String(children).replace(/\n$/, '')}
				style={oneDark}
				language={match[1]}
				PreTag="div"
				customStyle={{
					padding: '24px',
					borderRadius: 4,
				}}
			/>
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
			// children={content.replace(/\n\s/gi, '\n&nbsp;\n\n')}
			remarkPlugins={[remarkBreaks]}
			children={content}
			components={theme === 'light' ? MarkdownLightComponent : MarkdownDarkComponent}
		/>
	);
};

export default PostMarkdown;
