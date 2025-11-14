import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

// Helper function to create email transporter
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'smtp'
  
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
    // SMTP Configuration (default)
    const emailUser = process.env.EMAIL_USER || 'registrations@uvend.co.za'
    const emailPass = process.env.EMAIL_PASS
    
    // Only include auth if password is provided
    const transporterConfig: any = {
      host: process.env.SMTP_HOST || 'smtp.uvend.co.za',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true'
    }
    
    if (emailPass && emailPass.trim() !== '') {
      transporterConfig.auth = {
        user: emailUser,
        pass: emailPass
      }
    }
    
    return nodemailer.createTransport(transporterConfig)
  }
}

// Helper function to send email
const sendEmail = async (to: string | string[], subject: string, html: string, text: string, attachments?: any[]) => {
  try {
    const transporter = createTransporter()
    const from = process.env.EMAIL_FROM || 'noreply@uvend.co.za'
    
    const recipients = Array.isArray(to) ? to : [to]
    
    const mailOptions = {
      from,
      to: recipients,
      subject,
      text,
      html,
      attachments: attachments || []
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('Error sending email:', error)
    // Don't throw - log error but don't fail registration
    return { success: false, error: error.message }
  }
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

    // Prepare PDF attachment if provided
    const pdfAttachment = pdfBase64 ? [{
      filename: `registration-summary-${personal.firstName}-${personal.lastName}-${new Date().toISOString().split('T')[0]}.pdf`,
      content: pdfBase64.split('base64,')[1] || pdfBase64, // Remove data:application/pdf;base64, prefix if present
      encoding: 'base64'
    }] : []

    const customerName = `${personal.firstName} ${personal.lastName}`
    const registrationType = type === 'new' ? 'New Registration' : type === 'update' ? 'Update Registration' : 'Existing Customer Update'

    // Email 1: Send to registration office with PDF
    const officeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">New Registration Submission</h2>
        <p>Hello,</p>
        <p><strong>${customerName}</strong> has successfully registered with U-Vend.</p>
        <p><strong>Registration Type:</strong> ${registrationType}</p>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${customerName}</li>
          <li><strong>Email:</strong> ${personal.email}</li>
          <li><strong>Phone:</strong> ${personal.phone || 'Not provided'}</li>
          <li><strong>ID Number:</strong> ${personal.idNumber || 'Not provided'}</li>
        </ul>
        <p>Please find the complete registration details attached as a PDF. Please review and process this registration.</p>
        <p>Submitted on: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
        <p>Best regards,<br>U-Vend Registration System</p>
      </div>
    `

    const officeEmailText = `
New Registration Submission

${customerName} has successfully registered with U-Vend.

Registration Type: ${registrationType}

Customer Details:
- Name: ${customerName}
- Email: ${personal.email}
- Phone: ${personal.phone || 'Not provided'}
- ID Number: ${personal.idNumber || 'Not provided'}

Please find the complete registration details attached as a PDF. Please review and process this registration.

Submitted on: ${new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}
    `.trim()

    // Send email to registration office
    const officeRecipients = [
      'registrations@uvend.co.za',
      'shawaal@uvend.co.za',
      'Ross@uvend.co.za'
    ]
    
    await sendEmail(
      officeRecipients,
      `${customerName} - New Registration Submission`,
      officeEmailHtml,
      officeEmailText,
      pdfAttachment
    )

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
    await sendEmail(
      personal.email,
      'Registration Successful - U-Vend',
      customerEmailHtml,
      customerEmailText
    )

    return { 
      success: true, 
      id: created.id,
      message: 'Registration saved and emails sent successfully'
    }
  } catch (error: any) {
    console.error('Registration save failed:', error)
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Failed to save registration' })
  }
})


