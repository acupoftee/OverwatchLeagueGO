const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const divisions = require('../data/divisions.json');

const createTable = headers => {
    return new Table({
        head: headers, style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
    });
};

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

module.exports = {
    teams() {
        let table = createTable([
            align.center(chalk.hex('#fff').bold('TEAM'), 34),
            align.center(chalk.hex('#fff').bold('DIVISION'), 15)
        ]);
        fetch("https://api.overwatchleague.com/v2/teams?locale=en_US")
            .then(res => res.json())
            .then(body => {
                body.data.forEach(competitor => {
                    let team = competitor.name;
                    let division = getDivision(competitor.divisionId);
                    let {hex: teamColor} = owl_colors.getPrimaryColor(competitor.abbreviatedName);
                    table.push({
                        [align.left(chalk.bgHex(teamColor).whiteBright.bold(" " + team + " "), 26)]:
                        [
                            align.center(chalk.whiteBright.bold(division), 15)
                        ]
                    });
                });
                table.length ? console.log(`\n${table.toString()}\n`) : console.log("\n  There are no Overwatch League teams at this time.\n");
            })
    }
};