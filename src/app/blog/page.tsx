import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp, PersonalizedBlogHeading, PersonalizedPosts } from "@/components";
import { baseURL, blog, person, newsletter } from "@/resources";
import { getPosts, getPostsDir } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default async function Blog() {
  // Fetch blog posts server-side
  const allBlogPosts = getPosts(getPostsDir()).filter(
    (post) => post.metadata.published !== false
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PersonalizedBlogHeading
        fallbackTitle={blog.title}
        fallbackDescription={blog.description}
        bySegment={blog.headingBySegment}
      />
      <Column fillWidth flex={1} gap="40">
        <PersonalizedPosts range={[1, 1]} thumbnail posts={allBlogPosts} />
        <PersonalizedPosts range={[2, 3]} columns="2" thumbnail direction="column" posts={allBlogPosts} />
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <PersonalizedPosts range={[4]} columns="2" posts={allBlogPosts} />
      </Column>
    </Column>
  );
}
