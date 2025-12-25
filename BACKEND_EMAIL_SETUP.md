# Backend Email Integration Setup Guide

## For Later - When Clinic Owner Provides Email

This guide explains how to enable the email feature once you have the clinic's Gmail credentials.

---

## 📧 STEP 1: COLLECT FROM CLINIC OWNER

Ask the clinic owner for:
- **Their Gmail address**: (e.g., `clinic@gmail.com`)
- **Confirm they'll use Gmail**: (easiest for this setup)

---

## STEP 2: CREATE GMAIL APP PASSWORD

Gmail doesn't allow regular passwords in apps. We need an "App Password":

### If Clinic Owner Has Gmail Account:

1. **Go to**: https://myaccount.google.com
2. **Click**: Security (left menu)
3. **Scroll to**: "App passwords" (requires 2-factor authentication)
4. **Select**:
   - App: Mail
   - Device: Windows PC (or other)
5. **Copy the 16-character password** shown (looks like: `xxxx xxxx xxxx xxxx`)

---

## STEP 3: CREATE .env FILE

Create a `.env` file in `c:\PET\backend\` with:

```env
GMAIL_USER=clinic_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=clinic_email@gmail.com
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=pet_hospital
CORS_ORIGINS=http://localhost:3000,https://your-netlify-domain.netlify.app
```

Replace:
- `clinic_email@gmail.com` → Clinic's actual email
- `xxxx xxxx xxxx xxxx` → The 16-char App Password from Gmail
- `https://your-netlify-domain.netlify.app` → Your actual Netlify URL

---

## STEP 4: FIX BACKEND CODE

### Issue 1: Logger Initialization

In `backend/server.py`, move logger setup BEFORE it's used:

**Before (line 77)**: 
```python
logger.info(f"Received contact form submission from {submission.email}")
```

**Problem**: `logger` doesn't exist yet!

**Fix**: Move this block from line 95 to line 15:
```python
# Configure logging (MOVE TO TOP)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

### Issue 2: Incomplete Email Service

In `backend/email_service.py` around line 104, complete the SMTP connection:

**Currently incomplete**:
```python
with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
```

**Should be**:
```python
with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(self.gmail_user, self.gmail_password)
    server.send_message(msg)
    logger.info(f"Email sent successfully to {self.recipient_email}")

return True
```

---

## STEP 5: UPDATE FRONTEND

### Change Contact.jsx back to use API

In `frontend/src/pages/Contact.jsx`, replace the localStorage logic with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.phone || !formData.message) {
    toast({
      title: language === 'en' ? 'Error' : 'பிழை',
      description: t.contact.form.error,
      variant: 'destructive'
    });
    return;
  }

  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    
    if (response.data.success) {
      toast({
        title: language === 'en' ? 'Success!' : 'வெற்றி!',
        description: t.contact.form.success,
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    const errorMessage = error.response?.data?.detail || 
      (language === 'en' ? 'Failed to send message. Please try calling us directly.' : 'செய்தி அனுப்புவதில் தோல்வி. தயவுசெய்து நேரடியாக எங்களை அழைக்கவும்.');
    
    toast({
      title: language === 'en' ? 'Error' : 'பிழை',
      description: errorMessage,
      variant: 'destructive'
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

Also import axios at the top:
```javascript
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
```

---

## STEP 6: DEPLOY BACKEND

Choose a hosting provider:
- **Heroku** (free tier available)
- **Railway** (good free tier)
- **AWS** (more complex)
- **DigitalOcean** (affordable)
- **Replit** (simple for testing)

### For Heroku (Simplest):
```bash
heroku login
heroku create your-pet-hospital-backend
git push heroku main
heroku config:set GMAIL_USER=xxx GMAIL_APP_PASSWORD=xxx RECIPIENT_EMAIL=xxx
```

You'll get a URL like: `https://your-pet-hospital-backend.herokuapp.com`

---

## STEP 7: UPDATE NETLIFY ENVIRONMENT

1. **Go to**: Your Netlify site dashboard
2. **Click**: Site settings → Environment
3. **Add variable**:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: `https://your-pet-hospital-backend.herokuapp.com` (or your backend URL)

---

## STEP 8: REBUILD AND REDEPLOY FRONTEND

Rebuild to use the new backend URL:

```powershell
cd c:\PET\frontend
npm run build
netlify deploy --prod --dir=build
```

---

## STEP 9: TEST EMAIL SENDING

1. **Visit your live site**
2. **Go to Contact page**
3. **Fill out form and submit**
4. **Check clinic owner's email inbox** → Form should arrive!
5. **Check spam folder** if not in inbox

---

## 📧 WHAT WILL HAPPEN

When contact form is submitted:

1. **Frontend** → Sends form data to backend
2. **Backend** → Validates and prepares email
3. **Gmail SMTP** → Sends email via clinic's account
4. **Recipient** → Gets beautiful HTML formatted email with:
   - Visitor's name, email, phone
   - Their message
   - Timestamp
   - Professional branding

---

## 🔒 SECURITY NOTES

- **App Password**: Not the same as Gmail password (safer)
- **Only shared with backend**: Frontend doesn't see credentials
- **Environment variables**: Keep secret, use Netlify dashboard
- **Never commit .env**: Add to `.gitignore`

---

## 🧪 TESTING LOCALLY

Before deploying, test locally:

```bash
# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --reload

# Frontend (in another terminal)
cd frontend
npm start
```

Visit `http://localhost:3000/contact` and test the form.

---

## ✅ CHECKLIST

- [ ] Collect clinic email and App Password
- [ ] Create `.env` file in backend
- [ ] Fix logger initialization in server.py
- [ ] Complete email_service.py
- [ ] Update Contact.jsx to use API
- [ ] Test locally
- [ ] Deploy backend
- [ ] Get backend URL
- [ ] Add REACT_APP_BACKEND_URL to Netlify
- [ ] Rebuild and redeploy frontend
- [ ] Test form submission on live site
- [ ] Verify email received at clinic

---

## 🆘 TROUBLESHOOTING

**Email not sending?**
- Check .env file has correct Gmail credentials
- Verify App Password (not regular Gmail password)
- Check backend logs for errors
- Ensure CORS_ORIGINS includes your frontend URL

**Form submitting but no email?**
- Check backend is running
- Verify REACT_APP_BACKEND_URL is correct in Netlify
- Check browser console for API errors
- Review backend server logs

**Gmail says "insecure app"?**
- Use App Password, not regular password
- Enable 2-factor authentication on Gmail account

---

**Ready to enable email? Follow this guide step by step!** 📧

Once complete, your contact form will send emails directly to the clinic owner.
