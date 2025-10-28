'use strict';

/**
 * credit-union service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::credit-union.credit-union');
