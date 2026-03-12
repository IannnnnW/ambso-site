// Document types
import news from './documents/news'
import program from './documents/program'
import teamMember from './documents/teamMember'
import programs from './documents/programs'
import research from './documents/research'
import partner from './documents/partner'
import career from './documents/career'
import tender from './documents/tender'
import location from './documents/location'
import resource from './documents/resource'
import { heroSlide } from './documents/heroSlide'
import homepageContent from './documents/homePageContent'
import aboutPageContent from './documents/aboutPageContent'
import contactPageContent from './documents/contactPageContent'
import teamPageContent from './documents/teamPageContent'
import resourcesPageContent from './documents/resourcePageContent'
import tweetEmbed from './documents/tweetEmbed'
import headerContent from './documents/headerContent'
import footerContent from './documents/footerContent'

// Object types
import blockContent from './objects/blockContent'
import seo from './objects/seo'
import ctaSection from './objects/ctaSection'
import testimonial from './objects/testimonial'
import faq from './objects/faq'

export const schemaTypes = [
  // Pages
  headerContent,
  footerContent,
  homepageContent,
  aboutPageContent,
  contactPageContent,
  teamPageContent,
  resourcesPageContent,

  // Pages and Sections
//   page,
//   heroSection,
//   contentSection,
//   statsSection,
  // Content
    news,
//   event,
  resource,

  // Organization
  teamMember,
  program,
  programs,
  research,
  partner,
  location,

  // Opportunities
  career,
  tender,

  // Reusable Objects
  blockContent,
  seo,
  heroSlide,
  ctaSection,
  testimonial,
  faq,
  tweetEmbed
]
