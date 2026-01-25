# Page Content Sanity Schema Guide

This document provides comprehensive schemas for making all page content editable through Sanity CMS.

## Overview

The page content system uses singleton documents (one document per page/section) to manage static content that appears across the site. This approach allows content editors to update page text, stats, and configuration without code changes.

---

## 1. Site Settings (Global)

### Schema: `siteSettings.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'AMBSO',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'Weekdays', type: 'string', initialValue: 'Monday - Friday: 8:00 AM - 5:00 PM' },
        { name: 'weekends', title: 'Weekends', type: 'string', initialValue: 'Saturday - Sunday: Closed' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
```

---

## 2. Homepage Content

### Schema: `homepageContent.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    // Mission Section
    defineField({
      name: 'missionSection',
      title: 'Mission, Vision & Values Section',
      type: 'object',
      fields: [
        {
          name: 'mission',
          title: 'Mission',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Mission' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
        },
        {
          name: 'vision',
          title: 'Vision',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Vision' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
        },
        {
          name: 'values',
          title: 'Values',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Values' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
        },
      ],
    }),

    // Programs Section
    defineField({
      name: 'programsSection',
      title: 'Programs Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our Programs' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 },
        {
          name: 'programs',
          title: 'Program Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 2 },
              { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name: Microscope, Users, GraduationCap, HandHeart' },
              { name: 'href', title: 'Link', type: 'string' },
              { name: 'colorClass', title: 'Color Class', type: 'string', description: 'Tailwind classes for icon background' },
            ],
          }],
        },
      ],
    }),

    // Impact Section
    defineField({
      name: 'impactSection',
      title: 'Impact Statistics Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our Impact' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'number' },
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g., +, %, etc.' },
            ],
          }],
        },
      ],
    }),

    // News Section
    defineField({
      name: 'newsSection',
      title: 'News Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Latest News' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 },
        { name: 'viewAllText', title: 'View All Button Text', type: 'string', initialValue: 'View All News' },
        { name: 'viewAllLink', title: 'View All Button Link', type: 'string', initialValue: '/newsroom' },
      ],
    }),

    // Partners Section
    defineField({
      name: 'partnersSection',
      title: 'Partners Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our Partners' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 },
      ],
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        {
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'link', title: 'Button Link', type: 'string' },
          ],
        },
        {
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            { name: 'text', title: 'Button Text', type: 'string' },
            { name: 'link', title: 'Button Link', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Content' }
    },
  },
})
```

---

## 3. About Page Content

### Schema: `aboutPageContent.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPageContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Welcome to AMBSO' },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'videoUrl', title: 'Hero Video URL', type: 'url', description: 'YouTube video URL to display in the hero section' },
        {
          name: 'videoThumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          options: { hotspot: true },
          description: 'Optional custom thumbnail for the video'
        },
      ],
    }),

    // Mission & Vision
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Mission' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Vision' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ],
    }),

    // Core Values
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Our Core Values' },
        {
          name: 'values',
          title: 'Values',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 2 },
              { name: 'icon', title: 'Icon Name', type: 'string', description: 'Optional Lucide icon name' },
              { name: 'colorClass', title: 'Color Class', type: 'string', description: 'Optional Tailwind color classes' },
            ],
          }],
        },
      ],
    }),

    // Our Story/History
    defineField({
      name: 'story',
      title: 'Our History',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our History' },
        { name: 'content', title: 'Content', type: 'blockContent' },
      ],
    }),

    // Video Section (Standalone)
    defineField({
      name: 'videoSection',
      title: 'Video Section',
      type: 'object',
      description: 'Optional standalone video section that appears below the history section',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'videoUrl', title: 'Video URL', type: 'url', description: 'YouTube video URL' },
        {
          name: 'thumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),

    // Collaborators Section
    defineField({
      name: 'collaboratorsSection',
      title: 'Collaborators Section',
      type: 'object',
      description: 'Section displaying partner logos and lead collaborators',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Our Collaborators' },
        { name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 },
      ],
    }),

    // What We Do Section
    defineField({
      name: 'whatWeDo',
      title: 'What We Do Section',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'What We Do' },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 2 },
              { name: 'link', title: 'Link', type: 'string' },
              { name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon: Briefcase, Microscope, Handshake, Calendar' },
            ],
          }],
        },
      ],
    }),

    // Research Focus
    defineField({
      name: 'researchFocus',
      title: 'Research Focus',
      type: 'object',
      fields: [
        { name: 'sectionTitle', title: 'Section Title', type: 'string', initialValue: 'Our Research Focus' },
        {
          name: 'areas',
          title: 'Research Areas',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 3 },
            ],
          }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page Content' }
    },
  },
})
```

### Note on Lead Collaborators

Lead Collaborators are **extracted from the Partner schema**, not stored directly in the About Page Content. Each Partner can have an array of `leadCollaborators` with:
- `name` (string, required)
- `picture` (image with hotspot)
- `position` (string, required)
- `title` (string, optional professional title)

The About page automatically displays all lead collaborators from partners that have this field populated.

---

## 4. Contact Page Content

### Schema: `contactPageContent.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPageContent',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Contact Us' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Send us a Message' },
        {
          name: 'subjects',
          title: 'Subject Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ],
          }],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Contact Information' },
        { name: 'headquarters', title: 'Headquarters Address', type: 'text', rows: 2 },
        { name: 'additionalOffices', title: 'Additional Offices Note', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'weekdayHours', title: 'Weekday Hours', type: 'string' },
        { name: 'weekendHours', title: 'Weekend Hours', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page Content' }
    },
  },
})
```

---

## 5. Team Page Content

### Schema: `teamPageContent.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamPageContent',
  title: 'Team Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Team' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'leadershipIntro',
      title: 'Leadership Structure Introduction',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Team Page Content' }
    },
  },
})
```

---

## 6. Resources Page Content

### Schema: `resourcesPageContent.ts`

```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resourcesPageContent',
  title: 'Resources Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Resources' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Resources Page Content' }
    },
  },
})
```

---

## Schema Registration

Add all schemas to `schemaTypes/index.ts`:

```typescript
import siteSettings from './documents/siteSettings'
import homepageContent from './documents/homepageContent'
import aboutPageContent from './documents/aboutPageContent'
import contactPageContent from './documents/contactPageContent'
import teamPageContent from './documents/teamPageContent'
import resourcesPageContent from './documents/resourcesPageContent'

