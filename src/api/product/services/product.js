'use strict';

/**
 * catagory service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product.product');
