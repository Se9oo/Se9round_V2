import React from 'react';
import TagItem from './TagItem';

const TagList = ({ tags, customStyle }: { tags: string[]; customStyle?: string }) => {
	return (
		<ul className={`flex ${customStyle}`}>
			{tags.map((tag) => {
				return (
					<li key={tag} className="mr-2 z-tag">
						<TagItem tag={tag} />
					</li>
				);
			})}
		</ul>
	);
};

export default TagList;
