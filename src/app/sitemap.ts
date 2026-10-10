import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  // Unlisted drafts are excluded so they aren't indexed before publication
  const blogs = getPosts(["src", "app", "blog", "posts"])
    .filter((post) => post.metadata.published !== false)
    .map((post) => ({
      url: `${baseURL}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

  const works = getPosts(["src", "app", "work", "projects"])
    .filter((post) => post.metadata.published !== false)
    .map((post) => ({
      url: `${baseURL}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...works];
}
