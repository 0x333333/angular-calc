angular.module('ez.calc', [])

.directive('ezCalc', [function() {

  'use strict';

  return {
    restrict: 'EA',
    scope: {
      data: '=ezCalc'
    },
    templateUrl: '../src/calc.html',
    link: function($scope, element, attrs) {
      $scope.data = {
        result: 0,
        func: ' '
      };

      var keyMap = ['0','1','2','3','4','5','6','7','8','9',
                    '.','÷','x','-','+','=','C','+/-','%'];

      /**
       * States for calculation
       * 0: start
       * 1: typing
       * 2: finished
       * 3: error
       */
      var state = 0;

      var checkState = function() {
        if (state === 2 || state === 3) {
          $scope.data.result = 0;
          $scope.data.func = ' ';
          state = 0;
          $scope.$digest();
        }
      };

      $scope.press = function(key) {
        console.log('Pressed:', key);

        checkState();

        if (key === 16) {
          $scope.data.func = ' ';
          $scope.data.result = 0;
        } else if (key === 17) {
          $scope.data.result = -1 * $scope.data.result;
          $scope.data.func = $scope.data.result;
        } else if (key === 18) {
          if ($scope.data.result === 0) {
            $scope.data.result = evaluate($scope.data.func) / 100;
          } else {
            $scope.data.result /= 100;
          }
          $scope.data.func += (keyMap[key] + keyMap[15]);
        } else if (key === 15) {
          $scope.data.result = evaluate($scope.data.func);
          $scope.data.func += (keyMap[key]);
          state = 2;
        } else {
          $scope.data.func += (keyMap[key]);
        }

      };

      var evaluate = function(expr) {
        try {
          return eval(expr);
        } catch (e) {
          state = 3;
          alert(e);
          checkState();
        }
      };
    }
  };


}]);
