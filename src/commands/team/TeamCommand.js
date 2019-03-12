const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const owlapi = require('owlapi');
const ora = require('ora');
const cfonts = require('cfonts');
const { EmojiUtil, OwlUtil, Logger } = require('../../utils');

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
        const spinner = ora(
            `Loading Team...`
        ).start();
        let table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
        });
        if (OwlUtil.locateTeam(name) === undefined) {
            spinner.stop();
            Logger.error("Could not locate team. Did you make a typo?");
            return;
        }
        const owl = new owlapi('en_US');
        owl.team(name).then(team => {
            const { hex: teamColor } = owl_colors.getPrimaryColor(team.abbr);
            const { hex: secondColor } = owl_colors.getSecondaryColor(team.abbr);
            table.push([chalk.bgHex(teamColor).whiteBright.bold(team.name) + ` ${chalk.whiteBright("("+team.abbr+")")} \n` +
                chalk.whiteBright(team.location + " - " + OwlUtil.getDivision(team.division) + " Division" + " ") + "\n" +
                chalk.whiteBright(ordinal(team.placement) + " in the Overwatch League")],
                [align.center(chalk.whiteBright.bold('Players'), 60)]);

            fetch(`https://api.overwatchleague.com/teams/${team.id}?locale=en_US`)
                .then(res => res.json())
                .then(body => {
                    body.players.forEach(player => {
                        table.push([`${EmojiUtil.FLAG(player.nationality)} ${EmojiUtil.ROLE(player.attributes.role)} \t${chalk.white(player.givenName)} '${chalk.whiteBright.bold(player.name)}' ${chalk.white(player.familyName)}`]);
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
                        font: 'block',              
                        align: 'left',            
                        colors: [teamColor, secondColor],         
                        background: 'transparent',  
                        letterSpacing: 1,        
                        lineHeight: 1,             
                        space: true,                
                        maxLength: '0',            
                    });
                    table.length ? console.log(`\n${chalk.gray(table.toString())}\n`) : console.log("\n  Could not find team.\n");
                });
        });
    }
}