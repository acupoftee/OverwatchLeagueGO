const program = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const didYouMean = require('didyoumean');
const isAsyncSupported = require('is-async-supported');
const updateNotifier = require('update-notifier');
const {
    MatchCommand,
    StandingsCommand,
    TeamsCommand,
    TeamCommand,
    PlayerCommand
} = require('./commands');
const { Logger } = require('./utils')

if (!isAsyncSupported()) {
    require('async-to-gen/register');
  }
  
  (async () => {
    await updateNotifier({
      pkg,
    }).notify({ defer: false });
  })();
  
  program.version(
    `\n${chalk`{bold.hex('#f80') OWL}`} 'GO' version: ${
        pkg.version
    }\n`,
    '-v, --version'
  );

program.command("schedule")
    .alias("s")
    .on("--help", () => {
        console.log("\n See this week's Overwatch League Matches!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go schedule}     Lists all of this week's Overwatch League matches`}`);
    })
    .action(() => {
        MatchCommand.matches();
    });

program.command("standings")
    .alias("st")
    .on("--help", () => {
        console.log("\n See this week's Overwatch League Standings!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go standings}     Lists all of this week's Overwatch League standings`}`);
    })
    .action(() => {
        StandingsCommand.standings();
    });

program.command("teams")
    .alias("ts")
    // .option("-a, --atlantic", "View Atlantic Division teams.\n")
    // .option("-p, --pacific", "View Pacific Division teams.\n")
    .on("--help", () => {
        console.log("\n Displays all Overwatch League teams for the current season!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go teams}     Lists all of this seasons Overwatch League teams`}`);
    })
    .action(() => {
        TeamsCommand.teams();
    });
program.command("team <name>")
    .alias("t")
    .option("-s, --schedule", "Displays a team's upcoming match schedule.")
    .option("-m, --matches", "Displays a team's match history.")
    .on("--help", () => {
        console.log("\n Displays information about a specific Overwatch League team!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go team bostonuprising}     Lists Boston Uprising's info including standing and roster`}`);
    })
    .action((name, options) => {
        TeamCommand.team(name, options);
    });
program.command("player <name>")
    .alias("p")
    .option("-i, --info", "Checks the player's basic info")
    .option("-c, --compare", "Compares the stats between two players. Seperate the names with commas (no space in bwtween), ex: 'fusions,geguri'")
    .on("--help", () => {
        console.log("\n Displays information about a specific Overwatch League player!\n");
        console.log("Example:\n");
        console.log(`     ${chalk`{hex('#ffde68') owl-go player striker}     Lists Striker's stats for the current season`}`);
        console.log(`     ${chalk`{hex('#ffde68') owl-go player -c striker,surefour}     Lists Striker's and Surefour's stats side by side for the current season`}`);
    })
    .action((name, option) => {
        //console.log(program.list);
        PlayerCommand.player(name, option);
    });

program.on('--help', () => {
    console.log('');
    console.log('');
    console.log(
        `  Welcome to ${chalk`{bold.hex('#f80') OWL}`} GO !`
    );
    console.log('');
    console.log(
        `  Wanna check OWL team information please enter: ${chalk.green(
            'owl-go teams'
        )}`
    );
    console.log(
        `  Wanna follow and OWL match progress please enter: ${chalk.green('owl-go schedule')}`
    );
    console.log(
        `  Wanna check current League standings please enter: ${chalk.green(
            'owl-go standings'
        )}`
    );
    console.log(
        `  Wanna check OWL player information please enter: ${chalk.green(
            'owl-go player <name>'
        )}`
    );
    console.log(
        `  Wanna check OWL team information please enter: ${chalk.green(
            'owl-go team <name>'
        )}`
    );
    console.log('');
    console.log(
        `  For more detailed information please refer to the GitHub page: ${chalk.green(
            'https://github.com/acupoftee/OverwatchLeagueGO'
        )}`
    );
    console.log(
        `  Or enter ${chalk.green('owl-go schedule -h')}, ${chalk.green(
            'owl-go player -h'
        )} to get more helpful information.`
    );
    console.log('');
});

program.command('*').action(command => {
    Logger.error(`Unknown command: ${Logger.bold(command)}`);

    const commandNames = program.commands
        .map(c => c._name)
        .filter(name => name !== '*');

    const closeMatch = didYouMean(command, commandNames);

    if (closeMatch) {
        Logger.error(`Did you mean ${Logger.bold(closeMatch)} ?`);
    }

    process.exit(1);
});

if (process.argv.length === 2) program.help();
program.parse(process.argv);