# Step 10 - Losing the game

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step10/index.html)

To lose the game we need to get hit by an enemy laser. In `updateEnemyLasers` we check for each laser if their bounding client rect hits with the player's bounding client rect. If they do, we call the `destroyPlayer` function.

In `destroyPlayer` we set `GAME_STATE.gameOver` to `true`. This allows us to stop the game in our `update` function; otherwise using the arrow keys would move a nonexistent player! We can "early out" our update function by using the `return` keyword. Note that this doesn't call `requestAnimationFrame`, so our game effectively stops updating here.

The "game over" screen is a simple `div` that we make visible in our `destroyPlayer` function. The button does something sneaky: it calls `window.location.reload`, which reloads the page for us, effectively resetting the game.

Also, we increase the enemy cooldown to make the game a bit easier :-)
