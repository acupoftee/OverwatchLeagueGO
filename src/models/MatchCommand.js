const Table = require("cli-table3");
const fetch = require("node-fetch");
const align = require("wide-align");
const chalk = require("chalk");
const owl_colors = require('owl-colors');
const stageData = require('../data/stages.json');

const options = { weekday: "short", hour: "2-digit", minute: "2-digit" };

const getMatch = (team_1, team_2, result_1, result_2, result) =>
    `${align.right(`${result ? chalk.hex("#f99e1a")("⋆") : " "} ${
        team_1}`, 27)} ${chalk.hex(result ? "#fff" : "#c4c4c4").bold(" " + result_1 + " ")}  ${
    chalk.hex("#efefef")("vs")}  ${
    chalk.hex(result ? "#c4c4c4" : "#fff").bold(" " + result_2 + " ")} ${
    align.left(`${team_2} ${!result ? chalk.hex("#f99e1a")("⋆") : " "}`, 27)}`;

const createTable = headers => {
    return new Table({
        head: headers, style: { "padding-left": 0, "padding-right": 0, head: [], border: [] }
    });
};

module.exports = {
    matches() {
        let table = createTable([
            align.center(chalk.hex('#fff').bold("MATCHES"), 68),
            align.center(chalk.hex('#fff').bold("STATUS"), 18),
            align.center(chalk.hex('#fff').bold("DATE"), 18)
        ]);

        fetch("https://api.overwatchleague.com/schedule?locale=en_US")
            .then(res => res.json())
            .then(json => {
                // let dates = [];
                // for (let i = 0; i < 7; i++) 
                //     dates.push(new Date());

                // const monday = dates[0].getDate() - (dates[0].getDay() === 0 ? 7 : dates[0].getDay() - 1);
                // const days = [];
                // for (let i = 0; i < 7; i++) 
                //     days.push(new Date(dates[i].setDate(monday + i)).toISOString().substring(0, 10));

                let currentTime = new Date().getTime();
                let slug = null;
                for (let i = 0; i < stageData.length; i++) {
                    const stage = stageData[i];
                    if (currentTime > stage.startDate && currentTime < stage.endDate) {
                        slug = stage.slug;
                    }
                }

                json.data.stages.forEach(_stage => {
                    if (_stage.slug === slug) {
                        _stage.weeks.forEach(_week => {
                            if (currentTime > _week.startDate && currentTime < _week.endDate) {
                                _week.matches.forEach(_match => {
                                    let home = _match.competitors[0];
                                    let away = _match.competitors[1];
                                    let { hex: homeColor } = owl_colors.getPrimaryColor(home.abbreviatedName);
                                    let { hex: awayColor } = owl_colors.getPrimaryColor(away.abbreviatedName);

                                    table.push({
                                        [getMatch(
                                            chalk.bgHex(homeColor).whiteBright.bold(" " + home.name + " "),
                                            chalk.bgHex(awayColor).whiteBright.bold(" " + away.name + " "),
                                            _match.scores[0].value,
                                            _match.scores[1].value,
                                            _match.scores[0].value > _match.scores[1].value ? 1 : 0
                                        )]: [
                                                align.center(chalk.hex("#fff")(_match.status), 18),
                                                align.center(chalk.hex("#fff")(new Date(_match.startDate).toLocaleString("en-US", options)), 18)
                                            ]
                                    });
                                });
                            }
                        });
                        table.length ? console.log(`\n${table.toString()}\n`) : console.log("\n  There are no Overwatch League matches this week.\n");
                    }
                })
            });
        }
    }

