const Table = require("cli-table3");
const fetch = require("node-fetch");
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
    async playerCompare(firstName, secondName) {
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

        const firstPlayerId = await OwlUtil.locatePlayer(firstName);
        const secondPlayerId = await OwlUtil.locatePlayer(secondName);
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

        // create first header : player1 vs player2
        table.push([{ content: `${chalk.bgHex(firstColor).whiteBright.bold(firstTeam)} ${EmojiUtil.ROLE(firstPlayer.attributes.role)}  ${firstPlayer.givenName} '${chalk.whiteBright.bold(firstPlayer.name)}' ${firstPlayer.familyName} vs. ${
            secondPlayer.givenName} '${chalk.whiteBright.bold(secondPlayer.name)}' ${secondPlayer.familyName} ${EmojiUtil.ROLE(secondPlayer.attributes.role)}  ${chalk.bgHex(secondColor).whiteBright.bold(secondTeam)} `, hAlign: 'center' }])

        
        spinner.stop();
        console.log(table.toString());
        console.log(`First: ${firstElims}\nSecond: ${secondElims}`);
    }
}