import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'headerContent',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organisation Name (Utility Strip)',
      type: 'string',
      description: 'Displayed in the top bar on desktop',
      initialValue: 'African Medical and Behavioral Sciences Organization',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone (Utility Strip)',
      type: 'string',
      initialValue: '(+256) 200 911 459',
    }),
    defineField({
      name: 'email',
      title: 'Email (Utility Strip)',
      type: 'string',
      initialValue: 'info@ambso.org',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Leave empty to use the default /images/logo.png',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Donate',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          preview: {
            select: { title: 'name', subtitle: 'href' },
          },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'isMega', title: 'Has Mega Menu?', type: 'boolean', initialValue: false },
            {
              name: 'description',
              title: 'Mega Menu Description',
              type: 'text',
              rows: 3,
              description: 'Shown in the left panel of the mega menu',
              hidden: ({ parent }) => !parent?.isMega,
            },
            {
              name: 'columns',
              title: 'Mega Menu Columns',
              type: 'array',
              hidden: ({ parent }) => !parent?.isMega,
              of: [
                {
                  type: 'object',
                  name: 'navColumn',
                  title: 'Column',
                  preview: {
                    select: { title: 'heading' },
                  },
                  fields: [
                    {
                      name: 'heading',
                      title: 'Column Heading',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'items',
                      title: 'Links',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'navLink',
                          title: 'Link',
                          preview: {
                            select: { title: 'name', subtitle: 'href' },
                          },
                          fields: [
                            {
                              name: 'name',
                              title: 'Label',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            },
                            {
                              name: 'href',
                              title: 'Link',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
