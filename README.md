<img src="https://acupoftee.github.io/images/owlshort.png">

[![Build Status](https://travis-ci.com/acupoftee/OverwatchLeagueGO.svg?branch=master)](https://travis-ci.com/acupoftee/OverwatchLeagueGO) ![npm](https://img.shields.io/npm/v/owl-go.svg)
# Overwatch League GO
> Enjoy Overwatch League right from your desktop!

Follow Overwatch League matches, teams, and players right on your console. Best CLI tool for Overwatch League fans and Engineers!

## Install

To use OWL Go, Be sure to have Node v6.0.0 or higher. Then in your command prompt 
```
$ npm install -g owl-go
```
## Usage
`owl-go` has the following commands:
1. `teams` or `ts`
2. `team` or `t`
3. `player` or `p`
4. `schedule` or `s`
5. `standings` or `st`
   
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
| `IN_PROGRESS`      |<img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/in%20progress.png">            | Shows **live game map status and score**!          |
| `CONCLUDED`     | <img src="https://raw.githubusercontent.com/acupoftee/acupoftee.github.io/master/images/owlgo/concluded.png">             | Shows the final scoreboard of a match.                                                                                                          |

### Standings
See this weeks Overwatch League standings here! 

```
$ owl-go standings
```

<!-- <img src ="https://acupoftee.github.io/images/owlgo/stand.png" height="500"> -->
<img src="https://thumbs.gfycat.com/InfantileHarmfulCrane-small.gif">

## Related Repos:
- [OverwatchLeagueColors](https://github.com/acupoftee/OverwatchLeagueColors)