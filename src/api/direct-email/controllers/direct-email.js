'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::direct-email.direct-email');
