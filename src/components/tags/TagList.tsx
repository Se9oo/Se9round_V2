import React, { memo, MouseEvent } from 'react';
import _ from 'lodash';
import router from 'next/router';
import TagItem from './TagItem';
import { PAGE_URLS } from '~/constants/url';

const equalCheck = (
	prevTags: { tags: string[]; customStyle?: string },
	nextTags: { tags: string[]; customStyle?: string },
) => {
	return _.isEqual(prevTags.tags, nextTags.tags);
};

const TagList = memo(
	({
		tags,
		customStyle,
		handleTagClick,
	}: {
		tags: string[];
		customStyle?: string;
		handleTagClick?: (e: MouseEvent, tagName: string) => void;
	}) => {
		const handleTags = (e: MouseEvent, tagName: string) => {
			e.stopPropagation();

			router.push(
				{
					pathname: `${PAGE_URLS.TAGS}`,
					query: { tagName },
				},
				`${PAGE_URLS.TAGS}`,
			);
		};

		return (
			<ul className={customStyle ? `flex ${customStyle}` : 'flex'}>
				{tags.map((tag) => {
					return (
						<li key={tag} className="mr-2 z-tag">
							<TagItem tag={tag} handleTagClick={handleTagClick || handleTags} />
						</li>
					);
				})}
			</ul>
		);
	},
	equalCheck,
);

export default TagList;
