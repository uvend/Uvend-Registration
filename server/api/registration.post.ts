import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// Helper function to create email transporter
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'smtp'
  
    console.log('Creating email transporter:', {
      emailService,
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      smtpHost: process.env.SMTP_HOST || 'smtp.uvend.co.za',
      smtpPort: process.env.SMTP_PORT || '587',
      emailUser: process.env.EMAIL_USER || 'registrations@uvend.co.za',
      hasEmailPass: !!process.env.EMAIL_PASS,
      secure: process.env.SMTP_SECURE === 'true' || parseInt(process.env.SMTP_PORT || '587') === 465
    })
  
  if (emailService === 'sendgrid') {
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is required when using SendGrid')
    }
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    })
  } else {
    // SMTP Configuration (default) - Matching mail.uvend.co.za settings
    const emailUser = process.env.EMAIL_USER || 'registrations@uvend.co.za'
    const emailPass = process.env.EMAIL_PASS
    
    if (!emailPass || emailPass.trim() === '') {
      throw new Error('EMAIL_PASS environment variable is required for SMTP authentication. Please set it in your .env file or environment variables.')
    }
    
    // SMTP Configuration matching your mail client settings
    // Port 587 uses STARTTLS (secure: false), Port 465 uses SSL (secure: true)
    const smtpPort = parseInt(process.env.SMTP_PORT || '587')
    const useSecure = smtpPort === 465 || process.env.SMTP_SECURE === 'true'
    
    // Try to decode password if it's URL encoded (some env vars get encoded)
    let decodedPassword = emailPass
    try {
      // Check if password is URL encoded and decode it
      if (emailPass.includes('%')) {
        decodedPassword = decodeURIComponent(emailPass)
      }
    } catch (e) {
      // If decoding fails, use original password
      decodedPassword = emailPass
    }
    
    // Remove any leading/trailing whitespace that might cause issues
    const cleanPassword = decodedPassword.trim()
    const cleanUser = emailUser.trim()
    
    const transporterConfig: any = {
      host: process.env.SMTP_HOST || 'smtp.uvend.co.za',
      port: smtpPort,
      secure: useSecure, // false for port 587 (STARTTLS), true for port 465 (SSL)
      // Add connection timeout and other options
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      // Authentication - same username as incoming (as per your config)
      authMethod: 'PLAIN', // Explicitly set authentication method
      auth: {
        user: cleanUser,
        pass: cleanPassword
      },
      // TLS options for STARTTLS (port 587)
      requireTLS: !useSecure, // Require TLS for port 587
      tls: {
        rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false', // Set to false only for self-signed certs
        ciphers: 'SSLv3' // Some servers require specific cipher
      },
      // Some SMTP servers require specific options
      pool: false,
      maxConnections: 1,
      maxMessages: 1
    }
    
    // Log password length for debugging (not the actual password)
    console.log('SMTP Auth Details:', {
      user: cleanUser,
      passwordLength: cleanPassword.length,
      passwordStartsWith: cleanPassword.substring(0, 1) + '***',
      passwordEndsWith: '***' + cleanPassword.substring(cleanPassword.length - 1),
      hasSpecialChars: /[^a-zA-Z0-9]/.test(cleanPassword)
    })
    
    console.log('SMTP authentication configured with user:', emailUser)
    
    const transporter = nodemailer.createTransport(transporterConfig)
    
    // Verify transporter configuration (async, but don't block)
    transporter.verify((error: any, success) => {
      if (error) {
        console.error('SMTP connection verification failed:', {
          message: error.message,
          code: error.code,
          command: error.command,
          response: error.response,
          responseCode: error.responseCode
        })
        
        // Provide helpful error messages
        if (error.code === 'EAUTH' || error.responseCode === 535) {
          console.error('\n=== SMTP AUTHENTICATION ERROR ===')
          console.error('The SMTP server rejected the login credentials.')
          console.error('Common fixes:')
          console.error('1. Verify EMAIL_USER and EMAIL_PASS are correct')
          console.error('2. For Gmail: Use an App Password instead of your regular password')
          console.error('3. For Office 365: Check if account requires OAuth2')
          console.error('4. Verify SMTP settings (host, port, secure) are correct')
          console.error('5. Check if account has "Less secure app access" enabled (if applicable)')
          console.error('===================================\n')
        }
      } else {
        console.log('SMTP connection verified successfully')
      }
    })
    
    return transporter
  }
}

