const divisions = require('../data/divisions.json');
const teamNames = require('../data/teamnames.json');
const JsonUtil = require('./JsonUtil');

/**
 * Convert a division from ID to name or vice-versa.
 * @param {String|number} division Name or ID of the divison.
 * @returns {String|number} a team's division information
 */
const getDivision = (division, abbreviated = false) => {
    for (let i = 0; i < divisions.length; i++) {
        const div = divisions[i];
        if (typeof division === 'string') {
            if (div.values.includes(division)) {
                return div.id;
            }
        } else if (typeof division === 'number') {
            let long = div.values[0];
            if (division == div.id) {
                if (abbreviated) {
                    return div.abbrev;
                }
                return long.charAt(0).toUpperCase() + long.slice(1);
            }
        }
    }
}
/**
 * Finds a Competitor ID by name
 * @param {string} val the competitor's name
 * @returns the Competitor's ID
 */
const locateTeam = (val) => {
    const key = val.toLowerCase();
    for (let i = 0; i < teamNames.length; i++) {
        const competitor = teamNames[i];
        const id = competitor.id;

        // return id if keys are equal
        if (key == id) {
            return id;
        }

        // return id if names are equal
        for (let j = 0; j < competitor.values.length; j++) {
            const value = competitor.values[j];
            if (key == value) {
                return id;
            }
        }
    }
}
/**
 * Finds a Player ID by name
 * @param {string} val the player's name
 * @returns {number} the Player's ID
 */
const locatePlayer = async (val) => {
    const key = val.toLowerCase();
    let id = 0;
    const body = await JsonUtil.parse('https://api.overwatchleague.com/players');
    body.content.forEach(player => {
        if (player.name.toLowerCase() === key) {
            id = player.id;
        }
    });
    return id;
}

/** Capitalizes the first letter in a message
* @param {string} message 
* @returns {string} a string with a capitalized letter
*/
const capitalize = (message) => {
   return message.charAt(0).toUpperCase() + message.slice(1);
}

/**
 * Determines the contrast of a color. See https://www.w3.org/TR/AERT/#color-contrast
 * @param {number} r red value
 * @param {number} g green value 
 * @param {number} b blue value
 * @returns {boolean} true if the luminance is below 0.5 (lighter)
 */
const colorIsLight = function (r, g, b) {
    // Counting the perceptive luminance
    // human eye favors green color... 
    let a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return (a < 0.5);
}
module.exports = {
    getDivision,
    locateTeam,
    locatePlayer,
    capitalize,
    colorIsLight
}