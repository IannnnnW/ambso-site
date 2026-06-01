import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {StructureBuilder} from 'sanity/structure'

// ── IDs for the four program-area category documents (stable, fetched once) ──
const CATEGORY_ID = {
  research:            '189e59ca-a1a7-4889-9763-324e39544a46',
  serviceDelivery:     'baa39485-df24-4f42-b888-b29a43c6fbf0',
  capacityBuilding:    '0022954a-36fd-4ece-8e9a-c73e76a9d8ec',
  communityEngagement: 'e3893518-9c1a-42e5-a969-4eceb33fe766',
}

// ── Desk structure ───────────────────────────────────────────────────────────

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([

      // ── Site Configuration ────────────────────────────────────────────────
      S.listItem()
        .title('Site Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem().title('Header')
                .child(S.document().schemaType('headerContent').documentId('headerContent')),
              S.listItem().title('Footer')
                .child(S.document().schemaType('footerContent').documentId('footerContent')),
              S.listItem().title('Homepage')
                .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
              S.listItem().title('About Page')
                .child(S.document().schemaType('aboutPageContent').documentId('aboutPageContent')),
              S.listItem().title('Contact Page')
                .child(S.document().schemaType('contactPageContent').documentId('contactPageContent')),
              S.listItem().title('Team Page')
                .child(S.document().schemaType('teamPageContent').documentId('teamPageContent')),
              S.listItem().title('Resources Page')
                .child(S.document().schemaType('resourcesPageContent').documentId('resourcesPageContent')),
            ])
        ),

      S.divider(),

      // ── Programs ──────────────────────────────────────────────────────────
      S.listItem()
        .title('Programs')
        .child(
          S.list()
            .title('Program Areas')
            .items([

              // ── Research ─────────────────────────────────────────────────
              S.listItem()
                .title('Research')
                .child(
                  S.list()
                    .title('Research')
                    .items([
                      S.listItem()
                        .title('Clinical Trials')
                        .child(
                          S.documentList()
                            .title('Clinical Trials')
                            .schemaType('research')
                            .filter('_type == "research" && researchType == "clinical-trials"')
                            .defaultOrdering([{field: 'title', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('Epidemiological Studies')
                        .child(
                          S.documentList()
                            .title('Epidemiological Studies')
                            .schemaType('research')
                            .filter('_type == "research" && researchType == "epidemiological"')
                            .defaultOrdering([{field: 'title', direction: 'asc'}])
                        ),
                      S.listItem()
                        .title('Social & Behavioral Studies')
                        .child(
                          S.documentList()
                            .title('Social & Behavioral Studies')
                            .schemaType('research')
                            .filter(
                              '_type == "research" && researchType in ["social-behavioral","behavioral"]'
                            )
                            .defaultOrdering([{field: 'title', direction: 'asc'}])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('All Research Projects')
                        .child(S.documentTypeList('research').title('All Research Projects')),
                      S.listItem()
                        .title('Research Area Settings')
                        .child(
                          S.document()
                            .schemaType('program')
                            .documentId(CATEGORY_ID.research)
                        ),
                    ])
                ),

              // ── Service Delivery ─────────────────────────────────────────
              S.listItem()
                .title('Service Delivery')
                .child(
                  S.list()
                    .title('Service Delivery')
                    .items([
                      S.listItem()
                        .title('Programs')
                        .child(
                          S.documentList()
                            .title('Service Delivery Programs')
                            .schemaType('programs')
                            .filter(`_type == "programs" && category._ref == "${CATEGORY_ID.serviceDelivery}"`)
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Service Delivery Area Settings')
                        .child(
                          S.document()
                            .schemaType('program')
                            .documentId(CATEGORY_ID.serviceDelivery)
                        ),
                    ])
                ),

              // ── Capacity Building ────────────────────────────────────────
              S.listItem()
                .title('Capacity Building')
                .child(
                  S.list()
                    .title('Capacity Building')
                    .items([
                      S.listItem()
                        .title('Programs')
                        .child(
                          S.documentList()
                            .title('Capacity Building Programs')
                            .schemaType('programs')
                            .filter(`_type == "programs" && category._ref == "${CATEGORY_ID.capacityBuilding}"`)
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Capacity Building Area Settings')
                        .child(
                          S.document()
                            .schemaType('program')
                            .documentId(CATEGORY_ID.capacityBuilding)
                        ),
                    ])
                ),

              // ── Community Engagement ─────────────────────────────────────
              S.listItem()
                .title('Community Engagement')
                .child(
                  S.list()
                    .title('Community Engagement')
                    .items([
                      S.listItem()
                        .title('Programs')
                        .child(
                          S.documentList()
                            .title('Community Engagement Programs')
                            .schemaType('programs')
                            .filter(`_type == "programs" && category._ref == "${CATEGORY_ID.communityEngagement}"`)
                            .defaultOrdering([{field: 'order', direction: 'asc'}])
                        ),
                      S.divider(),
                      S.listItem()
                        .title('Community Engagement Area Settings')
                        .child(
                          S.document()
                            .schemaType('program')
                            .documentId(CATEGORY_ID.communityEngagement)
                        ),
                    ])
                ),

            ])
        ),

      S.divider(),

      // ── News & Resources ──────────────────────────────────────────────────
      S.listItem()
        .title('News & Resources')
        .child(
          S.list()
            .title('News & Resources')
            .items([
              S.listItem().title('News')
                .child(S.documentTypeList('news').title('News')),
              S.listItem().title('Resources')
                .child(S.documentTypeList('resource').title('Resources')),
            ])
        ),

      S.divider(),

      // ── People & Organisation ─────────────────────────────────────────────
      S.listItem()
        .title('People & Organisation')
        .child(
          S.list()
            .title('People & Organisation')
            .items([
              S.listItem().title('Team Members')
                .child(S.documentTypeList('teamMember').title('Team Members')),
              S.listItem().title('Collaborators')
                .child(S.documentTypeList('partner').title('Collaborators')),
              S.listItem().title('Locations')
                .child(S.documentTypeList('location').title('Locations')),
            ])
        ),

      S.divider(),

      // ── Opportunities ─────────────────────────────────────────────────────
      S.listItem()
        .title('Opportunities')
        .child(
          S.list()
            .title('Opportunities')
            .items([
              S.listItem().title('Careers')
                .child(S.documentTypeList('career').title('Careers')),
              S.listItem().title('Tenders')
                .child(S.documentTypeList('tender').title('Tenders')),
            ])
        ),

    ])

// ── Config ───────────────────────────────────────────────────────────────────

export default defineConfig({
  name: 'default',
  title: 'ambso-backend',

  projectId: '69ie0jo3',
  dataset: 'production',

  plugins: [
    structureTool({structure: deskStructure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})