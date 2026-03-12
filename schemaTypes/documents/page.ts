import {defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
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
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
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
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'heroSectionRef',
          title: 'Hero Section',
          to: [{type: 'heroSection'}],
        },
        {
          type: 'reference',
          name: 'contentSectionRef',
          title: 'Content Section',
          to: [{type: 'contentSection'}],
        },
        {
          type: 'reference',
          name: 'statsSectionRef',
          title: 'Stats Section',
          to: [{type: 'statsSection'}],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
  },
})
