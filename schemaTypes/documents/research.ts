import {defineType} from 'sanity'

export default defineType({
  name: 'research',
  title: 'Research Project',
  type: 'document',
  groups: [
    {name: 'overview',     title: 'Overview',     default: true},
    {name: 'details',      title: 'Study Details'},
    {name: 'team',         title: 'Team & Partners'},
    {name: 'outputs',      title: 'Outputs'},
    {name: 'seo',          title: 'SEO'},
  ],
  fields: [
    // ── Core identity ────────────────────────────────────────────────────────
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'researchType',
      title: 'Research Type',
      type: 'string',
      group: 'overview',
      description: 'Select the research category this project falls under.',
      options: {
        list: [
          {title: 'Clinical Trials',                value: 'clinical-trials'},
          {title: 'Epidemiological Studies',        value: 'epidemiological'},
          {title: 'Social & Behavioral Studies',    value: 'social-behavioral'},
          // legacy value – existing docs keep working; do not select for new projects
          {title: 'Behavioral Research (legacy)',   value: 'behavioral'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'studyPhase',
      title: 'Study Phase',
      type: 'string',
      group: 'overview',
      description: 'Only applicable to clinical trials.',
      options: {
        list: [
          {title: 'Phase I',   value: 'phase-1'},
          {title: 'Phase II',  value: 'phase-2'},
          {title: 'Phase III', value: 'phase-3'},
          {title: 'Phase IV',  value: 'phase-4'},
          {title: 'N/A',       value: 'na'},
        ],
      },
      hidden: ({parent}) => parent?.researchType !== 'clinical-trials',
    },
    {
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'overview',
      description: '"Ongoing" = actively running.  "Upcoming" = approved / funded but not yet started.  "Completed" = concluded.',
      options: {
        list: [
          {title: 'Ongoing',    value: 'ongoing'},
          {title: 'Upcoming',   value: 'upcoming'},
          {title: 'Completed',  value: 'completed'},
          {title: 'Recruiting', value: 'recruiting'},
          {title: 'Suspended',  value: 'suspended'},
          // legacy values kept so existing data still displays correctly
          {title: 'Active (legacy)',   value: 'active'},
          {title: 'Planning (legacy)', value: 'planning'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
    },
    {
      name: 'summary',
      title: 'Executive Summary',
      type: 'text',
      rows: 4,
      group: 'overview',
      description: 'Short summary for preview cards (max 300 characters).',
      validation: (Rule) => Rule.max(300),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'overview',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alternative text'}],
    },

    // ── Study details ────────────────────────────────────────────────────────
    {
      name: 'description',
      title: 'Full Project Description',
      type: 'blockContent',
      group: 'details',
    },
    {
      name: 'objectives',
      title: 'Research Objectives',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      description: 'List each objective as a separate item.',
    },
    {
      name: 'methodology',
      title: 'Methodology',
      type: 'blockContent',
      group: 'details',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'details',
    },
    {
      name: 'endDate',
      title: 'Expected / Actual End Date',
      type: 'date',
      group: 'details',
      description: 'Leave blank for ongoing studies.',
    },
    {
      name: 'targetEnrollment',
      title: 'Target Enrollment',
      type: 'number',
      group: 'details',
    },
    {
      name: 'currentEnrollment',
      title: 'Current Enrollment',
      type: 'number',
      group: 'details',
    },
    {
      name: 'ethicsApproval',
      title: 'Ethics Approval Number',
      type: 'string',
      group: 'details',
    },
    {
      name: 'registrationNumber',
      title: 'Trial Registration Number',
      type: 'string',
      group: 'details',
      description: 'e.g. ClinicalTrials.gov identifier.',
    },
    {
      name: 'fundingSource',
      title: 'Funding Source',
      type: 'string',
      group: 'details',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },

    // ── Team & Partners ──────────────────────────────────────────────────────
    {
      name: 'principalInvestigator',
      title: 'Principal Investigator',
      type: 'reference',
      group: 'team',
      to: [{type: 'teamMember'}],
    },
    {
      name: 'coInvestigators',
      title: 'Co-Investigators',
      type: 'array',
      group: 'team',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    },
    {
      name: 'partners',
      title: 'Research Partners',
      type: 'array',
      group: 'team',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    },

    // ── Outputs ──────────────────────────────────────────────────────────────
    {
      name: 'publications',
      title: 'Publications',
      type: 'array',
      group: 'outputs',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title',   type: 'string',  title: 'Publication Title', validation: (Rule) => Rule.required()},
            {name: 'authors', type: 'text',    title: 'Authors', rows: 2},
            {name: 'journal', type: 'string',  title: 'Journal / Conference'},
            {name: 'year',    type: 'number',  title: 'Year'},
            {name: 'doi',     type: 'string',  title: 'DOI'},
            {name: 'url',     type: 'url',     title: 'URL'},
          ],
          preview: {
            select: {title: 'title', subtitle: 'journal'},
          },
        },
      ],
    },

    // ── SEO ──────────────────────────────────────────────────────────────────
    {name: 'seo', title: 'SEO', type: 'seo', group: 'seo'},
  ],

  orderings: [
    {title: 'Start Date, Newest', name: 'startDateDesc', by: [{field: 'startDate', direction: 'desc'}]},
    {title: 'Title A–Z',          name: 'titleAsc',       by: [{field: 'title',     direction: 'asc'}]},
  ],

  preview: {
    select: {
      title:        'title',
      researchType: 'researchType',
      status:       'status',
      media:        'featuredImage',
    },
    prepare({title, researchType, status, media}) {
      const typeLabel: Record<string, string> = {
        'clinical-trials':   'Clinical Trial',
        'epidemiological':   'Epidemiological',
        'social-behavioral': 'Social & Behavioral',
        'behavioral':        'Behavioral',
        'implementation':    'Implementation',
        'other':             'Other',
      }
      const statusLabel: Record<string, string> = {
        ongoing:    '🟢 Ongoing',
        upcoming:   '🔵 Upcoming',
        completed:  '✅ Completed',
        recruiting: '🟡 Recruiting',
        suspended:  '🔴 Suspended',
        active:     '🟢 Active',
        planning:   '🔵 Planning',
      }
      return {
        title,
        subtitle: [typeLabel[researchType] ?? researchType, statusLabel[status] ?? status]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})
