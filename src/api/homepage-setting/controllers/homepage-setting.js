'use strict';

/**
 * homepage-setting controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage-setting.homepage-setting', ({ strapi }) => ({
  async find(ctx) {
    // Get the homepage settings
    const { data, meta } = await super.find(ctx);

    // Fetch the news highlights
    const newsHighlights = await strapi.entityService.findMany('api::news-highlight.news-highlight', {
      populate: {
        highlightedNews: {
          populate: {
            featuredImage: true,
            author: true,
            category: true,
            tags: true
          }
        }
      }
    });

    // Add news highlights to the response
    if (data) {
      data.attributes = {
        ...data.attributes,
        newsHighlights: newsHighlights
      };
    }

    return { data, meta };
  }
}));
