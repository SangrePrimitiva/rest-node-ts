import 'dotenv/config';
import { Dialect, Sequelize } from 'sequelize';

const DB_HOSTNAME = process.env.DB_HOSTNAME || '';
const DB_NAME = process.env.DB_NAME || '';
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
// const DB_DRIVER: Dialect = process.env.DB_DRIVER || 'mysql';
const DB_GLOBAL = process.env.DB_GLOBAL || '';

export const dbLocal = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOSTNAME,
	dialect: 'mysql'
	// dialect: DB_DRIVER
	// logging: false
});

export const dbGlobal = new Sequelize(DB_GLOBAL);
