import React from 'react';

const TagList = ({ tags, customStyle }: { tags: string[]; customStyle?: string }) => {
	return (
		<ul className={`flex ${customStyle}`}>
			{tags.map((tag) => {
				return (
					<li key={tag} className="mr-2 z-tag">
						<button type="button">
							<span className="rounded bg-main p-1 text-xs sm:text-sm font-medium text-white dark:text-darkText">
								{tag}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default TagList;
