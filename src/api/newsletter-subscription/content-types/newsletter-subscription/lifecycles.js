'use strict';

/**
 * Newsletter subscription lifecycle hooks
 * Sends confirmation email when a new subscription is created
 */

const emailService = require('../../../../services/email');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Send confirmation email to new subscriber
    try {
      await emailService.sendNewsletterConfirmation({
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      });
      strapi.log.info(`Newsletter confirmation sent to: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send newsletter confirmation to ${result.email}: ${error.message}`);
    }
  },
};
