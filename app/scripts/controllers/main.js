(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name guessTheRuleGameApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the guessTheRuleGameApp
     */
    angular.module('guessTheRuleGameApp')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl() {
        // view variables -----
        var vm = this;

        // has the user ever guessed a wrong answer
        vm.everWrong = false;

        // initial values for our 3 numbers
        vm.init_one = 2;
        vm.init_two = 4;
        vm.init_three = 8;

        // set focus on the first input when true
        vm.focusMe = true;

        // show form for user to answer
        vm.showOptions = 'no';

        // toggles alert's visibility and customizes the message
        vm.showAlert = false;
        vm.alertMsg = '';

        // initial values of our answer options
        vm.options = {
            multiplesOfTwo: 0,
            ascending: 0,
            descending: 0,
            even: 0,
            odd: 0
        };

        // history of guesses
        vm.rows = [];

        // view function declarations
        vm.check = check;
        vm.reset = reset;
        vm.check_timesTwo = check_timesTwo;
        vm.check_asc = check_asc;
        vm.check_desc = check_desc;
        vm.check_even = check_even;
        vm.check_odd = check_odd;
        vm.hideOptions = hideOptions;
        vm.answer = answer;

        // function implementations -----

        // clears the inputs
        function clearValues() {
            vm.one = vm.two = vm.three = '';
        }

        // sets the alert message and displaying it
        function showMsg(msg) {
            vm.alertMsg = msg;
            vm.showAlert = true;
        }

        // view function implementations -----

        // guess the rule
        function answer() {
            // the answer
            var model_answer = {
                multiplesOfTwo: 0,
                ascending: 1,
                descending: 0,
                even: 0,
                odd: 0
            };

            // empty answer
            var empty = {
                multiplesOfTwo: 0,
                ascending: 0,
                descending: 0,
                even: 0,
                odd: 0
            };

            if (angular.equals(vm.options, empty)) {
                showMsg('You didn\'t select anything.');
                return false;
            }

            if (angular.equals(vm.options, model_answer)) {
                showMsg('Congratulations you\'ve answered correctly! Click on Reset Game to play again.');
            } else {
                if (vm.everWrong) {
                    showMsg('Uh oh! You answered wrongly. Feel free to answer again.');
                } else {
                    showMsg('Uh oh! You answered wrongly. Perhaps you should\'ve guessed a few more times before answering. Feel free to answer again.');
                }
            }
        }

        // hides form for user to continue guessing
        function hideOptions() {
            vm.focusMe = true;
        }

        // checks various combinations of answers to make sure the user
        // doesn't select odd and even numbers at the same time which isn't
        // possible -----
        function check_timesTwo() {
            if (vm.options.multiplesOfTwo) {
                // multiplesOfTwo has been checked
                if (vm.options.odd) {
                    vm.options.multiplesOfTwo = 0;
                    showMsg('Multiples of two means the numbers can\'t be all odd');
                }
            }

        }

        function check_asc() {
            if (vm.options.ascending) {
                // ascending has been checked
                if (vm.options.descending) {
                    vm.options.ascending = 0;
                    showMsg('The numbers can\'t be ascending and descending at the same time');
                }
            }
        }

        function check_desc() {
            if (vm.options.descending) {
                // descending has been checked
                if (vm.options.ascending) {
                    vm.options.descending = 0;
                    showMsg('The numbers can\'t be ascending and descending at the same time');
                }
            }
        }

        function check_even() {
            if (vm.options.even) {
                // even has been checked
                if (vm.options.odd) {
                    vm.options.even = 0;
                    showMsg('The numbers can\'t be all odd and even at the same time');
                }
            }
        }

        function check_odd() {
            if (vm.options.odd) {
                // odd has been checked
                if (vm.options.even) {
                    vm.options.odd = 0;
                    showMsg('The numbers can\'t be all odd and even at the same time');
                }
                if (vm.options.multiplesOfTwo) {
                    vm.options.odd = 0;
                    showMsg('Multiples of two means the numbers can\'t be all odd');
                }
            }
        }

        // resets the game
        function reset() {
            vm.rows = [];
            clearValues();
            vm.focusMe = true;
            vm.options = {
                multiplesOfTwo: 0,
                ascending: 0,
                descending: 0,
                even: 0,
                odd: 0
            };
            vm.showOptions = 'no';
            vm.showAlert = false;
            vm.alertMsg = '';
        }

        // checks the guess and inserts the answer into the history
        function check(one, two, three) {
            var correct;

            if (parseInt(one) < parseInt(two) && parseInt(two) < parseInt(three)) {
                correct = true;
            } else {
                correct = false;
                vm.everWrong = true;
            }

            vm.rows.push({
                one: one,
                two: two,
                three: three,
                correct: correct
            });

            clearValues();
            vm.focusMe = true;
        }
    }

})();
