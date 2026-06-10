import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'homeHeroImages',
      title: 'Home Hero Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add 2-4 images for the rotating homepage hero background.',
    }),
    defineField({
      name: 'homeBeliefImage',
      title: 'Home Belief Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used in the homepage belief / about block.',
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Stats',
      type: 'array',
      description: 'Add or remove impact cards for the homepage. Each card needs a label and a value.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({ label, value }) {
              return {
                title: label || 'Missing label',
                subtitle: value || 'Missing value',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Portrait used in the founder section on the homepage.',
    }),
    defineField({
      name: 'aboutHeroImage',
      title: 'About Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the About page hero.',
    }),
    defineField({
      name: 'ourWorkHeroImage',
      title: 'Our Work Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Our Work page hero.',
    }),
    defineField({
      name: 'galleryHeroImage',
      title: 'Gallery Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Gallery page hero.',
    }),
    defineField({
      name: 'programsHeroImage',
      title: 'Programs Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Programs page hero.',
    }),
    defineField({
      name: 'donationHeroImage',
      title: 'Donation Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Donation page hero.',
    }),
    defineField({
      name: 'contactHeroImage',
      title: 'Contact Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Contact page hero.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
