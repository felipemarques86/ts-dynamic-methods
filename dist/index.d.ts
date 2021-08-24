/**
 * This annotation applies to a class.
 * The successor class will have all uncommon methods with the subject class replaced with a dummy function that returns
 * undefined
 * @param subject
 * @constructor
 */
export declare function Recast(subject: any): (successor: any) => void;
/**
 * This annotation applies to a class.
 * The subject class methods will in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param subject
 * @param condition
 * @param expectedValue
 * @constructor
 */
export declare function ConditionalReplaceMethodsOn(subject: Function, condition: Function, expectedValue: any): (successor: Function) => void;
/**
 * This annotation applies to a class.
 * The target class will have the methods in common with the successors replace with their implementation
 * @param successors
 * @constructor
 */
export declare function Inject(...successors: Function[]): (subject: Function) => void;
/**
 * The target class will have replace the implementation of all methods in common with successors with its own implementation
 * @param subjects
 * @constructor
 */
export declare function Span(...subjects: Function[]): (successor: Function) => void;
/**
 * This annotation applies to a class.
 * The subject class methods in common with the target class will be replace in case the function 'condition' is
 * evaluated with the 'expectedValue'
 * @param successor
 * @param condition
 * @param expectedValue
 * @constructor
 */
export declare function ConditionalReplaceMethodsBy(successor: Function, condition: Function, expectedValue: any): (subject: Function) => void;
/**
 * This annotation applies to a class.
 * The target class will have all methods (except the constructor) replaced with a new method throwing an exception.
 * @param lock - in case this is true, every method will be replaced
 * @constructor
 */
export declare function Lock(lock: boolean): (subject: Function) => void;
/**
 * This annotation applies to a class
 * The target class will have all methods (except the constructor) replace with a given method (fn)
 * @param fn - method that will replace all methods inside the target class
 * @constructor
 */
export declare function ReplaceMethodsBy(fn: Function): (subject: Function) => void;
