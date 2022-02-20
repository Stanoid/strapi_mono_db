module.exports = ({ env }) => ({
 // connection: {
  //   client: 'mysql',
  //   connection: {
  //     host: env('DATABASE_HOST', '156.67.72.51'),
  //     port: env.int('DATABASE_PORT', 3306),
  //     database: env('DATABASE_NAME', 'u897671277_strapi'),
  //     user: env('DATABASE_USERNAME', 'u897671277_stanoid'),
  //     password: env('DATABASE_PASSWORD', '11235813mJ'),
  //     ssl: env.bool('DATABASE_SSL', true),
  //   },
    
  // },
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false),
    },
    
  },
});
