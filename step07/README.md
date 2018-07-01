# Step 7 - Hit detection

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step07/index.html)

In our `updateLasers` function we add code to check if the laser hits an enemy. We use [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to find the position of the laser and the enemy on screen, and we check if they intersect.

For this we write a double loop:

- For every laser,
  - Get the bounding client rect of the laser.
  - For every enemy,
    - Get the bounding client rect of the enemy.
    - Check if the two rectangles intersect.
    - If they do, destroy both the enemy **and** the laser.
    - Break out of the loop (since the laser can't hit another enemy).

Just like with the lasers, we use a `Array.filter` to remove the destroyed enemies.

The `rectsIntersect` function checks if two rectangles overlap eachother anywhere. Both rectangle objects have `left`, `right`, `top`, and `bottom` parameters. We check if they do overlap, then take the negative:

```js
function rectsIntersect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}
```

This way the game is not very challenging since the enemies don't fire back. Let's fix that!
