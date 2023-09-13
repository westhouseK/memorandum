import { readFileSync } from "fs"
import path from "path"

import Image from 'next/image';

import matter from "gray-matter"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"


async function getArticle(slug: string) {
  const { data, content } = matter(readFileSync(path.join(process.cwd(), "articles", slug, "index.md")))
  return {
    data,
    content: (await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content)).toString()
  }
}

export default async function Article({ params }: { params: { slug: string } }) {
  const { data, content } = await getArticle(params.slug)
  return (
    <div className="prose prose-lg max-w-none">
      <div>
        <Image
          src={`/image/${params.slug}/main_visual.jpg`}
          width={1200}
          height={700}
          alt={data.title}
        />
      </div>
      <h1 className="mt-12">{data.title}</h1>
      <span className="block">作成日時: {data.createdAt}</span>
      <span className="block">更新日時: {data.updatedAt}</span>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}