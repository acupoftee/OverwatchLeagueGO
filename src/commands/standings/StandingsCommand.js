const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const cfonts = require('cfonts');
const ora = require('ora');
const { JsonUtil, OwlUtil } = require('../../utils');

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
    async standings() {
        const spinner = ora(
            'Loading Standings...'
        ).start();
        let table = createTable([
            align.center(chalk.hex('#fff').bold('TEAM'), 34),
            align.center(chalk.hex('#fff').bold('W'), 9),
            align.center(chalk.hex('#fff').bold('L'), 9),
            align.center(chalk.hex('#fff').bold('MAP W-L-T'), 16),
            align.center(chalk.hex('#fff').bold('DIFF'), 10)
        ]);

        const body = await JsonUtil.parse("https://api.overwatchleague.com/standings?locale=en_US");

        for (let i = 0; i < 20; i++) {
            let content = body.ranks.content[i];
            let team = content.competitor;
            let records = content.records[0];
            let standing = content.placement;
            let mapDiff = records.comparisons[1].value;
            if (mapDiff >= 0) {
                mapDiff = '+' + mapDiff;
            }
            let teamColor = owl_colors.getPrimaryColor(team.abbreviatedName);
            let teamFont = OwlUtil.colorIsLight(teamColor.rgb[0], teamColor.rgb[1], teamColor.rgb[2]) ? '#000' : '#fff';
            if (i == 8) {
                table.push([{colSpan: 1, content: "Stage Playoffs Cutoff", hAlign: 'center'}]);
            }
            table.push({
                [align.center(chalk.whiteBright.bold(standing), 8)
                    + align.left(chalk.bgHex(teamColor.hex).hex(teamFont).bold(" " + team.name + " "), 26)]:
                    [
                        align.center(chalk.hex("#67fca8").bold(records.matchWin), 9),
                        align.center(chalk.hex("#fc7d67").bold(records.matchLoss), 9),
                        align.center(chalk.whiteBright.bold(records.gameWin + " - " + records.gameLoss + " - " + records.gameTie), 16),
                        align.center(chalk.hex(mapDiff >= 0 ? "#67fca8" : "#fc7d67").bold(mapDiff), 10)
                    ]
            });
        }

        spinner.stop();
        cfonts.say("Standings", {
            font: 'block',
            align: 'left',
            colors: ['#f80', '#840'],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0',
        });
        table.length ? console.log(`${chalk.gray(table.toString())}\n`) : console.log("\n  There are no Overwatch League standings at this time.\n");
    }
};