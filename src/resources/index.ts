// Multi-site content router
// Set NEXT_PUBLIC_SITE_ID in Vercel env vars to switch tenants.
// Default: varunbaker (varunbaker.com)
// Add new tenants by creating content.<id>.tsx and once-ui.config.<id>.ts

import * as varunbakerContent from "./content";
import * as bopContent from "./content.blankonpurpose";
import * as defaultConfig from "./once-ui.config";
import * as bopConfig from "./once-ui.config.blankonpurpose";

const isBOP = process.env.NEXT_PUBLIC_SITE_ID === "blankonpurpose";

const activeContent = isBOP ? bopContent : varunbakerContent;
const activeConfig = isBOP ? bopConfig : defaultConfig;

export const person       = activeContent.person;
export const social       = activeContent.social;
export const newsletter   = activeContent.newsletter;
export const home         = activeContent.home;
export const about        = activeContent.about;
export const blog         = activeContent.blog;
export const work         = activeContent.work;
export const gallery      = activeContent.gallery;

export const display        = activeConfig.display;
export const mailchimp      = activeConfig.mailchimp;
export const routes         = activeConfig.routes;
export const protectedRoutes = activeConfig.protectedRoutes;
export const baseURL        = activeConfig.baseURL;
export const fonts          = activeConfig.fonts;
export const style          = activeConfig.style;
export const schema         = activeConfig.schema;
export const sameAs         = activeConfig.sameAs;
export const socialSharing  = activeConfig.socialSharing;
export const effects        = activeConfig.effects;
export const dataStyle      = activeConfig.dataStyle;
