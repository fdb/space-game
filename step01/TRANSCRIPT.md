# Step 1 - Creating and moving the player

Welcome. In this tutorial we're going to build a clone of the infamous Space Invaders game, together. Here's what it looks like: we can move around with the arrow keys and shoot lasers with the space bar.

Of course, because we made the game ourselves, we can tweak it any way we want. We can make the enemies stronger by making them fire faster, or we can increase our own firing rate, making the game much easier.

At every step of the way, I'll point you to the files on GitHub so you can follow along at home.

Let's jump in!

## Downloading the starter files

We'll start with some basic skeleton containing just the images and the sound.

The first thing we need to do is to get the starter files from GitHub. This is just a basic directory setup containing the image assets, CSS, and the sound files. In this tutorial we'll focus on the JavaScript code, but we'll quickly walk through the HTML and CSS together.

The files we'll start out from are on GitHub, in the step01 folder. Download the folder, either as a ZIP file or from the command line, as I'll do here. I'll clone the repo, copy the step01 folder and make a "work" folder that will contain my working copy.

Once we have downloaded everything we'll start by looking at our index.html. This contains the basic skeleton of our app.

The images and sounds come from Kenney.nl, a website that contains tons of free game assets. The site is awesome and you should definitely check it out. I've downloaded the "space shooter redux" assets and renamed them.

In the header is a link to the CSS stylesheet, and that's about it. Note that we load our JavaScript file at the very end of our document, which is a best practice. Loading JavaScript blocks the page, so putting this at the very end of the page allows us to load all other stuff (like the CSS and the background images) faster.

Our page contains a div with the class "wrap", which we just style in CSS to take up the whole page. The actual game is rendered in the div with the class "game", which is currently empty. All elements will be created from our JavaScript using the "document.createElement" function.

Let's dig into the CSS file. Each of the "things" on screen (sometimes called "entities" or "sprites" in games) will have a CSS class. We have one for the player, one for the enemy, one for our lasers and one for the enemy lasers.

Each of these elements is positioned absolutely, with the X and Y value in the middle of our image. This makes it easier to move our elements around. It is important to note that this is not how HTML normally works: normally elements are positioned from the top/left. So to move the "origin point" to the center, we need to perform a little trick. What we do is set the width of the element, then use a negative margin half of that. So if our player is 40px wide, the margin-left is set to -20px. This moves the center point to the middle of the sprite, making it easier to control.

One last cool trick is the moving background. You probably noticed that we're already flying through space even though we haven't written any JavaScript. This is a CSS animation. Our background consists of a repeating pattern of the same image. That image is 256x25x pixels. In CSS, we can set the background position to vertically shift this pattern. We do this in an animation, setting the position from 0 to 256 pixels. And because the pattern tiles, position 0 and position 256 are the same, so the animation repeats seamlessly.

Now let's start writing our code!

## Creating the player

The first thing we want to do is have our player on screen. Our player character is an image of a space ship that we move using CSS transforms.

There are two basic ways in CSS to move elements on the screen: using the "left" and "top" attributes, or using CSS transforms. I've tried both and CSS transforms turned out to be faster. That's because the browser can put these elements on separate layers and move them in hardware, instead of repainting the whole screen.

To begin, we're going to define the area of the game: it's width and height. We use a fixed value to make it easier for ourselves.

We're then going to write an init() function that initializes all entities in the game: our player and the enemies.

The first thing we do is to select the element we want to place our entities in. That's the div with class name "game", so we'll use document.querySelector to select the container. Note that I use a dollar sign in front of variables or constants that refer to DOM elements. This is just a convention, but it allows me to distinguish between "abstract" things, such as numbers, lists or strings, and "visual" things like elements in the DOM.

We then pass the game container to the createPlayer function, which we'll write in a moment. Because other elements will need the container, passing it around means we only have to select it once.

Our createPlayer function takes in the container. The first thing it does is figure out the position of the player. But wait, where do we want to store this position? I like to create a global variable, called GAME_STATE, that contains the entire state of the game: the positions of our player, all the enemies, and all lasers on screen. We could potentially retrieve the position of the player by reading its transform attribute. However, there are a number of attributes that are not stored in the DOM element, so storing everything in an abstract representation makes more sense. It also means that we can easily save and restore that state, in case we want to implement saving our game state.

The position of the player is in the middle of the screen, so the GAME_WIDTH divided by 2. Because the origin point, or center, of our player sprite is in the middle of the sprite, we don't have to subtract the width of the player here. Very convenient.

Then we create our player element. This happens in three stages: first we create the element using document.createElement. We specify the element we want to create (an image). Then, we set the attributes on the element, for example the image source and the class name. Then, we append the child to an existing element in the DOM. That's our container.

We also want to set the position of our element. This happens by setting the CSS transform attribute. Because we know that we will need the same functionality for our enemies and lasers, we will write a function called "setPosition" that takes in a DOM element and an X/Y position.

In this function, we use JavaScript template literals to write a string where parts of the string are variables. By using the special dollar sign - curly brackets syntax, we can let JavaScript know we want the value of our variable here.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

And that's it! We now have our space ship on screen. We can't move it yet, let's implement that immediately.

## Moving the player

We want to move our player using the arrow keys, and use the spacebar to shoot. In JavaScript, we can listen for key events using "key down", "key up" and "key press". The "keypress" event doesn't capture the arrow keys, so we'll use the key down event.

We'll listen to events on our whole document, and call the "onKeyDown" function which takes our event, which we call "e". This event has a whole number of properties. Let's log them to the console. The property we're interested in is the "keyCode" attribute. Let's log that, then press the keys we're interested in.

Pressing the left arrow key returns 37. The right arrow key has key code 39. And finally, the spacebar has key code 32. Since we don't want to hard-code these values, we'll write constants at the top of our program that give names to these "magic" values.

In our onKeyDown handler, we can write a condition that checks for the given key. This is not our final movement code, but for now, we'll just move a bit to the left when the left key is pressed, and a bit to the right when the right key is pressed.

We update our playerX value in our GAME_STATE global, then select the player DOM element and call setPosition to change the player image to the correct position.

And we're done! We can now move the player with the left and right keys. Note that the animation is quite choppy: that's because we rely on our keyboard repetition rate to call "onKeyDown" repeatedly. There is a much better way to do this, which we'll talk about in the next video.
