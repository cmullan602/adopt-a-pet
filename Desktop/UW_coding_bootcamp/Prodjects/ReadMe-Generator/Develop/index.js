// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');

const createMarkdown = require('generateMarkdown.js');

// TODO: Create an array of questions for user input

const questions = [ 
    {
        type: "input",
        name: 'title',
        message: "What is the title of your prodject?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type: "input",
        name: "discription",
        message: "What do you want to do?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"input",
        name:"installation",
        message:"How do you install your app?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"input",
        name:"usage",
        message:"How do you use your app?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"input",
        name:"contribution",
        message:"Who are your contributers",
        validate:noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"input",
        name:"test",
        message:"How do you test your app?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"list",
        name:"license",
        message:"What licenses do you use?",
        choices:[''],
    },
    {
        type:"input",
        name:"userName",
        message:"What is your name?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
    {
        type:"input",
        name:"email",
        message:"What is your email adress?",
        validate: noNewlineChar,
        filter: trimAnswer,
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
