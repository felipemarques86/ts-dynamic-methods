"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceMethodsBy = exports.Lock = exports.ConditionalReplaceMethodsBy = exports.Span = exports.Inject = exports.ConditionalReplaceMethodsOn = exports.Recast = void 0;
function successorImpl(subject, successor, condition, expectedValue) {
    var subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
    subjectPropertyNames
        .filter(function (propName) { return propName !== 'constructor' && subject.prototype[propName] !== condition; })
        .forEach(function (propName) {
        var succFunc = successor.prototype[propName];
        if (succFunc) {
            if (condition) {
                var old_1 = subject.prototype[propName];
                subject.prototype[propName] = function () {
                    if (condition.call(this) === expectedValue) {
                        return succFunc.call(this);
                    }
                    else {
                        return old_1.call(this);
                    }
                };
            }
        }
    });
}
function lockImpl(lock, subject) {
    if (lock) {
        var subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
        subjectPropertyNames
            .filter(function (propName) { return propName !== 'constructor'; })
            .forEach(function (propName) {
            subject.prototype[propName] = function () {
                throw 'Class locked';
            };
        });
    }
}
function shadowImpl(subject, fn) {
    var subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
    subjectPropertyNames
        .filter(function (propName) { return propName !== 'constructor'; })
        .forEach(function (propName) {
        subject.prototype[propName] = fn;
    });
}
function recastImpl(subject, successor) {
    var successorPropertyNames = Object.getOwnPropertyNames(successor.prototype);
    successorPropertyNames
        .filter(function (propName) { return propName !== 'constructor'; })
        .forEach(function (propName) {
        var fn = subject.prototype[propName];
        if (!fn) {
            successor.prototype[propName] = function () { return undefined; };
        }
    });
}
/**
 * This annotation applies to a class.
 * The successor class will have all uncommon methods with the subject class replaced with a dummy function that returns
 * undefined
 * @param subject
 * @constructor
 */
function Recast(subject) {
    return function (successor) {
        recastImpl(subject, successor);
    };
}
exports.Recast = Recast;
/**
 * This annotation applies to a class.
 * The subject class methods will in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param subject
 * @param condition
 * @param expectedValue
 * @constructor
 */
function ConditionalReplaceMethodsOn(subject, condition, expectedValue) {
    return function (successor) {
        successorImpl(subject, successor, condition, expectedValue);
    };
}
exports.ConditionalReplaceMethodsOn = ConditionalReplaceMethodsOn;
/**
 * This annotation applies to a class.
 * The target class will have the methods in common with the successors replace with their implementation
 * @param successors
 * @constructor
 */
function Inject() {
    var successors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        successors[_i] = arguments[_i];
    }
    return function (subject) {
        successors.forEach(function (successor) { return successorImpl(subject, successor, function () { return true; }, true); });
    };
}
exports.Inject = Inject;
/**
 * The target class will have replace the implementation of all methods in common with successors with its own implementation
 * @param subjects
 * @constructor
 */
function Span() {
    var subjects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        subjects[_i] = arguments[_i];
    }
    return function (successor) {
        subjects.forEach(function (subject) { return successorImpl(subject, successor, function () { return true; }, true); });
    };
}
exports.Span = Span;
/**
 * This annotation applies to a class.
 * The subject class methods in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param successor
 * @param condition
 * @param expectedValue
 * @constructor
 */
function ConditionalReplaceMethodsBy(successor, condition, expectedValue) {
    return function (subject) {
        successorImpl(subject, successor, condition, expectedValue);
    };
}
exports.ConditionalReplaceMethodsBy = ConditionalReplaceMethodsBy;
/**
 * This annotation applies to a class.
 * The target class will have all methods (except the constructor) replaced with a new method throwing an exception.
 * @param lock - in case this is true, every method will be replaced
 * @constructor
 */
function Lock(lock) {
    return function (subject) {
        lockImpl(lock, subject);
    };
}
exports.Lock = Lock;
/**
 * This annotation applies to a class
 * The target class will have all methods (except the constructor) replace with a given method (fn)
 * @param fn - method that will replace all methods inside the target class
 * @constructor
 */
function ReplaceMethodsBy(fn) {
    return function (subject) {
        shadowImpl(subject, fn);
    };
}
exports.ReplaceMethodsBy = ReplaceMethodsBy;
