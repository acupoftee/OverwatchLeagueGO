const TeamKeys = [
    { key: 'id', value: 'id' },
    { key: 'name', value: 'name' },
    { key: 'abbr', value: 'abbreviatedName' },
    { key: 'division', value: 'divisionId' },
    { key: 'location', value: 'location' },
    { key: 'primaryColor', value: 'colors.primary.color' },
    { key: 'secondaryColor', value: 'colors.secondary.color' },
    { key: 'tertiaryColor', value: 'colors.tertiary.color' },
    { key: 'placement', value: 'placement' },
    { key: 'website', value: 'website' }
];

const divisions = require('../data/divisions.json');
const teamNames = require('../data/teamnames.json');

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
module.exports = {
    getDivision,
    locateTeam
}