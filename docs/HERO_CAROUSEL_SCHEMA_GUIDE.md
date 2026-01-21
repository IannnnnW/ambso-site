# Hero Carousel Sanity Schema Guide

This document provides a comprehensive guide for implementing the Hero Carousel schema in Sanity CMS for the AMBSO website.

## Overview

The Hero Carousel displays rotating slides on the homepage, showcasing different aspects of AMBSO including research initiatives, programs, training opportunities, community work, announcements, and partnerships.

**Architecture**: Each slide is stored as an individual document, allowing for easier management, reordering, and activation/deactivation of individual slides.

---

## Schema Definition

### Hero Slide Document (`heroSlide.ts`)

Create this file in `schemaTypes/documents/heroSlide.ts`:

```typescript
import { defineType, defineField } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Carousel Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      description: 'Main headline for this slide',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline displayed above the title',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text displayed below the title (1-2 sentences)',
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Determines the badge color and icon displayed on the slide',
      options: {
        list: [
          { title: 'Clinical Trials', value: 'clinical-trials' },
          { title: 'Research', value: 'research' },
          { title: 'Community Programs', value: 'community' },
          { title: 'Clinical Programs', value: 'clinical' },
          { title: 'Capacity Building', value: 'training' },
          { title: 'Announcements', value: 'announcement' },
          { title: 'Partnerships', value: 'partnership' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      description: 'High-quality image (recommended: 1920x1080px minimum)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary Button Text',
      type: 'string',
      description: 'Text for the main call-to-action button',
      initialValue: 'Learn More',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary Button Link',
      type: 'string',
      description: 'URL or path (e.g., /research/clinical-trials, /programs/community)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text for the secondary button (optional)',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary Button Link',
      type: 'string',
      description: 'URL or path for the secondary button',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which slides appear (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this slide in the carousel',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, order, isActive } = selection;
      const categoryLabels: Record<string, string> = {
        'clinical-trials': 'Clinical Trials',
        research: 'Research',
        community: 'Community Programs',
        clinical: 'Clinical Programs',
        training: 'Capacity Building',
        announcement: 'Announcements',
        partnership: 'Partnerships',
      };
      return {
        title: `${order}. ${title}`,
        subtitle: `${categoryLabels[subtitle] || subtitle} ${isActive ? '' : '(Inactive)'}`,
        media: media,
      };
    },
  },
});
```

---

## Schema Registration

### Update `schemaTypes/index.ts`

Add the hero slide schema to your index file:

```typescript
// ... existing imports
import { heroSlide } from './documents/heroSlide';

export const schemaTypes = [
  // ... existing schemas

  // Hero Carousel
  heroSlide,
];
```

---

## Category Reference

Each category displays a specific icon and color in the frontend:

| Category Value | Display Label | Icon | Color | Use Case |
|----------------|---------------|------|-------|----------|
| `clinical-trials` | Clinical Trials | Flask | Blue | Active clinical trials and studies |
| `research` | Research | Microscope | Indigo | EPI & behavioral research, publications |
| `community` | Community Programs | Users | Green | Community outreach, health camps |
| `clinical` | Clinical Programs | Heart | Red | VMMC, clinical services |
| `training` | Capacity Building | GraduationCap | Purple | CME, training workshops, internships |
| `announcement` | Announcements | Megaphone | Amber | Important updates, news, events |
| `partnership` | Partnerships | Handshake | Teal | Collaborations, new partnerships |

---

## Content Guidelines

### Image Requirements

| Specification | Recommendation |
|--------------|----------------|
| Resolution | Minimum 1920x1080 pixels (Full HD) |
| Aspect Ratio | 16:9 |
| File Format | JPEG or WebP |
| File Size | Under 500KB (optimized) |
| Hotspot | Enable for precise cropping control |

### Text Guidelines

| Field | Max Length | Guidelines |
|-------|------------|------------|
| Title | 100 chars | Clear, impactful headline. Focus on impact or action. |
| Subtitle | 80 chars | Short tagline. Can include program name or key detail. |
| Description | 250 chars | 1-2 sentences explaining the value or impact. |
| CTA Text | 30 chars | Action verbs: "Explore", "Learn", "Join", "Discover" |

### Recommended Slide Count

- Minimum: 3 slides
- Optimal: 4-5 slides
- Maximum: 8 slides

---

## Example Content for AMBSO

### Slide 1: Clinical Trials

