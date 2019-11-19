import Sequelize from 'sequelize';
import logger from '../../helpers/logger';

export = new Sequelize.Sequelize(process.env.DATABASE_URL!, { logging: msg => logger.info(`Call to DB : ${msg}`) });
