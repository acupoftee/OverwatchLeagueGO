const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { 
    MatchCommand, 
    StandingsCommand,
    TeamsCommand 
} = require('./commands');
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

program.command("teams")
    .alias("s")
    .on("--help", () => {
        console.log("\n Displays all Overwatch League teams for the current season!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go teams}     Lists all of this seasons Overwatch League teams`}`);
    })
    .action(() => {
        TeamsCommand.teams();
    });
program.parse(process.argv);