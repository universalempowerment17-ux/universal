import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'storyItem',
  title: 'Story Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Short summary shown before the card is expanded.',
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
      description: 'Full story text shown when the card is expanded.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'Optional publish date for sorting.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
})
