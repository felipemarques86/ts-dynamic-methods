
import {Recast, ReplaceMethodsBy, ConditionalReplaceMethodsOn, ConditionalReplaceMethodsBy, Span, Inject, Lock} from "../src";
import assert from "assert";

console.log("---------- @Recast example ---------");
abstract class A1 {
    method1(): void {
        console.log('A1.method1');
    }
}

@Recast(A1)
class A {
    method1(): void {
        console.log('A.method1');
    }

    method2(): void {
        console.log('A.method2');
    }
}
// Recast - Class A has the shape of A1
const objectOfA = new A();
objectOfA.method1();
assert(objectOfA.method2() === undefined);
// ------------------------------------------------------

console.log("---------- @ReplaceMethodsBy example ---------");
@ReplaceMethodsBy(() => console.log('This method implementation was replaced'))
class B {
    method1(): void {
        console.log('B.method1');
    }

    method2(): void {
        console.log('B.method2');
    }
}
// Shadow - all methods will be replaced with the anonymous function
const objectOfB = new B();
objectOfB.method1();
objectOfB.method2();
// ------------------------------------------------------

console.log("---------- @ReplaceMethodsOn example ---------");
class C1 {
    method1(): void {
        console.log('C1.method1');
    }

    method2(): void {
        console.log('C1.method2');
    }

    method3(): boolean {
        return true;
    }
}

@ConditionalReplaceMethodsOn(C1, C1.prototype.method3, true )
abstract class C {
    method1(): void {
        console.log('C.method1');
    }

    method2(): void {
        console.log('C.method2');
    }
}
// ReplaceMethodsOn - All methods in C1 will be replaced by the methods in C if method3 returns true
const objectC1 = new C1();
objectC1.method1();
objectC1.method2();

// ------------------------------------------------------

console.log("---------- @SuccededBy example ---------");
@ConditionalReplaceMethodsBy(C, D.prototype.method4, true)
class D {
    method1(): void {
        console.log('D.method1');
    }

    method2(): void {
        console.log('D.method2');
    }

    method4() : boolean {
        return true;
    }
}

const objectOfD = new D();
objectOfD.method1();
objectOfD.method2();
// ------------------------------------------------------


console.log("---------- @Span example ---------");
class E1 {
    method1(): void {
        console.log('E1.method1');
    }
}

class E2 {
    method2(): void {
        console.log('E2.method2');
    }
}


@Span(E1, E2)
abstract class E {
    method1(): void {
        console.log('E.method1');
    }

    method2(): void {
        console.log('E.method2');
    }
}
// Span - replace all methods in E1 and E2 by the methods in E
const objectOfE1 = new E1();
objectOfE1.method1();
const objectOfE2 = new E2();
objectOfE2.method2();
// ------------------------------------------------------

console.log("---------- @Inject example ---------");
abstract class F1 {
    method1(): void {
        console.log('F1.method1');
    }
}

abstract class F2 {
    method2(): void {
        console.log('F2.method2');
    }
}


@Inject(F1, F2)
class F {
    method1(): void {
        console.log('F.method1');
    }

    method2(): void {
        console.log('F.method2');
    }
}

const objectOfF = new F();
objectOfF.method1();
objectOfF.method2();
// ------------------------------------------------------


console.log("---------- @Lock example ---------");

@Lock(true)
class G {
    method1(): void {
        console.log('G.method1');
    }
    method2(): void {
        console.log('G.method2');
    }

}

const objectOfG = new G();
try {
    objectOfG.method1();
    objectOfG.method2();
} catch(e) {
    console.log(e);
}
// ------------------------------------------------------




{

    console.log("---------- Complex example ---------");

    abstract class AnotherClassWithMethod2 {
        method2(): void {
            console.log("AnotherClassWithMethod2.method2");
        }
    }

    interface CommonInterface {
        method1(): void;
    }

    class AnotherParent implements CommonInterface{
        method1(): void {
            console.log("AnotherParent.method1");
        }
    }

    @Inject(AnotherClassWithMethod2)
    class ChildA extends AnotherParent {
        method2(): void {
            console.log("This will never be called - ChildA.method2");
        }
    }

    class ChildB extends AnotherParent {
        method2(): void {
            console.log("ChildB.method2");
        }
    }

    class ChildC implements CommonInterface{
        method1(): void {
            console.log("ChildC.method1");
        }
        method2(): void {
            console.log("ChildC.method2");
        }
    }

    @Span(ChildC, AnotherParent)
    @Recast(AnotherParent)
    abstract class Parent {
        method1(): void {
            console.log('Parent method1');
        }
        method2(): void {
            console.log('This method will never be called');
        }
    }

    new ChildA().method1(); new ChildA().method2();
    new ChildB().method1(); new ChildB().method2();
    new ChildC().method1();

    /* This method will be replaced by an empty method because of the Recast of Parent */
    new ChildC().method2();

}