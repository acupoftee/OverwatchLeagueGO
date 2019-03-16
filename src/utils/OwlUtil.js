//const divisions = require('./data/divisions.json');
//const teamNames = require('./data/teamnames.json');
const JsonUtil = require('./JsonUtil');
const divisions = [
    {
        "id": 79,
        "title": "Atlantic Division",
        "values": ["atlantic", "atl"],
        "abbrev": "ATL"
    },
    {
        "id": 80,
        "title": "Pacific Division",
        "values": ["pacific", "pac"],
        "abbrev": "PAC"
    }
];
const stageData = [
    {
      "slug": "stage1",
      "startDate": 1549872000000,
      "endDate": 1552892400000
    },
    {
      "slug": "stage2",
      "startDate": 1552892400000,
      "endDate": 1557126000000
    },
    {
      "slug": "stage3",
      "startDate": 1557126000000,
      "endDate": 1562569200000
    },
    {
      "slug": "stage4",
      "startDate": 1562569200000,
      "endDate": 1566802800000
    }
  ];
const teamNames = [{
    "id": 7698,
    "values": [
        "atl",
        "atlantareign",
        "reign",
        "atlanta",
        "atlreign"
    ]
},
{
    "id": 4402,
    "values": [
        "bos",
        "bostonuprising",
        "uprising",
        "boston"
    ]
},
{
    "id": 7692,
    "values": [
        "cdh",
        "chengduhunters",
        "hunters",
        "chengdu"
    ]
},
{
    "id": 4523,
    "values": [
        "dal",
        "dallasfuel",
        "fuel",
        "dallas"
    ]
},
{
    "id": 4407,
    "values": [
        "fla",
        "floridamayhem",
        "mayhem",
        "florida",
        "flmayhem"
    ]
},
{
    "id": 4406,
    "values": [
        "gla",
        "losangelesgladiators",
        "lagladiators",
        "gladiators"
    ]
},
{
    "id": 7699,
    "values": [
        "gzc",
        "guangzhoucharge",
        "charge",
        "guangzhou",
        "gzcharge"
    ]
},
{
    "id": 4525,
    "values": [
        "hou",
        "houstonoutlaws",
        "outlaws",
        "houston"
    ]
},
{
    "id": 7693,
    "values": [
        "hzs",
        "hangzhouspark",
        "spark",
        "hangzhou",
        "hzspark"
    ]
},
{
    "id": 4410,
    "values": [
        "ldn",
        "londonspitfire",
        "spitfire",
        "london"
    ]
},
{
    "id": 4403,
    "values": [
        "nye",
        "newyorkexcelsior",
        "excelsior",
        "newyork",
        "newyorkcity",
        "nyc",
        "ny",
        "nyxl",
        "nyexcelsior"
    ]
},
{
    "id": 7694,
    "values": [
        "par",
        "pariseternal",
        "eternal",
        "paris"
    ]
},
{
    "id": 4524,
    "values": [
        "phi",
        "phl",
        "philadelphiafusion",
        "fusion",
        "philadelphia",
        "phlfusion"
    ]
},
{
    "id": 4409,
    "values": [
        "seo",
        "seouldynasty",
        "dynasty",
        "seoul"
    ]
},
{
    "id": 4404,
    "values": [
        "sfs",
        "sanfranciscoshock",
        "shock",
        "sanfrancisco",
        "sanfran",
        "sanfranshock",
        "sfshock"
    ]
},
{
    "id": 4408,
    "values": [
        "shd",
        "shanghaidragons",
        "dragons",
        "shanghai"
    ]
},
{
    "id": 7695,
    "values": [
        "tor",
        "torontodefiant",
        "defiant",
        "toronto"
    ]
},
{
    "id": 4405,
    "values": [
        "val",
        "losangelesvaliant",
        "lavaliant",
        "valiant"
    ]
},
{
    "id": 7696,
    "values": [
        "van",
        "vancouvertitans",
        "titans",
        "vancouver"
    ]
},
{
    "id": 7697,
    "values": [
        "was",
        "washingtonjustice",
        "justice",
        "washington"
    ]
}
];
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
    * Capitalizes the first letter of each word in a sentence
    * @param {string} sentence 
    */
const capitalizeSentence = (sentence) => {
    let str = sentence.toLowerCase().split(" ");
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
    }
    return str.join(" ");
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
    colorIsLight,
    capitalizeSentence,
    stageData
}