import fs from 'fs';
import path from 'path';
import supabase from '@/supabaseClient';
import { SUPABASE_BUCKET_NAME } from '@/constants/common';
import { PostFileType, PostMetaDataType } from '@/types/post';
import { convertSpaceToDash } from '@/utils/format';

const TECH_DIR = path.join(process.cwd(), 'src/content/posts/tech');
const CONCEPTS_DIR = path.join(process.cwd(), 'src/content/posts/concepts');

const resolveThumbnail = (socialImageName: string | null): string => {
	const {
		data: { publicUrl },
	} = supabase.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(socialImageName || 'default.png');
	return publicUrl;
};

const loadFromDir = async (dir: string, section: 'tech' | 'concepts'): Promise<PostFileType[]> => {
	if (!fs.existsSync(dir)) return [];

	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_') && !f.startsWith('.'));

	return Promise.all(
		files.map(async (file) => {
			const slug = file.replace('.mdx', '');
			const mod =
				section === 'tech'
					? await import(`@/content/posts/tech/${slug}.mdx`)
					: await import(`@/content/posts/concepts/${slug}.mdx`);

			const rawMeta: PostMetaDataType = mod.metadata;

			return {
				fileName: slug,
				data: {
					...rawMeta,
					socialImage: resolveThumbnail(rawMeta.socialImage),
				},
			};
		}),
	);
};

export const getTechPostMetadataList = (): Promise<PostFileType[]> => loadFromDir(TECH_DIR, 'tech');

export const getConceptsPostMetadataList = (): Promise<PostFileType[]> =>
	loadFromDir(CONCEPTS_DIR, 'concepts');

export const getAllPostMetadataList = async (): Promise<PostFileType[]> => {
	const [tech, concepts] = await Promise.all([getTechPostMetadataList(), getConceptsPostMetadataList()]);
	return [...tech, ...concepts];
};

export const getFileNameBySlug = async (slug: string): Promise<string | undefined> => {
	const files = fs.readdirSync(TECH_DIR).filter((f) => f.endsWith('.mdx'));
	for (const file of files) {
		const name = file.replace('.mdx', '');
		const mod = await import(`@/content/posts/tech/${name}.mdx`);
		if (convertSpaceToDash(mod.metadata?.title) === slug) return name;
	}
	return undefined;
};
