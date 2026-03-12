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