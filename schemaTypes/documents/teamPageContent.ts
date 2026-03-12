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
