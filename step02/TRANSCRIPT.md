# Step 2 - Correct key input

In the previous video we learned how to place the player on screen using document.createElement, and move the ship around using the arrow keys. We noted that this resulted in choppy animation, because we rely on the keyboard repetition to call "keydown" repeatedly.

In this video we're going to listen to two events: "keydown" and "keyup". Instead of moving the player when we press the key, the onKeyDown handler will just set a boolean flag that indicates if the left arrow, right arrow or spacebar are pressed. onKeyUp does the same thing, noting which key was released and setting its state.

We then introduce a main update loop that checks the state of the keys and reacts on them by moving the player. We will also clamp, or constrain the position of the player to the screen.

Let's do this!

## The game update loop

We'll update our global GAME_STATE to remember which of our keys are pressed. We add three boolean flags: leftPressed, rightPressed, and spacePressed. These will be set to true in onKeyDown if the corresponding key is pressed, and set to false in onKeyUp if the key is released.

Let's update our onKeyDown function. We listen to our three keys, but the code is much simpler: we don't move anything, we just set the key state.

We write a similar onKeyUp function. Here we set the state to false. We then add a listener for "keyup" events at the bottom of our code.

If we run the code now, our space ship doesn't move when we press the keys. That's because we have forgotten a crucial part of our game: the main update loop. This is a piece of code that runs every frame. It's function is basically like a movie director: every frame it makes sure that all elements that need to move will actually move: things like the player, the enemies and all the individual laser beams. It also checks if the lasers hit the enemies or our player, and acts accordingly.

This function is called "update" traditionally. It will update all individual entities, in this case just our player. The function is called using "window.requestAnimationFrame", which is a special function provided by the browser specifically for the purposes of games or animation. The function is smart, and will only update the screen if the tab is visible, reducing power consumption if the tab is invisible. We need to call "window.requestAnimationFrame" initially, to kick off the animation. Then at the end of the update function we call "window.requestAnimationFrame" again.

Our "updatePlayer" function does about the same as our "keydown" function before. It checks which key has been pressed and moves the player. We do it in small pieces here, so that we avoid a subtle bug where we press the left AND right keys. In that case, we don't want the player to move at all.

There is a bigger issue here, which is that our player can easily move off-screen. Not ideal! To avoid this, we're going to constrain, or "clamp" the position of our player, to the edge of our screen. We're going to set a global variable first that indicates the width of our player. This is the same value as in our CSS document.

The clamp function takes in our value and a minimum and maximum value. There is a short, "clever" way to write it using ternary expressions and a more explicit way. I will use the more explicit approach here. We check if our input value is smaller than the minimum. If it is, we return the minimum. Then we check if our input value is larger than the maximum. Again, if it is, we return the maximum. If both of these conditions are not true, our value lies between the minimum and the maximum, and we just return it. We then use this function to set the playerX value.

There is one more issue, our player is just at the edge. So instead of clamping between 0 and GAME_WIDTH, we clamp between PLAYER_WIDTH and GAME_WIDTH - PLAYER_WIDTH. The actual correct value is to clamp between PLAYER_WIDTH divided by two, but I like that we have some margin there.

# Correct timing

We now have a smooth moving player spaceship, which is awesome. There is a subtle issue with this, and it has to do with the "requestAnimationFrame" function. This function will be called at most 60 times per second, but maybe less, depending on how fast the machine is where we're running this code. So since we always move the player 5 pixels per frame, the speed of the game depends on the speed of the computer we run it on. So instead of always moving 5 pixels, we will calculate the movement speed on the time that has elapsed since the previous frame, also called the delta time.

JavaScript internally stores the time as the number of milliseconds (so thousands of a second) from january 1st, 1970. This results in quite a big value. However, we're not interested in this absolute value. We only care about relative values, so one value in relation to another.

Here is an example in the console. By calling Date.now() we get this big number in milliseconds. Let's store it in a variable called t1. If we now do this again, and store it in t2, we have two numbers we can compare. If we subtract t2 from t1 the result is a number in the thousands, which is the desired result. This is our relative time.

We'll start by defining the maximum speed the player can move, in pixels per second. How fast should the player move? Let's try setting this to 100 first and seeing what happens.

Then in the GAME_STATE, we're going to record the "last time", so the absolute time of our previous frame. In our "update" function we will ask again for the current time, and subtract the current time from the last time we stored in GAME_STATE. We divide this by thousand to get the value in seconds. And store this in a variable called "dt", short for "delta time". If our game runs at 60 frames per second, each frame will be about 16 milliseconds. We then pass the delta time to our updatePlayer function.

Also, at the end of the function, we shouldn't forget to set the "last time" in our GAME_STATE to the current time. We compare to the time between two frames, not the time when the game has started.

Then all we have left to do is change the code in updatePlayer to move according to our PLAYER_MAX_SPEED. We multiply our dt (which is value in seconds) with our PLAYER_MAX_SPEED to get a value in pixels we want to move.

Let's try it out!

Okay, so 100 pixels per second is too slow. After some more trial and error, a value of 600 is enough. This means the player can traverse the screen (which is 800 pixels wide) in a little more than a second.

With these basics in place, we're well on our way to add more interactivity! In the next video, we'll make the player fire lasers.

