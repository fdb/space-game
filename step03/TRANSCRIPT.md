# Step 3 - Correct timing

In the previous video we learned how to move the player smoothly using "keydown" and "keyup" events. But since we always move the player 5 pixels per frame, the speed of the game depends on the speed of the computer we run it on. So instead of always moving 5 pixels, we will calculate the movement speed on the time that has elapsed since the previous frame, also called the delta time.

JavaScript internally stores the time as the number of milliseconds (so thousands of a second) from january 1st, 1970. This results in quite a big value. However, we're not interested in this absolute value. We only care about relative values, so one value in relation to another.

Here is an example in the console. By calling Date.now() we get this big number in milliseconds. Let's store it in a variable called t1. If we now do this again, and store it in t2, we have two numbers we can compare. If we subtract t2 from t1 the result is a number in the thousands, which is the desired result. This is our relative time.

We'll start by defining the maximum speed the player can move, in pixels per second. How fast should the player move? Let's try setting this to 100 first and seeing what happens.

Then in the GAME_STATE, we're going to record the "last time", so the absolute time of our previous frame. In our "update" function we will ask again for the current time, and subtract the current time from the last time we stored in GAME_STATE. We divide this by thousand to get the value in seconds. And store this in a variable called "dt", short for "delta time". If our game runs at 60 frames per second, each frame will be about 16 milliseconds. We then pass the delta time to our updatePlayer function.

Also, at the end of the function, we shouldn't forget to set the "last time" in our GAME_STATE to the current time. We compare to the time between two frames, not the time when the game has started.

Then all we have left to do is change the code in updatePlayer to move according to our PLAYER_MAX_SPEED. We multiply our dt (which is value in seconds) with our PLAYER_MAX_SPEED to get a value in pixels we want to move.

Let's try it out!

Okay, so 100 pixels per second is too slow. After some more trial and error, a value of 600 is enough. This means the player can traverse the screen (which is 800 pixels wide) in a little more than a second.

With these basics in place, we're well on our way to add more interactivity! In the next video, we'll make the player fire lasers.
