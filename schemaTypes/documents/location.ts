import {defineType} from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location/Office',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
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
      name: 'officeType',
      title: 'Office Type',
      type: 'string',
      options: {
        list: [
          {title: 'Headquarters', value: 'headquarters'},
          {title: 'Regional Office', value: 'regional'},
          {title: 'Field Office', value: 'field'},
          {title: 'Research Site', value: 'research-site'},
          {title: 'Clinic', value: 'clinic'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City/Town',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'district',
          title: 'District',
          type: 'string',
        },
        {
          name: 'region',
          title: 'Region',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Uganda',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule) => Rule.min(-90).max(90),
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: (Rule) => Rule.min(-180).max(180),
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'fax',
          title: 'Fax',
          type: 'string',
        },
      ],
    },
    {
      name: 'officeHours',
      title: 'Office Hours',
      type: 'text',
      rows: 3,
      description: 'e.g., "Monday - Friday: 8:00 AM - 5:00 PM"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'image',
      title: 'Office Image',
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
      name: 'programs',
      title: 'Programs at this Location',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'program'}]}],
    },
    {
      name: 'staff',
      title: 'Key Staff',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    },
    {
      name: 'isPrimary',
      title: 'Primary Office',
      type: 'boolean',
      description: 'Is this the main/headquarters office?',
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      media: 'image',
    },
  },
})
