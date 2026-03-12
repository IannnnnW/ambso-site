import {defineType} from 'sanity'

export default defineType({
  name: 'tender',
  title: 'Tender',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tender Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Goods', value: 'goods'},
          {title: 'Services', value: 'services'},
          {title: 'Works', value: 'works'},
          {title: 'Consultancy', value: 'consultancy'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief summary for preview',
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'closingDate',
      title: 'Closing Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'documents',
      title: 'Tender Documents',
      type: 'array',
      of: [
        {
          type: 'file',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Document Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'eligibilityCriteria',
      title: 'Eligibility Criteria',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'submissionInstructions',
      title: 'Submission Instructions',
      type: 'blockContent',
    },
    {
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Name'},
        {name: 'email', type: 'string', title: 'Email'},
        {name: 'phone', type: 'string', title: 'Phone'},
      ],
    },
    {
      name: 'estimatedValue',
      title: 'Estimated Value',
      type: 'string',
      description: 'Optional',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Awarded', value: 'awarded'},
        ],
      },
      initialValue: 'open',
    },
  ],
  orderings: [
    {
      title: 'Closing Date, Soonest',
      name: 'closingDateAsc',
      by: [{field: 'closingDate', direction: 'asc'}],
    },
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{field: 'publishDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'referenceNumber',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      return {
        title,
        subtitle: `${subtitle} - ${status}`,
      }
    },
  },
})
