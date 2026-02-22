import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Varun",
  lastName: "Baker",
  name: `Varun Baker`,
  role: "AI-Enabled Software Architect",
  avatar: "/images/avatar.jpg",
  email: "varun.baker+online@gmail.com",
  location: "America/New_York", // IANA timezone identifier for Eastern Time (New York)
  languages: ["English"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Insights on AI-augmented engineering, building 10x faster with modern tools,
      cloud architecture, and lessons from the frontier of human-AI collaboration
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/varunity",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/varunbaker",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/varunbaker",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – AI-Enabled Software Architect`,
  description: `Portfolio of ${person.name}: AI-augmented engineer shipping 100x faster through strategic architecture and modern AI tooling`,
  headline: (
    <>
      <Text as="span" size="xl" weight="strong">AI writes code.</Text>{" "}
      I architect outcomes.
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AI-Enabled Architect</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      The code is automated.{" "}
      The judgment is not.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} – shipping 100x faster with AI while keeping code quality high`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://calendar.app.google/Qs3vZMkb9JVjNT2g6",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a software architect focused on one simple leverage point: let AI write the code, while I do the work that actually compounds—system design, edge cases, and the decisions that prevent technical debt before it exists.
        <br /><br />
        With 15+ years shipping production software, I've led and built enterprise platforms for federal agencies and Fortune 500 companies. I know when AI is right, when it's wrong, and when judgment matters more than speed. I'm as comfortable setting technical direction with executives as I am debugging a race condition at 2 a.m.
        <br /><br />
        I'm currently exploring the frontier of AI-augmented engineering, building with Svelte, Python, and modern cloud infrastructure—and writing about what I learn along the way.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Express Scripts, The Cigna Group",
        timeframe: "June 2024 - December 2025",
        role: "Senior Software Engineer",
        achievements: [
          <>
            Senior technical lead for enterprise healthcare platforms in highly regulated
            environments, leading major version upgrades with full regression testing and
            zero-downtime deployments.
          </>,
          <>
            Owned release management across 15+ production deployments, including
            configuration synchronization, rollback planning, and deployment runbooks
            for mission-critical healthcare platforms.
          </>,
          <>
            Integrated enterprise identity solutions including SAML-based SSO and MFA
            across 8+ healthcare platforms, supporting thousands of authenticated users
            with HIPAA-compliant security measures.
          </>,
          <>
            Designed and maintained CI/CD pipelines supporting automated builds, tests,
            and deployments. Partnered with security teams on vulnerability remediation
            and CSP configurations.
          </>,
        ],
        images: [],
      },
      {
        company: "Zyxware Technologies",
        timeframe: "January 2019 - May 2024",
        role: "Senior Software Engineer (React/Full-Stack)",
        achievements: [
          <>
            Led modernization and migration of 30+ enterprise websites for Arizona
            Strategic Enterprise Technology (ASET) Office on cloud infrastructure,
            resulting in a 61% decrease in support costs.
          </>,
          <>
            Architected enterprise CMS distribution serving 170+ state agencies,
            conducting requirements gathering and designing scalable digital
            experience solutions.
          </>,
          <>
            Achieved 100% reduction of project delivery delays through improved CI/CD
            pipeline automation, deploying from git repositories to cloud hosting
            environments.
          </>,
          <>
            Rebuilt integrated document gateway for U.S. Department of Labor OCIO,
            implementing robust caching mechanisms and API integrations with Appian.
          </>,
          <>
            Led accessibility remediation efforts ensuring Section 508 and WCAG
            compliance across federal platforms, extending USWDS-based themes for
            federal frontend standards.
          </>,
        ],
        images: [],
      },
      {
        company: "Digital Development International LLC",
        timeframe: "November 2011 - December 2018",
        role: "CTO",
        achievements: [
          <>
            Developed and deployed Open Data Portals for the Governments of Jamaica
            and St. Lucia, later upgrading to modern decoupled architecture with
            React front-end.
          </>,
          <>
            Architected end-to-end AWS solutions (VPC, Route 53, RDS, EC2, ECS/EKS,
            S3, CloudWatch, CloudFront) for government and enterprise clients,
            processing large financial datasets with BI tools.
          </>,
          <>
            Designed custom APIs for mobile and desktop applications, authored
            automation scripts for load testing and security analysis to ensure
            high performance.
          </>,
        ],
        images: [],
      },
      {
        company: "OpenConcept Consulting Inc.",
        timeframe: "September 2008 - October 2011",
        role: "Software Consultant",
        achievements: [
          <>
            Developed customized web applications based on business requirements,
            working directly with clients through all implementation phases.
          </>,
          <>
            Built multilingual content platforms supporting English, French, Hebrew,
            and Arabic with bidirectional text rendering.
          </>,
          <>
            Implemented WCAG 2.0 accessibility standards across web applications,
            creating reusable installation profiles to accelerate project delivery.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education & Certifications",
    institutions: [
      {
        name: "University of the West Indies, Mona",
        description: (
          <>
            BSc. Computer Science and Electronics (double major), 2002-2006. Graduated
            with honors from the Faculty of Pure and Applied Sciences.
          </>
        ),
      },
      {
        name: "Acquia Certified Site Builder - Drupal 9",
        description: (
          <>
            Certified Drupal 9 Site Builder, demonstrating expertise in building and
            configuring Drupal sites using Acquia's platform and best practices.
          </>
        ),
      },
      {
        name: "Scrum Fundamentals Certified (SFC™)",
        description: (
          <>
            Certified in Scrum fundamentals, enabling effective agile project management
            and collaboration in cross-functional teams.
          </>
        ),
      },
      {
        name: "Udemy Machine Learning A-Z™",
        description: (
          <>
            Hands-On Python & R In Data Science certification, covering machine learning
            fundamentals and practical applications.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "AI-Augmented Development",
        description: (
          <>
            Leveraging AI coding assistants (Claude, Cursor, GitHub Copilot) to ship at 10-100x
            speed while maintaining code quality. Expert at prompt engineering, AI code review,
            and knowing when to trust AI output vs. when to intervene. Building workflows that
            combine AI speed with human judgment for zero-regret deployments.
          </>
        ),
        tags: [
          {
            name: "Claude",
            icon: "sparkle",
          },
          {
            name: "Cursor",
            icon: "code",
          },
          {
            name: "Copilot",
            icon: "github",
          },
        ],
        images: [],
      },
      {
        title: "Cloud Architecture & DevOps",
        description: (
          <>
            Designing and maintaining CI/CD pipelines for automated builds, tests, and
            zero-downtime deployments. Extensive AWS experience (VPC, Route 53, RDS, EC2,
            ECS/EKS, S3, CloudWatch, CloudFront). Infrastructure as code with Terraform,
            container orchestration, and platform optimization at scale.
          </>
        ),
        tags: [
          {
            name: "AWS",
            icon: "aws",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "CI/CD",
            icon: "git",
          },
        ],
        images: [],
      },
      {
        title: "Full-Stack Engineering",
        description: (
          <>
            Building end-to-end applications with modern frameworks. Frontend expertise in
            Svelte, React, and TypeScript. Backend proficiency in Python and Node.js. Comfortable
            across the entire stack from database design to pixel-perfect UI implementation.
          </>
        ),
        tags: [
          {
            name: "Svelte",
            icon: "code",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "React",
            icon: "react",
          },
        ],
        images: [],
      },
      {
        title: "System Design & Architecture",
        description: (
          <>
            Designing scalable, maintainable systems that stand the test of time. Expert at
            identifying technical debt before it accumulates, making build-vs-buy decisions,
            and translating business requirements into robust technical solutions. Experience
            leading enterprise platform migrations and major version upgrades.
          </>
        ),
        tags: [
          {
            name: "Architecture",
            icon: "grid",
          },
          {
            name: "APIs",
            icon: "code",
          },
        ],
        images: [],
      },
      {
        title: "Security & Compliance",
        description: (
          <>
            Implementing enterprise security solutions including SAML, OAuth2, MFA, and IAM.
            Experience with HIPAA compliance, federal security requirements, and vulnerability
            remediation. Public Trust clearance experience supporting mission-critical systems.
          </>
        ),
        tags: [
          {
            name: "OAuth2",
            icon: "lock",
          },
          {
            name: "SAML",
            icon: "lock",
          },
        ],
        images: [],
      },
      {
        title: "Enterprise CMS & Web Platforms",
        description: (
          <>
            Deep experience building and maintaining enterprise content platforms for federal
            agencies and regulated industries. Expert in accessibility (WCAG/508), performance
            optimization, and coordinating with hosting vendors for mission-critical deployments.
          </>
        ),
        tags: [
          {
            name: "CMS",
            icon: "grid",
          },
          {
            name: "Accessibility",
            icon: "accessibility",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI-augmented engineering and building at 100x speed",
  description: `Lessons from the frontier of AI-assisted development: what works, what doesn't, and how senior engineers can leverage AI to ship faster without sacrificing quality`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
