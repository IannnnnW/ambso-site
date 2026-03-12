import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerContent',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'About Description',
      type: 'text',
      rows: 3,
      description: 'Short tagline shown under the logo in the footer',
      initialValue: 'Transforming Africa through innovative research, training and service provision.',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'quickLinksHeading',
      title: 'Quick Links Section Heading',
      type: 'string',
      initialValue: 'Quick Links',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'programLinksHeading',
      title: 'Programs Section Heading',
      type: 'string',
      initialValue: 'Our Programs',
    }),
    defineField({
      name: 'programLinks',
      title: 'Program Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Address',
      type: 'string',
      initialValue: 'Kampala, Uganda',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone',
      type: 'string',
      initialValue: '(+256) 394 500 421',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email',
      type: 'string',
      initialValue: 'info@ambso.org',
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright Name',
      type: 'string',
      description: 'Used in "© {year} {name}. All rights reserved."',
      initialValue: 'AMBSO',
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Bar Links (e.g. Privacy Policy)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'bottomLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
  ],
})
