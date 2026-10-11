import rehypeShiki from "@shikijs/rehype";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
    content: { type: "text", value: "#" },
  })
  .use(rehypeShiki, {
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
    transformers: [
      {
        name: "language-label",
        pre(node) {
          node.properties["data-language"] = this.options.lang;
        },
      },
    ],
  })
  .use(rehypeStringify);

/** Markdown to HTML at build time. Code is highlighted here, so no highlighter ships to the browser. */
export async function renderMarkdown(markdown: string): Promise<string> {
  return String(await processor.process(markdown));
}
