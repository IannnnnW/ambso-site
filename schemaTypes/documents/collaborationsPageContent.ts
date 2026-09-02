import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'collaborationsPageContent',
  title: 'Collaborations Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Collaborations' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'statsBar',
      title: 'Map Stats Bar',
      description: 'Statistics shown in the dark bar above the collaborators map (e.g. 14 Partners, 5 Countries)',
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
      name: 'mapSection',
      title: 'Map Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title (shown above the map)',
          type: 'string',
          initialValue: "AMBSO'S Global Network of Collaborators",
        },
      ],
    }),
    defineField({
      name: 'approachSection',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Heading', type: 'string', initialValue: 'Our Approach' },
        { name: 'description', title: 'Paragraph', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'emptyState',
      title: 'Fallback Partner Lists',
      description: 'Only shown on the live site if there are no Collaborators published yet',
      type: 'object',
      fields: [
        { name: 'internationalTitle', title: 'International Partners — Title', type: 'string', initialValue: 'International Partners' },
        { name: 'internationalPartners', title: 'International Partners — Names', type: 'array', of: [{ type: 'string' }] },
        { name: 'regionalTitle', title: 'Regional Partners — Title', type: 'string', initialValue: 'Regional Partners' },
        { name: 'regionalPartners', title: 'Regional Partners — Names', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Partner With Us (Bottom CTA)',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Partner With Us' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Get in Touch' },
        { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/contact' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Collaborations Page Content' }
    },
  },
})
