'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { PostFileType } from '@/types/post';
import { getFormattedDate, convertSpaceToDash } from '@/utils/format';
import { PAGE_URLS } from '@/constants/url';

const DocsCategories = ({ posts }: { posts: PostFileType[] }) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const pathParam = searchParams.get('c') ?? '';
	const currentPath = pathParam ? pathParam.split(',') : [];
	const depth = currentPath.length;

	const postsAtPath = posts.filter((post) => {
		const cats = post.data.categories ?? [];
		return currentPath.every((seg, i) => cats[i] === seg);
	});

	const postRows = postsAtPath
		.filter((post) => (post.data.categories?.length ?? 0) <= depth)
		.sort((a, b) => b.data.timestamp - a.data.timestamp);

	const subCategoryMap = postsAtPath.reduce<Record<string, number>>((acc, post) => {
		const nextSeg = post.data.categories?.[depth];
		if (nextSeg) acc[nextSeg] = (acc[nextSeg] ?? 0) + 1;
		return acc;
	}, {});
	const folderRows = Object.entries(subCategoryMap).sort(([a], [b]) => a.localeCompare(b));

	const navigateTo = (seg: string) => {
		router.push(`/docs?c=${[...currentPath, seg].join(',')}`);
	};

	const navigateToBreadcrumb = (index: number) => {
		if (index < 0) router.push('/docs');
		else router.push(`/docs?c=${currentPath.slice(0, index + 1).join(',')}`);
	};

	return (
		<>
			<nav className="mt-8 flex items-center gap-2 text-sm text-greyCopy sm:mt-16">
				<button type="button" className="hover:text-main" onClick={() => navigateToBreadcrumb(-1)}>
					DOCS
				</button>
				{currentPath.map((seg, i) => (
					<span key={seg} className="flex items-center gap-1">
						<span>/</span>
						<button
							type="button"
							className={i === currentPath.length - 1 ? 'font-bold text-main' : 'hover:text-main'}
							onClick={() => navigateToBreadcrumb(i)}
						>
							{seg}
						</button>
					</span>
				))}
			</nav>

			<ul className="mt-6 divide-y divide-greyLight dark:divide-greyCopy">
				{folderRows.map(([seg, count]) => (
					<li key={seg}>
						<button
							type="button"
							onClick={() => navigateTo(seg)}
							className="group flex w-full items-center justify-between py-4 transition-all hover:border-main
								hover:text-main"
						>
							<span className="flex items-center gap-3">
								<span className="text-base font-bold">{seg}</span>
								<span className="rounded-full bg-greyLight px-2 py-0.5 text-xs text-greyCopy dark:bg-dark">
									{count}
								</span>
							</span>
							<ChevronRightIcon className="text-greyCopy group-hover:text-main" />
						</button>
					</li>
				))}

				{postRows.map((post) => (
					<li key={post.fileName}>
						<Link
							href={`${PAGE_URLS.POST}/${convertSpaceToDash(post.data.title)}`}
							className="group flex w-full items-center justify-between py-4 transition-all"
						>
							<span className="text-base group-hover:text-main">{post.data.title}</span>
							<span className="ml-4 shrink-0 text-sm text-greyCopy">{getFormattedDate(post.data.date, 'hyphen')}</span>
						</Link>
					</li>
				))}

				{folderRows.length === 0 && postRows.length === 0 && (
					<li className="py-24 text-center text-greyCopy">카테고리를 선택해 주세요</li>
				)}
			</ul>
		</>
	);
};

export default DocsCategories;
