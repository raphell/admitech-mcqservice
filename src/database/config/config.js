require('dotenv').config();

module.exports = {
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
}
