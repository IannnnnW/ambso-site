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
              { name: 'description', title: 'Short Description', type: 'text', rows: 2, description: 'Teaser shown on the card front (keep to 1–2 lines)' },
              { name: 'detailedDescription', title: 'Detailed Description', type: 'text', rows: 4, description: 'Full explanation shown on the card back when flipped (2–4 sentences)' },
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

    // History Milestones (Timeline)
    defineField({
      name: 'historyMilestones',
      title: 'History Milestones',
      type: 'array',
      description: 'Timeline milestones displayed in the animated "Our History" roadmap. Add in chronological order; use the Order field to control display sequence.',
      of: [
        {
          type: 'object',
          title: 'Milestone',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              description: 'e.g. "2016", "2018–2020", "Today"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Short headline for this milestone',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'One or two sentences describing what happened',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name: Flag, Users, Globe, Award, Microscope, Heart, BookOpen, Star',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describes the image for accessibility',
                },
              ],
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Lower numbers appear first in the timeline',
              initialValue: 999,
            },
          ],
          preview: {
            select: { title: 'year', subtitle: 'title', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: `${title} — ${subtitle}`, media };
            },
          },
        },
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