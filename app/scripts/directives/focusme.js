(function() {
    'use strict';

    /**
     * @ngdoc directive
     * @name guessTheRuleGameApp.directive:focusMe
     * @description
     * # focusMe
     */
    angular.module('guessTheRuleGameApp')
        .directive('focusMe', focusMe);

    focusMe.$inject = ['$timeout', '$parse'];

    function focusMe($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
                    if (value === true) {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });

                element.bind('blur', function() {
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    }

})();
