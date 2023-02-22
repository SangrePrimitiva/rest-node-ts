import { Request, Response } from 'express';

const routeHandler = (request: Request, response: Response) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { id } = request.params;
	const responseJson = {
		idSolicitado: id
	};
	response.send(responseJson);
};
export { routeHandler };
