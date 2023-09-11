import { readFileSync } from "fs"
import path from "path"

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
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  )
}