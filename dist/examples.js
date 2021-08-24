"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var assert_1 = __importDefault(require("assert"));
console.log("---------- @Recast example ---------");
var A1 = /** @class */ (function () {
    function A1() {
    }
    A1.prototype.method1 = function () {
        console.log('A1.method1');
    };
    return A1;
}());
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method1 = function () {
        console.log('A.method1');
    };
    A.prototype.method2 = function () {
        console.log('A.method2');
    };
    A = __decorate([
        src_1.Recast(A1)
    ], A);
    return A;
}());
// Recast - Class A has the shape of A1
var objectOfA = new A();
objectOfA.method1();
assert_1.default(objectOfA.method2() === undefined);
// ------------------------------------------------------
console.log("---------- @ReplaceMethodsBy example ---------");
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.method1 = function () {
        console.log('B.method1');
    };
    B.prototype.method2 = function () {
        console.log('B.method2');
    };
    B = __decorate([
        src_1.ReplaceMethodsBy(function () { return console.log('This method implementation was replaced'); })
    ], B);
    return B;
}());
// Shadow - all methods will be replaced with the anonymous function
var objectOfB = new B();
objectOfB.method1();
objectOfB.method2();
// ------------------------------------------------------
console.log("---------- @ReplaceMethodsOn example ---------");
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.method1 = function () {
        console.log('C1.method1');
    };
    C1.prototype.method2 = function () {
        console.log('C1.method2');
    };
    C1.prototype.method3 = function () {
        return true;
    };
    return C1;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method1 = function () {
        console.log('C.method1');
    };
    C.prototype.method2 = function () {
        console.log('C.method2');
    };
    C = __decorate([
        src_1.ConditionalReplaceMethodsOn(C1, C1.prototype.method3, true)
    ], C);
    return C;
}());
// ReplaceMethodsOn - All methods in C1 will be replaced by the methods in C if method3 returns true
var objectC1 = new C1();
objectC1.method1();
objectC1.method2();
// ------------------------------------------------------
console.log("---------- @ConditionalReplaceMethodsBy example ---------");
var D = /** @class */ (function () {
    function D() {
    }
    D_1 = D;
    D.prototype.method1 = function () {
        console.log('D.method1');
    };
    D.prototype.method2 = function () {
        console.log('D.method2');
    };
    D.prototype.method4 = function () {
        return true;
    };
    var D_1;
    D = D_1 = __decorate([
        src_1.ConditionalReplaceMethodsBy(C, D_1.prototype.method4, true)
    ], D);
    return D;
}());
var objectOfD = new D();
objectOfD.method1();
objectOfD.method2();
// ------------------------------------------------------
console.log("---------- @Span example ---------");
var E1 = /** @class */ (function () {
    function E1() {
    }
    E1.prototype.method1 = function () {
        console.log('E1.method1');
    };
    return E1;
}());
var E2 = /** @class */ (function () {
    function E2() {
    }
    E2.prototype.method2 = function () {
        console.log('E2.method2');
    };
    return E2;
}());
var E = /** @class */ (function () {
    function E() {
    }
    E.prototype.method1 = function () {
        console.log('E.method1');
    };
    E.prototype.method2 = function () {
        console.log('E.method2');
    };
    E = __decorate([
        src_1.Span(E1, E2)
    ], E);
    return E;
}());
// Span - replace all methods in E1 and E2 by the methods in E
var objectOfE1 = new E1();
objectOfE1.method1();
var objectOfE2 = new E2();
objectOfE2.method2();
// ------------------------------------------------------
console.log("---------- @Inject example ---------");
var F1 = /** @class */ (function () {
    function F1() {
    }
    F1.prototype.method1 = function () {
        console.log('F1.method1');
    };
    return F1;
}());
var F2 = /** @class */ (function () {
    function F2() {
    }
    F2.prototype.method2 = function () {
        console.log('F2.method2');
    };
    return F2;
}());
var F = /** @class */ (function () {
    function F() {
    }
    F.prototype.method1 = function () {
        console.log('F.method1');
    };
    F.prototype.method2 = function () {
        console.log('F.method2');
    };
    F = __decorate([
        src_1.Inject(F1, F2)
    ], F);
    return F;
}());
var objectOfF = new F();
objectOfF.method1();
objectOfF.method2();
// ------------------------------------------------------
console.log("---------- @Lock example ---------");
var G = /** @class */ (function () {
    function G() {
    }
    G.prototype.method1 = function () {
        console.log('G.method1');
    };
    G.prototype.method2 = function () {
        console.log('G.method2');
    };
    G = __decorate([
        src_1.Lock(true)
    ], G);
    return G;
}());
var objectOfG = new G();
try {
    objectOfG.method1();
    objectOfG.method2();
}
catch (e) {
    console.log(e);
}
// ------------------------------------------------------
{
    console.log("---------- Complex example 1 ---------");
    var AnotherClassWithMethod2 = /** @class */ (function () {
        function AnotherClassWithMethod2() {
        }
        AnotherClassWithMethod2.prototype.method2 = function () {
            console.log("AnotherClassWithMethod2.method2");
        };
        return AnotherClassWithMethod2;
    }());
    var AnotherParent = /** @class */ (function () {
        function AnotherParent() {
        }
        AnotherParent.prototype.method1 = function () {
            console.log("AnotherParent.method1");
        };
        return AnotherParent;
    }());
    var ChildA = /** @class */ (function (_super) {
        __extends(ChildA, _super);
        function ChildA() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChildA.prototype.method2 = function () {
            console.log("This will never be called - ChildA.method2");
        };
        ChildA = __decorate([
            src_1.Inject(AnotherClassWithMethod2)
        ], ChildA);
        return ChildA;
    }(AnotherParent));
    var ChildB = /** @class */ (function (_super) {
        __extends(ChildB, _super);
        function ChildB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChildB.prototype.method2 = function () {
            console.log("ChildB.method2");
        };
        return ChildB;
    }(AnotherParent));
    var ChildC = /** @class */ (function () {
        function ChildC() {
        }
        ChildC.prototype.method1 = function () {
            console.log("ChildC.method1");
        };
        ChildC.prototype.method2 = function () {
            console.log("ChildC.method2");
        };
        return ChildC;
    }());
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        Parent.prototype.method1 = function () {
            console.log('Parent method1');
        };
        Parent.prototype.method2 = function () {
            console.log('This method will never be called');
        };
        Parent = __decorate([
            src_1.Span(ChildC, AnotherParent),
            src_1.Recast(AnotherParent)
        ], Parent);
        return Parent;
    }());
    new ChildA().method1();
    new ChildA().method2();
    new ChildB().method1();
    new ChildB().method2();
    new ChildC().method1();
    /* This method will be replaced by an empty method because of the Recast of Parent */
    new ChildC().method2();
}
{
    console.log("---------- Complex example 2 ---------");
    var LoginService = /** @class */ (function () {
        function LoginService() {
        }
        LoginService.prototype.login = function (userData) {
            console.log('Login successful');
        };
        return LoginService;
    }());
    var DatabaseService = /** @class */ (function () {
        function DatabaseService() {
        }
        DatabaseService.prototype.saveData = function (data) {
            this.showMessage();
        };
        DatabaseService.prototype.showMessage = function () {
            console.log('Data saved');
        };
        return DatabaseService;
    }());
    var Z = /** @class */ (function () {
        function Z() {
        }
        Z.prototype.login = function (userData) {
            throw "Not implemented";
        };
        Z.prototype.saveData = function (data) {
            throw "Not implemented";
        };
        Z.prototype.loginUser = function (userData) {
            this.login(userData);
            this.saveData(userData);
        };
        Z = __decorate([
            src_1.Inject(LoginService, DatabaseService)
        ], Z);
        return Z;
    }());
    var z = new Z();
    z.loginUser('aUser');
}
