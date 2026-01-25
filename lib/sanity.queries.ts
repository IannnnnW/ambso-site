import { client } from './sanity.client';
import { groq } from 'next-sanity';

// Image URL builder helper

// News Queries
export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt,
    featured
  }
`;

export const latestNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    publishedAt
  }
`;

export const singleNewsQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    category,
    tags,
    author->{
      name,
      role,
      image
    },
    publishedAt
  }
`;

export const newsWithRelatedQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    category,
    tags,
    author->{
      name,
      role,
      image,
      slug
    },
    publishedAt,
    "relatedNews": *[_type == "news" && slug.current != $slug && (category == ^.category || count((tags[])[@ in ^.tags[]]) > 0)] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      category,
      publishedAt
    }
  }
`;

export const allNewsSlugsQuery = groq`
  *[_type == "news"] {
    "slug": slug.current
  }
`;

// Team Queries
export const teamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    department,
    image,
    email,
    phone,
    order
  }
`;

export const teamByDepartmentQuery = groq`
  *[_type == "teamMember" && active == true && department == $department] | order(order asc) {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    image,
    email,
    phone,
    qualifications,
    expertise,
    socialMedia,
    order
  }
`;

export const singleTeamMemberQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    image,
    email,
    phone,
    qualifications,
    expertise,
    socialMedia
  }
`;

// Get all team members with counts by department
export const allTeamMembersQuery = groq`
  *[_type == "teamMember" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    department,
    image,
    order
  }
`;

// Get team member with related colleagues (same department)
export const teamMemberWithColleaguesQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    department,
    bio,
    image,
    email,
    phone,
    qualifications,
    expertise,
    socialMedia,
    "colleagues": *[_type == "teamMember" && active == true && department == ^.department && slug.current != $slug] | order(order asc) [0...4] {
      _id,
      name,
      slug,
      role,
      department,
      image
    }
  }
`;

// Get all program categories
export const programCategoriesQuery = groq`
  *[_type == "program"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage,
    status,
    order
  }
`;

// Get single program category with all its programs
export const singleProgramCategoryQuery = groq`
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    mainBody,
    programImages,
    featuredImage,
    objectives,
    targetPopulation,
    startDate,
    endDate,
    status,
    partners[]->{
      name,
      logo,
      website
    },
    teamMembers[]->{
      name,
      role,
      image
    },
    locations[]->{
      name,
      city,
      district
    },
    "relatedPrograms": *[_type == "programs" && references(^._id)] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      featuredImages,
      status,
      order
    }
  }
`;

// Get programs by category reference
export const programsByCategoryQuery = groq`
  *[_type == "programs" && references($categoryId)] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImages,
    status,
    order,
    category->{
      _id,
      title,
      slug
    }
  }
`;

// Get programs by category slug
export const programsByCategorySlugQuery = groq`
  *[_type == "programs" && category->slug.current == $categorySlug] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImages,
    status,
    order,
    category->{
      _id,
      title,
      slug
    }
  }
`;

// Get all programs with their categories
export const allProgramsWithCategoryQuery = groq`
  *[_type == "programs"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    featuredImages,
    status,
    order,
    category->{
      _id,
      title,
      slug,
      shortDescription
    }
  }
`;

// Research Queries
export const researchQuery = groq`
  *[_type == "research"] | order(startDate desc) {
    _id,
    title,
    slug,
    researchType,
    summary,
    status,
    startDate,
    endDate,
    featuredImage
  }
`;

export const researchByTypeQuery = groq`
  *[_type == "research" && researchType == $type] | order(startDate desc) {
    _id,
    title,
    slug,
    researchType,
    summary,
    status,
    startDate,
    endDate,
    featuredImage,
    principalInvestigator->{
      name,
      role
    }
  }
`;

export const researchByStatusQuery = groq`
  *[_type == "research" && status == $status] | order(startDate desc) {
    _id,
    title,
    slug,
    researchType,
    summary,
    status,
    startDate,
    endDate,
    featuredImage,
    principalInvestigator->{
      name,
      role
    }
  }
`;

export const singleResearchQuery = groq`
  *[_type == "research" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    researchType,
    studyPhase,
    description,
    summary,
    objectives,
    methodology,
    principalInvestigator->{
      name,
      role,
      image,
      email
    },
    coInvestigators[]->{
      name,
      role,
      image
    },
    partners[]->{
      name,
      logo,
      website
    },
    fundingSource,
    startDate,
    endDate,
    status,
    targetEnrollment,
    currentEnrollment,
    featuredImage,
    publications,
    ethicsApproval,
    registrationNumber,
    keywords
  }
`;

// Partner Queries
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    slug,
    partnerType,
    logo,
    website,
    country,
    featured,
    order
  }
`;

export const featuredPartnersQuery = groq`
  *[_type == "partner"] {
    _id,
    name,
    logo,
    website
  }
`;

