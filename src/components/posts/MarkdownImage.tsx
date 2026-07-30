'use client';

import React from 'react';

const openImage = (src: string) => () => window.open(src);

const MarkdownImage = (props: any) => {
	const { src, alt } = props;
	return (
		<img
			src={src}
			alt={alt}
			style={{ margin: '0 auto', cursor: 'pointer' }}
			onClick={openImage(src)}
			onKeyDown={openImage(src)}
		/>
	);
};

export default MarkdownImage;
