import { Request, Response } from 'express';
import { dbLocal } from '../../../db/connections';

const routeHandler = async (_request: Request, response: Response) => {
	console.log('Someone pinged here1!');

	try {
		await dbLocal.authenticate();
		console.log('Database Oracle online');
	} catch (error) {
		throw new Error(String(error));
	}

	response.send('Pong1!');
};
export { routeHandler };