export const partnersWithCollaboratorsQuery = groq`
  *[_type == "partner" && defined(leadCollaborators) && count(leadCollaborators) > 0] | order(order asc) {
    _id,
    name,
    logo,
    leadCollaborators[] {
      name,
      picture,
      position,
      title
    },
    website,
    country
  }
`;

export const singlePartnerQuery = groq`
  *[_type == "partner" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    partnerType,
    description,
    logo,
    leadCollaborators,
    website,
    country,
    partnershipStartDate,
    partnershipType,
    relatedPrograms[]->{
      title,
      slug
    },
    relatedResearch[]->{
      title,
      slug
    }
  }
`;

// Career Queries
export const careersQuery = groq`
  *[_type == "career" && status == "open" && applicationDeadline > now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    department,
    employmentType,
    location->{
      name,
      city
    },
    applicationDeadline,
    publishedAt,
    status
  }
`;

export const singleCareerQuery = groq`
  *[_type == "career" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    department,
    employmentType,
    location->{
      name,
      address,
      city,
      district
    },
    description,
    responsibilities,
    requirements,
    qualifications,
    desiredSkills,
    applicationDeadline,
    applicationEmail,
    applicationLink,
    salaryRange,
    publishedAt,
    status
  }
`;

// Tender Queries
export const tendersQuery = groq`
  *[_type == "tender" && status == "open" && submissionDeadline > now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    tenderNumber,
    category,
    submissionDeadline,
    publishedAt,
    status
  }
`;

export const singleTenderQuery = groq`
  *[_type == "tender" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    tenderNumber,
    category,
    description,
    requirements,
    eligibilityCriteria,
    submissionDeadline,
    documents,
    contactPerson,
    contactEmail,
    publishedAt,
    status
  }
`;

// Location Queries
export const locationsQuery = groq`
  *[_type == "location"] | order(order asc) {
    _id,
    name,
    slug,
    locationType,
    address,
    city,
    district,
    region,
    country,
    coordinates,
    contactPhone,
    contactEmail,
    isPrimary,
    order
  }
`;

// Resource Queries
export const allResourcesQuery = groq`
  *[_type == "resource"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    Conference,
    resourceType,
    file {
      asset->{
        _ref,
        url
      }
    },
    externalLink,
    thumbnail,
    category,
    publishedDate,
    authors,
    featured
  }
`;

export const resourcesByTypeQuery = groq`
  *[_type == "resource" && resourceType == $resourceType] | order(publishedDate desc) {
    _id,
    title,
    slug,
    Conference,
    resourceType,
    file {
      asset->{
        _ref,
        url
      }
    },
    externalLink,
    thumbnail,
    category,
    publishedDate,
    authors,
    featured
  }
`;

export const featuredResourcesQuery = groq`
  *[_type == "resource" && featured == true] | order(publishedDate desc) [0...6] {
    _id,
    title,
    slug,
    Conference,
    resourceType,
    file {
      asset->{
        _ref,
        url
      }
    },
    externalLink,
    thumbnail,
    category,
    publishedDate,
    authors,
    featured
  }
`;

// Page Content Queries

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo,
    contactEmail,
    contactPhone,
    address,
    socialMedia,
    workingHours
  }
`;

export const homepageContentQuery = groq`
  *[_type == "homepageContent"][0] {
    _id,
    missionSection,
    programsSection,
    impactSection,
    newsSection,
    partnersSection,
    ctaSection
  }
`;

export const aboutPageContentQuery = groq`
  *[_type == "aboutPageContent"][0] {
    _id,
    hero,
    mission,
    vision,
    coreValues,
    story,
    researchFocus
  }
`;

export const contactPageContentQuery = groq`
  *[_type == "contactPageContent"][0] {
    _id,
    hero,
    formSection,
    contactInfo
  }
`;

export const teamPageContentQuery = groq`
  *[_type == "teamPageContent"][0] {
    _id,
    hero,
    leadershipIntro
  }
`;

export const resourcesPageContentQuery = groq`
  *[_type == "resourcesPageContent"][0] {
    _id,
    hero
  }
`;

// Hero Section Query (legacy)
export const heroSectionQuery = groq`
  *[_type == "heroSection" && name == "homepage-hero"][0] {
    _id,
    name,
    slides,
    autoplay,
    autoplaySpeed
  }
`;

// Hero Slides Query - fetches individual slide documents
export const heroSlidesQuery = groq`
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    category,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    order
  }
