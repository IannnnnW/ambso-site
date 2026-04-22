import {defineType} from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program Categories',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief summary for preview cards (150-200 characters)',
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'mainBody',
      title: 'Main Body',
      type: 'blockContent',
      description: 'Detailed description of the program',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'overviewTitle',
      title: 'Overview Section Title',
      type: 'string',
      description: 'Heading for the program overview section (e.g. "Voluntary Medical Male Circumcision (VMMC)")',
    },
    {
      name: 'overviewDescription',
      title: 'Overview Description',
      type: 'text',
      rows: 4,
      description: 'Main paragraph for the overview section',
    },
    {
      name: 'overviewHighlight',
      title: 'Overview Highlight Box',
      type: 'text',
      rows: 3,
      description: 'Text shown inside the highlighted box (e.g. target population & service delivery details)',
    },
    {
      name: 'statistics',
      title: 'Impact Statistics',
      type: 'array',
      description: 'Key statistics shown in the "Our Clinical Impact" section',
      of: [
        {
          type: 'object',
          title: 'Statistic',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "15,000+"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "VMMC Procedures"',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      description: 'Heading for the call-to-action banner at the bottom of the page',
    },
    {
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text for the call-to-action banner',
    },
    {
      name: 'programImages',
      title: 'Program Images with Captions',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Image with Caption',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for accessibility and SEO',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
      description: 'Add images with their corresponding captions',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
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
    {
      title: 'Start Date (Newest First)',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'featuredImage',
      status: 'status',
    },
    prepare({title, subtitle, media, status}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} - ${status}` : status,
        media,
      }
    },
  },
})