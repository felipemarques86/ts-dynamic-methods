function successorImpl(subject: Function, successor: Function, condition: Function, expectedValue: any) {
    const subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
    subjectPropertyNames
        .filter(propName => propName !== 'constructor' && subject.prototype[propName] !== condition)
        .forEach(propName => {
            const succFunc = successor.prototype[propName] as Function;
            if (succFunc) {
                if (condition) {
                    const old = subject.prototype[propName] as Function;
                    subject.prototype[propName] = function () {
                        if (condition.call(this) === expectedValue) {
                            return succFunc.call(this);
                        } else {
                            return old.call(this);
                        }
                    }
                }
            }
        });

}

function lockImpl(lock: boolean, subject: Function) {
    if (lock) {
        const subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
        subjectPropertyNames
            .filter(propName => propName !== 'constructor')
            .forEach(propName => {
                subject.prototype[propName] = function () {
                    throw 'Class locked';
                }
            });
    }
}

function shadowImpl(subject: Function, fn: Function) {
    const subjectPropertyNames = Object.getOwnPropertyNames(subject.prototype);
    subjectPropertyNames
        .filter(propName => propName !== 'constructor')
        .forEach(propName => {
            subject.prototype[propName] = fn;
        });
}

function recastImpl(subject: any, successor: any) {
    const successorPropertyNames = Object.getOwnPropertyNames(successor.prototype);
    successorPropertyNames
        .filter(propName => propName !== 'constructor')
        .forEach(propName => {
            const fn = subject.prototype[propName] as Function;
            if (!fn) {
                successor.prototype[propName] = function(){return undefined};
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
export function Recast(subject: any) {
    return function(successor: any) {
        recastImpl(subject, successor);
    };
}

/**
 * This annotation applies to a class.
 * The subject class methods will in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param subject
 * @param condition
 * @param expectedValue
 * @constructor
 */
export function SuccessorOf(subject: Function, condition: Function, expectedValue: any) {
    return function(successor: Function) {
        successorImpl(subject, successor, condition, expectedValue);
    };
}

/**
 * This annotation applies to a class.
 * The target class will have the methods in common with the successors replace with their implementation
 * @param successors
 * @constructor
 */
export function Inject(...successors: Function[]){
    return function(subject: Function) {
        successors.forEach( successor => successorImpl(subject, successor, () => true, true));
    };
}

/**
 * The target class will have replace the implementation of all methods in common with successors with its own implementation
 * @param subjects
 * @constructor
 */
export function Span(...subjects: Function[]) {
    return function(successor: Function) {
        subjects.forEach( subject => successorImpl(subject, successor, () => true, true));
    };
}

/**
 * This annotation applies to a class.
 * The subject class methods in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param successor
 * @param condition
 * @param expectedValue
 * @constructor
 */
export function SuccededBy(successor: Function, condition: Function, expectedValue: any) {
    return function(subject: Function) {
        successorImpl(subject, successor, condition, expectedValue);
    };
}


/**
 * This annotation applies to a class.
 * The target class will have all methods (except the constructor) replaced with a new method throwing an exception.
 * @param lock - in case this is true, every method will be replaced
 * @constructor
 */
export function Lock(lock: boolean) {
    return function(subject: Function) {
        lockImpl(lock, subject);
    }
}

/**
 * This annotation applies to a class
 * The target class will have all methods (except the constructor) replace with a given method (fn)
 * @param fn - method that will replace all methods inside the target class
 * @constructor
 */
export function Shadow(fn: Function) {
    return function(subject: Function) {
        shadowImpl(subject, fn);
    }
}
