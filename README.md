# SCSSS-Material-Shadows
SCSS Library to implement Material Design Shadows
Can be used through either SCSS mixins or CSS classes

Credit goes to the Angular Material 2 team, [Scott Hyndman](https://github.com/shyndman) and to the Material Design team.
While reading the [Angular Material 2 design docs on elevation](https://docs.google.com/document/d/1W3NGSLqDZzjbBBLW2C6y_6NUxtvdZAVaJvg58LY3Q0E/preview#) I found reference to Scott Hyndman working with the Material Design team to create a [Material Shadow Interpolator](http://codepen.io/shyndman/pen/ojxmdY).  This starts out with hand-crafted CSS box-shadows at 6 of the 24 defined Material Design elevations.  From there the rest of the 24 elevations are interpolated using the next closest lower and higher defined shadows.  In the case where there is no higher shadow, the highest two shadows are used and the result is extrapolated.

All I have done is replaced Scott's Javascript logic with SCSS functions, and added a few helper functions to make it easier to include in other projects.

## Demo
[Demo](http://codepen.io/prestopasto/pen/oLmgqm?editors=1100) on CodePen.  This is my SCSS rewrite of the [Material Shadow Interpolator](http://codepen.io/shyndman/pen/ojxmdY).

## SCSS Mixins
Primary use is through a mixin called mdElevation()

mdElevation accepts 3 parameters, $elevation1, $elevation2, and a $state property to change from one to the other.

mdElevation($elevation1, $elevation2, $state);

$elevation2 and $state are optional, but must be used together

### Examples of use:

#### Custom Elements
##### Static Elements
Specify the elevation of the element

The mdElevation($elevation) mixin takes an elevation from 0dp to 24dp
```SCSS
.my-panel {
  @include mdElevation(2);
}
```

##### Elements That Change Elevation
* Long form

You can use selectors to change the elevation of an element.

When an element changes elevation use the mdElevationTransition($deltaElevation) mixin to animate the change.  Pass in the change in elevation and mdElevationTransition($deltaElevation) will change the animation duration.  Smaller changes are quicker than longer changes.
```SCSS
.my-card {
  @include mdElevation(2);
  @include mdElevationTransition(6);
  &:hover {
    @include mdElevation(8);
  }
}
```

* Short form

The below code will product the same output as the code above.  I have tested 'hover' and 'active' states to trigger a change.  If there is a use case I didn't account for please contact me.
```SCSS
.my-card {
  @include mdElevation(2, 8, 'hover');
}
```

#### Predefined Material Elements
The library contains predifined elevation values for all the Material elements found [here](https://material.google.com/material-design/elevation-shadows.html).

```SCSS
$materialElements: (
  dialog: (24),
  picker: (24),
  nav-drawer: (16),
  right-drawer: 16,
  bottom-sheet: 16,
  fab: 6 12 active,
  sub-menu-3: 11,
  sub-menu-2: 10,
  sub-menu-1: 9,
  menu: 8,
  bottom-nav-bar: 8,
  card: 2 8 hover,
  raised-button: 2 8 active,
  snackbar: 6,
  app-bar: 4,
  refresh-indicator: 3,
  quick-entry: 2 3 active,
  search-bar: 2 3 active,
  switch: 1
);
```

To use one of these predefined elements use the mdElementElevation mixin:
```SCSS
.my-card {
  @include mdElementElevation('card');  // Includes :hover state and elevation change from 2dp to 8dp
}
```

```SCSS
.dialog {
  @include mdElementElevation('dialog');  // Is a static 24dp high
}
```


## CSS
Along with the SCSS mixins, the SCSS file will generate static CSS classes that can be used in your HTML markup.  Currently there is no CSS file provided for download.

### CSS Elevation
Like the mdElevation mixin above you have the choice of specifying a elevation value or an element

Elevation values follow the form:

md-elevation-z#, with # from 0 to 24
```HTML
<div class="card md-elevation-z2">
</div>
```
```HTML
<div class="dialog md-elevation-z24">
</div>
```

The above $materialElements list is also available in CSS classes
```HTML
<div class="menu md-elevation-menu">
</div>
```
```HTML
<div class="fab md-elevation-fab">
</div>
```
md-elevation-transition is available to apply a transition to the box-shadow property.  Please note however that it is currently fixed at a 280ms duration and that to use this you will need some way of applying a different md-elevation-* class on the element to trigger a change.