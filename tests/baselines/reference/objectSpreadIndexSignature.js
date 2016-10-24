//// [objectSpreadIndexSignature.ts]
class C {
    a: number;
    c: boolean;
}
// index signatures are not allowed in object literals with spread types
let c: { ...C, b: string, c?: string, [n: number]: string };
let n: number = c.a;
let s: string = c[12];
interface Indexed {
    [n: string]: number;
    a: number;
}
let i: { ...Indexed, b: number };
n = i[101];
n = i.b;
interface Indexed2 {
    [n: string]: boolean;
    c: boolean;
}
let ii: { ...Indexed, ...Indexed2, b: boolean, d: number };
let nb: number | boolean = ii[1001];

function f<T>(t: T) {
    let i: { ...T, [n: number]: string };
}


//// [objectSpreadIndexSignature.js]
var C = (function () {
    function C() {
    }
    return C;
}());
// index signatures are not allowed in object literals with spread types
var c;
var n = c.a;
var s = c[12];
var i;
n = i[101];
n = i.b;
var ii;
var nb = ii[1001];
function f(t) {
    var i;
}
