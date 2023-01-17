#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
async function welcome() {
    let rainbow = chalkAnimation.rainbow("      <<<<<Welcome to National Bank Atm>>>>>");
    await sleep();
    rainbow.stop();
}
await welcome();
const answers = await inquirer.prompt([
    {
        type: "string",
        name: "UserID",
        messgae: "Enter your UserID :"
    },
    {
        type: "password",
        name: "UserPassword",
        message: "Enter your Password :"
    },
    {
        type: "list",
        name: "Accounttype",
        choices: ["Current Account", "Saving Account"],
        message: "Enter your accont type :"
    },
    {
        type: "list",
        name: "Transactiontype",
        choices: ["Fast Cash", "Withdraw"],
        message: "Kindly Selct Transaction type :",
    },
    {
        type: "list",
        name: "transactionAmount",
        choices: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
        message: "Kindly select your Transaction Amount :",
        when(answers) {
            return answers.Transactiontype == "Fast Cash";
        },
    },
    {
        type: "number",
        name: "transactionAmount",
        message: "Put your Amount :",
        when(answers) {
            return answers.Transactiontype == "Withdraw";
        },
    }
]);
if (answers.UserID && answers.UserPassword) {
    const balance = Math.floor(Math.random() * 1000000);
    console.log(balance);
    if (answers.transactionAmount <= balance) {
        console.log(chalk.cyanBright `Your balance After Transaction :`, balance - answers.transactionAmount);
    }
    else {
        console.log(chalk.cyanBright `Insuficent balance`);
    }
}
else {
    console.log(chalk.cyanBright `Wrong ID or Password`);
}
