# Step 11 - Winning the game

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step11/index.html)

We win the game when there are no enemies left. We encode this "win state" in a function:

```
function playerHasWon() {
  return GAME_STATE.enemies.length === 0;
}
```

Every frame, we check this function. If it returns true, we do the same as in our game over condition: we show the appropriate dialog and return, thereby "quitting" the game.

We could be more efficient and only check this function if we destroy an enemy, but that's left as an exercise for the reader :-)

That's it, you've created a very basic version of Space Invaders! Give yourself a pat on the back, you deserve it!
