import {defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
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
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Conference', value: 'conference'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Training', value: 'training'},
          {title: 'Community Event', value: 'community'},
          {title: 'Webinar', value: 'webinar'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'venue',
          title: 'Venue',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'isVirtual',
          title: 'Virtual Event',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'virtualLink',
          title: 'Virtual Event Link',
          type: 'url',
          hidden: ({parent}) => !parent?.isVirtual,
        },
      ],
    },
    {
      name: 'image',
      title: 'Event Image',
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
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    },
    {
      name: 'capacity',
      title: 'Maximum Capacity',
      type: 'number',
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
    {
      title: 'Start Date, Old',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'startDate',
    },
    prepare({title, media, date}) {
      return {
        title,
        media,
        subtitle: new Date(date).toLocaleDateString(),
      }
    },
  },
})
