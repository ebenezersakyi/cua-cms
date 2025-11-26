'use strict';

/**
 * Contact message lifecycle hooks
 * Sends notification to admin and auto-reply to sender when a new message is created
 */

const emailService = require('../../../../services/email');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Send notification to admin
    try {
      await emailService.sendContactNotification({
        fullName: result.fullName,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        message: result.message,
        messageType: result.messageType,
      });
      strapi.log.info(`Contact notification sent to admin for message from: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send contact notification: ${error.message}`);
    }

    // Send auto-reply to the person who submitted the form
    try {
      await emailService.sendContactAutoReply({
        fullName: result.fullName,
        email: result.email,
        subject: result.subject,
        messageType: result.messageType,
      });
      strapi.log.info(`Contact auto-reply sent to: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send contact auto-reply to ${result.email}: ${error.message}`);
    }
  },
};
