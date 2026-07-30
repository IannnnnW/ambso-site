import {defineType} from 'sanity'

export default defineType({
  name: 'grant',
  title: 'Grants',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Grant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Overview / "About this grant"',
    },
    {
      name: 'fundingScope',
      title: 'Funding Scope',
      type: 'blockContent',
      description: 'Tracks and priority research areas',
    },
    {
      name: 'fundingAmount',
      title: 'Funding Amount',
      type: 'blockContent',
      description: 'Award ceiling and what funds may cover',
    },
    {
      name: 'durationOfGrant',
      title: 'Duration of Grant',
      type: 'blockContent',
      description: 'Implementation period and renewal terms',
    },
    {
      name: 'applicationAndAwardDetails',
      title: 'Application and Award Details',
      type: 'blockContent',
      description: 'Rolling/annual basis, selection criteria',
    },
    {
      name: 'eligibility',
      title: 'Eligibility',
      type: 'object',
      fields: [
        {
          name: 'applicants',
          title: 'Applicants',
          type: 'blockContent',
        },
        {
          name: 'ineligibleCosts',
          title: 'Ineligible Costs and Activities',
          type: 'blockContent',
        },
      ],
    },
    {
      name: 'submissionInstructions',
      title: 'Instructions for Submission of the Application',
      type: 'blockContent',
      description: 'How/where to apply, required attachments',
    },
    {
      name: 'supportingDocuments',
      title: 'Supporting Documents',
      type: 'array',
      description: 'Documents applicants can download (e.g. call for proposals, budget template, application guidelines)',
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
      name: 'applicationFormUrl',
      title: 'Application Form Link (Google Form)',
      type: 'url',
      description:
        "The Google Form link where applicants submit. Provided when the call goes out — leave empty to show the grant as 'not yet open'.",
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
          {title: 'Upcoming', value: 'upcoming'},
        ],
      },
      initialValue: 'open',
    },
    {
      name: 'deadline',
      title: 'Application Deadline',
      type: 'datetime',
      description: 'Optional — once this date passes the grant is removed from the portal',
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
      title: 'Deadline, Latest',
      name: 'deadlineDesc',
      by: [{field: 'deadline', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      status: 'status',
      deadline: 'deadline',
    },
    prepare({title, status, deadline}: {title?: string; status?: string; deadline?: string}) {
      return {
        title: title ?? 'Untitled Grant',
        subtitle: [
          status ?? 'no status',
          deadline ? `closes ${new Date(deadline).toLocaleDateString()}` : 'no deadline',
        ].join(' - '),
      }
    },
  },
})
