/* 
    CIE iGCSE Computer Science
    Pre-Released Material: Task 1
*/

const inquirer = require("inquirer");
const { createSpinner } = require("nanospinner");
const chalk = require("chalk");
const mongoose = require("mongoose");

const volunteer = require("./schemas/volunteer");

// Sets up the .env file
require("dotenv").config();

async function main() {
	console.log(chalk.magentaBright("--- Friends of Seaview Pier Member Registration ---"));

	const answers1 = await inquirer.prompt([
		{
			type: "input",
			message: "Please enter your forename:",
			name: "forename",
		},
		{
			type: "input",
			message: "Please enter your surname:",
			name: "surname",
		},
		{
			type: "confirm",
			message: "Do you wish to work as a volunteer?",
			name: "volunteer",
		},
	]);
	if (answers1.volunteer) {
		var answers2 = await inquirer.prompt([
			{
				type: "rawlist",
				message: "Please select the area you wish to work in.",
				name: "area",
				choices: ["Pier entrance gate", "Gift shop", "Painting and Decorating"],
			},
		]);
	}
	const answers3 = await inquirer.prompt([
		{
			type: "input",
			message: "Please enter the date of joining:",
			name: "date",
		},
		{
			type: "confirm",
			message: "Have you paid the $75 membership fee?",
			name: "paid",
		},
	]);

	const spinner = createSpinner("Adding to database...").start();
	await new volunteer({
		forename: answers1.forename,
		surname: answers1.surname,
		isVolunteer: answers1.volunteer,
		area: answers1.volunteer ? answers2.area : undefined,
		date: answers3.date,
		paid: answers3.paid,
	}).save();
	spinner.success({ text: `Successfully added user ${answers1.forename} ${answers1.surname} to database.` });
	process.exit(0);
}

// Connects to the database, and then runs the main function
mongoose.connect(process.env.MONGODB_URI, () => {
	main();
});
