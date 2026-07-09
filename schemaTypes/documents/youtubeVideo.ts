import {defineType} from 'sanity'

export default defineType({
  name: 'youtubeVideo',
  title: 'YouTube Video',
  type: 'document',
  fields: [
    {
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description:
        'Full YouTube URL, e.g. https://youtu.be/abc123 or https://www.youtube.com/watch?v=abc123',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Displayed as caption on the website.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Show on website',
      type: 'boolean',
      description: 'Toggle off to hide this video from the Newsroom without deleting it.',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to fall back to date added.',
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
      url: 'url',
      isActive: 'isActive',
    },
    prepare({title, url, isActive}: {title?: string; url?: string; isActive?: boolean}) {
      return {
        title: title ?? 'New YouTube Video',
        subtitle: [
          url ?? 'No URL yet',
          isActive ? '✓ Visible' : '✗ Hidden',
        ].join('  ·  '),
      }
    },
  },
})
