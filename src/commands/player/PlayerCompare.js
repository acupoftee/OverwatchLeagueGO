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
    async playerCompare(names) {
        const spinner = ora(
            `Loading Players...`
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
 
        if (names[0] === undefined || names[1] === undefined || names.length > 2) {
            spinner.stop();
            Logger.error(`Please include two players. Separate names with a comma.`);
            return;
        }
        const firstPlayerId = await OwlUtil.locatePlayer(names[0]);
        const secondPlayerId = await OwlUtil.locatePlayer(names[1]);
        if (firstPlayerId === 0 || secondPlayerId === 0) {
            spinner.stop();
            Logger.error(`Could not locate players. Did you make a typo?`);
            return;
        }
        let firstColor, firstElims, firstDeaths, firstDamage, firstHealing, firstUltimates, firstBlows, firstTimePlayed;
        let secondColor, secondElims, secondDeaths, secondDamage, secondHealing, secondUltimates, secondBlows, secondTimePlayed;

        // fetch data for first player
        let body = await JsonUtil.parse(`https://api.overwatchleague.com/players/${firstPlayerId}?locale=en_US&expand=team,team.matches.recent,stats,stat.ranks,similarPlayers`);
        const firstPlayer = body.data.player;
        const firstTeam = firstPlayer.teams[0].team.abbreviatedName;
        firstColor = owl_colors.getPrimaryColor(firstTeam).hex;
        firstElims = body.data.stats.all.eliminations_avg_per_10m.toFixed(2);
        firstDeaths = body.data.stats.all.deaths_avg_per_10m.toFixed(2);
        firstDamage = body.data.stats.all.hero_damage_avg_per_10m.toFixed(2);
        firstHealing = body.data.stats.all.healing_avg_per_10m.toFixed(2);
        firstUltimates = body.data.stats.all.ultimates_earned_avg_per_10m.toFixed(2);
        firstBlows = body.data.stats.all.final_blows_avg_per_10m.toFixed(2);
        firstTimePlayed = toTimeString(body.data.stats.all.time_played_total);

        // load second player
        body = await JsonUtil.parse(`https://api.overwatchleague.com/players/${secondPlayerId}?locale=en_US&expand=team,team.matches.recent,stats,stat.ranks,similarPlayers`);
        const secondPlayer = body.data.player;
        const secondTeam = secondPlayer.teams[0].team.abbreviatedName;
        secondColor = owl_colors.getPrimaryColor(secondTeam).hex;
        secondElims = body.data.stats.all.eliminations_avg_per_10m.toFixed(2);
        secondDeaths = body.data.stats.all.deaths_avg_per_10m.toFixed(2);
        secondDamage = body.data.stats.all.hero_damage_avg_per_10m.toFixed(2);
        secondHealing = body.data.stats.all.healing_avg_per_10m.toFixed(2);
        secondUltimates = body.data.stats.all.ultimates_earned_avg_per_10m.toFixed(2);
        secondBlows = body.data.stats.all.final_blows_avg_per_10m.toFixed(2);
        secondTimePlayed = toTimeString(body.data.stats.all.time_played_total);

        // create first header : player1 vs player2
        table.push([{ colSpan: 7, content: `${chalk.bgHex(firstColor).whiteBright.bold(firstTeam)} ${EmojiUtil.FLAG(firstPlayer.nationality)}  ${EmojiUtil.ROLE(firstPlayer.attributes.role)}  ${chalk.hex("#67fca8")(firstPlayer.givenName)} '${chalk.hex("#67fca8").bold(firstPlayer.name)}' ${chalk.hex("#67fca8")(firstPlayer.familyName)} vs ${
            chalk.hex("#f99e1a")(secondPlayer.givenName)} '${chalk.hex("#f99e1a").bold(secondPlayer.name)}' ${chalk.hex("#f99e1a")(secondPlayer.familyName)} ${EmojiUtil.ROLE(secondPlayer.attributes.role)}  ${EmojiUtil.FLAG(secondPlayer.nationality)}  ${chalk.bgHex(secondColor).whiteBright.bold(secondTeam)} `, hAlign: 'center' }])

        // create stat headers
          table.push([`${align.center(chalk.hex("#67fca8")(firstTimePlayed), 15)}`,
                    `${align.center(chalk.hex("#67fca8")(firstElims), 20)}`,
                    `${align.center(chalk.hex("#67fca8")(firstDeaths), 20)}`,
                    `${align.center(chalk.hex("#67fca8")(firstDamage), 20)}`,
                    `${align.center(chalk.hex("#67fca8")(firstHealing), 20)}`,
                    `${align.center(chalk.hex("#67fca8")(firstUltimates), 20)}`,
                    `${align.center(chalk.hex("#67fca8")(firstBlows), 20)}`])
        table.push([align.center(chalk.hex('#fff').bold('Time Played'), 15),
                    align.center(chalk.hex('#fff').bold('Eliminations'), 20),
                    align.center(chalk.hex('#fff').bold('Deaths'), 20),
                    align.center(chalk.hex('#fff').bold('Hero Damage'), 20),
                    align.center(chalk.hex('#fff').bold('Healing'), 20),
                    align.center(chalk.hex('#fff').bold('Ultimates Earned'), 20),
                    align.center(chalk.hex('#fff').bold('Final Blows'), 20)]);
        // table.push([`${align.center(chalk.hex("#67fca8")(firstTimePlayed), 15)}\n${align.center(chalk.whiteBright(secondTimePlayed), 15)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstElims), 20)}\n${align.center(chalk.whiteBright(secondElims), 20)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstDeaths), 20)}\n${align.center(chalk.whiteBright(secondDeaths), 20)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstDamage), 20)}\n${align.center(chalk.whiteBright(secondDamage), 20)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstHealing), 20)}\n${align.center(chalk.whiteBright(secondHealing), 20)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstUltimates), 20)}\n${align.center(chalk.whiteBright(secondUltimates), 20)}`,
        //             `${align.center(chalk.hex("#67fca8")(firstBlows), 20)}\n${align.center(chalk.whiteBright(secondBlows), 20)}`])
        table.push([`${align.center(chalk.hex("#f99e1a")(secondTimePlayed), 15)}`,
        `${align.center(chalk.hex("#f99e1a")(secondElims), 20)}`,
        `${align.center(chalk.hex("#f99e1a")(secondDeaths), 20)}`,
        `${align.center(chalk.hex("#f99e1a")(secondDamage), 20)}`,
        `${align.center(chalk.hex("#f99e1a")(secondHealing), 20)}`,
        `${align.center(chalk.hex("#f99e1a")(secondUltimates), 20)}`,
        `${align.center(chalk.hex("#f99e1a")(secondBlows), 20)}`])
        
        spinner.stop();
        cfonts.say(`${firstPlayer.name} vs ${secondPlayer.name}`, {
            font: 'block',              
            align: 'left',              
            colors: ['#f80', '#840'],      
            background: 'transparent',  
            letterSpacing: 1,          
            lineHeight: 1,              
            space: true,                
            maxLength: '0',             
        });
        table.length ? console.log(`${chalk.gray(table.toString())}\nStats are per 10 minutes, except for Time Played.\n`) : console.log("\n  Could not find player info to compare.\n");
    }
}