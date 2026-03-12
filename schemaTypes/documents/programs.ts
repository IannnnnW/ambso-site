import {defineType} from 'sanity'

export default defineType({
  name: 'programs',
  title: 'Programs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Program Title',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
     {
      name: 'category',
      title: 'Program Category',
      type: 'reference',
      to: [{type: 'program'}],
      validation: (Rule) => Rule.required(),
      description: 'Select the category this program belongs to',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for preview cards (150-200 characters)',
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'featuredImages',
      title: 'Featured Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'isPrimary',
              type: 'boolean',
              title: 'Primary Featured Image',
              description: 'Mark this as the main featured image for previews',
              initialValue: false,
            },
          ],
        }
      ]  
    },
    {
      name: 'objectives',
      title: 'Program Objectives',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'targetPopulation',
      title: 'Target Population',
      type: 'text',
      rows: 2,
    },
    {
      name: 'outcomes',
      title: 'Key Outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'metric', type: 'string', title: 'Metric'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'text', title: 'Description', rows: 2},
          ],
        },
      ],
    },
    {
      name: 'partners',
      title: 'Program Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    },
    {
      name: 'locations',
      title: 'Program Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty for ongoing programs',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Planned', value: 'planned'},
          {title: 'Completed', value: 'completed'},
          {title: 'On Hold', value: 'on-hold'},
        ],
      },
      initialValue: 'active',
    },
    {
      name: 'gallery',
      title: 'Program Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alternative text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 999,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'programType',
      media: 'featuredImage',
    },
  },
})
