import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singletons Group
      S.listItem()
        .title('Site Configuration')
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPageContent').documentId('aboutPageContent')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPageContent').documentId('contactPageContent')),
              S.listItem()
                .title('Team Page')
                .child(S.document().schemaType('teamPageContent').documentId('teamPageContent')),
              S.listItem()
                .title('Resources Page')
                .child(S.document().schemaType('resourcesPageContent').documentId('resourcesPageContent')),
            ])
        ),
      S.divider(),
      // ... rest of content types
    ])
    
export default defineConfig({
  name: 'default',
  title: 'ambso-backend',

  projectId: '69ie0jo3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
