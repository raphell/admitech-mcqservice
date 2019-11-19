require('dotenv').config();

export const staging = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
};
export const development = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
};
export const production = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
};
