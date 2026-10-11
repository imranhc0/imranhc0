---
# Copy this file to `my-post-slug.md`. The file name becomes the URL: /blog/my-post-slug
# Files starting with "_" are never published.
title: Your post title
description: One or two sentences. Used in the post list, RSS and link previews.
date: 2026-10-11
# updated: 2026-10-20
tags: [architecture, backend]
draft: true # drafts show in `npm run dev` only. Remove this line to publish.
---

Open with the point of the post. No need to repeat the title.

## A section heading

Regular **markdown** with GitHub extensions: tables, task lists, ~~strikethrough~~ and footnotes[^1].

```ts
// Code blocks are highlighted at build time. Put the language after the backticks.
export function hello(name: string): string {
  return `Hello, ${name}`;
}
```

| Column | Another |
| ------ | ------- |
| Tables | work    |

![Alt text describing the image](/images/example.png)

[^1]: Put images in `public/images/` and reference them as `/images/file.png`.
