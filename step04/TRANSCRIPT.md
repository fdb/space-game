# Step 4 - Firing lasers

This will be a big step in our game. After this video, our player will be able to fire lasers.

Just like with the player, we will create new lasers (which are just images) using document.createElement and append them to the game container. We will also append them to a new list in our GAME_STATE, holding the positions of all the lasers on screen.

We fire a laser when the player presses the spacebar. Because the player is the one firing the laser, we'll add this code to the "updatePlayer" function.

After the clamp function, we check if the spacebar key is down. If it is, we create a new laser, using the "createLaser" function.

That function takes in the $container and the position of the laser. The laser is created at the current position of the player.

"createLaser" is similar to "createPlayer". First, we create an img element using document.createElement. We then set its properties. The image source is set to laser-blue-1.png (you can choose a different image if you like). We set the className to "laser" so we can style them in CSS. Remember that we define the negative margin here to move the laser to the center. We then append the laser to the container.

We also need to create our abstract representation of the laser that we'll store in our GAME_STATE. That state consists of the X and Y positions, as well as the DOM element for the laser. That way, we can easily loop through all the lasers and update their positions. Finally we set the position of the laser using the setPosition function we wrote before.

We also want to play a sound effect when the laser is fired. The browser has a convenient Audio element that we can create and call "play" on. We first create a new Audio object, initialized with the URL of the sound effect. We then call "play" to play the sound.

Let's try it out!

Okay, so not quite the effect we're hoping for. The lasers get created, but they are never moved, so they stick around at the position of the player. Clearly, we have to modify our update function to also move the lasers.

## Updating the position of the lasers

In our "update" function we will call updateLasers after we call updatePlayer. We give it the same arguments.

The updateLasers function loops through the laser objects stored in GAME_STATE. Note that these are not the DOM elements. Instead, they *contain* the DOM elements. We'll update our abstract objects first. Our Y value in the browser goes from the top to the bottom, so to move our lasers up, we need to subtract a value from the Y position. That is going to be the LASER_MAX_SPEED multiplied by our delta time. We create this LASER_MAX_SPEED and set it to 300.

We then call setPosition on the DOM element of the laser (so laser.$element) to update its position on screen.

Now if we try out the code, the lasers move, but why do we have so many? It's because we create new lasers every time we call update (so about 60 times per second).

## Laser cooldown

We need to have some kind of firing rate. I've called this the "cooldown" value, imagining that the laser has to cool down before it can fire again.

We will store the playerCooldown value in the GAME_STATE. We will also set the LASER_COOLDOWN constant to 0.5, which means half a second between fires. How does this work? Well, let's look at the code. Whenever we're about the fire, we check if the cooldown is set to zero. Only if it is equal or smaller than zero can we fire our laser. We then fire the laser and set the cooldown to our LASER_COOLDOWN value. Then, after our condition, we check if our playerCooldown is bigger than zero. If it is, we subtract the delta time. By subtracting a time value in seconds, we ensure that our LASER_COOLDOWN value is also in seconds.

Now if we try it out, it works! Our laser doesn't fire constantly anymore, but every half second. We can play around with this value to make the laser fire slower or faster.

There is one issue with this code, which is that our laser elements remain in the document, even when they disappear offscreen. Looking at this in the development tools, we see that our lasers are still updated to smaller and smaller values, but they are never deleted.

## Destroying the lasers

Once the laser elements are offscreen, they've served their purpose. We don't need to have them in our DOM anymore. We'll check if the y position drops below zero. If it is, the laser will no longer be visible and we can safely remove it.

What we want to do is to remove this element from the DOM, and also remove the element from the "lasers" array in the GAME_STATE. But because we are currently looping through this array, it is tricky to remove it as we're going through the list. Instead, we'll mark the laser as being "dead", and clean up after our loop is done.

In our updateLaser, after we update the Y value, we check if the Y value is now smaller than zero. If it is, we call destroyLaser with our container element and the laser object.

In destroyLaser, we're removing the DOM element from our container using $container.removeChild. We pass in the DOM element laser.$element. That removes it from the DOM. We then mark the item as "dead" by setting the "isDead" flag to true. Note that this flag wasn't available before: we just added it to our object, which is totally fine in JavaScript. We could also create a default "isActive" flag when creating a laser and set it to true, and mark it as false when the laser is offscreen. Both approaches will work.

We've removed the laser element from the DOM but we're still updating it, because it is in the lasers array in the GAME_STATE. To remove it, we filter the list. We use a JavaScript arrow function which checks if the element is not dead. If the flag is not available, it will be set to undefined, which JavaScript treats as "false". That allows us to get away with not setting the flag initially, and only when we need it.

That's it! We can verify that lasers get removed from the DOM once they leave the screen. We're just shooting in the air for now, so let's add some enemy space ships in the next video.
