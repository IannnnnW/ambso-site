import {defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Section Name',
      type: 'string',
      description: 'Internal name for identification',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slides',
      title: 'Hero Slides',
      type: 'array',
      of: [{type: 'heroSlide'}],
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      initialValue: 5,
      hidden: ({parent}) => !parent?.autoplay,
    },
  ],
})
