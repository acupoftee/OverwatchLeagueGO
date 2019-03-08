const emoji = require('node-emoji');
module.exports = {
    /**
     * Returns a country code emoji
     * @param {string} countryCode 
     */
    FLAG: function(countryCode) {
        if (countryCode) {
            return emoji.get(`flag-${countryCode.toLowerCase()}`);
        }
        return emoji.get('flag-white');
    },
    /**
     * Returns a role emoji
     * @param {string} role 
     */
    ROLE: function(role) {
        //🛡⚔️💉 
        switch(role) {
            case "offense":
                return emoji.get('crossed_swords');
            case "tank":
                return emoji.get('shield');
            case "support":
                return emoji.get('thermometer');
            default:
                return emoji.get('gear');
        }
    }
}