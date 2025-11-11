'use strict';

/**
 * training-registration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::training-registration.training-registration');
