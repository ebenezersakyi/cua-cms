'use strict';

/**
 * conference-registration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::conference-registration.conference-registration');
