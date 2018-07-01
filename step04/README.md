# Step 4 - Firing lasers

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step04/index.html)

This is a big step — we can now let our player fire lasers!

We create a new laser element using `document.createElement`, just like we did with the player element. We append it to a custom array called `lasers` so that we can update them later.

Every frame we go through our array and move each laser a certain position up (negative Y). The amount is related to the elapsed time (`dt`) and the maximum speed of the laser, in seconds (`LASER_MAX_SPEED`).

We can use the same `setPosition` function we used for the player. The player and laser objects have the same properties (they're both DOM elements), so JavaScript treats them the same.

We notice we can't fire every frame, but only after a certain amount of time has elapsed. This is what we call "cooldown". We set a value for the cooldown and subtract the elapsed time value from it every frame. Once it reaches zero, and the spacebar is pressed, we can fire again.

We also note that our lasers remain in the document, even when they disappear offscreen. We need to handle this in the next step.
