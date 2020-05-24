# Ludo

Ludo is a strategy board game for two to four players, in which the players race their four tokens from start to finish according to the rolls of a single die. Like other cross and circle games, Ludo is derived from the Indian game Pachisi, but simpler.
This game is aimed to be the offline version, network based multiplayer game is not yet supported.

# Inspiration

As the covid situation is progressing, I found the old Ludo game to be a good time killer, I started playing on a popular app and soon became convinced that luck was not with me in this game. Then I started seeing a pattern which made me believe that Die rolls are not so random and they are nudged carefully to drive the game very close. The sheer frustration of it pushed me to go forward with this project. I was on leave for a week and that's how I came up with a plan to make an offline implementation of the game in a week. So, apologies if the code isn't upto the standards :D.

# Demo

Here is a link to Heroku Deploy of the game - [Demo](http://ludo-classic.herokuapp.com/)
![alt tag](https://raw.githubusercontent.com/avirati/ludo/master/Ludo.jpg)

# How I went about developing this game

  - The game board consists of a couple of building blocks, namely BASES (4 Count), Walkways (4 Count) and a HOME. These can be arranged in order to build the visual representation needed. For example :
  [BASE1, WALKWAY_NORTH, BASE2],
  [WALKWAY_WEST, HOME, WALKWAY_EAST],
  [BASE3, WALKWAY_SOUTH, BASE4]
  - Each Walkway has 18 cells, either 6 x 3 or 3 x 6, depending on orientation
  - Each cell would have an ID
  - Cell can be of type - NORMAL, STAR, SPAWN and HOMEPATH
  - In dev build, there is a context menu that can be opened for each of the cell. This context menu was created and used to mark cells and to link them. This is how coins "know" which cell to go to next.
  - After generating the data needed for the game visuals, the data is put into a json file which the application fetches upon start. This data is supposed to come from BE, the application should work the same if this JSON was replaced by BE in future.
  - Each Coin, Base and Cell have properties with which Game rules have been implemented.
  - The Die uses MersenneTwister19937's seeded algorithm for rolls.
  - The game state is managed completely by Redux, so with redux-persist, it will be super easy to "save" the game (to IndexedDB or similar)
  - A Coin is declared HOMECOIN when it has completed 56 Steps (Total number of steps needed for a coin to "RETIRE")
  - More of the minute strategies in the code itself, happy browsing :)

### Tech

Ludo uses the following tech stack

* [React]
* [Redux]
* [Typescript]
* [Webpack]

### Installation

```sh
$ yarn dev
```

For production environments...

```sh
$ yarn build
```

### Todos

 - Add Animation to Die Roll
 - Mark Players winner as they finish the game
 - Write a BE and make it a Multiplayer Game !
 - Find some time to write tests

License
----

MIT


**Free Software, Hell Yeah!**
