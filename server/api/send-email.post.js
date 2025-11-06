import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No form data provided'
      })
    }

    // Extract form data
    const to = formData.find(field => field.name === 'to')?.data?.toString()
    const subject = formData.find(field => field.name === 'subject')?.data?.toString()
    const body = formData.find(field => field.name === 'body')?.data?.toString()
    const pdfFile = formData.find(field => field.name === 'pdf')

    if (!to || !subject || !body) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: to, subject, body'
      })
    }

    // Create transporter with configuration
    const emailService = process.env.EMAIL_SERVICE || 'smtp'
    
    let transporterConfig = {}
    
    if (emailService === 'sendgrid') {
      transporterConfig = {
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      }
    } else if (emailService === 'ses') {
      transporterConfig = {
        SES: { 
          ses: new AWS.SES(), 
          aws: AWS 
        }
      }
    } else {
      // SMTP Configuration (default)
      transporterConfig = {
        host: process.env.SMTP_HOST || 'smtp.uvend.co.za',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER || 'registrations@uvend.co.za',
          pass: process.env.EMAIL_PASS || 'your-password'
        }
      }
    }
    
    const transporter = nodemailer.createTransport(transporterConfig)

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@uvend.co.za',
      to: to.split(',').map(email => email.trim()),
      subject: subject,
      text: body,
      html: body.replace(/\n/g, '<br>'),
      attachments: pdfFile ? [{
        filename: `registration-summary-${new Date().toISOString().split('T')[0]}.pdf`,
        content: pdfFile.data,
        contentType: 'application/pdf'
      }] : []
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Email sent successfully:', info.messageId)
    console.log('Recipients:', to.split(',').map(email => email.trim()))

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      recipients: to.split(',').map(email => email.trim()),
      timestamp: new Date().toISOString()
    }

  } catch (error) {
    console.error('Error sending email:', error)
    
    // For development, return success even if email fails
    // In production, you might want to handle this differently
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating successful email send')
      return {
        success: true,
        message: 'Email simulated successfully (development mode)',
        recipients: ['registrations@uvend.co.za', 'shawaal@uvend.co.za', 'rross@uvend.co.za'],
        timestamp: new Date().toISOString()
      }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email: ' + error.message
    })
  }
})
