# angular-calc

An OSX-like calculator plugin for AngularJS.

<img src="http://7sbqda.com1.z0.glb.clouddn.com/Screen%20Shot%202015-11-20%20at%2016.33.23.png"
		 alt="alt nodejs_infobox_screenshot"
		 width="250"
		 height="350">

## Use

```html
<!doctype html>
<html ng-app="Calc">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="index.min.css">
  </head>
  <body>
    <div ng-controller="RootCtrl">
      <div ez-calc="data"></div>
    </div>
    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="../src/calc.js"></script>
    <script>
    angular.module('Calc', ['ez.calc'])
    .controller('RootCtrl', ['$scope', function($scope) {
    }]);
    </script>
  </body>
</html>
```

## Build

```
npm install
bower install
gulp
```

## Demo
