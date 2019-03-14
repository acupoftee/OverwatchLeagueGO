const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const ora = require('ora');
const cfonts = require('cfonts');
const stageData = require('../../data/stages.json');
const { JsonUtil, OwlUtil } = require('../../utils');

const options = { month: "short", weekday: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };

const getMatch = (team_1, team_2, result_1, result_2, result) =>
    `${align.right(`${result ? chalk.hex("#f99e1a")('♔') : " "} ${
        team_1}`, 27)} ${chalk.hex(result ? "#fff" : "#c4c4c4").bold(" " + result_1 + " ")}  ${
    chalk.hex("#efefef")("vs")}  ${
    chalk.hex(result ? "#c4c4c4" : "#fff").bold(" " + result_2 + " ")} ${
    align.left(`${team_2} ${!result ? chalk.hex("#f99e1a")('♔') : " "}`, 27)}`;

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
    async teamSchedule(name) {
        const spinner = ora(
            'Loading Matches...'
        ).start();

        const teamId = OwlUtil.locateTeam(name);
        let teamName, teamAbbr;
        let primaryColor, secondaryColor;
        if (teamId === undefined) {
            spinner.stop();
            Logger.error("Could not locate team. Did you make a typo?");
            return;
        }
        const body = await JsonUtil.parse("https://api.overwatchleague.com/schedule?locale=en_US");
        let currentTime = new Date().getTime();
        let slug = null;
        let table = null;
        for (let i = 0; i < stageData.length; i++) {
            const stage = stageData[i];
            if (currentTime > stage.startDate && currentTime < stage.endDate) {
                slug = stage.slug;
            }
        }

     

        body.data.stages.forEach(_stage => {
            if (_stage.slug === slug) {
                stage = _stage.name;
                _stage.weeks.forEach(_week => {
                    table = createTable([
                        align.center(chalk.hex('#fff').bold("Upcoming Matches"), 68),
                        align.center(chalk.hex('#fff').bold("Status"), 18),
                        align.center(chalk.hex('#fff').bold("Date"), 22)
                    ]);
                    _week.matches.forEach(_match => {
                        if (_match.competitors[0].id === teamId || _match.competitors[1].id === teamId) {
                            let home = _match.competitors[0];
                            let away = _match.competitors[1];
                            let { hex: homeColor } = owl_colors.getPrimaryColor(home.abbreviatedName);
                            let { hex: awayColor } = owl_colors.getPrimaryColor(away.abbreviatedName);

                            teamName = _match.competitors[0].id === teamId ? home.name : away.name;
                            teamAbbr =  _match.competitors[0].id === teamId ? home.abbreviatedName : away.abbreviatedName;
                            primaryColor = _match.competitors[0].id === teamId ? owl_colors.getPrimaryColor(home.abbreviatedName).hex : owl_colors.getPrimaryColor(away.abbreviatedName).hex;
                            secondaryColor = _match.competitors[0].id === teamId ? owl_colors.getSecondaryColor(home.abbreviatedName).hex : owl_colors.getSecondaryColor(away.abbreviatedName).hex;
                            table.push({
                                [getMatch(
                                    chalk.bgHex(homeColor).whiteBright.bold(" " + home.name + " "),
                                    chalk.bgHex(awayColor).whiteBright.bold(" " + away.name + " "),
                                    _match.scores[0].value,
                                    _match.scores[1].value,
                                    _match.scores[0].value > _match.scores[1].value ? 1 : 0
                                )]: [
                                        align.center(chalk.hex("#fff")(_match.status), 18),
                                        align.center(chalk.hex("#fff")(new Date(_match.startDate).toLocaleString("en-US", options)), 22)
                                    ]
                            });
                        }
                    });
                })
                spinner.stop();

                if (table.length) {
                    cfonts.say(`${teamAbbr} Schedule`, {
                        font: 'block',
                        align: 'left',
                        colors: [primaryColor, secondaryColor],
                        background: 'transparent',
                        letterSpacing: 1,
                        lineHeight: 1,
                        space: true,
                        maxLength: '0',
                    });
                }
                table.length ? console.log(`${chalk.gray(table.toString())}\n`) : console.log(`\n  There are no upcoming matches for ${chalk.green(teamName)}.\n`);
            }
        })
    }
}

