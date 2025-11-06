// Email Configuration Test Script
// Run this to test your UVend email settings

import nodemailer from 'nodemailer'

// Test different email configurations
const testConfigs = [
  {
    name: 'Microsoft 365/Outlook',
    config: {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@uvend.co.za',
        pass: 'your-password'
      }
    }
  },
  {
    name: 'Google Workspace',
    config: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@uvend.co.za',
        pass: 'your-app-password'
      }
    }
  },
  {
    name: 'Custom SMTP (Port 587)',
    config: {
      host: 'mail.uvend.co.za',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@uvend.co.za',
        pass: 'your-password'
      }
    }
  },
  {
    name: 'Custom SMTP (Port 465)',
    config: {
      host: 'mail.uvend.co.za',
      port: 465,
      secure: true,
      auth: {
        user: 'your-email@uvend.co.za',
        pass: 'your-password'
      }
    }
  }
]

async function testEmailConfig(configName, config) {
  console.log(`\n🧪 Testing ${configName}...`)
  
  try {
    const transporter = nodemailer.createTransporter(config)
    
    // Verify connection
    await transporter.verify()
    console.log(`✅ ${configName}: Connection successful!`)
    
    // Test sending email
    const testEmail = {
      from: config.auth.user,
      to: 'test@example.com',
      subject: 'Test Email from Registration System',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<p>This is a test email to verify SMTP configuration.</p>'
    }
    
    const info = await transporter.sendMail(testEmail)
    console.log(`✅ ${configName}: Email sent successfully!`)
    console.log(`   Message ID: ${info.messageId}`)
    
    return true
    
  } catch (error) {
    console.log(`❌ ${configName}: Failed`)
    console.log(`   Error: ${error.message}`)
    return false
  }
}

async function runTests() {
  console.log('🚀 Testing UVend Email Configurations\n')
  console.log('📝 Instructions:')
  console.log('1. Update the email credentials in this file')
  console.log('2. Run: node test-email-config.js')
  console.log('3. Use the working configuration in your .env file\n')
  
  let workingConfig = null
  
  for (const testConfig of testConfigs) {
    const success = await testEmailConfig(testConfig.name, testConfig.config)
    if (success && !workingConfig) {
      workingConfig = testConfig
    }
  }
  
  if (workingConfig) {
    console.log('\n🎉 SUCCESS! Working configuration found:')
    console.log(`   Service: ${workingConfig.name}`)
    console.log('\n📋 Add this to your .env file:')
    console.log(`EMAIL_SERVICE=smtp`)
    console.log(`SMTP_HOST=${workingConfig.config.host}`)
    console.log(`SMTP_PORT=${workingConfig.config.port}`)
    console.log(`SMTP_SECURE=${workingConfig.config.secure}`)
    console.log(`EMAIL_USER=${workingConfig.config.auth.user}`)
    console.log(`EMAIL_PASS=${workingConfig.config.auth.pass}`)
    console.log(`EMAIL_FROM=noreply@uvend.co.za`)
  } else {
    console.log('\n❌ No working configuration found.')
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check with IT for correct SMTP settings')
    console.log('2. Verify your email credentials')
    console.log('3. Check if 2FA is required')
    console.log('4. Try different ports (587, 465, 25)')
  }
}

// Run the tests
runTests().catch(console.error)
