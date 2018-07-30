# Enemy Lasers
In the last video we created our grid of enemies. However, the game is currently not much of a challenge since they just move in space without firing. In this video we'll make the ships fire lasers at random intervals. This will be similar to how the player's lasers are created.

## Creating lasers

To get started we'll let our enemies create lasers. We'll do this in the updateEnemies function. We'll begin with defining a cooldown value, set to 2 seconds. So enemies will fire lasers every 2 seconds. We'll also add an array in the GAME_STATE to store all the enemy lasers.

In our update function we want to check when each enemy;s laser has cooled down enough to fire. In createEnemy we'll add a "cooldown" property to each newly created player, which we set to our ENEMY_COOLDOWN constant. Now we're rady to change updateEnemies. In the loop, after setting the position of each ship, we'll subtract the delta time from the cooldown property. If it's smaller than zero we can fire. We'll call a new function "createEnemyLaser" with our container and the X and Y position of the enemy ship. This is very similar to how we created the players' lasers.

This function performs a number of steps which should look familiar by now. First we create an image element. We set the src and className attributes. Then we append the child to the container. Finally we create an abstract version of this laser so we can track its position. Let's see if this runs.

Just like we expected, the lasers get created but they don't move. Moving the laser happens by calling updateEnemyLasers in the update function. In this function we'll loop through all lasers and increase their Y position. We'll also perform a check to see if the laser is offscreen.