export const schemaTypes = [
  // ... existing schemas

  // Page Content
  siteSettings,
  homepageContent,
  aboutPageContent,
  contactPageContent,
  teamPageContent,
  resourcesPageContent,
]
```

---

## Singleton Configuration

For Sanity Studio, configure these as singletons using desk structure:

```typescript
// In sanity.config.ts or structure.ts
import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singletons Group
      S.listItem()
        .title('Site Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPageContent').documentId('aboutPageContent')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPageContent').documentId('contactPageContent')),
              S.listItem()
                .title('Team Page')
                .child(S.document().schemaType('teamPageContent').documentId('teamPageContent')),
              S.listItem()
                .title('Resources Page')
                .child(S.document().schemaType('resourcesPageContent').documentId('resourcesPageContent')),
            ])
        ),
      S.divider(),
      // ... rest of content types
    ])
```

---

## Usage Notes

1. **Singleton Pattern**: Each page content document should have a fixed ID (same as schema name) to ensure only one instance exists.

2. **Fallback Data**: The frontend should always provide fallback data in case Sanity is unavailable.

3. **Rich Text**: Use `blockContent` type for longer text that needs formatting. For simple text, use `text` or `string`.

4. **Icon Names**: Store Lucide icon names as strings. The frontend maps these to actual components.

5. **Color Classes**: Store Tailwind CSS classes for styling flexibility.
