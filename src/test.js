const stringz = require('stringz');
const Table = require('cli-table3')
const emojis = require('node-emoji');
const stringWidth = require('string-width')

console.log(stringz.length("🏆"))
console.log(stringWidth("🏆"))

let table = new Table({
    style: { head: [], border: [] }
});

table.push([`Hi I am from ${emojis.get('flag-kr')}`]);
table.push([`Cool! I am from ${emojis.get('flag-jp')} `])
console.log(table.toString());