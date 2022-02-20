const _ = require('lodash');

module.exports = {
  /**
   * Promise to fetch the record
   *
   * @return {Promise}
   */
  async find(populate) {
    const results = await strapi.query('restaurant').find({ _limit: 1 }, populate);
    return _.first(results) || null;
  },
};