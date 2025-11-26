'use strict';

/**
 * Email service for sending various types of emails
 * Theme: #024d8a (CUA Blue)
 * Logo: https://www.cua.org.gh/_next/image/?url=%2Fcua-logo%201.png&w=384&q=75
 */

const LOGO_URL = 'https://www.cua.org.gh/_next/image/?url=%2Fcua-logo%201.png&w=384&q=75';
const THEME_COLOR = '#024d8a';

const emailTemplates = {
  // Newsletter subscription confirmation
  newsletterConfirmation: (data) => ({
    subject: 'Welcome to CUA Ghana Newsletter!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to CUA Ghana Newsletter</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Our Newsletter!</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; margin-top: 0;">Dear ${data.firstName || 'Subscriber'},</p>

          <p style="font-size: 16px;">Thank you for subscribing to the Credit Union Association of Ghana newsletter!</p>

          <p style="font-size: 16px;">You'll now receive:</p>
          <ul style="font-size: 16px; color: #555;">
            <li>Latest news and updates from CUA Ghana</li>
            <li>Information about upcoming events and training</li>
            <li>Credit union industry insights</li>
            <li>Member success stories</li>
          </ul>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid ${THEME_COLOR};">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Your subscription email:</strong><br>
              ${data.email}
            </p>
          </div>

          <p style="font-size: 14px; color: #666;">
            If you didn't subscribe to this newsletter, please ignore this email or contact us at info@cua.org.gh.
          </p>
        </div>

        <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 12px;">
          <p style="margin: 0; font-weight: bold; color: ${THEME_COLOR};">Credit Union Association of Ghana</p>
          <p style="margin: 5px 0;">Empowering Communities Through Cooperative Finance</p>
          <p style="margin: 15px 0 0 0;">
            <a href="https://cua.org.gh" style="color: ${THEME_COLOR}; text-decoration: none; font-weight: bold;">www.cua.org.gh</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
Welcome to CUA Ghana Newsletter!

Dear ${data.firstName || 'Subscriber'},

Thank you for subscribing to the Credit Union Association of Ghana newsletter!

You'll now receive:
- Latest news and updates from CUA Ghana
- Information about upcoming events and training
- Credit union industry insights
- Member success stories

Your subscription email: ${data.email}

If you didn't subscribe to this newsletter, please ignore this email or contact us at info@cua.org.gh.

---
Credit Union Association of Ghana
Empowering Communities Through Cooperative Finance
www.cua.org.gh
    `
  }),

  // Contact form notification to admin
  contactNotification: (data) => ({
    subject: `New Contact Message: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 150px; height: auto; margin-bottom: 10px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Message</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: ${THEME_COLOR}; margin-top: 0; font-size: 18px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #555;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}" style="color: ${THEME_COLOR};">${data.email}</a>
                </td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Type:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.messageType || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 10px 0;">${data.subject}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: ${THEME_COLOR}; margin-top: 0; font-size: 18px;">Message</h2>
            <p style="white-space: pre-wrap; margin: 0; color: #555;">${data.message}</p>
          </div>

          <div style="margin-top: 25px; text-align: center;">
            <a href="${process.env.STRAPI_ADMIN_URL || 'http://localhost:1337'}/admin/content-manager/collection-types/api::contact-message.contact-message"
               style="display: inline-block; background: ${THEME_COLOR}; color: white; padding: 12px 28px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View in Admin Panel
            </a>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
          <p style="margin: 0;">This is an automated notification from CUA Ghana Website</p>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

Contact Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Type: ${data.messageType || 'General Inquiry'}
- Subject: ${data.subject}

Message:
${data.message}

---
This is an automated notification from CUA Ghana Website
    `
  }),

  // Contact form auto-reply to sender
  contactAutoReply: (data) => ({
    subject: 'Thank you for contacting CUA Ghana',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Us</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 26px;">Thank You!</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; margin-top: 0;">Dear ${data.fullName},</p>

          <p style="font-size: 16px;">Thank you for reaching out to the Credit Union Association of Ghana. We have received your message and will get back to you as soon as possible.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid ${THEME_COLOR};">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: ${THEME_COLOR};">Your message summary:</p>
            <p style="margin: 0; color: #666;"><strong>Subject:</strong> ${data.subject}</p>
            <p style="margin: 10px 0 0 0; color: #666;"><strong>Type:</strong> ${data.messageType || 'General Inquiry'}</p>
          </div>

          <p style="font-size: 16px;">Our team typically responds within 1-2 business days. If your matter is urgent, please call us directly.</p>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Best regards,<br>
            <strong style="color: ${THEME_COLOR};">CUA Ghana Team</strong>
          </p>
        </div>

        <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 12px;">
          <p style="margin: 0; font-weight: bold; color: ${THEME_COLOR};">Credit Union Association of Ghana</p>
          <p style="margin: 5px 0;">Empowering Communities Through Cooperative Finance</p>
          <p style="margin: 15px 0 0 0;">
            <a href="https://cua.org.gh" style="color: ${THEME_COLOR}; text-decoration: none; font-weight: bold;">www.cua.org.gh</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
Thank You for Contacting CUA Ghana

Dear ${data.fullName},

Thank you for reaching out to the Credit Union Association of Ghana. We have received your message and will get back to you as soon as possible.

Your message summary:
- Subject: ${data.subject}
- Type: ${data.messageType || 'General Inquiry'}

Our team typically responds within 1-2 business days. If your matter is urgent, please call us directly.

Best regards,
CUA Ghana Team

---
Credit Union Association of Ghana
Empowering Communities Through Cooperative Finance
www.cua.org.gh
    `
  }),

  // Training registration confirmation to registrant
  trainingRegistrationConfirmation: (data) => ({
    subject: 'Training Registration Received - CUA Ghana',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Training Registration Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Registration Received!</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; margin-top: 0;">Dear ${data.fullName},</p>

          <p style="font-size: 16px;">Thank you for registering for training with CUA Ghana. We have received your registration and will process it shortly.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid ${THEME_COLOR};">
            <h3 style="color: ${THEME_COLOR}; margin-top: 0;">Registration Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px; color: #555;">Course:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.courseName || 'To be confirmed'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Preferred Date:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.preferredTrainingDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Credit Union:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.creditUnionName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Position:</td>
                <td style="padding: 10px 0;">${data.position}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 16px;"><strong style="color: ${THEME_COLOR};">What happens next?</strong></p>
          <ol style="font-size: 16px; color: #555;">
            <li>Our training team will review your registration</li>
            <li>You'll receive a confirmation email with payment details</li>
            <li>Once payment is confirmed, you'll receive full training information</li>
          </ol>

          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            If you have any questions, please contact us at info@cua.org.gh or call our CUTRAC office.
          </p>

          <p style="font-size: 14px; color: #666;">
            Best regards,<br>
            <strong style="color: ${THEME_COLOR};">CUTRAC Training Team</strong><br>
            CUA Ghana
          </p>
        </div>

        <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 12px;">
          <p style="margin: 0; font-weight: bold; color: ${THEME_COLOR};">Credit Union Association of Ghana</p>
          <p style="margin: 5px 0;">CUTRAC - Credit Union Training and Research Centre</p>
          <p style="margin: 15px 0 0 0;">
            <a href="https://cua.org.gh" style="color: ${THEME_COLOR}; text-decoration: none; font-weight: bold;">www.cua.org.gh</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
Training Registration Received - CUA Ghana

Dear ${data.fullName},

Thank you for registering for training with CUA Ghana. We have received your registration and will process it shortly.

Registration Details:
- Course: ${data.courseName || 'To be confirmed'}
- Preferred Date: ${data.preferredTrainingDate}
- Credit Union: ${data.creditUnionName}
- Position: ${data.position}

What happens next?
1. Our training team will review your registration
2. You'll receive a confirmation email with payment details
3. Once payment is confirmed, you'll receive full training information

If you have any questions, please contact us at info@cua.org.gh or call our CUTRAC office.

Best regards,
CUTRAC Training Team
CUA Ghana

---
Credit Union Association of Ghana
CUTRAC - Credit Union Training and Research Centre
www.cua.org.gh
    `
  }),

  // Training registration notification to admin
  trainingRegistrationNotification: (data) => ({
    subject: `New Training Registration: ${data.fullName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Training Registration</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 150px; height: auto; margin-bottom: 10px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Training Registration</h1>
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: ${THEME_COLOR}; margin-top: 0; font-size: 18px;">Registrant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px; color: #555;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}" style="color: ${THEME_COLOR};">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Credit Union:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.creditUnionName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Position:</td>
                <td style="padding: 10px 0;">${data.position}</td>
              </tr>
            </table>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: ${THEME_COLOR}; margin-top: 0; font-size: 18px;">Training Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px; color: #555;">Course:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.courseName || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Preferred Date:</td>
                <td style="padding: 10px 0;">${data.preferredTrainingDate}</td>
              </tr>
            </table>
          </div>

          ${data.specialRequirements ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: ${THEME_COLOR}; margin-top: 0; font-size: 18px;">Special Requirements</h2>
            <p style="margin: 0; white-space: pre-wrap; color: #555;">${data.specialRequirements}</p>
          </div>
          ` : ''}

          <div style="margin-top: 25px; text-align: center;">
            <a href="${process.env.STRAPI_ADMIN_URL || 'http://localhost:1337'}/admin/content-manager/collection-types/api::training-registration.training-registration"
               style="display: inline-block; background: ${THEME_COLOR}; color: white; padding: 12px 28px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              View in Admin Panel
            </a>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
          <p style="margin: 0;">This is an automated notification from CUA Ghana Website</p>
        </div>
      </body>
      </html>
    `,
    text: `
New Training Registration

Registrant Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phoneNumber}
- Credit Union: ${data.creditUnionName}
- Position: ${data.position}

Training Details:
- Course: ${data.courseName || 'Not specified'}
- Preferred Date: ${data.preferredTrainingDate}

${data.specialRequirements ? `Special Requirements:\n${data.specialRequirements}` : ''}

---
This is an automated notification from CUA Ghana Website
    `
  }),

  // Newsletter broadcast
  newsletterBroadcast: (data) => ({
    subject: data.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background: ${THEME_COLOR}; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <img src="${LOGO_URL}" alt="CUA Ghana Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">CUA Ghana Newsletter</h1>
          ${data.preheader ? `<p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">${data.preheader}</p>` : ''}
        </div>

        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: ${THEME_COLOR}; margin-top: 0;">${data.subject}</h2>

          <div style="font-size: 16px; color: #555;">
            ${data.content}
          </div>

          ${data.ctaText && data.ctaUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.ctaUrl}"
               style="display: inline-block; background: ${THEME_COLOR}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              ${data.ctaText}
            </a>
          </div>
          ` : ''}
        </div>

        <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 12px;">
          <p style="margin: 0; font-weight: bold; color: ${THEME_COLOR};">Credit Union Association of Ghana</p>
          <p style="margin: 5px 0;">Empowering Communities Through Cooperative Finance</p>
          <p style="margin: 15px 0 0 0;">
            <a href="https://cua.org.gh" style="color: ${THEME_COLOR}; text-decoration: none; font-weight: bold;">www.cua.org.gh</a>
          </p>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 11px; color: #999;">
              You're receiving this email because you subscribed to the CUA Ghana newsletter.<br>
              <a href="https://cua.org.gh/unsubscribe" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
CUA Ghana Newsletter

${data.subject}

${data.content.replace(/<[^>]*>/g, '')}

${data.ctaText && data.ctaUrl ? `${data.ctaText}: ${data.ctaUrl}` : ''}

---
Credit Union Association of Ghana
Empowering Communities Through Cooperative Finance
www.cua.org.gh

You're receiving this email because you subscribed to the CUA Ghana newsletter.
To unsubscribe, visit: https://cua.org.gh/unsubscribe
    `
  }),
};

module.exports = {
  /**
   * Send an email using a template
   * @param {string} templateName - Name of the template to use
   * @param {object} data - Data to pass to the template
   * @param {string} to - Recipient email address
   * @returns {Promise<boolean>} - Success status
   */
  async sendTemplateEmail(templateName, data, to) {
    try {
      const template = emailTemplates[templateName];
      if (!template) {
        strapi.log.error(`Email template "${templateName}" not found`);
        return false;
      }

      const emailData = template(data);

      await strapi.plugins['email'].services.email.send({
        to,
        from: process.env.EMAIL_DEFAULT_FROM || 'noreply@cua.org.gh',
        replyTo: process.env.EMAIL_DEFAULT_REPLY_TO || 'info@cua.org.gh',
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });

      strapi.log.info(`Email sent successfully: ${templateName} to ${to}`);
      return true;
    } catch (error) {
      strapi.log.error(`Failed to send email (${templateName}): ${error.message}`);
      return false;
    }
  },

  /**
   * Send newsletter confirmation email
   * @param {object} subscription - Newsletter subscription data
   */
  async sendNewsletterConfirmation(subscription) {
    return this.sendTemplateEmail('newsletterConfirmation', subscription, subscription.email);
  },

  /**
   * Send contact form notification to admin
   * @param {object} contactMessage - Contact message data
   */
  async sendContactNotification(contactMessage) {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@cua.org.gh';
    return this.sendTemplateEmail('contactNotification', contactMessage, adminEmail);
  },

  /**
   * Send auto-reply to contact form sender
   * @param {object} contactMessage - Contact message data
   */
  async sendContactAutoReply(contactMessage) {
    return this.sendTemplateEmail('contactAutoReply', contactMessage, contactMessage.email);
  },

  /**
   * Send training registration confirmation to registrant
   * @param {object} registration - Training registration data
   */
  async sendTrainingRegistrationConfirmation(registration) {
    return this.sendTemplateEmail('trainingRegistrationConfirmation', registration, registration.email);
  },

  /**
   * Send training registration notification to admin
   * @param {object} registration - Training registration data
   */
  async sendTrainingRegistrationNotification(registration) {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@cua.org.gh';
    return this.sendTemplateEmail('trainingRegistrationNotification', registration, adminEmail);
  },

  /**
   * Send newsletter to all active subscribers
   * @param {object} newsletter - Newsletter content
   * @returns {Promise<object>} - Results with success/failure counts
   */
  async sendNewsletterBroadcast(newsletter) {
    try {
      // Get all active subscribers
      const subscribers = await strapi.entityService.findMany(
        'api::newsletter-subscription.newsletter-subscription',
        {
          filters: { isActive: true },
          fields: ['email', 'firstName', 'lastName'],
        }
      );

      if (!subscribers || subscribers.length === 0) {
        strapi.log.warn('No active subscribers found for newsletter broadcast');
        return { sent: 0, failed: 0, total: 0 };
      }

      let sent = 0;
      let failed = 0;

      // Send to each subscriber
      for (const subscriber of subscribers) {
        try {
          const success = await this.sendTemplateEmail(
            'newsletterBroadcast',
            newsletter,
            subscriber.email
          );
          if (success) {
            sent++;
          } else {
            failed++;
          }
        } catch (error) {
          strapi.log.error(`Failed to send newsletter to ${subscriber.email}: ${error.message}`);
          failed++;
        }
      }

      strapi.log.info(`Newsletter broadcast complete: ${sent} sent, ${failed} failed`);
      return { sent, failed, total: subscribers.length };
    } catch (error) {
      strapi.log.error(`Newsletter broadcast failed: ${error.message}`);
      throw error;
    }
  },
};
