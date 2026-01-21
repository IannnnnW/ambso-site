import { PortableTextBlock } from 'sanity';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface TeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  slug: { current: string };
  role: string;
  department: 'seniorManagementTeam' | 'headofDepartment' | 'teamMember' | 'boardMember';
  bio?: PortableTextBlock[];
  image?: SanityImage;
  email?: string;
  phone?: string;
  qualifications?: string[];
  expertise?: string[];
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    orcid?: string;
  };
  order: number;
  active: boolean;
}

export interface News {
  _id: string;
  _type: 'news';
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage: SanityImage;
  content: PortableTextBlock[];
  category?: 'research' | 'programs' | 'events' | 'partnerships' | 'impact' | 'community';
  tags?: string[];
  author?: TeamMember;
  publishedAt: string;
  featured: boolean;
}

// This is a Program Category (parent)
export interface ProgramCategory {
  _id: string;
  _type: 'program';
  title: string;
  slug: { current: string };
  shortDescription?: string;
  mainBody: PortableTextBlock[];
  programImages?: Array<{
    image: SanityImage;
    caption: string;
    alt: string;
  }>;
  featuredImage?: SanityImage;
  objectives?: string[];
  targetPopulation?: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'planned' | 'completed' | 'on-hold';
  partners?: Partner[];
  teamMembers?: TeamMember[];
  locations?: Location[];
  order: number;
}

// This is an individual Program (child) that belongs to a category
export interface Program {
  _id: string;
  _type: 'programs';
  title: string;
  slug: { current: string };
  description?: PortableTextBlock[];
  category: ProgramCategory; // Reference to program category
  shortDescription?: string;
  featuredImages?: SanityImage[]; // Array of images
  objectives?: string[];
  targetPopulation?: string;
  outcomes?: Array<{
    metric: string;
    value: string;
    description: string;
  }>;
  partners?: Partner[];
  teamMembers?: TeamMember[];
  locations?: Location[];
  startDate?: string;
  endDate?: string;
  status: 'active' | 'planned' | 'completed' | 'on-hold';
  gallery?: SanityImage[];
  order: number;
}

export interface Research {
  _id: string;
  _type: 'research';
  title: string;
  slug: { current: string };
  researchType: 'clinical-trials' | 'epidemiological' | 'behavioral' | 'implementation' | 'other';
  studyPhase?: 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4' | 'na';
  description?: PortableTextBlock[];
  summary?: string;
  objectives?: string[];
  methodology?: PortableTextBlock[];
  principalInvestigator?: TeamMember;
  coInvestigators?: TeamMember[];
  partners?: Partner[];
  fundingSource?: string;
  startDate?: string;
  endDate?: string;
  status: 'planning' | 'recruiting' | 'active' | 'completed' | 'suspended';
  targetEnrollment?: number;
  currentEnrollment?: number;
  featuredImage?: SanityImage;
  publications?: Array<{
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi?: string;
    url?: string;
  }>;
  ethicsApproval?: string;
  registrationNumber?: string;
  keywords?: string[];
}

export interface Partner {
  _id: string;
  _type: 'partner';
  name: string;
  slug: { current: string };
  partnerType: 'academic' | 'research' | 'government' | 'ngo' | 'private' | 'international' | 'community';
  description?: PortableTextBlock[];
  logo?: SanityImage;
  leadCollaborators?: Array<{
    name: string;
    picture?: SanityImage;
    position: string;
    title?: string;
  }>;
  website?: string;
  country?: string;
  partnershipStartDate?: string;
  partnershipType?: Array<'research' | 'funding' | 'technical' | 'training' | 'implementation' | 'policy'>;
  relatedPrograms?: Program[];
  relatedResearch?: Research[];
  featured: boolean;
  order: number;
}

export interface Career {
  _id: string;
  _type: 'career';
  title: string;
  slug: { current: string };
  department?: 'research' | 'clinical' | 'community' | 'administration' | 'finance' | 'it' | 'other';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'volunteer';
  location?: Location;
  description: PortableTextBlock[];
  responsibilities?: string[];
  requirements?: string[];
  qualifications?: string[];
  desiredSkills?: string[];
  applicationDeadline: string;
  applicationEmail?: string;
  applicationLink?: string;
  salaryRange?: string;
  publishedAt: string;
  status: 'open' | 'closed' | 'draft';
}

export interface Tender {
  _id: string;
  _type: 'tender';
  title: string;
  slug: { current: string };
  tenderNumber?: string;
  category: 'goods' | 'services' | 'works' | 'consultancy' | 'other';
  description: PortableTextBlock[];
  requirements?: string[];
  eligibilityCriteria?: string[];
  submissionDeadline: string;
  documents?: Array<{
    title: string;
    file: {
      asset: {
        _ref: string;
        url: string;
      };
    };
  }>;
  contactPerson?: string;
  contactEmail?: string;
  publishedAt: string;
  status: 'open' | 'closed' | 'awarded' | 'cancelled';
}

export interface Location {
  _id: string;
  _type: 'location';
  name: string;
  slug: { current: string };
  locationType: 'office' | 'field-site' | 'clinic' | 'partner-site' | 'other';
  address: string;
  city: string;
  district: string;
  region?: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contactPhone?: string;
  contactEmail?: string;
  isPrimary: boolean;
  order: number;
}

export interface HeroSlide {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image: SanityImage;
}

export interface HeroSection {
  _id: string;
  _type: 'heroSection';
  name: string;
  slides: HeroSlide[];
  autoplay: boolean;
  autoplaySpeed: number;
}

// Hero Slide Types (document-based)
export type HeroSlideCategory = 'clinical-trials' | 'research' | 'community' | 'clinical' | 'training' | 'announcement' | 'partnership';

export interface HeroSlideDocument {
  _id: string;
  _type: 'heroSlide';
  title: string;
  subtitle?: string;
  description?: string;
  image: SanityImage;
  category?: HeroSlideCategory;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  order: number;
  isActive: boolean;
}