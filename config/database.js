module.exports = ({ env }) => ({
 connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '185.166.188.103'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'u985780343_bendari'),
      user: env('DATABASE_USERNAME', 'u985780343_stanoid'),
      password: env('DATABASE_PASSWORD', 'lH6*@W@!:7['),
      ssl: env.bool('DATABASE_SSL', true),
    },
    
  },

  // connection: {
  //   client: 'mysql',
  //   connection: {
  //     host: env('DATABASE_HOST', 'localhost'),
  //     port: env.int('DATABASE_PORT', 3306),
  //     database: env('DATABASE_NAME', 'strapi'),
  //     user: env('DATABASE_USERNAME', 'root'),
  //     password: env('DATABASE_PASSWORD', ''),
  //     ssl: env.bool('DATABASE_SSL', false),
  //   },
    
  // },
});
