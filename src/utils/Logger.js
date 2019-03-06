const chalk = require('chalk');
	
	/**
	 * @class Logger
	 * @description Utility class for console output
	 */
	class Logger {
        /**
         * Prints a message on the console in green
         * @param {string} message the message to display on the console
         */
	    static print(message) {
	        console.log(chalk.green(`${message}`));
	    }
    
        /**
         * Logs a warning string in yellow on the console
         * @param {string} message the message to display on the console
         */
	    static warn(message) {
	        console.log(chalk.yellow(`${message}`));
	    }
    
        /**
         * Logs an error string in red on the console
         * @param {string} message the message to display on the console
         */
	    static error(message) {
	        console.log(chalk.bold.red(`${message}`));
	    }
    
        /**
         * Returns a message in bold on the console
         * @param {string} message the message to display on the console
         * @returns {string} a bold message
         */
	    static bold(message) {
	        return chalk.bold(message);
	    }
	}
	module.exports = Logger; 