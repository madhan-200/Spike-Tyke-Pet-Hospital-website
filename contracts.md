# Spike and Tyke Pet Hospital - Backend Integration Contract

## Overview
Simple backend integration for contact form email functionality only. No database required.

## Backend Implementation

### 1. Email Service Setup
- **Technology**: Gmail SMTP via Python's `smtplib`
- **Purpose**: Send contact form submissions to hospital email
- **Dependencies**: Built-in Python libraries (no additional packages needed)

### 2. API Endpoint

#### POST `/api/contact`
**Purpose**: Receive contact form data and send email

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

**Response - Success (200)**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Response - Error (400/500)**:
```json
{
  "success": false,
  "message": "Error description"
}
```

### 3. Environment Variables (.env)
```
GMAIL_USER=yourpethospital@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=yourpethospital@gmail.com
```

### 4. Email Template
- **Subject**: New Contact Form Submission - Spike & Tyke Pet Hospital
- **Content**: 
  - Name
  - Email
  - Phone
  - Message
  - Timestamp

## Frontend Integration

### Changes Required in Contact.jsx

1. **Remove Mock Data**:
   - Remove localStorage logic
   - Call backend API instead

2. **API Integration**:
   - Endpoint: `${BACKEND_URL}/api/contact`
   - Method: POST
   - Headers: Content-Type: application/json

3. **Keep Existing**:
   - Form validation
   - Toast notifications (success/error)
   - Bilingual support
   - UI/UX unchanged

## Implementation Checklist

- [ ] Install email dependencies (if needed)
- [ ] Create email service utility
- [ ] Create POST /api/contact endpoint
- [ ] Add environment variables
- [ ] Update Contact.jsx to call API
- [ ] Test email sending
- [ ] Verify bilingual error/success messages
- [ ] Final testing

## Notes
- No MongoDB integration required
- No data persistence needed
- Simple email forwarding only
- Keep all existing frontend features intact
