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