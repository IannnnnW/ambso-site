import {defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'African Medical and Behavioral Sciences Organization',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    },
    {
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 4,
    },
    {
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Value Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
          ],
        },
      ],
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'twitter', title: 'Twitter URL', type: 'url'},
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn URL', type: 'url'},
        {name: 'youtube', title: 'YouTube URL', type: 'url'},
      ],
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
    },
  ],
})
