const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { MatchCommand } = require('./models');
const { Logger } = require('./utils')

program.command("matches")
    .alias("m")
    .on("--help", () => {
        console.log("\n See this week's Overwatch League Matches!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go matches}     Lists all of this week's Overwatch league matches`}`);
    })
    .action(() => {
        MatchCommand.matches();
    });

program.parse(process.argv);