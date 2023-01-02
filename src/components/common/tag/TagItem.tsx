import React from 'react';

const TagItem = ({ tag }: { tag: string }) => {
	return (
		<button type="button">
			<span className="rounded bg-main px-2 py-1 text-xs sm:text-sm font-medium text-white dark:text-darkText">
				{tag}
			</span>
		</button>
	);
};

export default TagItem;
