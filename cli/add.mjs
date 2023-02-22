#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

// Formato del nombre
let params = process.env.npm_lifecycle_script.match(/"([^"]+)"/gi);

if (params.length !== 2) {
	console.log('Tenés que pasar exactamente dos parámetros:');
	console.log('-Método (get/post)');
	console.log('-Endpoint');
	// throw new Error('My error message');
	process.exit(0);
}

const commillas = /"/g;
console.log(params[0].replace(commillas, ''));
console.log(params[1].replace(commillas, ''));

process.exit(0);

newController = newController.charAt(0).toUpperCase() + newController.slice(1);

// Tomo el controller Home como el default
let baseFile = fs
	.readFileSync('./src/controllers/HomeController.php')
	.toString();

// Archivo controller
baseFile = baseFile.replace(/Home/g, newController);
fs.writeFileSync(`./src/controllers/${newController}Controller.php`, baseFile);

// Edito el loader para agregar el nuevo controller
let loaderFile = fs
	.readFileSync('./src/utils/controllers/loadControllers.php')
	.toString();

// Archivo controller
const useRegex = /(Controller;)(?!.*\1)/gs;
loaderFile = loaderFile.replace(
	useRegex,
	'Controller;\nuse Controller\\' + newController + 'Controller;'
);
const classRegex = /(::class)(?!.*\1)/gs;
loaderFile = loaderFile.replace(
	classRegex,
	'::class,\n\t"' +
		newController +
		'Controller.php" => ' +
		newController +
		'Controller::class'
);
fs.writeFileSync('./src/utils/controllers/loadControllers.php', loaderFile);
