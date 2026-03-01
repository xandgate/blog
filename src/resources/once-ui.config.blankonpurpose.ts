import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home, person } from "./content.blankonpurpose";

const baseURL: string = "https://blankonpurpose.com";

// Only blog and about — no work, no gallery
const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": false,
  "/blog": true,
  "/gallery": false,
};

const display: DisplayConfig = {
  location: false,
  time: false,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

// Warmer, more personal palette vs. the professional cyan/red of varunbaker.com
const style: StyleConfig = {
  theme: "dark",
  neutral: "sand",
  brand: "violet",
  accent: "orange",
  solid: "color",
  solidStyle: "flat",
  border: "playful",
  surface: "filled",
  transition: "micro",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "flat",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: true,
    opacity: 60,
    x: 50,
    y: 0,
    width: 80,
    height: 40,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: false,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const mailchimp: MailchimpConfig = {
  action: "",
  effects: {
    mask: { cursor: false, x: 50, y: 0, radius: 100 },
    gradient: {
      display: false,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: { display: false, opacity: 20, size: "2", color: "brand-on-background-weak" },
    grid: { display: false, opacity: 100, color: "neutral-alpha-medium", width: "0.25rem", height: "0.25rem" },
    lines: { display: false, opacity: 100, color: "neutral-alpha-medium", size: "16", thickness: 1, angle: 90 },
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

const sameAs: SameAsConfig = {
  github: "https://github.com/varunity",
  linkedin: "https://www.linkedin.com/in/varunbaker",
};

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: false,
    linkedin: false,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
};
