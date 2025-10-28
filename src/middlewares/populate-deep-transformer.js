'use strict';

/**
 * Middleware to transform populate=deep to Strapi v5 compatible populate syntax
 * This fixes the admin panel issue with single types
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Check if populate=deep is in the query
    if (ctx.query?.populate === 'deep') {
      // Transform to Strapi v5 compatible syntax
      // Use a wildcard populate for all first-level relations
      ctx.query.populate = '*';
    }

    await next();
  };
};
