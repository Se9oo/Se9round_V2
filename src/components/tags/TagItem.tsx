import React, { MouseEvent } from 'react';

const TagItem = ({
	tag,
	handleTagClick,
}: {
	tag: string;
	handleTagClick?: (e: MouseEvent, tagName: string) => void;
}) => {
	return (
		<button type="button" onClick={handleTagClick ? (e) => handleTagClick(e, tag) : undefined}>
			<span className="rounded bg-main px-2 py-1 text-xs sm:text-sm font-medium text-white dark:text-darkText">
				{tag}
			</span>
		</button>
	);
};

export default TagItem;
