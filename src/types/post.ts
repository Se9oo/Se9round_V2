export interface PostMetaDataType {
	title: string;
	description: string;
	date: string;
	tags: string[];
	socialImage: string;
}

export interface PostFileType {
	fileName: string;
	data: PostMetaDataType;
}

export interface PostDataType {
	metaData: PostMetaDataType;
	content: string;
}
