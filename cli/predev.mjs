#!/usr/bin/env node

import fs from 'fs';

const dateInPast = function (dateToCheck, dateReference) {
	if (dateToCheck.setHours(0, 0, 0, 0) <= dateReference.setHours(0, 0, 0, 0)) {
		return true;
	}

	return false;
};

const getDate = (path) => {
	const fileRaw = fs.readFileSync(path);
	const fileJson = JSON.parse(fileRaw);
	return new Date(fileJson.updated);
};

console.clear();
const datePackage = getDate('./package.json');
const dateCli = getDate('./cli/cli-updated.json');

if (dateInPast(datePackage, dateCli)) {
	process.exit(0);
}

// No actualizado
// Ejecuta el setup
import * as setup from './setup.mjs';
setup;
