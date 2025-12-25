import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.gmail_user = os.getenv('GMAIL_USER')
        self.gmail_password = os.getenv('GMAIL_APP_PASSWORD')
        self.recipient_email = os.getenv('RECIPIENT_EMAIL', self.gmail_user)
        
        if not self.gmail_user or not self.gmail_password:
            logger.warning("Gmail credentials not configured. Email service will not work.")
    
    def send_contact_form_email(self, name: str, email: str, phone: str, message: str) -> bool:
        """
        Send contact form submission via Gmail SMTP
        
        Args:
            name: Sender's name
            email: Sender's email
            phone: Sender's phone number
            message: Message content
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        try:
            if not self.gmail_user or not self.gmail_password:
                logger.error("Gmail credentials not configured")
                return False
            
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'New Contact Form Submission - Spike & Tyke Pet Hospital'
            msg['From'] = self.gmail_user
            msg['To'] = self.recipient_email
            
            # Create HTML email body
            html_body = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
                        .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
                        .field {{ margin-bottom: 20px; }}
                        .label {{ font-weight: bold; color: #06b6d4; margin-bottom: 5px; }}
                        .value {{ background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #06b6d4; }}
                        .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 12px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">🐾 New Contact Form Submission</h2>
                            <p style="margin: 5px 0 0 0;">Spike & Tyke Pet Hospital</p>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">Name:</div>
                                <div class="value">{name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value"><a href="mailto:{email}">{email}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">Phone:</div>
                                <div class="value"><a href="tel:{phone}">{phone}</a></div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="value">{message}</div>
                            </div>
                            <div class="field">
                                <div class="label">Received:</div>
                                <div class="value">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This email was sent from the contact form on your Spike & Tyke Pet Hospital website.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Attach HTML body
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Connect to Gmail SMTP server
            logger.info(f"Connecting to Gmail SMTP server...")
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(self.gmail_user, self.gmail_password)
                server.send_message(msg)
                logger.info(f"Email sent successfully to {self.recipient_email}")
            
            return True
            
        except smtplib.SMTPAuthenticationError:
            logger.error("Gmail authentication failed. Please check your credentials.")
            return False
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error occurred: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False

# Global email service instance
email_service = EmailService()