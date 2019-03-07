const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { MatchCommand, StandingsCommand } = require('./commands');
const { Logger } = require('./utils')

program.command("matches")
    .alias("m")
    .on("--help", () => {
        console.log("\n See this week's Overwatch League Matches!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go matches}     Lists all of this week's Overwatch League matches`}`);
    })
    .action(() => {
        MatchCommand.matches();
    });

program.command("standings")
    .alias("s")
    .on("--help", () => {
        console.log("\n See this week's Overwatch League Standings!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go standings}     Lists all of this week's Overwatch League standings`}`);
    })
    .action(() => {
        StandingsCommand.standings();
    });
program.parse(process.argv);