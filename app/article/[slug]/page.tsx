import { readFileSync } from "fs"
import path from "path"

import matter from "gray-matter"

async function getArticle(slug: string) {
  return matter(readFileSync(path.join(process.cwd(), "articles", slug, "index.md")), "utf-8")
}

export default async function Article({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  console.log(article)
  return (
    <div>a</div>
  )
}