import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'headerContent',
  title: 'Header',
  type: 'document',
  groups: [
    { name: 'utilityStrip', title: 'Utility Strip' },
    { name: 'logo',         title: 'Logo' },
    { name: 'navigation',   title: 'Navigation' },
    { name: 'cta',          title: 'CTA Button' },
  ],
  fields: [
    // ── Utility Strip ─────────────────────────────────────────────────────────
    defineField({
      name: 'orgName',
      title: 'Organisation Name',
      description: 'Full name shown in the top bar on desktop',
      type: 'string',
      group: 'utilityStrip',
      initialValue: 'African Medical and Behavioral Sciences Organization',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone (display)',
      description: 'Displayed in the top bar, e.g. (+256) 200 911 459',
      type: 'string',
      group: 'utilityStrip',
      initialValue: '(+256) 200 911 459',
    }),
    defineField({
      name: 'phoneTel',
      title: 'Phone (tel: link)',
      description: 'Used for the tel: href — include country code, no spaces, e.g. +256200911459',
      type: 'string',
      group: 'utilityStrip',
      initialValue: '+256200911459',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'utilityStrip',
      initialValue: 'info@ambso.org',
    }),

    // ── Logo ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Logo Image',
      description: 'Upload a logo to override the default /images/logo.png',
      type: 'image',
      group: 'logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'logo',
      initialValue: 'AMBSO Logo',
    }),

    // ── CTA Button ────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaText',
      title: 'CTA Button Label',
      type: 'string',
      group: 'cta',
      initialValue: 'Donate',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact',
      validation: (Rule) => Rule.required(),
    }),

    // ── Navigation ────────────────────────────────────────────────────────────
    defineField({
      name: 'navigation',
      title: 'Navigation Items',
      description: 'Order controls the left-to-right sequence in the nav bar',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          preview: {
            select: { title: 'name', subtitle: 'href', isMega: 'isMega' },
            prepare({ title, subtitle, isMega }) {
              return { title, subtitle: `${subtitle}${isMega ? '  (mega)' : ''}` }
            },
          },
          groups: [
            { name: 'basic', title: 'Basic' },
            { name: 'mega',  title: 'Mega Menu' },
          ],
          fields: [
            {
              name: 'name',
              title: 'Label',
              type: 'string',
              group: 'basic',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              group: 'basic',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isMega',
              title: 'Has Mega Menu?',
              type: 'boolean',
              group: 'basic',
              initialValue: false,
            },
            {
              name: 'description',
              title: 'Mega Menu Description',
              description: 'Blurb shown in the left panel of the mega dropdown',
              type: 'text',
              rows: 3,
              group: 'mega',
              hidden: ({ parent }: { parent?: { isMega?: boolean } }) => !parent?.isMega,
            },
            {
              name: 'viewAllText',
              title: '"View all" Link Text',
              description: 'Text for the "View all →" link at the bottom of the left panel',
              type: 'string',
              group: 'mega',
              initialValue: 'View all →',
              hidden: ({ parent }: { parent?: { isMega?: boolean } }) => !parent?.isMega,
            },
            {
              name: 'columns',
              title: 'Mega Menu Columns',
              type: 'array',
              group: 'mega',
              hidden: ({ parent }: { parent?: { isMega?: boolean } }) => !parent?.isMega,
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
