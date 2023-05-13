# Web Mini Games Collection

A website playground that collect classic web mini games🤖

## Technical Stack

- Next.js (Page Directory)
- TypeScript
- styled-components

## How to run it locally ?

Please use Node.js version at least above v16.

```shell
$ yarn install | npm install
```

Then run

```shell
$ yarn run dev | npm run dev
```

You should be able to see the Minesweeper game UI at localhost:3000/games/mine-sweeper.(No homepage for now)

## Access it online

Online link: https://web-mini-games-collection.vercel.app/games/mine-sweeper

## Supported Games

Currently, this application only supports a single game, Minesweeper.(Don't be disappointed, stay tuned for more games 😂)

### Minesweeper

![](https://i.imgur.com/ceX2BIT.png)

#### Rules

- Clicking a mine ends the game.
- Clicking a square with an adjacent mine clears that square and shows the number of mines touching it.
- Clicking a square with no adjacent mine clears that square and clicks all adjacent squares.
- The first click will never be a mine, it will clear the map and place numbers on the grid.
- The numbers reflect the number of mines touching a square.
- Right clicking on a square puts a flag on it. The flagged square can’t be opened by a click.
- If the number in a square is equal to the number of squares touching that square that are flagged, double clicking on the number opens up all remaining squares around the number.

#### Future Roadmap

- [ ] Testing
- [ ] Support Mobile Devices (Touch Events)
- [ ] Addressing the issue where certain emojis may not display correctly on different operating systems.

## Contribution

If you'd like to contribute to this project, please refer to https://gitmoji.dev/ and use specific emojis to write commit messages for certain scenarios.
