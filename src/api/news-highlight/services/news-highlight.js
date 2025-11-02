'use strict';

/**
 * news-highlights service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-highlight.news-highlight');
