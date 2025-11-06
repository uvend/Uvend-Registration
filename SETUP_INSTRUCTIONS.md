# 🚀 Complete Setup Instructions

## **CRITICAL ISSUES FIXED** ✅

### **1. Store Interface Mismatch** - FIXED ✅
- Added missing `idNumber` field to personal data
- Fixed banking field names (`accountHolder`, `branchCode`, `accountType`)
- Updated address structure to match components
- Fixed meters structure to be an array

### **2. Missing Dependencies** - FIXED ✅
- Added TypeScript support
- Added Node.js types
- Added Nodemailer types

## **ENVIRONMENT SETUP** (Since .env is blocked)

### **Step 1: Create Environment File**
Create a `.env` file in the project root with:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@uvend.co.za

# Development Mode
NODE_ENV=development
```

### **Step 2: Gmail Setup**
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification
   - Click "App passwords"
   - Select "Mail" and generate password
   - Use this password in `EMAIL_PASS`

### **Step 3: Install Dependencies**
```bash
npm install
```

### **Step 4: Start Development Server**
```bash
npm run dev
```

## **ALTERNATIVE EMAIL SERVICES**

### **SendGrid** (Recommended for Production)
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@uvend.co.za
```

### **AWS SES**
```env
EMAIL_SERVICE=ses
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
EMAIL_FROM=noreply@uvend.co.za
```

### **Custom SMTP**
```env
EMAIL_SERVICE=smtp
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
EMAIL_FROM=noreply@uvend.co.za
```

## **TESTING**

### **1. Test Email API**
Visit: `http://localhost:3000/test-submit.html`

### **2. Test Registration Form**
1. Go to `http://localhost:3000/Registration`
2. Fill out the form
3. Click "Submit Registration" on the summary page

## **PRODUCTION DEPLOYMENT**

### **1. Environment Variables**
Set these in your hosting platform:

```env
NODE_ENV=production
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
EMAIL_FROM=noreply@uvend.co.za
```

### **2. Build Commands**
```bash
npm run build
npm run preview
```

## **TROUBLESHOOTING**

### **Common Issues:**

1. **"Cannot find module" errors**
   - Run `npm install` to install missing dependencies

2. **Email not sending**
   - Check Gmail app password is correct
   - Verify 2FA is enabled
   - Check firewall settings

3. **PDF generation fails**
   - Ensure `html2pdf.js` is installed
   - Check browser console for errors

4. **Store data mismatch**
   - Clear browser cache
   - Restart development server

### **Debug Mode:**
Set `NODE_ENV=development` to see detailed logs and simulate email sending.

## **SECURITY NOTES**

- ✅ Never commit `.env` files
- ✅ Use app passwords, not main passwords
- ✅ Implement rate limiting for production
- ✅ Use HTTPS in production
- ✅ Validate all form inputs

## **FEATURES WORKING** ✅

- ✅ Multi-step registration form
- ✅ Form validation
- ✅ PDF generation
- ✅ Email sending with attachments
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Pinia state management
- ✅ Tailwind CSS styling
