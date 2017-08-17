[![Build Status](https://travis-ci.org/sszdh/angular-iran-national-id.svg?branch=master)](https://travis-ci.org/sszdh/angular-iran-national-id)

# Iranian National ID input directive

AngularJS 1.x directive that will validate an IRANIAN national ID and impose relevant character and structure limits.

## Live Demo

View a live demo [here](https://rawgit.com/sszdh/angular-iran-national-id/master/example/index.html)!

## Installation

```
npm install --save angular-iran-national-id
```

or 

```
bower install --save angular-iran-national-id
```

## Usage

Include `dist/angular-iran-national-id.js` or `dist/angular-iran-national-id.min.js` in your build or directly with a `<script>` tag and inject the module in your module definition:

```js
angular  
    .module('App', [  
        'angular-iran-national-id',
        ... // other dependencies  
    ]);
```

```html
<input type="text" ng-model="model" maxlength="10" minlength="10" islet-iran-national-id />
```

Failing one of the validation rules will cause the input to become invalid and gain the `ng-invalid-iran-national-id` class. Valid entries will have `ng-valid-iran-national-id` class.

## Features

#### Limits User Input

* Characters limited to numbers only
* Max & Min restrictions (to 10 digits), can be achieved by angular native directives: `ng-maxlenght` and `ng-minlenght`

#### Validates User Input

* Check-digit validation with [official algorithm](https://fa.wikipedia.org/wiki/%DA%A9%D8%A7%D8%B1%D8%AA_%D8%B4%D9%86%D8%A7%D8%B3%D8%A7%D8%A6%DB%8C_%D9%85%D9%84%DB%8C)
* Same digits entry restriction (e.x: The numbers such as `1111111111` and `6666666666` are not allowed!)

## Todos

* Format code in human-readable style (ex: xxx-xxxxxx-x)
