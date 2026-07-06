'use strict';

/**
 * Conference registration lifecycle hooks
 * Sends confirmation email to registrant and notification to admin
 */

const emailService = require('../../../../services/email');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    const registrationData = {
      fullName: result.fullName,
      gender: result.gender,
      age: result.age,
      phoneNumber: result.phoneNumber,
      email: result.email,
      creditUnion: result.creditUnion,
      chapter: result.chapter,
      role: result.role,
      expectations: result.expectations,
      tshirtSize: result.tshirtSize,
      dietaryRestrictions: result.dietaryRestrictions,
    };

    // Send confirmation email to registrant
    try {
      await emailService.sendConferenceRegistrationConfirmation(registrationData);
      strapi.log.info(`Conference registration confirmation sent to: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send conference registration confirmation to ${result.email}: ${error.message}`);
    }

    // Send notification to admin
    try {
      await emailService.sendConferenceRegistrationNotification(registrationData);
      strapi.log.info(`Conference registration notification sent to admin for: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send conference registration notification: ${error.message}`);
    }
  },
};
