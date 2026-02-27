# Blog › Drafts

Markdown drafts that sync to the site via `npm run blog:to-posts`.

- **Location in repo:** `notes/blog/drafts/*.md`
- **Output:** `src/app/blog/posts/<slug>.mdx`
- **Frontmatter (optional):** title, subtitle, summary, publishedAt, tag, image. Slug = filename without `.md`.

Add a new file here (e.g. `my-next-post.md`) with optional YAML frontmatter and body, then run:

```bash
npm run blog:to-posts
```

Link from: [[Blog]].
