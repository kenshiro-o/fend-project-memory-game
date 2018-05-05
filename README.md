# Gundam Memory Game Project

This repository contains the source code for the memory game 
project of Udacity's front-end Nanodegree. Since we have 
complete freedom over the implementation of the game, I
decided to make it a _Gundam_ version. 

## What is Gundam?

[Gundam](https://en.wikipedia.org/wiki/Gundam) is a very popular _mech_ anime and manga saga 
originating from Japan. All Gundam series take place in a 
hypothetical future where a part of mankind has adapted to 
life in space in _colonies_, while the remainder still live on 
Earth. In this world, there are tensions between the Earth 
Federation and the colonies' inhabitants, leading to full 
scale wars. Gundams are a special kind of _mobile suit_ robot 
piloted by the heroes in the hope of giving advantage to one 
one side and ending the war.

The Gundams on this card game are all from [_Gundam 00_](https://en.wikipedia.org/wiki/Mobile_Suit_Gundam_00), one of 
the most recent Gundam series to date.

## Project Structure

```
├── CONTRIBUTING.md
├── README.md
├── css
│   └── styles.css
├── img
│   ├── arios_front_small.jpg
│   ├── cherudim_front_small.jpg
│   ├── double00_raiser_front_small.jpg
│   ├── dynames_front_small.jpg
│   ├── exia_front_small.jpg
│   ├── geometry2.png
│   ├── gundam_00_background_large_2.png
│   ├── gundam_00_background_medium.jpeg
│   ├── gundam_00_background_medium_2.png
│   ├── gundam_00_head.jpg
│   ├── gundam_00_head_small.jpg
│   ├── kyrios_front_small.jpg
│   ├── seravee_front_small.jpg
│   └── virtue_front_small.jpg
├── index.html
└── js
    ├── app.js
    └── fontawesome-all.js
```

This game consists of a web application that is dynamically 
modified via a cascading stylesheet and a javascript file. 
The `index.html` contains all static HTML markup. This 
represents what the user sees. One notable fact is that the 
actual deck is not statically defined in the HTML but rather
`dynamically` created from the javascript file.

The `styles.css` file contains
all css rules. Some important notes about how the styles are 
laid out:
* styles by default are for mobile devices with a width smaller than 550px
* the media queries at the bottom of the stylesheet file have rules to make the game experience enjoyable on bigger screens
* the `@keyframes` animation rules are also present in this file

### Javascript

The `app.js` file contains all the logic for the game. I decided to use a single file 
and not split the functionality into multiple files as the code base is still manageable within a single file.

#### Entrypoint

The first point to note is that the script's entrypoint - the `startGame()` function - 
creates the deck and sets important global variables. The shuffling algorithm is quite
straightforward and we then sequentially assign a Gundam _value_ to each shuffled card. There is no need to further randomize the assignments at this stage since the deck has 
already been shuffled.

#### Game Mechanics

At the start of the game, all cards are playable and we register click event handlers on
all 16 cards. Upon clicking on a card, the classes `flipped_card` and `current-card` 
are added to the clicked card. Moreover, the Gundam value of the card is also added as 
a class (e.g. `kyrios` is added to the classList). The classes trigger the application 
of different styles:
* the `flipped-card` class triggers the card flipping animation
* each Gundam value class (e.g. `dynames`, `exia`, etc.) trigger the application of a specific background image

After every second flip, the 2 currently flipped cards are compared to assess whether
their underlying values are equal, via a simple equality check:

```
if (deckCard1.value !== deckCard2.value) { 
...
}
```

If they turn out not to be equal, then the cards are flipped back. Before flipping them 
back though, we temporararily apply the `error-card` class which triggers an animation 
to show that the cards are not equal. Each card class list is then reverted to only 
`card` and `playable` classes, as they were originally.

If the cards hold the same value, then we apply the `success-card` class which also 
triggers a css animation to show that we have successfully paired the cards. After this 
step we check the game state to figure out whether we have 16 `success-card` elements. 
If this is the case then it means that all cards have been successfully paired and the 
game has been completed. We create a white mask that is absolutely positioned and covers
the whole screen and then display congratulatory text to the player. At the bottom of 
the message the player has the option to play again. Clicking on this buttom will trigger a reset of the deck.

## Reflections

This was a fun project which enabled me to apply some of my recent knowledge on how to
use media queries to handle multiple screen sizes, how to navigate the DOM as well as 
modify it, and how to lay put everything together into a simple single page application.

I also had to do further research to better understand how to create css animation, how 
to create masks on backgrounds and images as well as the different options to add event 
listeners to elements. The images were obatained from [Gundam Wikia](http://gundam.wikia.com/wiki/The_Gundam_Wiki) and are free to use.

One aspect I would like to improve in the future is to be able to fire custom events 
that perform different functions, as I currently call the functions rightaway in my 
click event handlers. In my opinion, my current approach introduces too much coupling 
and it is harder to test modularly. I would also like to improve my styling skills as I
think this game's UI could be much better!


## Contributing

You are free to contribute to this repository, by forking and creating pull requests 
with the upstream branch.

## Licence

Copyright 2018 Eddie Forson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
