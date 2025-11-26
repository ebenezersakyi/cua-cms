'use strict';

/**
 * Direct email lifecycle hooks
 * Sends email immediately when created
 */

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Send the email immediately
      await strapi.plugins['email'].services.email.send({
        to: result.recipientEmail,
        from: process.env.EMAIL_DEFAULT_FROM || 'noreply@cua.org.gh',
        replyTo: process.env.EMAIL_DEFAULT_REPLY_TO || 'noreply@cua.org.gh',
        subject: result.subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${result.subject}</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <div style="background: #024d8a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <img src="https://www.cua.org.gh/_next/image/?url=%2Fcua-logo%201.png&w=384&q=75" alt="CUA Ghana Logo" style="max-width: 200px; height: auto; margin-bottom: 10px;">
            </div>

            <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              ${result.recipientName ? `<p style="font-size: 16px; margin-top: 0;">Dear ${result.recipientName},</p>` : ''}

              <div style="font-size: 16px; color: #333;">
                ${result.message}
              </div>
            </div>

            <div style="text-align: center; padding: 25px 20px; color: #666; font-size: 12px;">
              <p style="margin: 0; font-weight: bold; color: #024d8a;">Credit Union Association of Ghana</p>
              <p style="margin: 5px 0;">Empowering Communities Through Cooperative Finance</p>
              <p style="margin: 15px 0 0 0;">
                <a href="https://cua.org.gh" style="color: #024d8a; text-decoration: none; font-weight: bold;">www.cua.org.gh</a>
              </p>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                <p style="margin: 0; font-size: 11px; color: #999;">
                  This email was sent by CUA Ghana. If you have any questions, please contact us.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `${result.recipientName ? `Dear ${result.recipientName},\n\n` : ''}${result.message.replace(/<[^>]*>/g, '')}\n\n---\nCredit Union Association of Ghana\nEmpowering Communities Through Cooperative Finance\nwww.cua.org.gh`,
      });

      // Update status to sent
      await strapi.entityService.update('api::direct-email.direct-email', result.id, {
        data: {
          status: 'sent',
          sentAt: new Date(),
        },
      });

      strapi.log.info(`Direct email sent successfully to: ${result.recipientEmail}`);
    } catch (error) {
      strapi.log.error(`Failed to send direct email to ${result.recipientEmail}: ${error.message}`);

      // Update status to failed
      await strapi.entityService.update('api::direct-email.direct-email', result.id, {
        data: {
          status: 'failed',
          errorMessage: error.message,
        },
      });
    }
  },
};
