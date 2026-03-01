import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

// blankonpurpose.com — personal blog, no portfolio, no gallery
// Same person, different context. This is the unfiltered version.

const person: Person = {
  firstName: "Varun",
  lastName: "Baker",
  name: "Varun Baker",
  role: "thinking out loud",
  avatar: "/images/avatar.jpg",
  email: "varun.baker+online@gmail.com",
  location: "America/New_York",
  languages: ["English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe</>,
  description: <>Occasional thoughts. No cadence. No promises.</>,
};

const social: Social = [
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
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:varun.baker+online@gmail.com",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "Blank on Purpose",
  description: "Varun Baker writes here when he doesn't know what he thinks yet.",
  headline: <>Blank on Purpose</>,
  featured: {
    display: false,
    title: <>Featured</>,
    href: "/blog",
  },
  subline: (
    <>
      Personal writing. No brand. No angle.
      <br />
      Just what I'm working through.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About",
  description: "Varun Baker. Software architect. Writing to think.",
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Who is this",
    description: (
      <>
        I'm a software architect and engineer with 15+ years building things for government
        and enterprise. That's the professional version of me. This blog is the other version —
        the one that reads too much, changes his mind in public, and doesn't always know
        where an idea is going before he starts writing it.
        <br /><br />
        blankonpurpose.com is where I write when I don't have a point yet.
        The professional stuff lives at{" "}
        <a href="https://varunbaker.com" target="_blank" rel="noopener noreferrer">
          varunbaker.com
        </a>
        .
      </>
    ),
  },
  work: {
    display: false,
    title: "",
    experiences: [],
  },
  studies: {
    display: false,
    title: "",
    institutions: [],
  },
  technical: {
    display: false,
    title: "",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Writing",
  title: "Blank on Purpose",
  description: "Personal writing by Varun Baker. No particular theme. Ideas in progress.",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Work",
  description: "",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery",
  description: "",
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
