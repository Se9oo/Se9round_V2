import React, { memo } from 'react';
import _ from 'lodash';
import TagItem from './TagItem';

const equalCheck = (
	prevTags: { tags: string[]; customStyle?: string },
	nextTags: { tags: string[]; customStyle?: string },
) => {
	return _.isEqual(prevTags.tags, nextTags.tags);
};

const TagList = memo(({ tags, customStyle }: { tags: string[]; customStyle?: string }) => {
	return (
		<ul className={`${customStyle ? `flex ${customStyle}` : 'flex'} flex-wrap`}>
			{tags.map((tag) => {
				return (
					<li key={tag} className="mr-2 mb-2 z-tag">
						<TagItem tag={tag} />
					</li>
				);
			})}
		</ul>
	);
}, equalCheck);

export default TagList;
