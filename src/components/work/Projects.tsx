"use client";

import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { usePersonalizedContent, type PostData } from "@/components/PersonalizedContent";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  posts: PostData[]; // Required: posts must be fetched server-side and passed as props
}

/**
 * Projects component with optional content-based personalization.
 * Reorders projects to show most relevant first based on visitor context.
 */
export function Projects({ range = [1], exclude = [], posts }: ProjectsProps) {
  // Use personalized content ordering if enabled
  const displayedProjects = usePersonalizedContent(posts, range, exclude);

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images || []}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={(post.metadata.team as Array<{avatar: string}> | undefined)?.map((member) => ({ src: member.avatar })) || []}
          link={(post.metadata.link as string) || ""}
        />
      ))}
    </Column>
  );
}
