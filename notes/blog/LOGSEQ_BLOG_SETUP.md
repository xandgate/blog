# Create the Blog project in Logseq

If MCP-Logseq is connected, you can ask the AI to create these pages. Otherwise, create them by hand in your graph **DevelopDigitally_RAG** so the structure matches this repo.

## Pages to create

Create these **pages** in Logseq (exact names so links resolve):

1. **Blog** (main project page)
   - Content: Short description that this is the blog project for review + drafts + sync to varunbaker.com. Repo: https://github.com/xandgate/blog
   - Links to: Blog/Index, Blog/Drafts, Blog/Summaries.

2. **Blog/Index**
   - Content: Table or list of all posts (title, slug, published, tag). Re-run `npm run blog:from-posts` and copy the table from `notes/blog/index.md` into this page, or use it as the source of truth in the repo and link to it.

3. **Blog/Drafts**
   - Content: Placeholder for draft posts. Each child block or page can be one draft (e.g. "my-next-post" with title, summary, body). To publish: export or copy to `notes/blog/drafts/<slug>.md` and run `npm run blog:to-posts`.

4. **Blog/Summaries**
   - Content: One block or page per published post with summary + link to full copy. Repo generates these in `notes/blog/summaries/<slug>.md`; you can copy key summaries here for quick review in Logseq.

## Optional: mirror repo folder in Logseq

If your Logseq graph is file-based (e.g. under `DevelopDigitally_RAG`), you can:

- Create a folder or page hierarchy: `Blog` → `Drafts`, `Summaries`, `Index`.
- Point the sync script at your graph:  
  `BLOG_SOURCE_PATH=/Users/admin/iCloudDrive/DevelopDigitally_RAG/pages/Blog/Drafts npm run blog:to-posts`  
  (adjust path to where Logseq stores pages in your setup.)

Then drafting under **Blog/Drafts** in Logseq can feed the same pipeline.

## After setup

- Run `npm run blog:from-posts` to refresh summaries and index in the repo.
- Use **Blog** as the single place in your notes for blog review and drafts; use the repo scripts to sync to the live site.
