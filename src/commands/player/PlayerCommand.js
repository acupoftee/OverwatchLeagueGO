const { playerCompare }  = require('./PlayerCompare');
const { playerInfo } = require('./PlayerInfo');
//https://stackoverflow.com/questions/30238654/commander-js-collect-multiple-options-always-include-default
module.exports = {
    async player(name, option) {
        if (option.compare) {
            let playerArray = name.split(',');
            playerCompare(playerArray);
        } else {
            playerInfo(name);
        }
    }
}