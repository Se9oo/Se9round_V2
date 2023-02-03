import React, { MouseEvent } from 'react';

const TagItem = ({
	tag,
	handleTagClick,
}: {
	tag: string;
	handleTagClick?: (e: MouseEvent, tagName: string) => void;
}) => {
	return (
		<button
			type="button"
			onClick={handleTagClick ? (e) => handleTagClick(e, tag) : undefined}
			className="block rounded-[4px] bg-main px-2 py-[0.5px]"
		>
			<span className="text-xs sm:text-sm font-bold text-white dark:text-darkText">{tag}</span>
		</button>
	);
};

export default TagItem;
