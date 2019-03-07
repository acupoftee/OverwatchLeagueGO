	//#!/usr/bin/env node 
	//   'use strict';
  // const program = require('commander');
	// const didYouMean = require('didyoumean');
	// const isAsyncSupported = require('is-async-supported');
	
	// const pkg = require('../package.json');
	
  //   const { Logger } = require('../src/utils');
	
	// if (!isAsyncSupported()) {
	//   require('async-to-gen/register');
	// }
	
	// program.version(pkg.version);
	
	// program.command('owl-go <command>').action(command => {
	//   console.log(command);
	// });
	
	// program.command('*').action(command => {
	//   Logger.error(`unknown command: ${Logger.bold(command)}`);
	//   const commandNames = program.commands
	//     .map(c => c._name)
	//     .filter(name => name !== '*');
	
	//   const closeMatch = didYouMean(command, commandNames);
	//   if (closeMatch) {
	//     Logger.error(`did you mean ${Logger.bold(command)}?`);
	//   }
	//   process.exit(1);
	// });
	
	// program.parse(process.argv);
	require('../src/cli');