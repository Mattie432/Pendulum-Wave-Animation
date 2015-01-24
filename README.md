# Pendulum-Wave-Animation

Available for testing here __[LINK](https://mattie432.github.io/Pendulum-Wave-Animation/)__


This animation uses the HTML canvas object and JavaScript to animate a series of circles which are in phase with one another. The details behind the timings of the individual circles are [here](http://www.arborsci.com/cool/pendulum-wave-seems-like-magic-but-its-physics) but the basics are that one circle, c1, takes c0 + 1 time to return to the center.

To use this animation import loading.js as a script and place a div with class `loading_image` in the position that you want the animation to be placed. The script will append a `canvas` child with the animation in it. The canvas will fill the parent div. The parent div must not have padding (as the size of the canvas will then be larger than the div and ignore the padding).

```html
<body>
  <form style="margin-top:20px; margin-bottom:20px;">
    .....some code here....
  </form>

  <!-- This div has no padding -->
  <div class="loading_image" style="height:250px; width:100%;"></div>

  <div style="margin-top:20px; margin-bottom:20px;">
    ....some more code here...
  </div>

</body>

```
