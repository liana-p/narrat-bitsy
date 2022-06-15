# Narrat bitsy plugin

This plugin interfaces the [narrat](https://github.com/liana-pigeot/narrat) game engine with the [bitsy](https://bitsy.org/) game engine

## How it works

The plugin adds the `show_bitsy` and `hide_bitsy` narrat script functions to interface with bitsy.

There is an example `index.html` in the [demo/public folder](https://github.com/liana-pigeot/narrat-bitsy/tree/main/demo) which contains a placeholder narrat game using the plugin. This file uses the standard bitsy setup but also adds a **custom bitsy hack** which adds a new instruction to bitsy: `narrat`.

Syntax: `(narrat "narratLabel")`

The custom bitsy `narrat` tag allows bitsy dialogue to trigger a narrat label. For example (as seen in the [demo](https://github.com/liana-pigeot/narrat-bitsy/tree/main/demo)):

```
DLG 0
"""
Hello World.
Jumping to narrat label "bitsyTest":
(narrat "bitsyTest")
"""
NAME cat dialog
```

## Enabling the plugin

Import and register the plugin before calling `startApp` in your game's `index.ts` (see `src/index.ts` in the [demo](https://github.com/liana-pigeot/narrat-bitsy/tree/main/demo) for an example):

```typescript
import { registerPlugin, startApp } from 'narrat';
import { BitsyPlugin } from './index'; // imports the bitsy plugin

window.addEventListener('load', () => {
  registerPlugin(new BitsyPlugin()); // Enables the bitsy plugin
  startApp(
    {
      charactersPath: 'data/characters.json',
      configPath: 'data/config.json',
    },
    {
      logging: false,
      debug: true,
    },
  );
});
```

## Setting up with your own narrat game

Bitsy generally exports a single `index.html` file as its output. In this file there is:

- An HTML skeleton
- Some script tags with the engine
- A script type containing the game's data

To make a narrat game work with Bitsy, the best way is to take the `index.html` file in the [demo](https://github.com/liana-pigeot/narrat-bitsy/tree/main/demo) and simply replace the bitsy game data as desired. Bitsy hacks can also be added to the HTML file.

To set up an existing narrat game to work with Bitsy or if starting from scratch:

1. Copy paste the necessary bitsy script tags in the `<head>` tag of the `index.html` file of the game. Those script tags can be found in the bitsy game download html file, or copy pasted from the example index.html provided in this repo.
2. Add the narrat bitsy hack to the `index.html` file (this hack can be found in the [demo](https://github.com/liana-pigeot/narrat-bitsy/tree/main/demo) `index.html` in this repo. It is the last script tag in the file, after the font.
3. Add the script tag with the bitsy game data for the desired bitsy game that should run. The game data is the only part of the `index.html` code that needs to be modified when updating the bitsy game.

## Using in narrat

Simply use `show_bitsy` or `hide_bitsy` in your game script:

```
main:
  "Hello world"
  show_bitsy
```

## Running and deploying

- [node.js](https://nodejs.org/en/download/) (16 and above should work)

### Running the demo

Install dependencies:

`npm install`

Running:

`npm start`

### Building the plugin

`npm run build`

### Deployment

Update the plugin's version (the command will also build):

`npm version [major | minor | patch]`

Releasing on npm (can only be done by npm package owner):

`npm publish`
