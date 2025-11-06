# 🏢 UVend Corporate Email Setup

## **Email Configuration for @uvend.co.za**

Since you're using a corporate email account, here are the setup options:

### **Option 1: Microsoft 365/Outlook (Most Likely)**

If UVend uses Microsoft 365, use these settings:

```env
# Microsoft 365/Outlook Configuration
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@uvend.co.za
EMAIL_PASS=your-password
EMAIL_FROM=noreply@uvend.co.za
```

### **Option 2: Google Workspace (If UVend uses Gmail for Business)**

```env
# Google Workspace Configuration
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@uvend.co.za
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@uvend.co.za
```

### **Option 3: Custom SMTP Server**

If UVend has their own email server:

```env
# Custom SMTP Configuration
EMAIL_SERVICE=smtp
SMTP_HOST=mail.uvend.co.za
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@uvend.co.za
EMAIL_PASS=your-password
EMAIL_FROM=noreply@uvend.co.za
```

## **Setup Steps**

### **1. Find Your Email Server Settings**

**Check with your IT department for:**
- SMTP server hostname
- Port number (usually 587 or 465)
- Authentication method
- Any special requirements

### **2. Test Email Settings**

I'll create a test script to verify your email configuration works.

### **3. Security Considerations**

- Use app-specific passwords if available
- Enable 2FA on your work account
- Check with IT about sending emails programmatically

## **Common Corporate Email Providers**

### **Microsoft 365**
- Host: `smtp.office365.com`
- Port: `587`
- Security: `STARTTLS`

### **Google Workspace**
- Host: `smtp.gmail.com`
- Port: `587`
- Security: `STARTTLS`

### **Exchange Server**
- Host: `mail.uvend.co.za` (or similar)
- Port: `587`
- Security: `STARTTLS`

## **Next Steps**

1. **Contact IT** - Ask for SMTP settings
2. **Test Configuration** - Use the test script
3. **Update Environment** - Add settings to `.env`
4. **Deploy** - Test in production

Would you like me to create a test script to help you find the correct email settings?
