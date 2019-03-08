const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const owlapi = require('owlapi');
const ora = require('ora');
const cfonts = require('cfonts');
const { EmojiUtil } = require('../utils');
const divisions = require('../data/divisions.json');

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
/**
     * Finds a Competitor ID by name
     * @param {string} val the competitor's name
     * @returns the Competitor's ID
     */
const locateTeam = (val) => {
    const key = val.toLowerCase();
    for (let i = 0; i < teamNames.length; i++) {
        const competitor = teamNames[i];
        const id = competitor.id;

        // return id if keys are equal
        if (key == id) {
            return id;
        }

        // return id if names are equal
        for (let j = 0; j < competitor.values.length; j++) {
            const value = competitor.values[j];
            if (key == value) {
                return id;
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
            const spinner = ora(
                `Loading ${team.name}...`
            ).start();
            const { hex: teamColor } = owl_colors.getPrimaryColor(team.abbr);
            const { hex: secondColor } = owl_colors.getSecondaryColor(team.abbr);
            table.push([chalk.bgHex(teamColor).whiteBright.bold(team.name) + ` (${team.abbr}) \n` +
                team.location + " - " + getDivision(team.division) + " Division" + " " + "\n" +
                ordinal(team.placement) + " in the Overwatch League"],
                [align.center('Players', 60)]);

            fetch(`https://api.overwatchleague.com/teams/${team.id}?locale=en_US`)
                .then(res => res.json())
                .then(body => {
                    body.players.forEach(player => {
                        table.push([`${EmojiUtil.FLAG(player.nationality)} ${EmojiUtil.ROLE(player.attributes.role)} \t${chalk.gray(player.givenName)} '${chalk.whiteBright.bold(player.name)}' ${chalk.gray(player.familyName)}`]);
                    });
                    spinner.stop();
                    let newName = "";
                    //TODO find more efficient way of doing this
                    switch (team.name) {
                        case "Los Angeles Gladiators":
                            newName = "Los Angeles|Gladiators";
                            break;
                        case "Los Angeles Valiant":
                            newName = "Los Angeles|Valiant";
                            break;
                        case "New York Excelsior":
                            newName = "New York|Excelsior";
                            break;
                        case "San Francisco Shock":
                            newName = "San Francisco|Shock";
                            break;
                        default:
                            newName = team.name.replace(" ", "|");
                    }

                    cfonts.say(newName, {
                        font: 'block',              // define the font face
                        align: 'left',              // define text alignment
                        colors: [teamColor, secondColor],         // define all colors
                        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
                        letterSpacing: 1,           // define letter spacing
                        lineHeight: 1,              // define the line height
                        space: true,                // define if the output text should have empty lines on top and on the bottom
                        maxLength: '0',             // define how many character can be on one line
                    });
                    table.length ? console.log(`\n${table.toString()}\n`) : console.log("\n  Could not find team.\n");
                });
        });
    }
}