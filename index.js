/* 
    CIE iGCSE Computer Science
    Pre-Released Material: Task 1
*/

const inquirer = require("inquirer");
const chalk = require("chalk");
const mongoose = require("mongoose");

// Sets up the .env file
require("dotenv").config();

async function main() {
	console.log(chalk.magentaBright("--- Friends of Seaview Pier Member Registration ---"));

	const answers1 = await inquirer.prompt([
		{ type: "input", message: "Please enter your first name:", name: "firstname" },
		{ type: "input", message: "Please enter your last name:", name: "surname" },
		{ type: "confirm", message: "Do you wish to work as a volunteer?", name: "volunteer" },
	]);
	if (answers1.volunteer) {
		const answers2 = await inquirer.prompt([
			{ type: "rawlist", message: "Please select the area you wish to work in.", name: "area", choices: ["Pier entrance gate", "Gift shop", "Painting and Decorating"] },
		]);
	}
	const answers3 = await inquirer.prompt([
		{ type: "input", message: "Please enter the date of joining:", name: "date" },
		{ type: "confirm", message: "Have you paid the $75 membership fee?", name: "paid" },
	]);
}

// Connects to the database, and then runs the main function
mongoose.connect(process.env.MONGODB_URI, () => {
	main();
});
