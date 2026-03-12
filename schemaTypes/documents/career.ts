import {defineType} from 'sanity'

export default defineType({
  name: 'career',
  title: 'Career Opportunity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
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
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Research', value: 'research'},
          {title: 'Clinical', value: 'clinical'},
          {title: 'Community Programs', value: 'community'},
          {title: 'Administration', value: 'administration'},
          {title: 'Finance', value: 'finance'},
          {title: 'IT', value: 'it'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
          {title: 'Volunteer', value: 'volunteer'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'desiredSkills',
      title: 'Desired Skills',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
    },
    {
      name: 'applicationLink',
      title: 'Application Link',
      type: 'url',
    },
    {
      name: 'salaryRange',
      title: 'Salary Range',
      type: 'string',
      description: 'Optional: e.g., "UGX 2M - 4M per month"',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Open', value: 'open'},
          {title: 'Closed', value: 'closed'},
          {title: 'Draft', value: 'draft'},
        ],
      },
      initialValue: 'open',
    },
  ],
  orderings: [
    {
      title: 'Deadline, Soonest',
      name: 'deadlineAsc',
      by: [{field: 'applicationDeadline', direction: 'asc'}],
    },
    {
      title: 'Published Date, New',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'department',
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
