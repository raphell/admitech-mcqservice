import Sequelize from 'sequelize';
import logger from '../../helpers/logger';
//import {production, staging, development} from './config';

/*
const env = process.env.NODE_ENV || 'development';
let config;
if (env === 'production') config = production;
else config = staging;
*/
//export = new Sequelize.Sequelize(config.url, { logging: msg => logger.info(`Call to DB : ${msg}`) });
export = new Sequelize.Sequelize('postgres://postgres:postgres@127.0.0.1:5432/mcqservice');
