import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Varun",
  lastName: "Baker",
  name: `Varun Baker`,
  role: "Enterprise Architect",
  avatar: "/images/avatar.jpg",
  email: "varun.baker+online@gmail.com",
  location: "America/New_York", // IANA timezone identifier for Eastern Time (New York)
  languages: ["English, Italian"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Newsletter, TBD</>,
  description: (
    <>
      No newsletter yet—I'll start one if there's interest. Sign up to vote yes.
      Topics: enterprise and civic tech, modern tooling, and what actually works
      when shipping production systems.
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
  title: `${person.name} – Software Architect`,
  description: `Portfolio of ${person.name}: Enterprise platform modernization, accessibility & GovTech specialist`,
  headline: (
    <>
      <Text as="span" size="xl" weight="strong">Architecting complex systems that matter.</Text>
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Enterprise Architect</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/modernizing-data-visualization",
  },
  subline: (
    <>Information architect for mission-critical systems.
    </>
  ),
  headlineBySegment: {
    govtech: (
      <>
        <Text as="span" size="xl" weight="strong">Architecting complex systems that matter.</Text>
      </>
    ),
    "ai-enabled": (
      <>
        <Text as="span" size="xl" weight="strong">AI-augmented information architect for public and enterprise systems.</Text>
      </>
    ),
  },
  sublineBySegment: {
    govtech: (
      <>
        Federal agencies, state portals, regulated healthcare — built for the long game.
      </>
    ),
    "ai-enabled": (
      <>
        Designing resilient platforms for complex organizations.
      </>
    ),
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} – Enterprise platform modernization, accessibility & GovTech specialist`,
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
        I design and deliver secure, compliant digital infrastructure for federal, state, and regulated enterprise organizations.
        <br /><br />
        My work focuses on architecting scalable, accessibility-aligned platforms that meet stringent governance, security, and operational requirements.
        <br /><br />
        I specialize in translating complex policy, compliance, and stakeholder needs into resilient, enterprise-grade systems built for long-term sustainability and modernization.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Express Scripts, The Cigna Group",
        timeframe: "Jun 2024 – Dec 2025",
        role: "Software Architect / Senior Drupal Engineer",
        achievements: [
          <>
            Led frontend architecture modernization across 8 public-facing healthcare
            platforms (including{" "}
            <a href="https://www.cigna.com" target="_blank" rel="noreferrer">cigna.com</a>
            {" "}and{" "}
            <a href="https://www.evernorth.com" target="_blank" rel="noreferrer">evernorth.com</a>
            ), including properties with 4M+ monthly visits; standardized Drupal 10/11 theme
            architecture to improve scalability, governance, and long-term maintainability.
          </>,
          <>
            Influencing enterprise design system standards by identifying
            accessibility and editor experience gaps, then architecting and deploying a reusable,
            accessible charting framework adopted across all properties.
          </>,
          <>
            Leading data migration from a legacy custom charting implementation to the new
            reusable framework, mapping 250+ existing charts across 5 chart types into a
            modern configuration model without data loss or interruption to production traffic.
          </>,
          <>
            Implementing SAML-based single sign-on and MFA across 8+ healthcare platforms,
            aligning identity flows with enterprise IAM policies and HIPAA requirements.
          </>,
          <>
            Improved platform security and upgrade resilience by refactoring vulnerable custom
            modules and supporting proactive Drupal core/contrib security releases, enabling
            4 major releases per quarter for flagship properties.
          </>,
          <>
            Contributed architectural oversight within a 20-person engineering team,
            conducting daily PR reviews, enforcing frontend standards, and mentoring 9
            engineers weekly while collaborating with 40+ offshore team members.
          </>,
        ],
        images: [],
      },
      {
        company: "Zyxware Technologies",
        timeframe: "Jan 2019 – May 2024",
        role: "Senior Software Engineer / Solution Architect",
        achievements: [
          <>
            Architected a scalable Drupal distribution powering 150+ state agency websites,
            standardizing reusable components and governance controls to accelerate new
            agency launches and reduce duplication.
          </>,
          <>
            Led large-scale modernization initiatives, migrating 30 Drupal websites in 3
            months (Drupal 7→9→10, 10→11), significantly reducing security exposure
            and technical debt in government and enterprise environments.
          </>,
          <>
            Delivered high-traffic public sector and enterprise platforms including{" "}
            <a href="https://efile.dol.gov" target="_blank" rel="noreferrer">efile.dol.gov</a>
            {", "}
            <a href="https://azdot.gov" target="_blank" rel="noreferrer">azdot.gov</a>
            {" "}(AZ DOT/DMV),{" "}
            <a href="https://www.iteris.com" target="_blank" rel="noreferrer">iteris.com</a>
            {", and "}
            <a href="https://www.luxvt.com" target="_blank" rel="noreferrer">luxvt.com</a>
            {", "}
            implementing accessible, responsive, and performance-optimized architectures.
          </>,
          <>
            Led distributed engineering teams of 20+ developers and coordinated with 40+
            offshore contributors, implementing structured Git workflows, daily PR reviews,
            and architectural standards that improved code quality and release predictability.
          </>,
          <>
            Mentored 9 engineers and directly supervised 7 reports, conducting weekly
            coaching sessions and pair programming to elevate technical maturity and
            architectural thinking across teams.
          </>,
        ],
        images: [],
      },
      {
        company: "Digital Development International LLC",
        timeframe: "Nov 2011 – Dec 2018",
        role: "Chief Technology Officer",
        achievements: [
          <>
            Founded and led a 10-person digital consultancy delivering government and
            enterprise web platforms, securing public-sector contracts in Jamaica and St.
            Lucia through technical leadership and proposal strategy.
          </>,
          <>
            Architected and launched an AgTech startup platform, securing $30,000 in grant
            funding and delivering a scalable production-ready solution.
          </>,
          <>
            Implemented internal DevOps modernization, building CI/CD pipelines in GitLab
            using Docker and Jenkins, reducing deployment risk and improving release velocity.
          </>,
          <>
            Balanced executive leadership with hands-on architecture, establishing code
            standards, review processes, and accessibility compliance frameworks across
            client engagements.
          </>,
        ],
        images: [],
      },
      {
        company: "OpenConcept Consulting Inc.",
        timeframe: "Sep 2008 – Oct 2011",
        role: "Consultant",
        achievements: [
          <>
            Delivered multilingual, accessibility-compliant Drupal platforms for
            public-sector and nonprofit clients, building complex content models to
            support scalable international delivery.
          </>,
          <>
            Translated high-fidelity design systems into responsive, WCAG-aligned Drupal
            themes, guiding projects from architecture through deployment in
            multi-stakeholder environments.
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
            BSc. Computer Science and Electronics (double major), 2002–2006.
            <br />
            Graduated with honors from the Faculty of Pure and Applied Sciences.
          </>
        ),
      },
      {
        name: "Acquia Certified Site Builder – Drupal 9",
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
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Community Contributor",
        description: (
          <>
            Maintaining and co-maintaining Drupal contrib projects used by governments,
            nonprofits, and enterprises worldwide. Contributing to enterprise-grade open-source
            tooling supporting modernization and upgrade initiatives:{" "}
            <a
              href="https://www.drupal.org/project/disable_messages"
              target="_blank"
              rel="noreferrer"
            >
              Disable Messages
            </a>
            {", "}
            <a
              href="https://www.drupal.org/project/upgrade_status"
              target="_blank"
              rel="noreferrer"
            >
              Upgrade Status
            </a>
            {", "}
            <a href="https://www.drupal.org/project/funding" target="_blank" rel="noreferrer">
              Funding
            </a>
            {", "}
            <a href="https://www.drupal.org/project/ga_dashboard" target="_blank" rel="noreferrer">
              Google Analytics Dashboard
            </a>
            {", "}
            <a href="https://www.drupal.org/project/search404" target="_blank" rel="noreferrer">
              Search 404
            </a>
            .
          </>
        ),
        tags: [
          {
            name: "Drupal Contributor",
            icon: "grid",
          },
          {
            name: "Open Source",
            icon: "globe",
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
            icon: "svelte",
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
  title: "Enterprise architecture for government and regulated industries",
  description: "Practical writing on Drupal, accessibility, security, and long-term platform governance — from someone who's built these systems.",
  headingBySegment: {
    govtech: {
      title: "Enterprise architecture for government and regulated industries",
      description:
        "Practical writing on Drupal, accessibility, security, and long-term platform governance — from someone who's built these systems.",
    },
    "ai-enabled": {
      title: "AI-augmented engineering from the high-stakes end of the stack",
      description:
        "What AI actually changes — and doesn't — when the platform can't fail. Notes from an enterprise architect in regulated environments.",
    },
    international: {
      title: "AI-augmented engineering from the high-stakes end of the stack",
      description:
        "What AI actually changes — and doesn't — when the platform can't fail. Notes from an enterprise architect in regulated environments.",
    },
  },
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
