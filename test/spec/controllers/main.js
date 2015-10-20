'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('guessTheRuleGameApp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    describe('Function: check', function() {
        var rowsLen;
        beforeEach(function() {
            rowsLen = MainCtrl.rows.length;
        });

        it('obeys the rule if the values are ascending', function() {
            var one = '1';
            var two = '2';
            var three = '3';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(true);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

        it('disobeys the rule if the values are descending', function() {
            var one = '3';
            var two = '2';
            var three = '1';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(false);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

        it('disobeys the rule if the values are zeroes', function() {
            var one = '0';
            var two = '0';
            var three = '0';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(false);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

        it('disobeys the rule if the values are -1, -2, -3', function() {
            var one = '-1';
            var two = '-2';
            var three = '-3';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(false);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

        it('obeys the rule if the values are -3, -2, -1', function() {
            var one = '-3';
            var two = '-2';
            var three = '-1';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(true);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

        it('should disobey the rule after obeying', function() {
            var one = '4';
            var two = '8';
            var three = '16';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(true);

            one = '3';
            two = '2';
            three = '1';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(false);

            expect(MainCtrl.rows.length).toBe(rowsLen + 2);
        });

        it('should obey the rule after disobeying', function() {
            var one = '3';
            var two = '2';
            var three = '1';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(false);

            one = '4';
            two = '8';
            three = '16';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.rows[MainCtrl.rows.length - 1].correct).toBe(true);

            expect(MainCtrl.rows.length).toBe(rowsLen + 2);
        });

        it('flags the player as having guessed wrongly at least once if disobeyed', function() {
            var one = '3';
            var two = '2';
            var three = '1';
            MainCtrl.check(one, two, three);
            expect(MainCtrl.everWrong).toBe(true);
            expect(MainCtrl.rows.length).toBe(rowsLen + 1);
        });

    });

});
