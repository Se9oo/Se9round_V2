'use client';

import { useState, useRef } from 'react';
import CopyIcon from '../icons/CopyIcon';
import CheckIcon from '../icons/CheckIcon';

const CodePre = ({ children, style, className, ...props }: React.ComponentPropsWithoutRef<'pre'>) => {
	const [showCopy, setShowCopy] = useState(false);
	const [isCopy, setIsCopy] = useState(false);
	const preRef = useRef<HTMLPreElement>(null);

	const handleCopy = () => {
		navigator.clipboard.writeText(preRef.current?.textContent ?? '');
		setIsCopy(true);
	};

	const handleMouseLeave = () => {
		setShowCopy(false);
		if (isCopy) setTimeout(() => setIsCopy(false), 500);
	};

	return (
		<div
			className="relative"
			onMouseEnter={() => setShowCopy(true)}
			onMouseLeave={handleMouseLeave}
			onFocus={() => setShowCopy(true)}
			onBlur={handleMouseLeave}
		>
			<pre
				ref={preRef}
				{...props}
				className={className}
				style={{
					...style,
					overflowX: 'auto',
				}}
			>
				{children}
			</pre>
			<button
				type="button"
				onClick={handleCopy}
				className={`${showCopy ? 'block' : 'hidden'} absolute top-3 right-3 rounded border border-greyCopy p-1
					hover:bg-greyCopy`}
			>
				{isCopy ? <CheckIcon className="text-darkText" /> : <CopyIcon className="text-darkText" />}
			</button>
		</div>
	);
};

export default CodePre;
