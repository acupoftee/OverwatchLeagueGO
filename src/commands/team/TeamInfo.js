const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const ora = require('ora');
const cfonts = require('cfonts');
const { EmojiUtil, OwlUtil, Logger, JsonUtil } = require('../../utils');

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
    async teamInfo(name) {
        const spinner = ora(
            `Loading Team...`
        ).start();
        let table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            },
            style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
        });
        const teamId = OwlUtil.locateTeam(name);
        if (teamId === undefined) {
            spinner.stop();
            Logger.error("Could not locate team. Did you make a typo?");
            return;
        }
        let body = await JsonUtil.parse(`https://api.overwatchleague.com/v2/teams/${teamId}?locale=en_US`);
        const team = body.data;
        const teamColor = owl_colors.getPrimaryColor(team.abbreviatedName);
        const { hex: secondColor } = owl_colors.getSecondaryColor(team.abbreviatedName);
         let teamFont = OwlUtil.colorIsLight(teamColor.rgb[0], teamColor.rgb[1], teamColor.rgb[2]) ? '#000' : '#fff';
        table.push([chalk.bgHex(teamColor.hex).hex(teamFont).bold(team.name) + ` ${chalk.whiteBright("(" + team.abbreviatedName + ")")} \n` +
            chalk.whiteBright(team.location + " - " + OwlUtil.getDivision(team.divisionId) + " Division" + " ") + "\n" +
            chalk.whiteBright(ordinal(team.placement) + " in the Overwatch League") + "\n" +
            chalk.whiteBright(`Record: ${team.records.matchWin}W - ${team.records.matchLoss}L`)],
            [align.center(chalk.whiteBright.bold('Players'), 60)]);

        body = await JsonUtil.parse(`https://api.overwatchleague.com/teams/${teamId}?locale=en_US`)
        body.players.forEach(player => {
            table.push([`${EmojiUtil.FLAG(player.nationality)}  ${EmojiUtil.ROLE(player.attributes.role)}   ${chalk.white(player.givenName)} '${chalk.whiteBright.bold(player.name)}' ${chalk.white(player.familyName)}`]);
        });
        spinner.stop();
        let newName = "";
        //TODO find more efficient way of doing this
        switch (body.name) {
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
                newName = body.name.replace(" ", "|");
        }

        cfonts.say(newName, {
            font: 'block',
            align: 'left',
            colors: [teamColor.hex, secondColor],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0',
        });
        table.length ? console.log(`${chalk.gray(table.toString())}\n`) : console.log("\n  Could not find team.\n");
    }
}