'use strict';

/**
 * Custom newsletter routes for sending newsletters
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/newsletters/:id/send',
      handler: 'newsletter.send',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletters/:id/test',
      handler: 'newsletter.sendTest',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletters/subscriber-count',
      handler: 'newsletter.subscriberCount',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
