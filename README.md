<img src="https://acupoftee.github.io/images/owlshort.png">

[![Build Status](https://travis-ci.com/acupoftee/OverwatchLeagueGO.svg?branch=master)](https://travis-ci.com/acupoftee/OverwatchLeagueGO) ![npm](https://img.shields.io/npm/v/owl-go.svg) ![node](https://img.shields.io/node/v/owl-go.svg)
# Overwatch League GO
> Enjoy Overwatch League right from your desktop!

Follow Overwatch League matches, teams, and players right on your console. Best CLI tool for Overwatch League fans and Engineers!

All Overwatch League data is from the [Overwatch League API](https://api.overwatchleague.com).

NOTE: The Overwatch League API is not officially maintained by Blizzard. 

## Installation

To use OWL Go, Be sure to have Node v6.0.0 or higher. Then type the following in your command prompt: 
```
$ npm install -g owl-go
```
You can also install this inside a Docker container:
```
$ docker build -t owl-go:latest .
$ docker run -it owl-go:latest
```

The container will display the schedule for the current week by default, but you can use a different command anytime. For example:
```
$ docker run -it owl-go:latest owl-go player geguri
```
## Usage
`owl-go` has the following commands:
1. [`schedule` or `s`](#Schedule)
2. [`teams` or `ts`](#Teams)
3. [`team` or `t`](#Team)
4. [`player` or `p`](#Player)
5. [`standings` or `st`](#Standings)

### Schedule
See this weeks Overwatch League schedule here! Follow score updates and match progress from the current week for your favorite teams!
```
$ owl-go schedule
```

<!-- <img src ="https://acupoftee.github.io/images/owlgo/schedule.png"> -->
<img src="https://thumbs.gfycat.com/SlimySpectacularCatbird-small.gif">

Depending on the status of the game you chose, a different result will be shown. There are three kinds of statuses that may be displayed.

| Status              | Example                                                                                                                                                                 | Description                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PENDING` | <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/pending.png">             | Shows **when the game starts**.  |
| `IN_PROGRESS`      |<img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/progress.png">            | Shows **live game map status and score**!          |
| `CONCLUDED`     | <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/concluded.png">             | Shows the final scoreboard of a match.                                                                                                          |
   
### Teams
See all the teams competing in the Overwatch League this season!

```
$ owl-go teams
```

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/teams.png" height="700"> -->
<img src="https://thumbs.gfycat.com/FeistyDirtyGermanwirehairedpointer-small.gif">

### Team
Follow your favorite Overwatch League Teams!

#### Options
##### `-i` or `--info`
Look up your favorite teams and see their league standing, league records, and team roster.

```
$ owl-go team bostonuprising -i
```
***NOTE***: *Don't add spaces between team names!*

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/team.png" height="500"> -->
<img src="https://thumbs.gfycat.com/VariableConsciousBurro-small.gif">

##### `-m` or `--matches`
Look up your teams match history for the season.

```
$ owl-go team bostonuprising -m
```

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/team_matches.png"> -->
<img src="https://thumbs.gfycat.com/WellgroomedFocusedAplomadofalcon-small.gif">

##### `-s` or `--schedule`
Look up your teams schedule for upcoming matches.

```
$ owl-go team bostonuprising -s
```

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/team_schedule.png"> -->
<img src="https://thumbs.gfycat.com/ImprobableThisLark-small.gif">

### Player
Follow your favorite Overwatch League Player!

#### Options
##### `-i` or `--info`
Look up your favorite player and see their league stats;

```
$ owl-go player dafran -i
```

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/player.png"> -->
<img src="https://thumbs.gfycat.com/EnchantedWindyAardwolf-small.gif">


##### `-c` or `--compate`
Compare the stats of two Overwatch League players.

```
$ owl-go player dafran,geguri -c
```
***NOTE***: *Don't add spaces between player names!*

<!-- <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/player_compare.png"> -->
<img src="https://thumbs.gfycat.com/KnobbyExcitableKentrosaurus-small.gif">

### Standings
See this weeks Overwatch League standings here! 

```
$ owl-go standings
```

<!-- <img src ="https://acupoftee.github.io/images/owlgo/stand.png" height="500"> -->
<img src="https://thumbs.gfycat.com/InfantileHarmfulCrane-small.gif">

## Inspiration:
[NBA Go](https://github.com/xxhomey19/nba-go)
