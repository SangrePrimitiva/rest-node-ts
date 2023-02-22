#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let newEndpointName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const CONSTANTS = {
	COLOR_TELERED: '#005f97',
	FEEDBACK: {
		CHECKING: 'Comprobando...',
		PROCESSING: 'Procesando...',
		ERROR: '☠️  Algo salió mal.',
		NOT_ALLOWED: 'Tarea NO permitida.',
		ALLOWED: 'Tarea permitida.'
	},
	ASK_OPTIONS_TASK: '¿Qué necesitás hacer?',
	ASK_OPTIONS_TASK_CHOICES: ['Subir cambios', 'Crear endpoint', 'Eliminar endpoint', 'Testear'],
	ASK_ENDPOINT_NAME: 'Dirección del endpoint:'
};
const { COLOR_TELERED, ASK_OPTIONS_TASK, ASK_OPTIONS_TASK_CHOICES, FEEDBACK, ASK_ENDPOINT_NAME } =
	CONSTANTS;
const { CHECKING, PROCESSING, ERROR, NOT_ALLOWED, ALLOWED } = FEEDBACK;

async function capitalizedEndpoint(str) {
	const noSpaces = str.replace(/\s/g, '');
	const standardCharacters = noSpaces.replace(/[^a-z ]/gi, '');
	const lowerCase = standardCharacters.toLowerCase();
	const capitalize = lowerCase[0].toUpperCase() + lowerCase.substring(1);
	return capitalize;
}

async function welcome() {
	// const rainbowTitle = chalkAnimation.rainbow(
	// 	'---------------------------------------\n'
	// );

	// await sleep();
	// rainbowTitle.stop();
	console.log(`${chalk.bgHex(COLOR_TELERED)(' TeleRed ')}
	
${chalk.bold.underline('Asistente de desarrollo de la API')}
`);
}

async function optionsTasksHandler(answers) {
	const spinner = createSpinner(CHECKING).start();
	await sleep(500);
	switch (answers[ASK_OPTIONS_TASK]) {
		case ASK_OPTIONS_TASK_CHOICES[1]:
			// crear endpoint
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			spinner.success({
				text: ALLOWED
			});
			await askEndpointName();
			break;

		default:
			break;
	}
}
async function optionsTasks() {
	const answers = await inquirer.prompt({
		name: ASK_OPTIONS_TASK,
		type: 'list',
		choices: ASK_OPTIONS_TASK_CHOICES
	});
	optionsTasksHandler(answers);
	return answers;
}

async function askEndpointName() {
	const answers = await inquirer.prompt({
		name: 'endpoint_name',
		type: 'input',
		message: ASK_ENDPOINT_NAME
	});

	const spinner = createSpinner(CHECKING).start();
	await sleep(500);

	newEndpointName = capitalizedEndpoint(answers.endpoint_name);

	const path = `./../src/services/${newEndpointName}ServicePost.php`;

	try {
		if (fs.existsSync(path)) {
			// existe
			spinner.error({ text: `Ese endpoint ya está en uso` });
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			spinner.success({
				text: ALLOWED
			});
			// process.exit(1);
			askName();
		} else {
			// no existe
			spinner.success({
				text: ALLOWED
			});
			process.exit(1);
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			spinner.success({
				text: ALLOWED
			});
		}
	} catch (err) {
		spinner.error({ text: ERROR });
		process.exit(1);
	}
}

function winner() {
	console.clear();
	figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
		console.log(gradient.pastel.multiline(data) + '\n');

		console.log(
			chalk.green(
				`Programming isn't about what you know; it's about making the command line look cool`
			)
		);
		process.exit(0);
	});
}

async function question2() {
	const answers = await inquirer.prompt({
		name: 'question_2',
		type: 'list',
		message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
		choices: ['4', '"4"', '"1111"', '69420']
	});
	return handleAnswer(answers.question_2 === '"1111"');
}

// Run it with top-level await
console.clear();
await welcome();
await optionsTasks();
// await question1();
// await question2();
// await question3();
// await question4();
// await question5();
// winner();
