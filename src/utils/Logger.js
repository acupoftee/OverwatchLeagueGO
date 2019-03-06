const chalk = require('chalk');
	
	/**
	 * @class Logger
	 * @description Utility class for console output
	 */
	class Logger {
	    static print(message) {
	        console.log(chalk.green(`${message}`));
	    }
	
	    static warn(message) {
	        console.log(chalk.yellow(`${message}`));
	    }
	
	    static error(message) {
	        console.log(chalk.bold.red(`${message}`));
	    }
	
	    static bold(message) {
	        return chalk.bold(message);
	    }
	}
	module.exports = Logger; 