import { Request, Response } from 'express';

const routeHandler = (request: Request, response: Response) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const responseJson = request.body;
	response.send(responseJson);
};
export { routeHandler };
