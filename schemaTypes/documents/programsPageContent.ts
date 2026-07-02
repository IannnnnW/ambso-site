import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programsPageContent',
  title: 'Programs Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Our Programs' },
        { name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'statsBar',
      title: 'Stats Bar',
      description: 'Statistics shown in the banner below the hero',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: {
          select: { title: 'value', subtitle: 'label' },
        },
      }],
    }),
    defineField({
      name: 'approachSection',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string', initialValue: 'Grounded in Research, Driven by Community' },
        { name: 'description', title: 'Paragraph', type: 'text', rows: 3 },
        {
          name: 'items',
          title: 'Approach Pillars',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text', rows: 2 },
            ],
            preview: { select: { title: 'title' } },
          }],
        },
      ],
    }),
    defineField({
      name: 'impactSection',
      title: 'Impact Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string', initialValue: 'Ten Years of Transforming Health' },
        { name: 'description', title: 'Paragraph', type: 'text', rows: 3 },
        {
          name: 'stats',
          title: 'Impact Statistics',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'sub', title: 'Sub-label', type: 'string' },
            ],
            preview: { select: { title: 'value', subtitle: 'label' } },
          }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Programs Page Content' }
    },
  },
})
