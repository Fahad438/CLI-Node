const { Command } = require('commander');
const fs = require("fs")
const program = new Command();


program
    .command("addTodo")
    .description("add todo with title and date")
    .option("--title <string>", "title of todo")
    .option("--date <string>", "date of todo")
    .action(option => {
        const dataString = fs.readFileSync("./db.json", "utf8")
        const data = JSON.parse(dataString)
        const newTodo = {
            id: Date.now(),
            title: option.title,
            date: option.data
        }
        data.push(newTodo);

        fs.writeFileSync("./db.json", JSON.stringify(data, null, 2))
    })




program.parse()