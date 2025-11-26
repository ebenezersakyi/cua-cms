'use strict';

/**
 * Training registration lifecycle hooks
 * Sends confirmation email to registrant and notification to admin
 */

const emailService = require('../../../../services/email');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Get the training course name if available
    let courseName = 'Not specified';
    if (result.trainingCourse) {
      try {
        const course = await strapi.entityService.findOne(
          'api::training-course.training-course',
          result.trainingCourse.id || result.trainingCourse,
          { fields: ['title'] }
        );
        if (course) {
          courseName = course.title;
        }
      } catch (error) {
        strapi.log.warn(`Could not fetch training course name: ${error.message}`);
      }
    }

    const registrationData = {
      fullName: result.fullName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      creditUnionName: result.creditUnionName,
      position: result.position,
      courseName,
      preferredTrainingDate: result.preferredTrainingDate,
      specialRequirements: result.specialRequirements,
    };

    // Send confirmation email to registrant
    try {
      await emailService.sendTrainingRegistrationConfirmation(registrationData);
      strapi.log.info(`Training registration confirmation sent to: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send training registration confirmation to ${result.email}: ${error.message}`);
    }

    // Send notification to admin
    try {
      await emailService.sendTrainingRegistrationNotification(registrationData);
      strapi.log.info(`Training registration notification sent to admin for: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send training registration notification: ${error.message}`);
    }
  },
};
