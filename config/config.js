var dotenv = require('dotenv');
dotenv.load();


module.exports = {
  development: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgresql',
    dialectOptions: {
      ssl: process.env.DB_SSL
    },
    define: {
      underscored: true
    }
  },
}