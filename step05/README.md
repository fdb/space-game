# Step 5 - Removing lasers

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step05/index.html)

Our lasers remain in the document, even when they disappear offscreen. We now use [`removeChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) to remove an element offscreen.

Note that we have both the **abstract** state of the game in our `GAME_STATE`, and the **visual state** in the DOM. We need to keep them in sync. Our `destroyLaser` function sets the `isDead` state to `true`, indicating the laser should be removed. We then use [`Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to remove the "dead" lasers from the list.

This is our first foray into [functional programming](http://eloquentjavascript.net/05_higher_order.html). Instead of writing our own `for` loop to remove elements, we can let JavaScript do the bulk of the work. We just provide our small function that says whether an element should be removed or not. Here we use an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

So instead of writing this:

```js
let newLasers = [];
for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    if (!laser.isDead) {
        newLasers.push(laser);
    }
}
lasers = newLasers;
```

We can write this:

```
lasers = lasers.filter(l => !l.isDead);
```

The arrow function is just a short form for this:

```js
// The "l" parameter is our laser
function isNotDead(l) {
    return !l.isDead;
}
```
