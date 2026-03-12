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