'use strict';

/**
 * job-vacancy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-vacancy.job-vacancy');
