import {defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Resource Title',
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
      name: 'Conference',
      title: 'Conference',
      type: 'string',
    },
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Publication', value: 'publication'},
          {title: 'Report', value: 'report'},
          {title: 'Guide', value: 'guide'},
          {title: 'Policy Brief', value: 'policy-brief'},
          {title: 'Abstract', value: 'abstract'},
          {title: 'Infographic', value: 'infographic'},
          {title: 'Video', value: 'video'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx',
      },
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Use this if the resource is hosted externally',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'HIV/AIDS', value: 'hiv-aids'},
          {title: 'Research', value: 'research'},
          {title: 'Clinical', value: 'clinical'},
          {title: 'Community Health', value: 'community'},
          {title: 'Policy', value: 'policy'},
          {title: 'Training', value: 'training'},
        ],
      },
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'string'}],
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
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedDateDesc',
      by: [{field: 'publishedDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'resourceType',
      media: 'thumbnail',
    },
  },
})