```
Title: Advancing HIV Prevention Through Clinical Research
Subtitle: Clinical Trials
Description: Conducting rigorous Phase III clinical trials with over 2,000 participants, contributing to groundbreaking HIV prevention methods.
Category: clinical-trials
CTA Text: View Our Research
CTA Link: /research/clinical-trials
Secondary CTA Text: Partner With Us
Secondary CTA Link: /collaborations
Order: 1
Active: true
```

### Slide 2: Community Programs

```
Title: Empowering Communities Through Health Education
Subtitle: Community Programs
Description: Reaching over 10,000 individuals annually through health literacy programs, community advisory boards, and GBV prevention initiatives.
Category: community
CTA Text: Explore Programs
CTA Link: /programs/community
Secondary CTA Text: Get Involved
Secondary CTA Link: /contact
Order: 2
Active: true
```

### Slide 3: Clinical Programs (VMMC)

```
Title: Providing Quality HIV Prevention Services
Subtitle: Voluntary Medical Male Circumcision
Description: Partnering with IDI to deliver comprehensive VMMC services across Wakiso and neighboring districts.
Category: clinical
CTA Text: Learn More
CTA Link: /programs/clinical
Secondary CTA Text: Contact Us
Secondary CTA Link: /contact
Order: 3
Active: true
```

### Slide 4: Capacity Building

```
Title: Building Healthcare Capacity Across Africa
Subtitle: Training & Professional Development
Description: Training the next generation of healthcare professionals through CME programs, emergency resuscitation courses, and scholarly grants.
Category: training
CTA Text: Training Programs
CTA Link: /programs/capacity-building
Secondary CTA Text: Apply Now
Secondary CTA Link: /opportunities/careers
Order: 4
Active: true
```

### Slide 5: Partnerships

```
Title: Collaborating With Leading Research Institutions
Subtitle: International Partnerships
Description: Working alongside Karolinska Institutet, USC, Boston College, UCLA, and East African research centers to advance health outcomes.
Category: partnership
CTA Text: Our Partners
CTA Link: /collaborations
Secondary CTA Text: Contact Us
Secondary CTA Link: /contact
Order: 5
Active: true
```

---

## Frontend Integration

### GROQ Query

The query fetches all active slides ordered by their display order:

```typescript
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
```

### Fetch Function

```typescript
export async function getHeroSlides() {
  try {
    const data = await client.fetch(heroSlidesQuery);
    return data;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}
```

### Component Usage

```typescript
import HeroCarousel from '@/components/sections/HeroCarousel';
import { getHeroSlides } from '@/lib/sanity.queries';

export default async function HomePage() {
  const slides = await getHeroSlides();

  return (
    <main>
      <HeroCarousel slides={slides} autoplaySpeed={5000} />
      {/* Other sections */}
    </main>
  );
}
```

---

## Sanity Studio Configuration (Optional)

To improve the editing experience, you can create a custom desk structure that groups hero slides:

```typescript
// In sanity.config.ts or deskStructure.ts
import { StructureBuilder } from 'sanity/desk';

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Hero Carousel Section
      S.listItem()
        .title('Hero Carousel')
        .child(
          S.documentTypeList('heroSlide')
            .title('Hero Slides')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
      S.divider(),
      // ... other document types
    ]);
```

---

## Troubleshooting

### Images Not Loading

1. Verify the image asset is uploaded in Sanity
2. Check that the image field has the `asset` reference
3. Confirm Sanity project ID is set in environment variables
4. Test the `urlFor()` function with a known image

### Slides Not Appearing

1. Check `isActive` is set to `true` on desired slides
2. Verify at least one slide document exists
3. Check browser console for fetch errors
4. Test the GROQ query in Sanity Vision

### Wrong Slide Order

1. Ensure each slide has a unique `order` value
2. Lower numbers appear first (0, 1, 2, 3...)
3. Verify the query includes `| order(order asc)`

---

## Deployment Checklist

- [ ] Create `heroSlide.ts` in `schemaTypes/documents/`
- [ ] Register schema in `schemaTypes/index.ts`
- [ ] Deploy Sanity schema changes (`sanity deploy`)
- [ ] Create at least 3-5 slide documents in Sanity Studio
- [ ] Upload high-quality images for each slide
- [ ] Set `isActive` to true for desired slides
- [ ] Verify order values are sequential (0, 1, 2, 3...)
- [ ] Test on development server
- [ ] Verify responsive behavior on mobile devices
- [ ] Check image loading performance

---

## Support

For questions about this schema:
- Sanity Documentation: https://www.sanity.io/docs
- GROQ Query Language: https://www.sanity.io/docs/groq
