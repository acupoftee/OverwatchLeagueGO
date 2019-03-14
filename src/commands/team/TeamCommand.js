const { teamInfo }  = require('./TeamInfo');
const { teamSchedule } = require('./TeamSchedule');
const { teamMatches } = require('./TeamMatches');

module.exports = {
    async team(name, options) {
        if (options.schedule) {
            teamSchedule(name);
        } else if (options.matches) {
            teamMatches(name);
        } else {
            teamInfo(name);
        }
    }
}