'use strict';

/**
 * Job application lifecycle hooks
 * Sends confirmation email to applicant and notification to careers@ccugh.com
 */

const emailService = require('../../../../services/email');

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Get the job vacancy title if linked
    let jobTitle = result.jobTitle;
    if (result.jobVacancy) {
      try {
        const vacancy = await strapi.entityService.findOne(
          'api::job-vacancy.job-vacancy',
          result.jobVacancy.id || result.jobVacancy,
          { fields: ['title', 'department'] }
        );
        if (vacancy) {
          jobTitle = vacancy.title;
        }
      } catch (error) {
        strapi.log.warn(`Could not fetch job vacancy details: ${error.message}`);
      }
    }

    const applicationData = {
      fullName: result.fullName,
      email: result.email,
      phoneNumber: result.phoneNumber,
      jobTitle,
      coverLetter: result.coverLetter,
      linkedInProfile: result.linkedInProfile,
      portfolioUrl: result.portfolioUrl,
      yearsOfExperience: result.yearsOfExperience,
      currentEmployer: result.currentEmployer,
      currentPosition: result.currentPosition,
      expectedSalary: result.expectedSalary,
      availableStartDate: result.availableStartDate,
      howDidYouHear: result.howDidYouHear,
      additionalInfo: result.additionalInfo,
    };

    // Send confirmation email to applicant
    try {
      await emailService.sendJobApplicationConfirmation(applicationData);
      strapi.log.info(`Job application confirmation sent to: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send job application confirmation to ${result.email}: ${error.message}`);
    }

    // Send notification to careers email
    try {
      await emailService.sendJobApplicationNotification(applicationData);
      strapi.log.info(`Job application notification sent to careers for: ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send job application notification: ${error.message}`);
    }
  },
};
