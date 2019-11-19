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
//export = new Sequelize.Sequelize('postgres://'+process.env.MCQ_DATABASE_USER+':'+process.env.MCQ_DATABASE_PASSWORD+'@127.0.0.1:5432/mcqservice');
export = new Sequelize.Sequelize(process.env.DATABASE_URL!);
