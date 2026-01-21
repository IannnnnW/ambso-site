# Sanity CMS Integration Guide

This document provides comprehensive instructions for integrating Sanity CMS with all pages in the AMBSO website.

## Setup Complete ✅

The following has been set up:

1. **TypeScript Types** - `/lib/sanity.types.ts`
2. **GROQ Queries** - `/lib/sanity.queries.ts`
3. **Sanity Client** - `/lib/sanity.client.ts`
4. **Environment Variables** - `.env.local` (already configured with your project ID)

## Already Integrated ✅

- ✅ News Section (Homepage)
- ✅ Partners Section (Homepage)

## Integration Pattern

Here's the pattern to follow for integrating Sanity into pages:

### Example: Team Page Integration

**Before:**
```tsx
const teamMembers = [
  { name: 'John Doe', role: 'Director' },
  //... static data
];

export default function TeamPage() {
  return (
    // JSX using teamMembers
  );
}
```

**After:**
```tsx
import { getTeamByDepartment } from '@/lib/sanity.queries';
import { urlFor } from '@/lib/sanity.client';
import { TeamMember } from '@/lib/sanity.types';

export default async function TeamPage() {
  const seniorManagement: TeamMember[] = await getTeamByDepartment('seniorManagementTeam');
  const departmentHeads: TeamMember[] = await getTeamByDepartment('headofDepartment');
  const teamMembers: TeamMember[] = await getTeamByDepartment('teamMember');
  const boardMembers: TeamMember[] = await getTeamByDepartment('boardMember');

  return (
    <div className="pt-20">
      {/* Senior Management */}
      <section>
        {seniorManagement.map((member) => (
          <div key={member._id}>
            {member.image && (
              <img
                src={urlFor(member.image).width(200).height(200).url()}
                alt={member.name}
              />
            )}
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
          </div>
        ))}
      </section>
    </div>
  );
}
```

## Pages to Integrate

### 1. Team Page (`app/who-we-are/team/page.tsx`)

**Query Functions:**
```tsx
const seniorManagement = await getTeamByDepartment('seniorManagementTeam');
const departmentHeads = await getTeamByDepartment('headofDepartment');
const teamMembers = await getTeamByDepartment('teamMember');
const boardMembers = await getTeamByDepartment('boardMember');
```

**Fields Available:**
- `member.name` - Full name
- `member.role` - Job title
- `member.department` - Department category
- `member.image` - Profile photo
- `member.bio` - Biography (PortableText)
- `member.email` - Email address
- `member.phone` - Phone number
- `member.qualifications` - Array of qualifications
- `member.expertise` - Array of expertise areas

**Image Usage:**
```tsx
{member.image && (
  <img
    src={urlFor(member.image).width(200).height(200).url()}
    alt={member.image.alt || member.name}
  />
)}
```

---

### 2. Hero Section (`components/sections/Hero.tsx`)

**Query Function:**
```tsx
const heroData = await getHeroSection();
```

**Fields Available:**
```tsx
heroData.slides.map((slide) => ({
  title: slide.title,
  subtitle: slide.subtitle,
  image: slide.image, // Use urlFor() to get URL
  ctaText: slide.ctaText,
  ctaLink: slide.ctaLink,
}))
```

**Update Pattern:**
```tsx
export default async function Hero() {
  const heroData = await getHeroSection();

  if (!heroData || !heroData.slides) return null;

  return (
    <section>
      {heroData.slides.map((slide, index) => (
        <div key={index}>
          <img src={urlFor(slide.image).width(1920).height(1080).url()} alt={slide.title} />
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>
          {slide.ctaText && (
            <a href={slide.ctaLink}>{slide.ctaText}</a>
          )}
        </div>
      ))}
    </section>
  );
}
```

---

### 3. Career Page (`app/opportunities/careers/page.tsx`)

**Query Function:**
```tsx
const careers = await getCareers(); // Only gets open positions
```

**Fields Available:**
- `career.title` - Job title
- `career.department` - Department
- `career.employmentType` - full-time, part-time, etc.
- `career.location` - Location object with city, district
- `career.description` - Full description (PortableText)
- `career.responsibilities` - Array of strings
- `career.requirements` - Array of strings
- `career.qualifications` - Array of strings
- `career.desiredSkills` - Array of strings
- `career.applicationDeadline` - Date string
- `career.applicationEmail` - Email for applications
- `career.salaryRange` - Optional salary range

