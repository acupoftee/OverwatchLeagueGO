const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const owlapi = require('owlapi');
const ora = require('ora');
const cfonts = require('cfonts');
const URL = require('url')
const { EmojiUtil, OwlUtil, Logger } = require('../utils');

module.exports = {
    async player(name) {
        const spinner = ora(
            `Loading Player...`
        ).start();
        let table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
            style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
        });

        const playerId = await OwlUtil.locatePlayer(name);
        //console.log(playerId);
        spinner.stop();
        if (playerId === 0) {
            spinner.stop();
            Logger.error("Could not locate player. Did you make a typo?");
            return;
        }

        fetch(`https://api.overwatchleague.com/players/${playerId}?locale=en_US`)
            .then(res => res.json())
            .then(body => {
                console.log(body);
                const player = body.data.player;
                const team = player.teams[0].team.abbreviatedName;
                const { hex: teamColor } = owl_colors.getPrimaryColor(team);
                table.push([`${chalk.bgHex(teamColor).whiteBright.bold(team)} ${player.givenName} ${chalk.whiteBright.bold(player.name)} ${player.familyName}`])
                //table.push([`${player.givenName} ${chalk.whiteBright.bold(player.name)} ${player.familyName}`])
                spinner.stop();
                table.length ? console.log(`\n${chalk.gray(table.toString())}\n`) : console.log("\n  Could not find team.\n");
            })
    }
}