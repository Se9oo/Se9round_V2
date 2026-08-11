import fs from 'fs';
import path from 'path';
import supabase from '@/supabaseClient';
import { SUPABASE_BUCKET_NAME } from '@/constants/common';
import { PostFileType, PostMetaDataType } from '@/types/post';
import { convertSpaceToDash } from '@/utils/format';

const TECH_DIR = path.join(process.cwd(), 'src/content/posts/tech');
const DOCS_DIR = path.join(process.cwd(), 'src/content/posts/docs');

const resolveThumbnail = (socialImageName: string | null): string => {
	const {
		data: { publicUrl },
	} = supabase.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(socialImageName || 'default.png');
	return publicUrl;
};

export const importPostModule = (section: 'tech' | 'docs', fileName: string) =>
	section === 'tech' ? import(`@/content/posts/tech/${fileName}.mdx`) : import(`@/content/posts/docs/${fileName}.mdx`);

const loadFromDir = async (dir: string, section: 'tech' | 'docs'): Promise<PostFileType[]> => {
	if (!fs.existsSync(dir)) return [];

	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_') && !f.startsWith('.'));

	return Promise.all(
		files.map(async (file) => {
			const slug = file.replace('.mdx', '');
			const mod = await importPostModule(section, slug);

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

export const getDocsPostMetadataList = (): Promise<PostFileType[]> => loadFromDir(DOCS_DIR, 'docs');

export const getAllPostMetadataList = async (): Promise<PostFileType[]> => {
	const [tech, docs] = await Promise.all([getTechPostMetadataList(), getDocsPostMetadataList()]);
	return [...tech, ...docs];
};

export const getFileNameBySlug = async (
	slug: string,
): Promise<{ fileName: string; section: 'tech' | 'docs' } | undefined> => {
	const sections: Array<{ dir: string; section: 'tech' | 'docs' }> = [
		{ dir: TECH_DIR, section: 'tech' },
		{ dir: DOCS_DIR, section: 'docs' },
	];

	for (const { dir, section } of sections) {
		if (!fs.existsSync(dir)) continue;

		const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'));

		for (const file of files) {
			const fileName = file.replace('.mdx', '');
			const mod = await importPostModule(section, fileName);
			if (convertSpaceToDash(mod.metadata?.title) === slug) return { fileName, section };
		}
	}

	return undefined;
};
