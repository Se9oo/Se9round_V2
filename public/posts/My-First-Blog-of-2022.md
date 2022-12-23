---
title: 'My First Blog of 2022'
metaTitle: 'My First blog of 2022'
description: 'How to make a blogging website using Next.js, Markdown and style it using TailwindCSS.'
socialImage: images/pic1.jpg
date: '2022-02-02'
tags:
  - nextjs
  - personal
  - health
  - work
  - react
---

# The main content

# One morning, when Gregor Samsa woke from troubled dreams.

## h2h2h2

### h3h3h3
  
One morning, when Gregor Samsa woke from troubled
One morning, when Gregor Samsa woke from troubled
One morning, when Gregor Samsa woke from troubled


> 인용문이다


아자차카타파하


```javascript
const a = 1234;
```

```jsx
const Post = (props: PostDataType) => {
	return (
		<MainLayout>
			<PostDetail postData={props} />
		</MainLayout>
	);
};

export default Post;
```

```javascript
export const getStaticPaths = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);

	const paths = files.map((file) => {
		const content = fs
		.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8');

		const parsedContent = matter(content);

		const { data } = parsedContent;
		const { title } = data as PostMetaDataType;

		return {
			params: {
				title: convertSpaceToDash(title),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};
```
