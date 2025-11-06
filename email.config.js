// Email Configuration
// Copy this to .env file for production use

export const emailConfig = {
  // Gmail SMTP Configuration
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  },
  
  // Email addresses
  from: process.env.EMAIL_FROM || 'noreply@uvend.co.za',
  recipients: [
    'registrations@uvend.co.za',
    'shawaal@uvend.co.za', 
    'ross@uvend.co.za'
  ]
}

export default emailConfig
