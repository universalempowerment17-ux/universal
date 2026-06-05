import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'donationSettings',
  title: 'Donation Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'qrCodeImage',
      title: 'QR Code Image',
      type: 'image',
      description: 'Upload your UPI/payment QR code image.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'upiId',
      title: 'UPI ID',
      type: 'string',
      description: 'e.g. uefoundation@upi',
    }),
    defineField({
      name: 'accountName',
      title: 'Account Holder Name',
      type: 'string',
    }),
    defineField({
      name: 'bankName',
      title: 'Bank Name',
      type: 'string',
    }),
    defineField({
      name: 'accountNumber',
      title: 'Account Number',
      type: 'string',
    }),
    defineField({
      name: 'ifscCode',
      title: 'IFSC Code',
      type: 'string',
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
    }),
    defineField({
      name: 'donationNote',
      title: 'Donation Note',
      type: 'text',
      rows: 3,
      description: 'Optional note shown on the donation page (e.g. tax exemption info).',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Donation Settings' }
    },
  },
})
