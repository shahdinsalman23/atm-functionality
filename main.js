import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
// 1: User Data
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 900000000),
            balance: 10000000 * i
        };
        users.push(user);
    }
    return users;
};
// 2: ATM Machine
const atmMachine = async (users) => {
    const response = await inquirer.prompt({
        type: "number",
        name: "pin",
        message: "Write Pin Code: "
    });
    const user = users.find(val => val.pin == response.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunction(user);
        return;
    }
    console.log("Invalid User Pin");
};
// 3: ATM Function
const atmFunction = async (user) => {
    const answer = await inquirer.prompt({
        type: "list",
        name: "Select",
        message: "Select Your Option",
        choices: ["Withdraw", "Balance", "Deposite", "Exit"]
    });
    if (answer.Select == "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            name: "rupees",
            message: "Enter your amount"
        });
        if (amount.rupees > user.balance) {
            return console.log("Current balance is insufficient.");
        }
        if (amount.rupees > 25000) {
            return console.log("You cannot withdraw more than 25000.");
        }
        console.log(`Withdraw amount: ${amount.rupees}`);
        console.log(`Current Balance: ${user.balance - amount.rupees}`);
    }
    if (answer.Select == "Balance") {
        console.log(`Current Balance: ${user.balance}`);
        return;
    }
    if (answer.Select == "Deposite") {
        const deposite = await inquirer.prompt({
            type: "number",
            name: "rupees",
            message: "Deposite amount enter"
        });
        console.log(`Deposite Amount ${deposite.rupees}`);
        console.log(`Total Balance ${user.balance + deposite.rupees}`);
    }
    if (answer.Select == "Exit") {
        console.log("Thanks for using ATM");
    }
};
const users = createUser();
atmMachine(users);
