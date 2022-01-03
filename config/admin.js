module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8df4002409f1c4647941426ed3c04f4a'),
  },
});
