// Document types
import annualReport from './documents/annualReport'
import programsPageContent from './documents/programsPageContent'
import news from './documents/news'
import program from './documents/program'
import teamMember from './documents/teamMember'
import programs from './documents/programs'
import research from './documents/researchAreas'
import researchProjects from './documents/researchProjects'
import partner from './documents/partner'
import collaborator from './documents/collaborator'
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
import youtubeVideo from './documents/youtubeVideo'
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
  programsPageContent,
  teamPageContent,
  resourcesPageContent,
  researchProjects,
  annualReport,
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
  collaborator,
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
  tweetEmbed,
  youtubeVideo,
]
