const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const owlapi = require('owlapi');
const ora = require('ora');
const divisions = require('../data/divisions.json');

// const createTable = headers => {
//     return new Table({
//         head: headers, style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
//     });
// };

/**
 * Convert a division from ID to name or vice-versa.
 * @param {String|number} division Name or ID of the divison.
 * @returns {String|number} a team's division information
 */
const getDivision = (division, abbreviated = false) => {
    for (let i = 0; i < divisions.length; i++) {
        const div = divisions[i];
        if (typeof division === 'string') {
            if (div.values.includes(division)) {
                return div.id;
            }
        } else if (typeof division === 'number') {
            let long = div.values[0];
            if (division == div.id) {
                if (abbreviated) {
                    return div.abbrev;
                }
                return long.charAt(0).toUpperCase() + long.slice(1);
            }
        }
    }
}

const ordinal = (number) => {
    let i = number % 10, j = number % 100;
    if (i === 1 && j !== 11) {
        return number + 'st';
    } else if (i === 2 && j !== 12) {
        return number + 'nd';
    } else if (i === 3 && j !== 13) {
        return number + 'rd';
    } else {
        return number + 'th';
    }
}
module.exports = {
    team(name) {
        let table = new Table({
            style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
        });
        const owl = new owlapi('en_US');
        owl.team(name).then(team => {
            const {hex: teamColor} = owl_colors.getPrimaryColor(team.abbr);
            table.push([align.center(chalk.bgHex(teamColor).whiteBright.bold(" " + team.name +" \n") +
            " " + team.location + " - " + getDivision(team.division) + " Division" + " " + "\n" +
            " Standing: " + ordinal(team.placement), 50)]);
            //console.log(team.name);
            console.log(table.toString())
        });
        //table.length ? console.log(`\n${table.toString()}\n`) : console.log("\n  There are no Overwatch League teams at this time.\n");
    }
}