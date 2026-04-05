import {defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name',
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
      name: 'partnerType',
      title: 'Partner Type',
      type: 'string',
      options: {
        list: [
          {title: 'Academic Institution', value: 'academic'},
          {title: 'Research Organization', value: 'research'},
          {title: 'Government Agency', value: 'government'},
          {title: 'NGO/Non-Profit', value: 'ngo'},
          {title: 'Private Sector', value: 'private'},
          {title: 'International Organization', value: 'international'},
          {title: 'Community Organization', value: 'community'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'logo',
      title: 'Partner Logo',
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
      name: 'featuredImage',
      title: 'Featured/Banner Image',
      type: 'image',
      description: 'Optional large banner image displayed at the top of the collaborator page',
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
      name: 'leadCollaborators',
      title: 'Lead Collaborators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'picture',
              title: 'Picture',
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
              name: 'position',
              title: 'Position',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Professional title or designation',
            },
            {
              name: 'bio',
              title: 'Bio',
              type: 'text',
              description: 'Short biography paragraph',
              rows: 4,
            },
            {
              name: 'profileUrl',
              title: 'Profile URL',
              type: 'url',
              description: 'Link to their institutional profile page',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'position',
              media: 'picture',
            },
          },
        },
      ],
    },
    {
      name: 'researchGroups',
      title: 'Research Groups',
      type: 'array',
      description: 'Named research groups within this collaboration (e.g. GloSH, HELD at Karolinska)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Group Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'readMoreUrl',
              title: 'Read More URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
            },
          },
        },
      ],
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'partnershipStartDate',
      title: 'Partnership Start Date',
      type: 'date',
    },
    {
      name: 'partnershipType',
      title: 'Partnership Type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Research Collaboration', value: 'research'},
          {title: 'Funding', value: 'funding'},
          {title: 'Technical Support', value: 'technical'},
          {title: 'Training', value: 'training'},
          {title: 'Implementation', value: 'implementation'},
          {title: 'Policy', value: 'policy'},
        ],
      },
    },
    {
      name: 'relatedPrograms',
      title: 'Related Programs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'program'}]}],
    },
    {
      name: 'relatedResearch',
      title: 'Related Research',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'research'}]}],
    },
    {
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      description: 'Display prominently on partners page',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 999,
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
      subtitle: 'partnerType',
      media: 'logo',
    },
  },
})