# Step 9 - Random cooldown

[Play this version](https://rawgit.com/HackYourFutureBelgium/JavaScript2/master/Projects/space-game/step09/index.html)

This is not very much code but we need to explain our custom `rand` function. It returns a random value between `min` and `max`.

Internally it uses [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random). That function only returns values between 0.0-1.0.

Here's the code for our custom random function:

```
function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}
```

First it sets the default values for the function if we don't provide them. So if we use it just as `rand()`, it will use a minimum value of 0 and a maximum value of 1.

The core line is the third line of our function, `return min + Math.random() * (max - min);`. This does a couple of things:

- It calculates the *range* of the random values. So for example if min = 25 and max = 100, our range of possible values is 75 (100 - 25).
- It uses `Math.random()` to generate a value between 0 and 1.
- We multiply this random value with the range. Since the max is 1, the maximum we can have is the range (75 in our example).
- We then add the minimum value again to *shift* the value up. So by adding 25 to our value between 0-75, it results in a random value between 25 and 100, which is what we want.

