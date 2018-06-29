# Step 1 - Creating and moving the player

We create a player object using [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement). We listen to the window's `keypress` event to move the player. This results in choppy (but working!) movement, that we will fix in the next step.
