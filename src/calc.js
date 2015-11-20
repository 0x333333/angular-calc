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
          // $scope.$digest();
        }
      };

      $scope.press = function(key) {
        console.log('Pressed:', key);

        if (key >= 0 && key <= 9) {
          checkState();
        } else if (key >= 11 && key <= 14 && state === 2) {
          $scope.data.func = $scope.data.result;
          state = 1;
        }

        if (key === 16) {
          $scope.data.func = ' ';
          $scope.data.result = 0;
          state = 0;
        } else if (key === 17) {
          if (state === 0) return;
          $scope.data.result = -1 * evaluate($scope.data.func);
          $scope.data.func = $scope.data.result;
        } else if (key === 18) {
          if ($scope.data.result === 0) {
            $scope.data.result = evaluate($scope.data.func) / 100;
          } else {
            $scope.data.result /= 100;
          }
          $scope.data.func = $scope.data.result * 100 + keyMap[key] + keyMap[15];
          state = 2;
        } else if (key === 15) {
          if ($scope.data.func.indexOf('=') === $scope.data.func.length - 1) {
            $scope.data.func = $scope.data.func.replace('=', '');
          }
          $scope.data.result = evaluate($scope.data.func);
          $scope.data.func += (keyMap[key]);
          state = 2;
        } else {
          $scope.data.func += (keyMap[key]);
          state = 1;
        }

      };

      var evaluate = function(expr) {
        try {
          var input = (expr + '').replace('x', '*').replace('÷', '/').replace('=', '').trim();
          return eval(input);
        } catch (e) {
          state = 3;
          alert(e);
          checkState();
          $scope.$digest();
        }
      };
    }
  };


}]);
