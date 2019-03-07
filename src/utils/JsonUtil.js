'use strict';

const request = require('request');
const Logger = require('./Logger');

/**
 * @class JsonUtil
 * @description Utility class for parsing JSON
 */
class JsonUtil {
    
    /**
     * Parses a JSON requiest
     * @param {string} uri 
     * @param {string} headers 
     */
    static async parse(uri, headers=null) {
        return new Promise(function (resolve, reject) {
            request({
                url: uri,
                json: true,
                headers
            }, function(error, response, body) {
                if (error || response.statusCode !== 200)
                    Logger.error(error);
                resolve(body);
            });
        });
    }
}
module.exports = JsonUtil;