`;

// Helper functions to fetch data
export async function getLatestNews() {
  return await client.fetch(latestNewsQuery);
}

export async function getAllNews() {
  return await client.fetch(newsQuery);
}

export async function getNewsPost(slug: string) {
  return await client.fetch(singleNewsQuery, { slug });
}

export async function getNewsWithRelated(slug: string) {
  try {
    const data = await client.fetch(newsWithRelatedQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching news with related:', error);
    return null;
  }
}

export async function getAllNewsSlugs() {
  try {
    const data = await client.fetch(allNewsSlugsQuery);
    return data;
  } catch (error) {
    console.error('Error fetching news slugs:', error);
    return [];
  }
}

export async function getTeamMembers() {
  return await client.fetch(teamMembersQuery);
}

export async function getTeamByDepartment(department: string) {
  return await client.fetch(teamByDepartmentQuery, { department });
}

export async function getAllTeamMembers() {
  try {
    const data = await client.fetch(allTeamMembersQuery);
    return data;
  } catch (error) {
    console.error('Error fetching all team members:', error);
    return [];
  }
}

export async function getTeamMember(slug: string) {
  try {
    const data = await client.fetch(singleTeamMemberQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
}

export async function getTeamMemberWithColleagues(slug: string) {
  try {
    const data = await client.fetch(teamMemberWithColleaguesQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching team member with colleagues:', error);
    return null;
  }
}

export async function getAllResources() {
  try {
    const data = await client.fetch(allResourcesQuery);
    return data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

export async function getResourcesByType(resourceType: string) {
  try {
    const data = await client.fetch(resourcesByTypeQuery, { resourceType });
    return data;
  } catch (error) {
    console.error('Error fetching resources by type:', error);
    return [];
  }
}

export async function getFeaturedResources() {
  try {
    const data = await client.fetch(featuredResourcesQuery);
    return data;
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    return [];
  }
}

// Page Content Fetch Functions

export async function getSiteSettings() {
  try {
    const data = await client.fetch(siteSettingsQuery);
    return data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getHomepageContent() {
  try {
    const data = await client.fetch(homepageContentQuery);
    return data;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}

export async function getAboutPageContent() {
  try {
    const data = await client.fetch(aboutPageContentQuery);
    return data;
  } catch (error) {
    console.error('Error fetching about page content:', error);
    return null;
  }
}

export async function getContactPageContent() {
  try {
    const data = await client.fetch(contactPageContentQuery);
    return data;
  } catch (error) {
    console.error('Error fetching contact page content:', error);
    return null;
  }
}

export async function getTeamPageContent() {
  try {
    const data = await client.fetch(teamPageContentQuery);
    return data;
  } catch (error) {
    console.error('Error fetching team page content:', error);
    return null;
  }
}

export async function getResourcesPageContent() {
  try {
    const data = await client.fetch(resourcesPageContentQuery);
    return data;
  } catch (error) {
    console.error('Error fetching resources page content:', error);
    return null;
  }
}

export async function getProgramCategories() {
  try {
    const data = await client.fetch(programCategoriesQuery);
    return data;
  } catch (error) {
    console.error('Error fetching program categories:', error);
    return [];
  }
}

// Get single program category with its programs
export async function getProgramCategory(slug: string) {
  try {
    const data = await client.fetch(singleProgramCategoryQuery, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching program category:', error);
    return null;
  }
}

// Get programs by category ID
export async function getProgramsByCategory(categoryId: string) {
  try {
    const data = await client.fetch(programsByCategoryQuery, { categoryId });
    return data;
  } catch (error) {
    console.error('Error fetching programs by category:', error);
    return [];
  }
}

// Get programs by category slug
export async function getProgramsByCategorySlug(categorySlug: string) {
  try {
    const data = await client.fetch(programsByCategorySlugQuery, { categorySlug });
    return data;
  } catch (error) {
    console.error('Error fetching programs by category slug:', error);
    return [];
  }
}

// Get all programs with categories
export async function getAllProgramsWithCategories() {
  try {
    const data = await client.fetch(allProgramsWithCategoryQuery);
    return data;
  } catch (error) {
    console.error('Error fetching all programs with categories:', error);
    return [];
  }
}

export async function getAllResearch() {
  return await client.fetch(researchQuery);
}

export async function getResearchByType(type: string) {
  return await client.fetch(researchByTypeQuery, { type });
}

export async function getResearchByStatus(status: string) {
  return await client.fetch(researchByStatusQuery, { status });
}

export async function getResearch(slug: string) {
  return await client.fetch(singleResearchQuery, { slug });
}

export async function getPartners() {
  return await client.fetch(partnersQuery);
}

export async function getFeaturedPartners() {
  return await client.fetch(featuredPartnersQuery);
}

export async function getPartnersWithCollaborators() {
  try {
    const data = await client.fetch(partnersWithCollaboratorsQuery);
    return data;
  } catch (error) {
    console.error('Error fetching partners with collaborators:', error);
    return [];
  }
}

export async function getPartner(slug: string) {
  return await client.fetch(singlePartnerQuery, { slug });
}

export async function getCareers() {
  return await client.fetch(careersQuery);
}

export async function getCareer(slug: string) {
  return await client.fetch(singleCareerQuery, { slug });
}

export async function getTenders() {
  return await client.fetch(tendersQuery);
}

export async function getTender(slug: string) {
  return await client.fetch(singleTenderQuery, { slug });
}

export async function getLocations() {
  return await client.fetch(locationsQuery);
}

export async function getHeroSection() {
  return await client.fetch(heroSectionQuery);
}

export async function getHeroSlides() {
  try {
    const data = await client.fetch(heroSlidesQuery);
    return data;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}
