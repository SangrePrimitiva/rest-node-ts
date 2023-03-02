#!/usr/bin/env node
import fs from 'fs';
import { stdout } from 'process';
import chalk from 'chalk';
// import gradient from 'gradient-string';
// import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
// import { createSpinner } from 'nanospinner';
import enquirer from 'enquirer';

const COLOR_TELERED = '#005f97';

const { prompt } = enquirer;

console.clear();

const response = await prompt([
	{
		type: 'input',
		name: 'username',
		message: '¿Cuál es tu usuario?'
	},
	{
		type: 'input',
		name: 'nick',
		message: '¿Cuál es tu nick?'
	}
]);

stdout.write(
	`¡Hey! ${chalk.bgHex(COLOR_TELERED)(`Hola, ${chalk.bold.underline(response.username)}`)}`
);
process.stdout.clearLine();
process.stdout.cursorTo(0);
const confirm = await prompt({
	type: 'confirm',
	name: 'guardar',
	message: '¿Cuál es tu usuario?'
});

stdout.write(`Guardar: ${confirm.guardar}`);
