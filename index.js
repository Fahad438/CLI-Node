const { Command } = require('commander');
const fs = require("fs")
const program = new Command();


program
    .command("addTodo")
    .description("add todo with title and date")
    .requiredOption("--title <string>", "title of todo")
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

const listTodo = () => {
    const allData = fs.readFileSync("db.json", "utf8")
    const data = JSON.parse(allData)
    console.log(data)
}

program
    .command("listTodo")
    .description("display all data")
    .action(listTodo)



program
    .command("delete")
    .description("delete spicfic index in array")
    .requiredOption("--title <string>", "title is alredy exist")
    .action(option => {
        const dataString = fs.readFileSync('db.json', "utf8")
        const data = JSON.parse(dataString)
        // Log the parsed data
        console.log('Parsed data:', data);
        // Find index of the item with the specified title
        const index = data.findIndex(item => item.title === option.title);

        // Log the index found
        console.log('Index found:', index);

        if (index === -1) {
            console.log('Title not found in the array.');
            return;
        }

        // Filter out the item with the specified title
        const updatedData = data.filter(item => item.title.trim() !== option.title.trim());

        // Write the updated data back to the file
        fs.writeFileSync('db.json', JSON.stringify(updatedData, null, 2));

        console.log(`Item with title "${option.title}" has been deleted.`);


    })



program.parse()