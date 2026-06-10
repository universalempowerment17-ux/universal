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
      name: 'homeHeroImage',
      title: 'Home Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the homepage hero.',
    }),
    defineField({
      name: 'homeFeatureImage',
      title: 'Home Feature Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image used in the homepage feature / story section.',
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Stats',
      type: 'array',
      description: 'Edit the homepage impact numbers and labels from the admin panel.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
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
      name: 'missionHeroImage',
      title: 'Mission Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Mission page hero.',
    }),
    defineField({
      name: 'galleryHeroImage',
      title: 'Gallery Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Gallery page hero.',
    }),
    defineField({
      name: 'donationHeroImage',
      title: 'Donation Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main image shown on the Donation page hero.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
