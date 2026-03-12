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