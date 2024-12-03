# Typescript Multiclass


[![Iliad Badge][iliad-img]][iliad-url]
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

`typescript-multiclass`

## About

Multiple class inheritence like in Java. This is a re-write of 

## Installation

`$ npm install typescript-multiclass [--save]`

## Usage

```js
import classes from 'typescript-multiclass';

class Character {
  constructor(name) {
    this.canWalk = true;
    this.distance = 0;
    this.name = name;
  }

  walk(x) {
    return this.distance += x;
  }
}

class Jumper {
  constructor() {
    this.canJump = true;
    this.distance = 0;
  }

  jump(x) {
    return this.distance += x;
  }
}

class Diver {
  constructor() {
    this.canDive = true;
    this.deep = 0;
  }

  dive(x) {
    return this.deep += x;
  }
}

class SuperCharacter extends classes(Character, Jumper, Diver) {
}

const player = new SuperCharacter('player1');
console.log(player.name); // Prints out "player1"

if (player.canWalk) // Can walk and will walk 5
  player.walk(5);

if (player.canJump) // Can jump and will jump 1
  player.jump(1);

if (player.canDive) // Can dive and will dive 1
  player.dive(1);
```

### Argument pass-through

You can also define which arguments will be sent to subclass constructors
````js
class SuperCharacter extends classes([Character, null], [Jumper, 1, 2], [Diver, [3, null]]) {
  constructor(distanceMin, distanceMax, ...args) {
    super(distanceMin, distanceMax, ...args);
    this.name = 'player1';
  }
}
````
In the example above Character constructor will be no argument, 
Jumper constructor will be called with arguments at index 1 and 2 (distanceMin, distanceMax),
Diver constructor will be called with arguments at index from 3 to Last.

### Checking implementations

You can check if extended class and its instance has implemented any class.

````js
const classes = require('typescript-multiclass');
const Implemented = classes.Implemented; // Special symb ol

class SuperCharacter extends classes(Character, Jumper, Diver) {
}

if (SuperCharacter[Implemented](Jumper))
  console.log('Jumper implemented');

// You can also check using class names
if (SuperCharacter[Implemented]('Diver'))
  console.log('Diver implemented');
````



## Node Compatibility

  - node `>= 6.0`;
  
### License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/typescript-multiclass.svg
[npm-url]: https://npmjs.org/package/typescript-multiclass
[travis-image]: https://img.shields.io/travis/panates/typescript-multiclass/master.svg
[travis-url]: https://travis-ci.org/panates/typescript-multiclass
[coveralls-image]: https://img.shields.io/coveralls/panates/typescript-multiclass/master.svg
[coveralls-url]: https://coveralls.io/r/panates/typescript-multiclass
[downloads-image]: https://img.shields.io/npm/dm/typescript-multiclass.svg
[downloads-url]: https://npmjs.org/package/typescript-multiclass
[gitter-image]: https://badges.gitter.im/panates/typescript-multiclass.svg
[gitter-url]: https://gitter.im/panates/typescript-multiclass?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/typescript-multiclass/status.svg
[dependencies-url]:https://david-dm.org/panates/typescript-multiclass
[devdependencies-image]: https://david-dm.org/panates/typescript-multiclass/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/typescript-multiclass?type=dev
[quality-image]: http://npm.packagequality.com/shield/typescript-multiclass.png
[quality-url]: http://packagequality.com/#?package=typescript-multiclass
[iliad-img]: https://img.shields.io/badge/%E2%97%AD%20%20-Iliad.dev-00ace0?labelColor=04151f&cacheSeconds=https%3A%2F%2Filiad.dev%2F%3Ffrom%3Dgithub-badge
[iliad-url]: https://iliad.dev/?from=github-badge