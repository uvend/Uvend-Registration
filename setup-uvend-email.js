// Quick setup script for UVend email configuration
// This will help you find the right email settings

console.log('🏢 UVend Email Setup Assistant\n')

console.log('📋 Step 1: Contact your IT department and ask for:')
console.log('   • SMTP server hostname (e.g., smtp.office365.com)')
console.log('   • Port number (usually 587 or 465)')
console.log('   • Authentication method')
console.log('   • Any special requirements for sending emails programmatically\n')

console.log('📋 Step 2: Common UVend email configurations to try:\n')

console.log('Option A - Microsoft 365/Outlook:')
console.log('   SMTP_HOST=smtp.office365.com')
console.log('   SMTP_PORT=587')
console.log('   SMTP_SECURE=false\n')

console.log('Option B - Google Workspace:')
console.log('   SMTP_HOST=smtp.gmail.com')
console.log('   SMTP_PORT=587')
console.log('   SMTP_SECURE=false\n')

console.log('Option C - Custom UVend Server:')
console.log('   SMTP_HOST=mail.uvend.co.za')
console.log('   SMTP_PORT=587')
console.log('   SMTP_SECURE=false\n')

console.log('📋 Step 3: Create your .env file:')
console.log('   1. Copy env.uvend.template to .env')
console.log('   2. Update with your actual credentials')
console.log('   3. Test with: node test-email-config.js\n')

console.log('📋 Step 4: Test your configuration:')
console.log('   1. Update test-email-config.js with your credentials')
console.log('   2. Run: node test-email-config.js')
console.log('   3. Use the working configuration\n')

console.log('🔧 If you need help:')
console.log('   • Check UVEND_EMAIL_SETUP.md for detailed instructions')
console.log('   • Contact IT for SMTP settings')
console.log('   • Test different ports (587, 465, 25)')
console.log('   • Verify your email credentials work in Outlook/Thunderbird\n')

console.log('✅ Once configured, your registration form will send emails to:')
console.log('   • registrations@uvend.co.za')
console.log('   • shawaal@uvend.co.za')
console.log('   • rross@uvend.co.za')
