'use strict';

/**
 * site-setting controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::site-setting.site-setting', () => ({
  async find(ctx) {
    // Explicitly populate all relations for Strapi v5
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        favicon: true,
        socialLinks: {
          populate: '*'
        },
        footerColumns: {
          populate: {
            links: true
          }
        }
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async update(ctx) {
    // Explicitly populate all relations for Strapi v5
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        favicon: true,
        socialLinks: {
          populate: '*'
        },
        footerColumns: {
          populate: {
            links: true
          }
        }
      },
    };

    const { data, meta } = await super.update(ctx);
    return { data, meta };
  },
}));
