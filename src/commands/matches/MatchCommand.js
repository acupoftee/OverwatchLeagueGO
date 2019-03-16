const Table = require("cli-table3");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const ora = require('ora');
const cfonts = require('cfonts');
const stageData = require('../../utils/data/stages.json');
const { JsonUtil, OwlUtil, MapUtil } = require('../../utils');

const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };

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
    async matches() {
        const spinner = ora(
            'Loading this week\'s schedule...'
        ).start();

        const body = await JsonUtil.parse("https://api.overwatchleague.com/schedule?locale=en_US");
        let currentTime = new Date().getTime();
        let slug = null;
        let table = null;
        let stage = "";
        let mapStatus = "";
        for (let i = 0; i < stageData.length; i++) {
            const stage = stageData[i];
            if (currentTime > stage.startDate && currentTime < stage.endDate) {
                slug = stage.slug;
            }
        }

        const live = await JsonUtil.parse("https://api.overwatchleague.com/live-match?locale=en_US");
        if (Object.keys(live.data.liveMatch).length !== 0) {
            let match = live.data.liveMatch
            if (live.data.liveMatch.state === 'IN_PROGRSS') {
                for (let i = 0; i < match.games.length; i++) {
                    game = match.games[i].number;
                    currentMap = await MapUtil.getMap(match.games[i].attributes.mapGuid);
                    currentMapType = await MapUtil.getMapType(match.games[i].attributes.mapGuid);
                    break;
                }
                mapStatus = `Game ${game} of ${match.games.length} - Map: ${currentMap}`;
            }
        }

        body.data.stages.forEach(_stage => {
            if (_stage.slug === slug) {
                stage = _stage.name;
                _stage.weeks.forEach(_week => {
                    if (currentTime > _week.startDate && currentTime < _week.endDate) {
                        stage = `${_stage.name} ${_week.name}`;
                        table = createTable([
                            align.center(chalk.hex('#fff').bold(`${stage} Matches`), 68),
                            align.center(chalk.hex('#fff').bold("Status"), 25),
                            align.center(chalk.hex('#fff').bold("Date"), 18)
                        ]);
                        _week.matches.forEach(_match => {
                            let home = _match.competitors[0];
                            let away = _match.competitors[1];
                            let homeColor  = owl_colors.getPrimaryColor(home.abbreviatedName);
                            let awayColor = owl_colors.getPrimaryColor(away.abbreviatedName);
                            let status = _match.status;
                

                            let homeFont = OwlUtil.colorIsLight(homeColor.rgb[0], homeColor.rgb[1], homeColor.rgb[2]) ? '#000' : '#fff';
                            let awayFont = OwlUtil.colorIsLight(awayColor.rgb[0], awayColor.rgb[1], awayColor.rgb[2]) ? '#000' : '#fff';

                            if (status === "IN_PROGRESS") 
                                status = mapStatus;
                            
                            table.push({
                                [getMatch(
                                    chalk.bgHex(homeColor.hex).hex(homeFont).bold(" " + home.name + " "),
                                    chalk.bgHex(awayColor.hex).hex(awayFont).bold(" " + away.name + " "),
                                    _match.scores[0].value,
                                    _match.scores[1].value,
                                    _match.scores[0].value > _match.scores[1].value ? 1 : 0
                                )]: [
                                        align.center(chalk.hex("#fff")(status), 25),
                                        align.center(chalk.hex("#fff")(new Date(_match.startDate).toLocaleString("en-US", options)), 18)
                                    ]
                            });
                        });
                    }
                })
                spinner.stop();
                cfonts.say(stage, {
                    font: 'block',
                    align: 'left',
                    colors: ['#f80', '#840'],
                    background: 'transparent',
                    letterSpacing: 1,
                    lineHeight: 1,
                    space: true,
                    maxLength: '0',
                });
                table.length ? console.log(`${chalk.gray(table.toString())}\n`) : console.log("\n  There are no Overwatch League matches this week.\n");
            }
        })
    }
}

