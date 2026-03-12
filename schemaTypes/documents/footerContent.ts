import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerContent',
  title: 'Footer',
  type: 'document',
  groups: [
    { name: 'branding',  title: 'Branding' },
    { name: 'about',     title: 'About Column' },
    { name: 'links',     title: 'Link Columns' },
    { name: 'contact',   title: 'Contact Column' },
    { name: 'bottom',    title: 'Bottom Bar' },
  ],
  fields: [
    // ── Branding ──────────────────────────────────────────────────────────────
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      description: 'Texture shown behind the footer overlay. Leave empty to use the default /images/footer-bkg.jpg',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      description: 'Logo shown in the About column. Leave empty to use /images/logo.png',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'branding',
      initialValue: 'AMBSO Logo',
    }),

    // ── About Column ──────────────────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Tagline / Description',
      description: 'Short text shown under the logo',
      type: 'text',
      rows: 3,
      group: 'about',
      initialValue: 'Transforming Africa through innovative research, training and service provision.',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      description: 'Leave a field empty to hide that icon',
      type: 'object',
      group: 'about',
      fields: [
        { name: 'facebook',  title: 'Facebook URL',  type: 'url' },
        { name: 'twitter',   title: 'Twitter / X URL', type: 'url' },
        { name: 'linkedin',  title: 'LinkedIn URL',  type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube',   title: 'YouTube URL',   type: 'url' },
      ],
    }),

    // ── Quick Links Column ────────────────────────────────────────────────────
    defineField({
      name: 'quickLinksHeading',
      title: 'Quick Links — Heading',
      type: 'string',
      group: 'links',
      initialValue: 'Quick Links',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      group: 'links',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link',  type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),

    // ── Programs Column ───────────────────────────────────────────────────────
    defineField({
      name: 'programLinksHeading',
      title: 'Programs — Heading',
      type: 'string',
      group: 'links',
      initialValue: 'Our Programs',
    }),
    defineField({
      name: 'programLinks',
      title: 'Program Links',
      type: 'array',
      group: 'links',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link',  type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),

    // ── Contact Column ────────────────────────────────────────────────────────
    defineField({
      name: 'contactHeading',
      title: 'Contact — Heading',
      type: 'string',
      group: 'contact',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Address',
      type: 'string',
      group: 'contact',
      initialValue: 'Kampala, Uganda',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone (display)',
      type: 'string',
      group: 'contact',
      initialValue: '(+256) 394 500 421',
    }),
    defineField({
      name: 'contactPhoneTel',
      title: 'Phone (tel: link)',
      description: 'For the tel: href — include country code, no spaces, e.g. +256394500421',
      type: 'string',
      group: 'contact',
      initialValue: '+256394500421',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email',
      type: 'string',
      group: 'contact',
      initialValue: 'info@ambso.org',
    }),

    // ── Bottom Bar ────────────────────────────────────────────────────────────
    defineField({
      name: 'copyrightName',
      title: 'Copyright Name',
      description: 'Used in "© {year} {name}. {suffix}"',
      type: 'string',
      group: 'bottom',
      initialValue: 'AMBSO',
    }),
    defineField({
      name: 'copyrightSuffix',
      title: 'Copyright Suffix',
      description: 'Text after "© {year} {name}."',
      type: 'string',
      group: 'bottom',
      initialValue: 'All rights reserved.',
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Bar Links',
      description: 'e.g. Privacy Policy, Terms of Service',
      type: 'array',
      group: 'bottom',
      of: [
        {
          type: 'object',
          name: 'bottomLink',
          preview: { select: { title: 'name', subtitle: 'href' } },
          fields: [
            { name: 'name', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link',  type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
  ],
})