// Helper function to send email
const sendEmail = async (to: string | string[], subject: string, html: string, text: string, attachments?: any[]) => {
  try {
    const transporter = createTransporter()
    const from = process.env.EMAIL_FROM || 'noreply@uvend.co.za'
    
    const recipients = Array.isArray(to) ? to : [to]
    
    // Log email configuration (without sensitive data)
    console.log('Sending email:', {
      from,
      to: recipients,
      subject,
      hasAttachments: attachments && attachments.length > 0,
      attachmentCount: attachments?.length || 0,
      emailService: process.env.EMAIL_SERVICE || 'smtp',
      smtpHost: process.env.SMTP_HOST || 'smtp.uvend.co.za',
      smtpPort: process.env.SMTP_PORT || '587'
    })
    
    const mailOptions = {
      from,
      to: recipients,
      subject,
      text,
      html,
      attachments: attachments || []
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    })
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    const errorDetails = {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    }
    
    console.error('Error sending email:', errorDetails)
    
    // Provide helpful error message for authentication errors
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      console.error('\n=== EMAIL AUTHENTICATION FAILED ===')
      console.error('Error: Invalid login credentials (535 Incorrect authentication data)')
      console.error('\nTroubleshooting steps:')
      console.error('1. Check EMAIL_USER environment variable:', process.env.EMAIL_USER || 'registrations@uvend.co.za')
      console.error('2. Verify EMAIL_PASS is set correctly (check for extra spaces or special characters)')
      console.error('3. For Gmail/Google Workspace:')
      console.error('   - Generate an App Password at: https://myaccount.google.com/apppasswords')
      console.error('   - Use the App Password instead of your regular password')
      console.error('4. For Office 365/Outlook:')
      console.error('   - May require OAuth2 instead of basic auth')
      console.error('   - Check if account has MFA enabled (requires app password)')
      console.error('5. Verify SMTP settings:')
      console.error('   - Host:', process.env.SMTP_HOST || 'smtp.uvend.co.za')
      console.error('   - Port:', process.env.SMTP_PORT || '587')
      console.error('   - Secure:', process.env.SMTP_SECURE === 'true')
      console.error('===================================\n')
    }
    
    // Don't throw - log error but don't fail registration
    return { success: false, error: error.message, details: errorDetails }
  }
}

// Helper to strip data URL prefix (e.g. data:application/pdf;base64,)
const stripDataUrlPrefix = (data?: string | null) => {
  if (!data) return null
  const parts = data.split('base64,')
  return parts.length > 1 ? parts[1] : data
}

const escapeHtml = (value: any) => {
  const s = value === null || value === undefined ? '' : String(value)
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return 'Not provided'
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return escapeHtml(dateString)
  try {
    return d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return escapeHtml(dateString)
  }
}

const formatDateText = (dateString?: string | null) => {
  if (!dateString) return 'Not provided'
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return String(dateString)
  try {
    return d.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(dateString)
  }
}

const getRegistrationTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    new: 'New Registration',
    update: 'Update Details',
    existing: 'Existing Registration'
  }
  return types[type] || type
}

const getAccountTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    savings: 'Savings',
    current: 'Current/Cheque',
    transmission: 'Transmission'
  }
  return types[type] || type
}

