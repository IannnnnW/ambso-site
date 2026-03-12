import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPageContent',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Contact Us' },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', initialValue: 'Send us a Message' },
        {
          name: 'subjects',
          title: 'Subject Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ],
          }],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', initialValue: 'Contact Information' },
        { name: 'headquarters', title: 'Headquarters Address', type: 'text', rows: 2 },
        { name: 'additionalOffices', title: 'Additional Offices Note', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'weekdayHours', title: 'Weekday Hours', type: 'string' },
        { name: 'weekendHours', title: 'Weekend Hours', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page Content' }
    },
  },
})