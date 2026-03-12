import {defineType} from 'sanity'

export default defineType({
  name: 'contentSection',
  title: 'Content Section',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'White', value: 'white'},
          {title: 'Light Gray', value: 'gray'},
          {title: 'Primary Blue', value: 'primary'},
          {title: 'Accent Green', value: 'accent'},
        ],
      },
      initialValue: 'white',
    },
  ],
})
