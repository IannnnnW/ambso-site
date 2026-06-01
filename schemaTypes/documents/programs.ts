import {defineType} from 'sanity'

export default defineType({
  name: 'programs',
  title: 'Program',
  type: 'document',
  groups: [
    {name: 'overview',  title: 'Overview',           default: true},
    {name: 'content',   title: 'Content'},
    {name: 'people',    title: 'Team & Partners'},
    {name: 'media',     title: 'Images & Gallery'},
    {name: 'seo',       title: 'SEO'},
  ],
  fields: [
    // ── Core identity ────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Program Title',
      type: 'string',
      group: 'overview',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Program Area',
      type: 'reference',
      to: [{type: 'program'}],
      group: 'overview',
      description: 'Which of the four program areas does this program belong to?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'overview',
      description: '"Ongoing" = currently active.  "Upcoming" = planned but not yet started.  "Completed" = concluded.',
      options: {
        list: [
          {title: 'Ongoing',   value: 'ongoing'},
          {title: 'Upcoming',  value: 'upcoming'},
          {title: 'Completed', value: 'completed'},
          // legacy values so existing docs still display correctly
          {title: 'Active (legacy)',    value: 'active'},
          {title: 'Planned (legacy)',   value: 'planned'},
          {title: 'On Hold (legacy)',   value: 'on-hold'},
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'overview',
      description: 'Shown on program cards and previews (max 500 characters).',
      validation: (Rule) => Rule.max(500),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'overview',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'overview',
      description: 'Leave blank for ongoing programs.',
    },
    {
      name: 'targetPopulation',
      title: 'Target Population',
      type: 'text',
      rows: 2,
      group: 'overview',
      description: 'Who does this program serve? e.g. "Males 15–49 in Wakiso District"',
    },

    // ── Content ──────────────────────────────────────────────────────────────
    {
      name: 'description',
      title: 'Full Description',
      type: 'blockContent',
      group: 'content',
    },
    {
      name: 'objectives',
      title: 'Program Objectives',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      description: 'Add each objective as a separate item.',
    },
    {
      name: 'outcomes',
      title: 'Key Outcomes',
      type: 'array',
      group: 'content',
      description: 'Measurable results this program has achieved or aims to achieve.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'metric',      type: 'string', title: 'Metric',      description: 'e.g. "VMMC Procedures"'},
            {name: 'value',       type: 'string', title: 'Value',       description: 'e.g. "15,000+"'},
            {name: 'description', type: 'text',   title: 'Description', rows: 2},
          ],
          preview: {select: {title: 'value', subtitle: 'metric'}},
        },
      ],
    },

    // ── Team & Partners ──────────────────────────────────────────────────────
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      group: 'people',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    },
    {
      name: 'partners',
      title: 'Program Partners',
      type: 'array',
      group: 'people',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    },
    {
      name: 'locations',
      title: 'Program Locations',
      type: 'array',
      group: 'people',
      of: [{type: 'reference', to: [{type: 'location'}]}],
    },

    // ── Media ────────────────────────────────────────────────────────────────
    {
      name: 'featuredImages',
      title: 'Featured Images',
      type: 'array',
      group: 'media',
      description: 'Mark one image as "Primary" to use it as the hero background.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt',       type: 'string',  title: 'Alternative text', validation: (Rule) => Rule.required()},
            {name: 'caption',   type: 'string',  title: 'Caption'},
            {
              name: 'isPrimary',
              type: 'boolean',
              title: 'Primary Featured Image',
              description: 'Use this image as the hero/card thumbnail.',
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Program Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt',     type: 'string', title: 'Alternative text'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        },
      ],
    },

    // ── Admin ────────────────────────────────────────────────────────────────
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within their program area.',
      initialValue: 999,
    },
    {name: 'seo', title: 'SEO', type: 'seo', group: 'seo'},
  ],

  orderings: [
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Title A–Z',     name: 'titleAsc',  by: [{field: 'title', direction: 'asc'}]},
  ],

  preview: {
    select: {
      title:    'title',
      category: 'category.title',
      status:   'status',
      media:    'featuredImages.0',
    },
    prepare({title, category, status, media}) {
      const statusLabel: Record<string, string> = {
        ongoing:   '🟢',
        upcoming:  '🔵',
        completed: '✅',
        active:    '🟢',
        planned:   '🔵',
        'on-hold': '⏸️',
      }
      const icon = statusLabel[status] ?? ''
      return {
        title,
        subtitle: [category, icon].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
