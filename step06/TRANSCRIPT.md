# Step 6 - Creating the enemies

[show game with enemies][play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step06/index.html)

In this part we're going to add our enemies to the game. Adding enemies is similar to adding players and the lasers: we'll use createElement to add them to the DOM, and create an abstract version of each enemy and store the array in the GAME_STATE.

The main difference between the lasers and the enemies is their location. Enemies should be created in a grid. For that, we need to figure out the actual location of each enemy. There are a number of variables for this.

First up is the number of ships per row. Let's call this ENEMIES_PER_ROW. Let's imagine we have 10 enemies per row. How much space should each ship have? If we're calculating the positions of the ships, we actually want to calculate how much space we have inbetween the ships, so how much space we want to leave between the enemies. So if we have 10 enemies, we have 9 "inbetweens". So we use ENEMIES_PER_ROW - 1.

We want to spread our enemies out over game field. We already defined the width of our playing field as the GAME_WIDTH constant. But if we just use this value, our enemies would start at the very edge of the screen. Instead, we want to add some padding. We'll call this ENEMY_HORIZONTAL_PADDING. We have this padding on both sides, so the total usable space for placing the enemies is the GAME_WIDTH minus the horizontal padding, multiplied by two.

We now have the space the correct space to distribute our enemies. We're going to define the "enemy spacing" as the total width each enemy, including the inner space. So the final formula to calculate the enemy spacing is to divide the available space, defined as the GAME_WIDTH minus twice the ENEMY_HORIZONTAL_PADDING, divided by all the enemies minus one.

We now have all pieces to calculate the X position of each ship. Each ship has an index, starting at zero. We multiply this by the enemy spacing we calculated, and add the horizontal padding once. Let's show this in detail.

For the first ship, index 0, we multiply 0 with enemy spacing, resulting in zero. So we just use the horizontal padding.

For the next ship, index 1, we use the enemy spacing once + the horizontal padding. Here we see why we the enemy spacing is the total width each ship takes up. We do the same for the next ship, and so on.

Let's write the code for this. In our init function, we'll calculate the enemy spacing first using the formula we calculated. Then, we first make a loop over each row. We hard-code the number of rows to be 3, so three horizontal rows of ships. The vertical position of the ships is calculated based on a VERTICAL_PADDING value + the index of the row, multiplied by the vertical spacing, which is hard-coded. We don't want to fill the entire vertical space of the game with enemy ships, just the top of the screen, so we can use a hard-coded value here which we set to 80.

Then we set up our horizontal loop. We create ENEMIES_PER_ROW. We calculate our X position based on the formulation we just mentioned. Then we call the createEnemy function with our container and the X and Y values.

Our createEnemy function is very standard. We create an image element, set the source attribute, and also set the CSS class name. We then append the element to the container. We then create an abstract version of this element, with the X and Y values.

Let's try this out. We now have our enemies in a grid, nice! Of course they're just sitting there since we haven't told them to move. Just like we have a "updatePlayer" and "updateLasers" method, we create a "updateEnemies" function. We call this function in our update function, after we update the lasers. We pass in the delta time and the container. We need the container here because our enemies will periodically fire lasers, which need to get added to the game container as well.

We like our enemies to rotate a bit, to make them harder to shoot. To have the enemies rotate, we use a sine/cosine function. This rotates them around a circle, based on the current time. Note that we don't use delta time here, but the absolute game time, which will give a smooth moving animation. We experimented a bit with the movement values here.

We then loop through our enemies and calculate the X position as the enemy's X position + the delta X position. We do the same for the Y value. We then call setPosition to update the actual DOM element.

When we save and reload, our enemies now move in a circular pattern on screen. Great!

When we try to fire at them our lasers have no effect: whenever they hit an enemy, nothing happens. That's because we haven't implemented "hit testing" yet. We will do that in the next video.
