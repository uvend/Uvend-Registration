import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Missing request body' })
    }

    const {
      type,
      personal = {},
      banking = {},
      address = {},
      meters = [],
      documents = {}
    } = body

    if (!type || !personal.firstName || !personal.lastName || !personal.email) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    const created = await prisma.registration.create({
      data: {
        type,
        firstName: personal.firstName,
        lastName: personal.lastName,
        email: personal.email,
        phone: personal.phone ?? null,
        idNumber: personal.idNumber ?? null,
        dateOfBirth: personal.dateOfBirth ?? null,
        bankName: banking.bankName ?? null,
        accountNumber: banking.accountNumber ?? null,
        accountHolder: banking.accountHolder ?? null,
        branchCode: banking.branchCode ?? null,
        accountType: banking.accountType ?? null,
        streetAddress: address.streetAddress ?? null,
        suburb: address.suburb ?? null,
        city: address.city ?? null,
        province: address.province ?? null,
        postalCode: address.postalCode ?? null,
        complexes: address.complexes && address.complexes.length ? {
          create: address.complexes.map((c: any) => ({
            name: c.name,
            unitCount: Number(c.unitCount || 0),
            address: c.address || ''
          }))
        } : undefined,
        meters: Array.isArray(meters) && meters.length ? {
          create: meters.map((m: any) => ({
            meterNumber: m.meterNumber,
            utilityType: m.utilityType,
            location: m.location || null,
            isActive: typeof m.isActive === 'boolean' ? m.isActive : true,
            unitNumber: m.unit?.unitNumber || null,
            unitType: m.unit?.unitType || null,
            hasTenant: !!m.unit?.hasTenant,
            tenantName: m.unit?.tenant?.name || null,
            tenantPhone: m.unit?.tenant?.phone || null,
            tenantEmail: m.unit?.tenant?.email || null,
            leaseStart: m.unit?.tenant?.leaseStart || null,
            leaseEnd: m.unit?.tenant?.leaseEnd || null
          }))
        } : undefined,
        documents: (() => {
          const createdDocs: any[] = []
          if (documents.idDocument) {
            createdDocs.push({ kind: 'idDocument', fileName: null, mimeType: null, url: null })
          }
          if (documents.proofOfAddress) {
            createdDocs.push({ kind: 'proofOfAddress', fileName: null, mimeType: null, url: null })
          }
          if (Array.isArray(documents.additionalDocuments)) {
            for (let i = 0; i < documents.additionalDocuments.length; i++) {
              createdDocs.push({ kind: 'additional', fileName: null, mimeType: null, url: null })
            }
          }
          return createdDocs.length ? { create: createdDocs } : undefined
        })()
      }
    })

    return { success: true, id: created.id }
  } catch (error: any) {
    console.error('Registration save failed:', error)
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Failed to save registration' })
  }
})


