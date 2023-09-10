import { readFileSync, readdirSync } from "fs"
import path from "path"

import Link from "next/link"

import matter from "gray-matter"

async function getArticles() {
  const currentPostsDir = path.join(process.cwd(), "articles")
  const postDirs = readdirSync(currentPostsDir)
  return postDirs.map((slug) => {
    const { data } = matter(readFileSync(path.join(currentPostsDir, slug, "index.md"), "utf-8"))
    return {
      slug,
      data,
    }
  })
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <div className="my-8">
      {articles.map(v => (
        <div key={v.slug}>
          <Link href={`/article/${v.slug}`}>{v.data.title}</Link>
        </div>
      ))}
    </div>
  )

}