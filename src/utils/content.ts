import fs from 'fs';
import path from 'path';
import supabase from '@/supabaseClient';
import { SUPABASE_BUCKET_NAME } from '@/constants/common';
import { PostFileType, PostMetaDataType } from '@/types/post';

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

	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

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
