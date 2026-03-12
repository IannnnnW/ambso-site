import {defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorRole',
      title: 'Author Role/Title',
      type: 'string',
    },
    {
      name: 'authorImage',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'organization',
      title: 'Organization',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'authorRole',
      media: 'authorImage',
    },
  },
})
