export interface PostMetaDataType {
	title: string;
	description: string;
	date: string;
	tags: string[];
	socialImage: string | null;
	timestamp: number;
	categories?: string[];
}

export interface PostDataType {
	metaData: PostMetaDataType;
	content: string;
}

export interface PostFileType {
	fileName: string;
	data: PostMetaDataType;
}
