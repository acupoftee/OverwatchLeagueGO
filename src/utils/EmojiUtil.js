const emoji = require('node-emoji');
module.exports = {
    FLAG: function(countryCode) {
        if (countryCode) {
            return emoji.get(`flag_${countryCode}`);
        }
        return emoji.get('flag_white');
    },
    ROLE: function(role) {
        //🛡⚔️💉 
        switch(role) {
            case "offense":
                return emoji.get('crossed_swords');
            case "tank":
                return emoji.get('shield');
            case "support":
                return emoji.get('syringe');
            default:
                return emoji.get('gear');
        }
    }
}