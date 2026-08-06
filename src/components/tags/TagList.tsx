import { memo } from 'react';
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
		<ul className={`${customStyle ? `flex ${customStyle}` : 'flex'} flex-wrap gap-2`}>
			{tags.map((tag) => {
				return (
					<li key={tag} className="z-tag">
						<TagItem tag={tag} />
					</li>
				);
			})}
		</ul>
	);
}, equalCheck);

export default TagList;
