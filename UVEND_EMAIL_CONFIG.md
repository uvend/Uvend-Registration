# 🏢 UVend Email Configuration - READY TO USE

## **Email Settings from Your Screenshot:**

Based on the email credentials you provided, here's the exact configuration:

### **Environment Variables (.env file):**

```env
# UVend Email Configuration
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.uvend.co.za
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=registrations@uvend.co.za
EMAIL_PASS=your-actual-password-here
EMAIL_FROM=registrations@uvend.co.za

# Development Mode (change to production when ready)
NODE_ENV=development
```

### **What You Need to Do:**

1. **Create `.env` file** in your project root
2. **Copy the configuration above** into the `.env` file
3. **Replace `your-actual-password-here`** with the actual password from your screenshot
4. **Test the submit button** - it will now send real emails!

### **Email Recipients (Already Configured):**

The submit button will send emails to:
- ✅ `registrations@uvend.co.za` (same as sender)
- ✅ `shawaal@uvend.co.za`
- ✅ `rross@uvend.co.za`

### **SMTP Settings Summary:**

- **Outgoing Server**: `smtp.uvend.co.za`
- **Port**: `587`
- **Authentication**: Required (Username: `registrations@uvend.co.za`)
- **Security**: STARTTLS (not SSL)
- **From Address**: `registrations@uvend.co.za`

### **Testing Steps:**

1. **Create the `.env` file** with your password
2. **Restart the server**: `npm run dev`
3. **Go to**: http://localhost:3000/Registration
4. **Fill out the form** and go to Summary
5. **Click "Submit Registration"**
6. **Check the email inboxes** for the PDF attachment

### **Production Deployment:**

When deploying:
1. **Set `NODE_ENV=production`** in your hosting environment
2. **Add the environment variables** to your hosting platform
3. **Test with a small group first**

## **Ready to Send Real Emails!** 🎉

The configuration is now perfectly set up for your UVend email system.
