# Blog project (notes)

**Repo:** [github.com/xandgate/blog](https://github.com/xandgate/blog)

This folder is the **blog project** for your notes. Use it to:

- **Review** — Generated summaries and markdown copies of published posts (run `npm run blog:from-posts`).
- **Draft** — Write or edit posts in markdown here; sync to the site with `npm run blog:to-posts` (see [Blog publishing workflow](../../BLOG_PUBLISHING.md)).

## Structure

```
notes/blog/
├── README.md           # This file
├── Blog.md             # Blog project hub (links to Index, Drafts, Summaries)
├── Blog/
│   ├── Index.md        # Pointer to index of all posts
│   ├── Drafts.md       # Where to put drafts; sync with npm run blog:to-posts
│   └── Summaries.md    # Where generated summaries live
├── LOGSEQ_BLOG_SETUP.md # How to mirror this structure in Logseq
├── drafts/             # Markdown drafts → synced to src/app/blog/posts/*.mdx
├── summaries/          # One file per post: summary + copy for easy review (generated)
└── index.md            # Index of all posts (generated)
```

## Workflow with Logseq (MCP-Logseq)

When **MCP-Logseq** is enabled in Cursor:

1. Create a **Blog** project (or page) in your Logseq graph and use it for draft posts and outlines.
2. Use the AI assistant to create blog post summaries and copies from your published posts into Logseq for review.
3. Use the same assistant to create or edit draft posts in Logseq; then either copy content into `drafts/` and run `npm run blog:to-posts`, or point the sync script at your Logseq graph path (see BLOG_PUBLISHING.md).

## Workflow without MCP (file-based)

1. **Export copies for review:**  
   `npm run blog:from-posts`  
   Writes summaries and full markdown copies into `summaries/`.

2. **Draft in markdown:**  
   Add or edit files in `drafts/` with optional YAML frontmatter (`title`, `summary`, `publishedAt`, `tag`, `image`). Use the same filename (slug) as the target post, e.g. `my-new-post.md`.

3. **Sync drafts to site:**  
   `npm run blog:to-posts`  
   Converts `drafts/*.md` to `src/app/blog/posts/*.mdx` (with frontmatter). New files are created; existing posts are updated only if the draft exists.

4. **Review** the generated MDX in `src/app/blog/posts/`, then commit and deploy.

See **BLOG_PUBLISHING.md** in the repo root for full automation details and MCP-Logseq setup.
