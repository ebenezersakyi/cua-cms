'use strict';

/**
 * statistics router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/statistics',
      handler: 'statistics.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
