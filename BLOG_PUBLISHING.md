# Blog publishing from notes (Logseq + automation)

This doc describes how to **publish and edit your blog from your notes** using the **blog** project in this repo and, when available, **MCP-Logseq**.

---

## Am I connected to MCP-Logseq?

**In this session:** The agent may or may not have MCP-Logseq tools available. That depends on your Cursor MCP configuration:

- If **MCP-Logseq** is configured in Cursor (e.g. in Cursor Settings → MCP, or `~/.cursor/mcp.json`), the AI can list pages, read/write blocks, and search your Logseq graph.
- If not, you can still use the **file-based** workflow below: edit markdown in `notes/blog/` and run the sync scripts.

To enable MCP-Logseq in Cursor, add a server entry in your MCP config (e.g. Cursor Settings → MCP, or `~/.cursor/mcp.json`) pointing at your Logseq graph path. Example (adjust paths to your setup):

```json
{
  "mcpServers": {
    "logseq": {
      "command": "node",
      "args": [
        "/path/to/mcp-logseq/dist/server.js",
        "/path/to/your/logseq/graph"
      ]
    }
  }
}
```

Restart Cursor after adding the config so the Logseq tools are available.  
See [MCP-Logseq](https://gitlab.com/varunbaker/mcp-logseq) for setup.

**Syncing from the same graph:** To run `npm run blog:to-posts` from a folder inside your Logseq graph (e.g. where you keep blog drafts), set `BLOG_SOURCE_PATH` or `LOGSEQ_BLOG_PATH` to that folder path. Once enabled, you can ask the agent to "create a Blog project in my notes" or "list my Logseq pages under Blog."

---

## The blog project in this repo

**Repo:** [github.com/xandgate/blog](https://github.com/xandgate/blog)

The **blog** project lives under `notes/blog/`:

| Path | Purpose |
|------|--------|
| `notes/blog/README.md` | Overview and workflow |
| `notes/blog/drafts/` | Markdown drafts → synced to `src/app/blog/posts/*.mdx` |
| `notes/blog/summaries/` | Generated: one `.md` per post (summary + full copy) for review |
| `notes/blog/index.md` | Generated: index of all posts with slugs and metadata |

You can treat `notes/blog/` as the single place to **review** and **draft**; the site reads from `src/app/blog/posts/*.mdx`.

---

## Automation scripts

### 1. Export post summaries and copies (for review in notes)

**Command:** `npm run blog:from-posts`

- **Reads:** `src/app/blog/posts/*.mdx`
- **Writes:**  
  - `notes/blog/summaries/<slug>.md` for each post (title, metadata, summary, full markdown copy)  
  - `notes/blog/index.md` (table of all posts with slug, published date, tag)

Use this to get **blog post summaries and copies** into your notes for easy review and editing. Re-run after publishing new posts to refresh the copies.

### 2. Sync drafts to the site (notes → blog posts)

**Command:** `npm run blog:to-posts`

- **Reads:** Markdown from:
  - **Default:** `notes/blog/drafts/*.md`
  - **Override:** set `BLOG_SOURCE_PATH` or `LOGSEQ_BLOG_PATH` to another folder (e.g. a Logseq graph subfolder)
- **Writes:** `src/app/blog/posts/<slug>.mdx` (slug = filename without `.md`)

Draft frontmatter (optional): `title`, `subtitle`, `summary`, `publishedAt`, `tag`, `image`. If missing, slug is derived from the filename and defaults are used (e.g. today’s date for `publishedAt`).

**Example:**  
`notes/blog/drafts/my-new-post.md` → `src/app/blog/posts/my-new-post.mdx`.

**Sync from Logseq (or another folder):**

```bash
BLOG_SOURCE_PATH=/path/to/logseq/graph/pages/Blog npm run blog:to-posts
```

Use the same path you use for MCP-Logseq if you keep draft pages under a "Blog" page/folder in Logseq.

---

## Workflows

### A. Review and edit using notes only (no MCP)

1. Run **`npm run blog:from-posts`** to generate summaries and copies in `notes/blog/summaries/` and `index.md`.
2. Open `notes/blog/summaries/<slug>.md` to review or edit the **full copy** in markdown.
3. When you want to update the live post: copy the body (and any frontmatter) into a file in `notes/blog/drafts/<slug>.md`, then run **`npm run blog:to-posts`**.
4. Check `src/app/blog/posts/<slug>.mdx`, then commit and deploy.

### B. Draft in notes, sync to site

1. Create `notes/blog/drafts/my-post.md` with optional YAML frontmatter and markdown body.
2. Run **`npm run blog:to-posts`**.
3. Review `src/app/blog/posts/my-post.mdx`, add images under `public/images/blog/` if needed, then commit and deploy.

### C. With MCP-Logseq: blog project in Logseq

1. **Create a Blog project in Logseq** (e.g. a page "Blog" and child pages or a folder for drafts).
2. **Summaries/copies:** Ask the AI to run `npm run blog:from-posts` and then to create or update notes in your Logseq graph from `notes/blog/summaries/` (e.g. "Create a summary note for each post in my Blog project").
3. **Draft in Logseq:** Write or edit draft posts as pages/blocks under Blog. When ready, either:
   - **Option 1:** Export or copy those pages into `notes/blog/drafts/<slug>.md`, then run **`npm run blog:to-posts`**.
   - **Option 2:** Point the script at your graph:  
     `LOGSEQ_BLOG_PATH=/path/to/graph/pages/Blog npm run blog:to-posts`  
     (if your graph stores markdown files under that path).
4. Review generated MDX, commit, deploy.

### D. CI/CD (optional)

To automate "publish from notes" on push:

- In CI, run `npm run blog:to-posts` with `BLOG_SOURCE_PATH` or `LOGSEQ_BLOG_PATH` set to a path that’s available in that environment (e.g. a checked-out submodule or a mounted volume with exported Logseq markdown). Then run `npm run build` and deploy.

---

## Summary

| Goal | Command / step |
|------|-----------------|
| Get summaries and copies of all posts into notes | `npm run blog:from-posts` |
| Sync markdown drafts → live blog MDX | `npm run blog:to-posts` |
| Use a different draft folder (e.g. Logseq) | `BLOG_SOURCE_PATH=/path/to/drafts npm run blog:to-posts` |
| Create a "blog" project in Logseq | Use MCP-Logseq when enabled; or create a "Blog" page/folder manually and point `BLOG_SOURCE_PATH` at its path |

The **blog** project in `notes/blog/` and these two scripts give you a single, review-friendly pipeline from notes (and optionally Logseq) to published posts on your site.
