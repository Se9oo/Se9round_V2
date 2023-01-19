import React, { ReactNode, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

import CopyIcon from '../icons/CopyIcon';
import CheckIcon from '../icons/CheckIcon';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

const CodeBlock = ({ children, match }: { children: ReactNode; match: RegExpExecArray }) => {
	const [showCopy, setShowCopy] = useState(false);
	const [isCopy, setIsCopy] = useState(false);

	const handleCopy = () => {
		setIsCopy(true);

		const copyText = String(children).replace(/\n$/, '');
		navigator.clipboard.writeText(copyText);
	};

	const handleMouseOnCode = (action: boolean) => {
		if (action) {
			setShowCopy(action);
			return;
		}

		setShowCopy(action);
		if (isCopy) {
			setTimeout(() => {
				setIsCopy(false);
			}, 500);
		}
	};

	return (
		<div
			className="relative"
			onMouseOver={() => handleMouseOnCode(true)}
			onMouseOut={() => handleMouseOnCode(false)}
			onFocus={() => handleMouseOnCode(true)}
			onBlur={() => handleMouseOnCode(false)}
		>
			<SyntaxHighlighter
				children={String(children).replace(/\n$/, '')}
				style={oneDark}
				language={match[1]}
				PreTag="div"
				customStyle={{
					padding: '48px 24px',
					borderRadius: 4,
				}}
			/>
			<button
				type="button"
				onClick={handleCopy}
				className={`${
					showCopy ? 'block' : 'hidden'
				} absolute top-3 right-3 border border-greyCopy p-1 rounded hover:bg-greyCopy`}
			>
				{isCopy ? <CheckIcon className="text-darkText" /> : <CopyIcon className="text-darkText" />}
			</button>
		</div>
	);
};

export default CodeBlock;
