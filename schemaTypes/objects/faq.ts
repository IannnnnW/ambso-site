import {defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Programs', value: 'programs'},
          {title: 'Research', value: 'research'},
          {title: 'Partnerships', value: 'partnerships'},
          {title: 'Careers', value: 'careers'},
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})
