import { readFileSync, readdirSync } from "fs"
import path from "path"

import Image from "next/image"
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
  }).sort((a, b) => {
    // 投稿日時の昇順
    return new Date(a.data.createdAt) < new Date(b.data.createdAt) ? 1 : -1
  })
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {articles.map(v => (
          <Link href={`/article/${v.slug}`} key={v.slug}>
            <div className="border rounded-lg">
              <Image
                src={`/image/${v.slug}/main_visual.jpg`}
                width={1200}
                height={700}
                alt={v.data.title}
              />
            </div>
            <div className="px-2 py-4">
              <h1 className="font-bold text-lg">{v.data.title}</h1>
              <span>{v.data.createdAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

}