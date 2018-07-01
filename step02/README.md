# Step 2 - Correct key input

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step02/index.html)

The `keypress` resulted in choppy input, and we also couldn't use the arrow keys. We now use `keyup` and `keydown` events to just note which keys are pressed and released.

We introduce a main update loop that checks the state of the keys and reacts on them by moving the player. We also [clamp](https://en.wikipedia.org/wiki/Clamping_(graphics)) (constrain) the position of the player to the screen.
