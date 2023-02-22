import 'dotenv/config';
import { stdout } from 'process';
import path from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import express from 'express';
import cors from 'cors';
import { dbLocal } from './db/connections.js';
import { Method } from './types.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;

const PATH_APP = `${__dirname}`;
const validMethods = ['delete', 'get', 'post', 'put'];

const getValidMethod = (method: string): Method => {
	// let validMethod = 'get';
	// if (validMethods.includes(method)) {
	// 	validMethod = method;
	// }
	const validMethod =
		method === 'delete' || method === 'get' || method === 'post' || method === 'put'
			? method
			: 'get';
	return validMethod;
};

const getDynamicPathName = (folderName: string) => {
	const pathName = folderName.replace(/(^"|"$)/g, '');
	return pathName;
};

const getEndpoint = (routeEndpoint: string) => {
	if (routeEndpoint.includes('[')) {
		const dynamicEndpoint = getDynamicPathName(routeEndpoint);
		return `:${dynamicEndpoint}`;
	}
	return `/${routeEndpoint}`;
};

const setRoute = (routeFile: string, routePath: string, method: string) => {
	const endpoint = getEndpoint(routePath);
	import(routeFile).then((route) => {
		const endpointMethod: Method = getValidMethod(method);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		app[endpointMethod](endpoint, route.routeHandler);
	});
};

const readRoutesFolders = (parentPath: string, method: string) => {
	readdirSync(parentPath).forEach((item) => {
		const directoryContent = path.resolve(parentPath, item);

		if (statSync(directoryContent).isDirectory()) {
			if (existsSync(`${directoryContent}\\route.js`)) {
				const relativePath = directoryContent.replace(PATH_APP, '.');
				const routeFile = `${relativePath}\\route.js`.replace(/\\/g, '/');

				setRoute(routeFile, item, method);
			}
		}
	});
};

try {
	readdirSync(`${PATH_APP}\\routes`).forEach((method) => {
		if (validMethods.includes(method)) {
			const methodPath = `${PATH_APP}\\routes\\${method}`;
			readRoutesFolders(methodPath, method);
		}
	});
} catch (error) {
	stdout.write('Error reading routes!\n');
	throw new Error(String(error));
}

app.listen(PORT, async () => {
	stdout.write(`Server running on port ${PORT}!\n`);

	try {
		await dbLocal.authenticate();
		stdout.write('Database Local online\n');
	} catch (error) {
		throw new Error(String(error));
	}
});
