# Email Configuration Setup

## Overview
The registration form includes a submit button that generates a PDF and emails it to the specified recipients.

## Email Recipients
The submit button sends emails to:
- registrations@uvend.co.za
- shawaal@uvend.co.za  
- rross@uvend.co.za

## Configuration Steps

### 1. Environment Variables
Create a `.env` file in the project root with:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@uvend.co.za

# Development Mode
NODE_ENV=development
```

### 2. Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

### 3. Alternative Email Services
You can configure other SMTP services by updating `server/api/send-email.post.js`:

#### SendGrid
```javascript
const transporter = nodemailer.createTransporter({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
})
```

#### AWS SES
```javascript
const transporter = nodemailer.createTransporter({
  SES: { ses: new AWS.SES(), aws: AWS }
})
```

#### Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

## Testing

### 1. Development Mode
In development mode, emails are simulated and won't actually send. Check the console for logs.

### 2. Test Page
Visit `http://localhost:3000/test-submit.html` to test the email functionality.

### 3. Production Testing
1. Set `NODE_ENV=production` in your environment
2. Configure proper email credentials
3. Test with a small group first

## Features

### Submit Button Functionality
- ✅ Generates PDF from registration data
- ✅ Sends email with PDF attachment
- ✅ Includes registration summary in email body
- ✅ Sends to multiple recipients
- ✅ Shows loading state during submission
- ✅ Displays success/error messages

### PDF Generation
- Professional formatting
- Includes all registration data
- Proper styling for print/email
- Masked sensitive information (account numbers)

### Email Content
- Subject: "New Registration Submission - [Name]"
- Body: Summary of key registration details
- Attachment: Complete PDF with all information

## Troubleshooting

### Common Issues
1. **Email not sending**: Check SMTP credentials and firewall settings
2. **PDF generation fails**: Ensure html2pdf.js is properly installed
3. **Permission errors**: Check file permissions on Windows
4. **SMTP authentication**: Verify app passwords for Gmail

### Debug Mode
Set `NODE_ENV=development` to see detailed logs and simulate email sending.

## Security Notes
- Never commit `.env` files to version control
- Use app passwords instead of main account passwords
- Consider using environment-specific email services
- Implement rate limiting for production use
