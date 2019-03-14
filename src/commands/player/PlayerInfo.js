const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const ora = require('ora');
const cfonts = require('cfonts');
const { OwlUtil, Logger, EmojiUtil, JsonUtil } = require('../../utils');

const toTimeString = (number) => {
    let h = Math.floor(number / 3600);
    let m = Math.floor(number % 3600 / 60);
    let s = Math.floor(number % 3600 % 60);

    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

module.exports = {
    async playerInfo(name) {
        const spinner = ora(
            `Loading Player...`
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

        const playerId = await OwlUtil.locatePlayer(name);
        if (playerId === 0) {
            spinner.stop();
            Logger.error("Could not locate player. Did you make a typo?");
            return;
        }

        const body = await JsonUtil.parse(`https://api.overwatchleague.com/players/${playerId}?locale=en_US&expand=team,team.matches.recent,stats,stat.ranks,similarPlayers`);
        const player = body.data.player;
        const team = player.teams[0].team.abbreviatedName;
        const { hex: teamColor } = owl_colors.getPrimaryColor(team);
        const { hex: secondColor } = owl_colors.getSecondaryColor(team);


        table.push([{ colSpan: 7, content: `${chalk.bgHex(teamColor).whiteBright.bold(team)} ${chalk.white('#' + player.attributes.player_number)} ${player.givenName} '${chalk.whiteBright.bold(player.name)}' ${player.familyName} `, hAlign: 'center' }])
        table.push([{ colSpan: 7, content: `${EmojiUtil.FLAG(player.nationality)}  ${EmojiUtil.ROLE(player.attributes.role)}  ${player.homeLocation}, ${OwlUtil.capitalize(player.attributes.role)} Player`, hAlign: 'center' }]);
        table.push([align.center(chalk.hex('#fff').bold('Time Played'), 15),
        align.center(chalk.hex('#fff').bold('Eliminations'), 20),
        align.center(chalk.hex('#fff').bold('Deaths'), 15),
        align.center(chalk.hex('#fff').bold('Hero Damage'), 20),
        align.center(chalk.hex('#fff').bold('Healing'), 15),
        align.center(chalk.hex('#fff').bold('Ultimates Earned'), 20),
        align.center(chalk.hex('#fff').bold('Final Blows'), 15)]);

        table.push([align.center(chalk.hex('#fff').whiteBright(toTimeString(body.data.stats.all.time_played_total)), 15),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.eliminations_avg_per_10m.toFixed(2)), 20),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.deaths_avg_per_10m.toFixed(2)), 15),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.hero_damage_avg_per_10m.toFixed(2)), 20),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.healing_avg_per_10m.toFixed(2)), 15),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.ultimates_earned_avg_per_10m.toFixed(2)), 20),
        align.center(chalk.hex('#fff').whiteBright(body.data.stats.all.final_blows_avg_per_10m.toFixed(2)), 15)]);
        spinner.stop();

        cfonts.say(player.name, {
            font: 'block',
            align: 'left',
            colors: [teamColor, secondColor],
            background: 'transparent',
            letterSpacing: 1,
            lineHeight: 1,
            space: true,
            maxLength: '0',
        });
        table.length ? console.log(`${chalk.gray(table.toString())}\nStats are per 10 minutes, except for Time Played.\n`) : console.log("\n  Could not find team.\n");
    }
}