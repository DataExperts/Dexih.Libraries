# ngx-d-components

ngx-d-components are a set of Angular (8+) Boostrap 4.x based components.  These include form controls, modals, toasts, widgets and more.

[![][dex-img]][dex]

[dex-img]: https://dataexpertsgroup.com/img/dex_web_logo.png
[dex]: https://dataexpertsgroup.com

[![npm version](https://badge.fury.io/js/ngx-d-components.svg)](https://www.npmjs.com/package/ngx-d-components)
[![Build Status](https://travis-ci.org/DataExperts/ngx-d-components.svg?branch=master)](https://travis-ci.org/DataExperts/ngx-d-components)

## Features

* Decorated form controls including input, dropdown, tag input/dropdown, checkbox, textarea, etc.
* Auto expanding button controls.
* Animated Progress
* Dialogs for information, confirmation, input.
* Animated toasts.
* Customizable Widgets (based on the Bootstrap cards.).

## Releases Summary

[Older release information](releases.md)

## Installation

To install this library, run:

```bash
$ npm install ngx-d-components --save
```

There is also dependency on ngx-md (for markdown formatting) library.  To install this run:

```bash
$ npm install ngx-md --save
```

You will need also need bootstrap styles included (4.x).  For example add this to your index.html header:

```xml
<!-- index.html -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
```

> Note: jQuery, popper and the bootstrap.js files (which are usually required for Bootstrap 4.x) are not required for these controls to function.

## Example

> This documentation is still being complete.

## Form Controls

### Input

### Input Tags

### TextArea

### Dropdown (select)

### Dropdown tags

### Checkbox

### Date

### Time

### Days Of Week

## Buttons 

### Regular Button

### Dropdown Button

### Split/Dropdown Button

### Collapsible Button

## Modal / Dialogs

## Animated Progress 

## Animated Toasts

## Widgets / Cards

### Widget Controls

### Widget Columns

### Widget Deck

### Widget Vertical


## Credits

Thanks to the following projects:

* [https://getbootstrap.com/docs/4.5/getting-started/introduction/](Bootstrap) - Obviously the Bootstrap team.
* [jvandemo/generator-angular2-library](https://github.com/jvandemo/generator-angular2-library) - Used as the baseline to package and distribute this library.
* [ngx-md](https://github.com/dimpu/ngx-md) - Used for rendering markdown text.

## License

MIT © [Data Experts Group](mailto:gholland@dataexpertsgroup.com)
