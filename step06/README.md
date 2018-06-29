# Step 6 - creating the enemies

We create a grid of enemies. The amount of enemies per row is fixed, so we calculate the spacing between the enemies as such:

```
const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
```

We divide the space of the GAME_WIDTH (minus the padding on both sides) evenly over all enemies. Because we want to calculate the spacing *between* the enemies, we take the amount of enemies - 1.

Just like we have a `updatePlayer` and `updateLasers` method, we create a `updateEnemies` function.

To have the enemies rotate, we use a sine/cosine function. This rotates them around a circle, based on the current time.
