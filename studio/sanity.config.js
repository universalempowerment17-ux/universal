import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Universal Empowerment Foundation',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .id('siteSettingsSingleton')
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .id('donationSettingsSingleton')
              .title('Donation Settings')
              .child(
                S.document()
                  .schemaType('donationSettings')
                  .documentId('donationSettings')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'donationSettings'].includes(item.getId())
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
