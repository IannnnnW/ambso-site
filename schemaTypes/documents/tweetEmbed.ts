import {defineType} from 'sanity'

export default defineType({
  name: 'tweetEmbed',
  title: 'Tweet Embed',
  type: 'document',
  fields: [
    {
      name: 'tweetId',
      title: 'Tweet ID',
      type: 'string',
      description:
        'The numeric ID at the end of the tweet URL. ' +
        'E.g. for https://x.com/AMBSO_Uganda/status/1234567890123456789, enter: 1234567890123456789',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d+$/, {name: 'numeric', invert: false})
          .error('Must be the numeric ID only — no full URL, no @handle, digits only'),
    },
    {
      name: 'label',
      title: 'Internal Label',
      type: 'string',
      description: 'Optional note for your team (e.g. "AMBSO World AIDS Day post"). Not shown on the website.',
    },
    {
      name: 'isActive',
      title: 'Show on website',
      type: 'boolean',
      description: 'Toggle off to hide this tweet from the Newsroom without deleting it.',
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
      label: 'label',
      tweetId: 'tweetId',
      isActive: 'isActive',
    },
    prepare({label, tweetId, isActive}: {label?: string; tweetId?: string; isActive?: boolean}) {
      return {
        title: label ?? (tweetId ? `Tweet ${tweetId}` : 'New Tweet Embed'),
        subtitle: [
          tweetId ? `ID: ${tweetId}` : 'No ID yet',
          isActive ? '✓ Visible' : '✗ Hidden',
        ].join('  ·  '),
      }
    },
  },
})
