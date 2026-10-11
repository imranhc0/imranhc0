# Content

Everything on the site that changes over time lives here as markdown. There is no database or CMS: commit a file, push, and the site rebuilds.

```
content/
├── posts/       → /blog/<file-name>
└── projects/    → /projects/<file-name>
```

## Add a blog post

1. Copy `posts/_template.md` to `posts/your-post-slug.md`.
2. Fill in the frontmatter (`title`, `description` and `date` are required).
3. Write the post in markdown. Code blocks are syntax-highlighted at build time.
4. Preview with `npm run dev` (drafts are visible there), remove `draft: true`, then commit and push.

## Add a project

Same flow with `projects/_template.md`. Required fields: `title`, `summary`, `role`, `domain`. Set `featured: true` to show it on the home page and use `order` to sort.

## Rules

- File names become URLs, so use lowercase words separated by hyphens.
- Files starting with `_` are ignored.
- If a required field is missing, `npm run build` fails and names the file, so a broken post never ships.
- Images go in `public/images/` and are referenced as `/images/name.png`.

## Other things you can edit

- Profile, experience, stack and education: `lib/profile.ts`.
- CV: put the PDF at `public/resume.pdf` and a "CV" link appears in the header and hero automatically.
