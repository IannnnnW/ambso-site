import {defineType} from 'sanity'

export default defineType({
  name: 'researchProject',
  title: 'Research Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'researchArea',
      title: 'Research Area',
      type: 'reference',
      to: [{type: 'research'}],
      validation: (Rule) => Rule.required(),
      description: 'Select the Research Area this program belongs to',
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'blockContent',
    },
    {
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 4,
      description: 'Brief summary for preview (200-300 characters)',
      validation: (Rule) => Rule.max(300),
    },
    {
      name: 'objectives',
      title: 'Research Objectives',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'principalInvestigator',
      title: 'Principal Investigator',
      type: 'reference',
      to: [{type: 'teamMember'}],
    },
    {
      name: 'coInvestigators',
      title: 'Co-Investigators',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    },
    {
      name: 'partners',
      title: 'Research Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    },
    {
      name: 'fundingSource',
      title: 'Funding Source',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'Expected/Actual End Date',
      type: 'date',
    },
    {
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          {title: 'Ongoing', value: 'ongoing'},
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Completed', value: 'completed'},
          {title: 'Suspended', value: 'suspended'},
        ],
      },
      initialValue: 'planning',
    },
    {
      name: 'targetEnrollment',
      title: 'Target Enrollment',
      type: 'number',
    },
    {
      name: 'currentEnrollment',
      title: 'Current Enrollment',
      type: 'number',
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
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Publication Title'},
            {name: 'authors', type: 'text', title: 'Authors', rows: 2},
            {name: 'journal', type: 'string', title: 'Journal/Conference'},
            {name: 'year', type: 'number', title: 'Year'},
            {name: 'doi', type: 'string', title: 'DOI'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'researchType',
      media: 'featuredImage',
    },
  },
})