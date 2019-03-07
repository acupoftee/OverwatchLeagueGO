const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const { Logger } = require('../utils');

const createTable = headers => {
    return new Table({
        head: headers, style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
    });
};

module.exports = {
    standings() {
        let table = createTable([
            align.center(chalk.hex('#fff').bold('TEAM'), 34),
            align.center(chalk.hex('#fff').bold('W'), 9),
            align.center(chalk.hex('#fff').bold('L'), 9),
            align.center(chalk.hex('#fff').bold('MAP W-L-T'), 16),
            align.center(chalk.hex('#fff').bold('DIFF'), 10)
        ]);
        fetch("https://api.overwatchleague.com/standings?locale=en_US")
            .then(res => res.json())
            .then(body => {
                let promise = new Promise(function(resolve, reject) {
                    for (let i = 0; i < 20; i++) {
                        let content = body.ranks.content[i];
                        let team = content.competitor;
                        let records = content.records[0];
                        let standing = content.placement;
                        let mapDiff = records.comparisons[1].value;
                        if (mapDiff >= 0) {
                            mapDiff = '+' + mapDiff;
                        }
                        let {hex: teamColor} = owl_colors.getPrimaryColor(team.abbreviatedName);
                        table.push({
                            [align.center(chalk.whiteBright.bold(standing), 8)
                                + align.left(chalk.bgHex(teamColor).whiteBright.bold(" " + team.name + " "), 26)]:
                                [
                                    align.center(chalk.hex("#67fca8").bold(records.matchWin), 9),
                                    align.center(chalk.hex("#fc7d67").bold(records.matchLoss), 9),
                                    align.center(chalk.whiteBright.bold(records.gameWin + " - " + records.gameLoss + " - " + records.gameTie), 16),
                                    align.center(chalk.hex(mapDiff >= 0 ? "#67fca8" : "#fc7d67").bold(mapDiff), 10)
                                ]
                        });
                    }
                    resolve(1);
                })
                table.length ? console.log(`\n${table.toString()}\n`) : console.log("\n  There are no Overwatch League standings at this time.\n");
            });
    }
};