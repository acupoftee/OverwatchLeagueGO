const JsonUtil = require('./JsonUtil');
const OwlUtil = require('./OwlUtil');

/**
     * Finds the name of a map by ID
     * @param {string} guid the Map GUID
     */
    const getMap = async (guid) =>{
        const body = await JsonUtil.parse("https://api.overwatchleague.com/maps");
        return new Promise((resolve, reject) => {
            body.forEach(element => {
                if (element.guid == guid) {
                    resolve(OwlUtil.capitalizeSentence(element.name.en_US));
                }
            });
            reject(null);
        });
    }

    /**
     * Finds the type of map by ID
     * @param {string} guid the Map GUID
     */
    const getMapType = async (guid) => {
        const body = await JsonUtil.parse("https://api.overwatchleague.com/maps");
        return new Promise((resolve, reject) => {
            body.forEach(element => {
                if (element.guid == guid) {
                    resolve(OwlUtil.capitalize(element.type));
                }
            });
            reject(null);
        });
    }


    /**
     * Finds the map's current state
     * @param {string} guid the map GUID
     */
    const getLiveMapState = async (guid) => {
        const body = await JsonUtil.parse("https://api.overwatchleague.com/live-match");
        return new Promise((resolve, reject) => {
            body.data.liveMatch.games.forEach(element => {
                if (element.attributes.mapGuid == guid) {
                    resolve(element.state);
                }
            });
            reject(null);
        });
    }

module.exports = {
    getMap,
    getMapType,
    getLiveMapState
}