const buildRegistrationDetailsEmail = (payload: {
  type: string
  personal: any
  banking: any
  address: any
  meters: any[]
  documents: any
}) => {
  const { type, personal = {}, banking = {}, address = {}, meters = [], documents = {} } = payload
  const generatedOn = new Date().toLocaleString('en-ZA')

  const docName = (doc: any) => (doc?.name ? escapeHtml(doc.name) : 'Not provided')

  const complexesHtml =
    Array.isArray(address?.complexes) && address.complexes.length
      ? address.complexes
          .map((c: any, idx: number) => {
            return `
              <div style="padding: 10px 0; border-top: 1px solid #e5e7eb;">
                <div style="font-weight: 600; color: #111827; margin-bottom: 6px;">Complex ${idx + 1}</div>
                <div><strong>Name:</strong> ${escapeHtml(c?.name || 'Not provided')}</div>
                <div><strong>Number of Units:</strong> ${escapeHtml(c?.unitCount ?? 'Not provided')}</div>
                <div><strong>Address:</strong> ${escapeHtml(c?.address || 'Not provided')}</div>
              </div>
            `
          })
          .join('')
      : `<div style="color: #6b7280;">No complexes added</div>`

  const metersHtml =
    Array.isArray(meters) && meters.length
      ? meters
          .map((m: any, idx: number) => {
            const unit = m?.unit || {}
            const tenant = unit?.tenant || {}
            const tenantHtml =
              unit?.hasTenant
                ? `
                  <div style="margin-top: 10px; padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                    <div style="font-weight: 600; color: #111827; margin-bottom: 6px;">Tenant Information</div>
                    <div><strong>Name:</strong> ${escapeHtml(tenant?.name || 'Not provided')}</div>
                    <div><strong>Phone:</strong> ${escapeHtml(tenant?.phone || 'Not provided')}</div>
                    <div><strong>Email:</strong> ${escapeHtml(tenant?.email || 'Not provided')}</div>
                    <div><strong>Lease Period:</strong> ${formatDate(tenant?.leaseStart)} - ${formatDate(tenant?.leaseEnd)}</div>
                  </div>
                `
                : ''

            return `
              <div style="padding: 14px 0; border-top: 1px solid #e5e7eb;">
                <div style="font-weight: 700; color: #111827; margin-bottom: 8px;">Meter ${idx + 1}</div>
                <div><strong>Meter Number:</strong> ${escapeHtml(m?.meterNumber || 'Not provided')}</div>
                <div><strong>Utility Type:</strong> ${escapeHtml(m?.utilityType || 'Not provided')}</div>
                <div><strong>Location:</strong> ${escapeHtml(m?.location || 'Not provided')}</div>
                <div><strong>Status:</strong> ${m?.isActive === false ? 'Inactive' : 'Active'}</div>
                <div style="margin-top: 10px; padding: 10px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                  <div style="font-weight: 600; color: #111827; margin-bottom: 6px;">Unit Details</div>
                  <div><strong>Unit Number:</strong> ${escapeHtml(unit?.unitNumber || 'Not provided')}</div>
                  <div><strong>Unit Type:</strong> ${escapeHtml(unit?.unitType || 'Not provided')}</div>
                </div>
                ${tenantHtml}
              </div>
            `
          })
          .join('')
      : `<div style="color: #6b7280;">No meters added</div>`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto; padding: 20px; color: #111827;">
      <h1 style="color: #1e40af; font-size: 26px; margin: 0 0 6px 0;">Registration Summary</h1>
      <div style="color: #6b7280; font-size: 12px; margin-bottom: 18px;">Generated on ${escapeHtml(generatedOn)}</div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Registration Type</h2>
        <div><strong>Type:</strong> ${escapeHtml(getRegistrationTypeLabel(type) || 'Not provided')}</div>
      </div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Personal Information</h2>
        <div><strong>First Name:</strong> ${escapeHtml(personal?.firstName || 'Not provided')}</div>
        <div><strong>Last Name:</strong> ${escapeHtml(personal?.lastName || 'Not provided')}</div>
        <div><strong>Email Address:</strong> ${escapeHtml(personal?.email || 'Not provided')}</div>
        <div><strong>Phone Number:</strong> ${escapeHtml(personal?.phone || 'Not provided')}</div>
        <div><strong>ID Number:</strong> ${escapeHtml(personal?.idNumber || 'Not provided')}</div>
        <div><strong>Date of Birth:</strong> ${formatDate(personal?.dateOfBirth)}</div>
      </div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Documents</h2>
        <div><strong>ID Document:</strong> ${docName((documents as any)?.idDocument)}</div>
        <div><strong>Proof of Address:</strong> ${docName((documents as any)?.proofOfAddress)}</div>
        <div><strong>Bank Confirmation:</strong> ${docName((documents as any)?.bankStatement)}</div>
        ${
          Array.isArray((documents as any)?.additionalDocuments) && (documents as any).additionalDocuments.length
            ? `<div style="margin-top: 10px;"><strong>Additional Documents:</strong><ul style="margin: 6px 0 0 18px; padding: 0;">${(documents as any).additionalDocuments
                .map((d: any) => `<li>${docName(d)}</li>`)
                .join('')}</ul></div>`
            : ''
        }
      </div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Banking Details</h2>
        <div><strong>Account Holder:</strong> ${escapeHtml(banking?.accountHolder || 'Not provided')}</div>
        <div><strong>Bank Name:</strong> ${escapeHtml(banking?.bankName || 'Not provided')}</div>
        <div><strong>Account Type:</strong> ${escapeHtml(banking?.accountType ? getAccountTypeLabel(banking.accountType) : 'Not provided')}</div>
        <div><strong>Branch Code:</strong> ${escapeHtml(banking?.branchCode || 'Not provided')}</div>
        <div><strong>Account Number:</strong> ${escapeHtml(banking?.accountNumber || 'Not provided')}</div>
      </div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 14px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Address Details</h2>
        <div style="font-weight: 600; color: #111827; margin: 8px 0;">Main Business Address</div>
        <div><strong>Street Address:</strong> ${escapeHtml(address?.streetAddress || 'Not provided')}</div>
        <div><strong>Suburb:</strong> ${escapeHtml(address?.suburb || 'Not provided')}</div>
        <div><strong>City:</strong> ${escapeHtml(address?.city || 'Not provided')}</div>
        <div><strong>Province:</strong> ${escapeHtml(address?.province || 'Not provided')}</div>
        <div><strong>Postal Code:</strong> ${escapeHtml(address?.postalCode || 'Not provided')}</div>

        <div style="font-weight: 600; color: #111827; margin: 12px 0 6px 0;">Complexes</div>
        ${complexesHtml}
      </div>

      <div style="padding: 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 6px;">
        <h2 style="color: #1e40af; font-size: 18px; margin: 0 0 10px 0;">Meter & Unit Details</h2>
        ${metersHtml}
      </div>
    </div>
  `

  const textLines: string[] = []
  textLines.push('Registration Summary')
  textLines.push(`Generated on: ${generatedOn}`)
  textLines.push('')
  textLines.push('Registration Type')
  textLines.push(`- Type: ${getRegistrationTypeLabel(type) || 'Not provided'}`)
  textLines.push('')
  textLines.push('Personal Information')
  textLines.push(`- First Name: ${personal?.firstName || 'Not provided'}`)
  textLines.push(`- Last Name: ${personal?.lastName || 'Not provided'}`)
  textLines.push(`- Email Address: ${personal?.email || 'Not provided'}`)
  textLines.push(`- Phone Number: ${personal?.phone || 'Not provided'}`)
  textLines.push(`- ID Number: ${personal?.idNumber || 'Not provided'}`)
  textLines.push(`- Date of Birth: ${formatDateText(personal?.dateOfBirth)}`)
  textLines.push('')
  textLines.push('Documents')
  textLines.push(`- ID Document: ${documents?.idDocument?.name || 'Not provided'}`)
  textLines.push(`- Proof of Address: ${documents?.proofOfAddress?.name || 'Not provided'}`)
  textLines.push(`- Bank Confirmation: ${documents?.bankStatement?.name || 'Not provided'}`)
  if (Array.isArray(documents?.additionalDocuments) && documents.additionalDocuments.length) {
    textLines.push('- Additional Documents:')
    documents.additionalDocuments.forEach((d: any, idx: number) => {
      textLines.push(`  - ${idx + 1}. ${d?.name || 'Not provided'}`)
    })
  }
  textLines.push('')
  textLines.push('Banking Details')
  textLines.push(`- Account Holder: ${banking?.accountHolder || 'Not provided'}`)
  textLines.push(`- Bank Name: ${banking?.bankName || 'Not provided'}`)
  textLines.push(`- Account Type: ${banking?.accountType ? getAccountTypeLabel(banking.accountType) : 'Not provided'}`)
  textLines.push(`- Branch Code: ${banking?.branchCode || 'Not provided'}`)
  textLines.push(`- Account Number: ${banking?.accountNumber || 'Not provided'}`)
  textLines.push('')
  textLines.push('Address Details')
  textLines.push('- Main Business Address')
  textLines.push(`  - Street Address: ${address?.streetAddress || 'Not provided'}`)
  textLines.push(`  - Suburb: ${address?.suburb || 'Not provided'}`)
  textLines.push(`  - City: ${address?.city || 'Not provided'}`)
  textLines.push(`  - Province: ${address?.province || 'Not provided'}`)
  textLines.push(`  - Postal Code: ${address?.postalCode || 'Not provided'}`)
  textLines.push('- Complexes')
  if (Array.isArray(address?.complexes) && address.complexes.length) {
    address.complexes.forEach((c: any, idx: number) => {
      textLines.push(`  - Complex ${idx + 1}:`)
      textLines.push(`    - Name: ${c?.name || 'Not provided'}`)
      textLines.push(`    - Number of Units: ${c?.unitCount ?? 'Not provided'}`)
      textLines.push(`    - Address: ${c?.address || 'Not provided'}`)
    })
  } else {
    textLines.push('  - No complexes added')
  }
  textLines.push('')
  textLines.push('Meter & Unit Details')
  if (Array.isArray(meters) && meters.length) {
    meters.forEach((m: any, idx: number) => {
      const unit = m?.unit || {}
      const tenant = unit?.tenant || {}
      textLines.push(`- Meter ${idx + 1}:`)
      textLines.push(`  - Meter Number: ${m?.meterNumber || 'Not provided'}`)
      textLines.push(`  - Utility Type: ${m?.utilityType || 'Not provided'}`)
      textLines.push(`  - Location: ${m?.location || 'Not provided'}`)
      textLines.push(`  - Status: ${m?.isActive === false ? 'Inactive' : 'Active'}`)
      textLines.push(`  - Unit Number: ${unit?.unitNumber || 'Not provided'}`)
      textLines.push(`  - Unit Type: ${unit?.unitType || 'Not provided'}`)
      if (unit?.hasTenant) {
        textLines.push('  - Tenant Information:')
        textLines.push(`    - Name: ${tenant?.name || 'Not provided'}`)
        textLines.push(`    - Phone: ${tenant?.phone || 'Not provided'}`)
        textLines.push(`    - Email: ${tenant?.email || 'Not provided'}`)
        textLines.push(`    - Lease Period: ${formatDateText(tenant?.leaseStart)} - ${formatDateText(tenant?.leaseEnd)}`)
      }
    })
  } else {
    textLines.push('- No meters added')
  }

  return { html, text: textLines.join('\n') }
}

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
      documents = {},
      pdfBase64 // PDF as base64 string from frontend
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
            const doc = documents.idDocument
            createdDocs.push({ 
              kind: 'idDocument', 
              fileName: doc?.name || null, 
              mimeType: doc?.type || null, 
              url: null 
            })
          }
          if (documents.proofOfAddress) {
            const doc = documents.proofOfAddress
            createdDocs.push({ 
              kind: 'proofOfAddress', 
              fileName: doc?.name || null, 
              mimeType: doc?.type || null, 
              url: null 
            })
          }
          if (documents.bankStatement) {
            const doc = documents.bankStatement
            createdDocs.push({ 
              kind: 'bankStatement', 
              fileName: doc?.name || null, 
              mimeType: doc?.type || null, 
              url: null 
            })
          }
          if (Array.isArray(documents.additionalDocuments)) {
            for (let i = 0; i < documents.additionalDocuments.length; i++) {
              const doc = documents.additionalDocuments[i]
              createdDocs.push({ 
                kind: 'additional', 
                fileName: doc?.name || null, 
                mimeType: doc?.type || null, 
                url: null 
              })
            }
          }
          return createdDocs.length ? { create: createdDocs } : undefined
        })()
      }
    })

    // Prepare original document attachments (PDFs/images) if base64 data is provided
    const documentAttachments: any[] = []

    if (documents && typeof documents === 'object') {
      const pushDocAttachment = (doc: any, fallbackName: string) => {
        if (!doc || !doc.base64) return
        const base64Content = stripDataUrlPrefix(doc.base64)
        if (!base64Content) return
        documentAttachments.push({
          filename: doc.name || fallbackName,
          content: base64Content,
          encoding: 'base64',
          contentType: doc.type || undefined
        })
      }

      pushDocAttachment((documents as any).idDocument, 'id-document.pdf')
      pushDocAttachment((documents as any).proofOfAddress, 'proof-of-address.pdf')
      pushDocAttachment((documents as any).bankStatement, 'bank-statement.pdf')

      if (Array.isArray((documents as any).additionalDocuments)) {
        ;(documents as any).additionalDocuments.forEach((doc: any, index: number) => {
          pushDocAttachment(doc, `additional-document-${index + 1}.pdf`)
        })
      }
    }

    const customerName = `${personal.firstName} ${personal.lastName}`

    // Office email: include full registration details in the email body (no generated PDF attachment)
    const { html: officeEmailHtml, text: officeEmailText } = buildRegistrationDetailsEmail({
      type,
      personal,
      banking,
      address,
      meters,
      documents
    })

    // Send email to registration office
    const officeRecipients = [
      'registrations@uvend.co.za',
      'shawaal@uvend.co.za',
      'Ross@uvend.co.za'
    ]
    
    const emailResult = await sendEmail(
      officeRecipients,
      `Registration of ${personal.firstName} ${personal.lastName}`,
      officeEmailHtml,
      officeEmailText,
      [...documentAttachments]
    )

    // Log email result for debugging
    if (!emailResult.success) {
      console.error('Failed to send email to office:', emailResult.error)
      // Don't throw - registration should still succeed even if email fails
    } else {
      console.log('Email sent successfully to office:', emailResult.messageId)
    }

    // Email 2: Send confirmation to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">Registration Successful - U-Vend</h2>
        <p>Dear ${customerName},</p>
        <p>Thank you for registering with U-Vend! Your registration has been successfully submitted.</p>
        <p>We have received your registration details and our team will review your submission. An agent will reach out to you shortly to complete the registration process.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Best regards,<br>U-Vend Team</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `

    const customerEmailText = `
Registration Successful - U-Vend

Dear ${customerName},

Thank you for registering with U-Vend! Your registration has been successfully submitted.

We have received your registration details and our team will review your submission. An agent will reach out to you shortly to complete the registration process.

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
U-Vend Team
    `.trim()

    // Send confirmation email to customer
    const customerEmailResult = await sendEmail(
      personal.email,
      'Registration Successful - U-Vend',
      customerEmailHtml,
      customerEmailText
    )

    // Log customer email result for debugging
    if (!customerEmailResult.success) {
      console.error('Failed to send email to customer:', customerEmailResult.error)
      // Don't throw - registration should still succeed even if email fails
    } else {
      console.log('Email sent successfully to customer:', customerEmailResult.messageId)
    }

    return { 
      success: true, 
      id: created.id,
      message: 'Registration saved and emails sent successfully'
    }
  } catch (error: any) {
    console.error('Registration save failed:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      code: error?.code,
      meta: error?.meta
    })
    // Return more detailed error information for debugging
    const errorMessage = error?.message || 'Failed to save registration'
    const errorDetails = error?.meta ? ` Details: ${JSON.stringify(error.meta)}` : ''
    throw createError({ 
      statusCode: 500, 
      statusMessage: `${errorMessage}${errorDetails}` 
    })
  }
})


