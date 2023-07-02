module.exports = ({ env }) => ({
 connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '31.220.104.219'),

      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'u140157759_test'),
      user: env('DATABASE_USERNAME', 'u140157759_testdev'),
      password: env('DATABASE_PASSWORD', '2ObU@z3|Aw'),
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
