import {defineType} from 'sanity'

export default defineType({
  name: 'collaborator',
  title: 'Collaborator',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'partner',
      title: 'Partner Institution',
      type: 'reference',
      to: [{type: 'partner'}],
      validation: (Rule) => Rule.required(),
      description: 'The institution this person belongs to',
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
      description: 'Professional title or designation (e.g. PhD, Prof.)',
    },
    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
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
      subtitle: 'partner.name',
      media: 'picture',
    },
  },
})
