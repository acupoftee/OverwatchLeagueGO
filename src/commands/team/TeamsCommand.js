const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const ora = require('ora');
const cfonts = require('cfonts');
const { OwlUtil, JsonUtil } = require('../../utils');

const createTable = headers => {
    return new Table({
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        },
        head: headers, style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
    });
};


module.exports = {
    async teams(division = null) {
        let table = createTable([
            align.center(chalk.hex('#fff').bold('TEAM'), 34),
            align.center(chalk.hex('#fff').bold('DIVISION'), 14)
        ]);
        const spinner = ora(
            'Loading Teams...'
        ).start();

        const body = await JsonUtil.parse("https://api.overwatchleague.com/v2/teams?locale=en_US");
        body.data.forEach(competitor => {
            let team = competitor.name;
            let division = OwlUtil.getDivision(competitor.divisionId, true);
            let teamColor  = owl_colors.getPrimaryColor(competitor.abbreviatedName);
            // if (division.toLowerCase() === "atlantic" || division.toLowerCase() === "a") {
            //     let div;
            //     divisions.forEach(div => {
            //         if (div.values.includes(division.toLowerCase())) {
            //             div = division;
            //         }
            //         if (division.id === competitor.divisionId) {
            //             table.push({
            //                 [align.left(chalk.bgHex(teamColor).whiteBright.bold(" " + team + " "), 26)]:
            //                 [
            //                     align.center(chalk.whiteBright.bold(division), 15)
            //                 ]
            //             });
            //         }
            //     });
            // }
            let fontColor = OwlUtil.colorIsLight(teamColor.rgb[0], teamColor.rgb[1], teamColor.rgb[2]) ? '#000' : '#fff';
            table.push({
                [align.left(chalk.bgHex(teamColor.hex).hex(fontColor).bold(" " + team + " "), 26)]:
                    [
                        align.center(chalk.whiteBright.bold(division), 15)
                    ]
            });
        });
        spinner.stop();
        cfonts.say("Overwatch|League Teams", {
            font: 'block',
            align: 'left',
            colors: ['#f80', '#840'],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0',
        });
        table.length ? console.log(`${chalk.gray(table.toString())}\n`) : console.log("\n  There are no Overwatch League teams at this time.\n");
    },
};