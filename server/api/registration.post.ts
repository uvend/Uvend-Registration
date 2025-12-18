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

    // Prepare PDF attachment if provided
    const pdfAttachment = pdfBase64 ? [{
      filename: `registration-summary-${personal.firstName}-${personal.lastName}-${new Date().toISOString().split('T')[0]}.pdf`,
      content: stripDataUrlPrefix(pdfBase64) || undefined,
      encoding: 'base64'
    }] : []

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

    // Simple email template as requested
    const officeEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
          This is the Registration of <strong>${personal.firstName} ${personal.lastName}</strong>
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Please find the registration details attached as a PDF.
        </p>
      </div>
    `

    const officeEmailText = `This is the Registration of ${personal.firstName} ${personal.lastName}\n\nPlease find the registration details attached as a PDF, along with copies of the original supporting documents.`

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
      [...pdfAttachment, ...documentAttachments]
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