**Update Pattern:**
```tsx
export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <div>
      {careers.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.department} • {job.employmentType}</p>
          {job.location && <p>{job.location.city}, {job.location.district}</p>}
          <ul>
            {job.responsibilities?.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
          <p>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
          {job.applicationEmail && (
            <a href={`mailto:${job.applicationEmail}`}>Apply Now</a>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

### 4. Research Pages

#### Research Listing (`app/research/page.tsx`)

```tsx
const allResearch = await getAllResearch();
```

#### Active Studies (`app/research/active-studies/page.tsx`)

```tsx
const activeStudies = await getResearchByStatus('active');
```

#### Upcoming Studies (`app/research/upcoming-studies/page.tsx`)

```tsx
const upcomingStudies = await getResearchByStatus('planning');
```

#### Completed Studies (`app/research/completed-studies/page.tsx`)

```tsx
const completedStudies = await getResearchByStatus('completed');
```

#### Clinical Trials (`app/research/clinical-trials/page.tsx`)

```tsx
const clinicalTrials = await getResearchByType('clinical-trials');
```

**Fields Available:**
- `research.title` - Project title
- `research.researchType` - Type of research
- `research.status` - Current status
- `research.summary` - Brief summary
- `research.description` - Full description (PortableText)
- `research.objectives` - Array of objectives
- `research.principalInvestigator` - TeamMember object
- `research.partners` - Array of Partner objects
- `research.startDate` / `research.endDate` - Date strings
- `research.featuredImage` - Research image

---

### 5. Tender Page (`app/opportunities/tenders/page.tsx`)

**Query Function:**
```tsx
const tenders = await getTenders();
```

**Fields Available:**
- `tender.title` - Tender title
- `tender.tenderNumber` - Reference number
- `tender.category` - goods, services, works, etc.
- `tender.description` - Full description (PortableText)
- `tender.requirements` - Array of requirements
- `tender.submissionDeadline` - Deadline date
- `tender.documents` - Array of document files
- `tender.contactEmail` - Contact email
- `tender.status` - open, closed, awarded, cancelled

---

### 6. Newsroom Page (`app/newsroom/page.tsx`)

**Query Function:**
```tsx
const allNews = await getAllNews();
```

**Single News Article** (`app/newsroom/[slug]/page.tsx`):
```tsx
export default async function NewsArticle({ params }: { params: { slug: string } }) {
  const article = await getNewsPost(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>
      {article.featuredImage && (
        <img src={urlFor(article.featuredImage).width(1200).url()} alt={article.title} />
      )}
      {/* Render article.content using PortableText component */}
    </article>
  );
}
```

---

### 7. Collaborations Page (`app/collaborations/page.tsx`)

**Query Function:**
```tsx
const partners = await getPartners();
```

**Single Partner** (`app/collaborations/[slug]/page.tsx`):
```tsx
const partner = await getPartner(params.slug);
```

**Fields:**
- `partner.name` - Organization name
- `partner.logo` - Logo image
- `partner.partnerType` - Type of organization
- `partner.description` - Full description (PortableText)
- `partner.leadCollaborators` - Array of key people
- `partner.website` - Partner website URL
- `partner.partnershipType` - Array of partnership types
- `partner.relatedPrograms` - Linked programs
- `partner.relatedResearch` - Linked research

---

## Working with PortableText

For content fields (like `description`, `bio`, `content`), use the PortableText component:

```tsx
import { PortableText } from '@portabletext/react';

<PortableText value={article.content} />
```

## Image Optimization

Always use the `urlFor` helper for images:

```tsx
import { urlFor } from '@/lib/sanity.client';

// Basic usage
<img src={urlFor(image).url()} alt="..." />

// With transformations
<img
  src={urlFor(image).width(800).height(600).fit('max').url()}
  alt="..."
/>

// For different sizes
<img
  srcSet={`
    ${urlFor(image).width(400).url()} 400w,
    ${urlFor(image).width(800).url()} 800w,
    ${urlFor(image).width(1200).url()} 1200w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  src={urlFor(image).width(800).url()}
  alt="..."
/>
```

## Data Fetching Notes

1. **All page components should be async** when fetching from Sanity
2. **Error Handling**: Wrap fetch calls in try-catch if needed
3. **Null Checks**: Always check if data exists before rendering
4. **Loading States**: Consider using Suspense for better UX

## Next Steps

1. ✅ Install dependencies (already done)
2. ✅ Create types and queries (already done)
3. ✅ Update News and Partners sections (already done)
4. ⏳ Update remaining pages following the patterns above
5. ⏳ Test all pages with actual Sanity data
6. ⏳ Add PortableText component for rich content rendering

## Testing

After integration, test with:
```bash
npm run dev
```

Make sure your Sanity Studio has data for each schema type. If pages show empty, check:
1. Data exists in Sanity Studio
2. Environment variables are set correctly
3. Queries match your Sanity schema structure
