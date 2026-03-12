import {defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
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
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Senior Management Team', value: 'seniorManagementTeam'},
          {title: 'Head of Department', value: 'headofDepartment'},
          {title: "Team Member", value: 'teamMember'},
          {title: 'Board Member', value: 'boardMember'}
        ],
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
    },
    {
      name: 'image',
      title: 'Photo',
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
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'linkedin', title: 'LinkedIn URL', type: 'url'},
        {name: 'twitter', title: 'Twitter URL', type: 'url'},
        {name: 'researchGate', title: 'ResearchGate URL', type: 'url'},
        {name: 'orcid', title: 'ORCID URL', type: 'url'},
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
      name: 'active',
      title: 'Active Member',
      type: 'boolean',
      description: 'Is this person currently with AMBSO?',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
