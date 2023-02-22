#!/usr/bin/env node

import fs from 'fs';
import * as child from 'child_process';

console.clear();
const sleep = (ms = 350) => new Promise((r) => setTimeout(r, ms));

let loadingInterval = null;

const loadingMessage = async (message) => {
	var P = ['⠇', '⠏', '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'];
	var x = 0;
	loadingInterval = setInterval(function () {
		process.stdout.write(`\r\x1b[33m${P[x++]}\x1b[0m ${message}`);
		x = x % P.length;
	}, 40);
};

const dateTodayFormatted = () => {
	let yourDate = new Date();
	yourDate.toISOString().split('T')[0];
	const offset = yourDate.getTimezoneOffset();
	yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
	return yourDate.toISOString().split('T')[0];
};

loadingMessage('Instalando dependencias...');

const installEstensions = () => {
	loadingMessage('Instalando extensiones2...');

	child.exec('code --list-extensions', async (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			clearInterval(loadingInterval);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			clearInterval(loadingInterval);
			return;
		}
		await sleep(5000);
		console.log(`error: ${stdout}`);
		clearInterval(loadingInterval);
	});
};

child.exec('npm install', async (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		clearInterval(loadingInterval);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		clearInterval(loadingInterval);
		return;
	}
	clearInterval(loadingInterval);

	await sleep();
	console.clear();
	loadingMessage('Instalando extensiones...');
	await sleep();
	clearInterval(loadingInterval);

	await sleep();
	console.clear();
	loadingMessage('Configurando VSCode...');
	await sleep();
	clearInterval(loadingInterval);

	// actualizo la fecha de update
	const path = './cli/cli-updated.json';
	const fileRaw = fs.readFileSync(path);
	let fileJson = JSON.parse(fileRaw);
	fileJson.updated = dateTodayFormatted();
	let data = JSON.stringify(fileJson);
	fs.writeFileSync(path, data);
	await sleep();
	console.clear();
	installEstensions();
});
