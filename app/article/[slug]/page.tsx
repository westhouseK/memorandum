import { readFileSync } from "fs"
import path from "path"

import { createElement, Fragment } from "react";

import Image from 'next/image';

import matter from "gray-matter"
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import { MyLink } from "@/components/MyLink";

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

const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: MyLink
      }
    })
    .processSync(content).result
}

export default async function Article({ params }: { params: { slug: string } }) {
  const { data, content } = await getArticle(params.slug)
  return (
    <div className="prose prose-lg max-w-none mb-12">
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
      {toReactNode(content)}
    </div>
  )
}