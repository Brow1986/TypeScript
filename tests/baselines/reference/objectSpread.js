//// [objectSpread.ts]
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let swap = { a: 'yes', b: -1 };

let addAfter: { a: number, b: string, c: boolean } =
    { ...o, c: false }
let addBefore: { a: number, b: string, c: boolean } =
    { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore: { a: number, b: string } =
    { b: 'ignored', ...o }
let override: { a: number, b: string } =
    { ...o, b: 'override' }
let nested: { a: number, b: boolean, c: string } =
    { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined: { a: number, b: string, c: boolean } =
    { ...o, ...o2 }
let combinedBefore: { a: number, b: string, c: boolean } =
    { b: 'ok', ...o, ...o2 }
let combinedMid: { a: number, b: string, c: boolean } =
    { ...o, b: 'ok', ...o2 }
let combinedAfter: { a: number, b: string, c: boolean } =
    { ...o, ...o2, b: 'ok' }
let combinedNested: { a: number, b: boolean, c: string, d: string } =
    { ...{ a: 4, ...{ b: false, c: 'overriden' } }, d: 'actually new', ...{ a: 5, d: 'maybe new' } }
let combinedNestedChangeType: { a: number, b: boolean, c: number } =
    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
let propertyNested: { a: { a: number, b: string } } =
    { a: { ... o } }
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
let op = { get a () { return 6 } };
let getter: { a: number, c: number } =
    { ...op, c: 7 }
getter.a = 12;

// null, undefined, functions and primitives result in { }
let spreadNull = { ...null };
let spreadUndefind = { ...undefined };
let spreadNum = { ...12 };
let spreadBool = { ...false };
let spreadFunc = { ...(function () { }) };
let spreadStr = { ...'foo' };

// methods are not enumerable
class C { p = 1; m() { } }
let c: C = new C()
let spreadC: { p: number } = { ...c }

// own methods are enumerable
let cplus: { p: number, plus(): void } = { ...c, plus() { return this.p + 1; } };
cplus.plus();

// new field's type conflicting with existing field is OK
let changeTypeAfter: { a: string, b: string } =
    { ...o, a: 'wrong type?' }
let changeTypeBefore: { a: number, b: string } =
    { a: 'wrong type?', ...o };
let changeTypeBoth: { a: string, b: number } =
    { ...o, ...swap };

// optional
let definiteBoolean: { sn: boolean };
let definiteString: { sn: string };
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let optionalUnionStops: { sn: string | number | boolean } = { ...definiteBoolean, ...definiteString, ...optionalNumber };
let optionalUnionDuplicates: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...optionalString, ...optionalNumber };
let allOptional: { sn?: string | number } = { ...optionalString, ...optionalNumber };

// computed property
let computedFirst: { a: number, b: string, "before everything": number } =
    { ['before everything']: 12, ...o, b: 'yes' }
let computedMiddle: { a: number, b: string, c: boolean, "in the middle": number } =
    { ...o, ['in the middle']: 13, b: 'maybe?', ...o2 }
let computedAfter: { a: number, b: string, "at the end": number } =
    { ...o, b: 'yeah', ['at the end']: 14 }
// shortcut syntax
let a = 12;
let shortCutted: { a: number, b: string } = { ...o, a }

// generics
function f<T, U>(t: T, u: U): { ...T, ...U, id: string } {
    return { ...t, ...u, id: 'id' };
}
let exclusive: { id: string, a: number, b: string, c: string, d: boolean } =
    f({ a: 1, b: 'yes' }, { c: 'no', d: false })
let overlap: { id: string, a: number, b: string } =
    f({ a: 1 }, { a: 2, b: 'extra' })
let overlapConflict: { id:string, a: string } =
    f({ a: 1 }, { a: 'mismatch' })
let overwriteId: { id: string, a: number, c: number, d: string } =
    f({ a: 1, id: true }, { c: 1, d: 'no' })

class D { m() { }; q = 2; }
let classesAreWrong: { id: string, ...C, ...D } =
    f(new C(), new D())


//// [objectSpread.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var o = { a: 1, b: 'no' };
var o2 = { b: 'yes', c: true };
var swap = { a: 'yes', b: -1 };
var addAfter = __assign({}, o, { c: false });
var addBefore = __assign({ c: false }, o);
// Note: ignore still changes the order that properties are printed
var ignore = __assign({ b: 'ignored' }, o);
var override = __assign({}, o, { b: 'override' });
var nested = __assign({}, __assign({ a: 3 }, { b: false, c: 'overriden' }), { c: 'whatever' });
var combined = __assign({}, o, o2);
var combinedBefore = __assign({ b: 'ok' }, o, o2);
var combinedMid = __assign({}, o, { b: 'ok' }, o2);
var combinedAfter = __assign({}, o, o2, { b: 'ok' });
var combinedNested = __assign({}, __assign({ a: 4 }, { b: false, c: 'overriden' }), { d: 'actually new' }, { a: 5, d: 'maybe new' });
var combinedNestedChangeType = __assign({}, __assign({ a: 1 }, { b: false, c: 'overriden' }), { c: -1 });
var propertyNested = __assign({ a: __assign({}, o) });
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
var op = { get a() { return 6; } };
var getter = __assign({}, op, { c: 7 });
getter.a = 12;
// null, undefined, functions and primitives result in { }
var spreadNull = __assign({}, null);
var spreadUndefind = __assign({}, undefined);
var spreadNum = __assign({}, 12);
var spreadBool = __assign({}, false);
var spreadFunc = __assign({}, (function () { }));
var spreadStr = __assign({}, 'foo');
// methods are not enumerable
var C = (function () {
    function C() {
        this.p = 1;
    }
    C.prototype.m = function () { };
    return C;
}());
var c = new C();
var spreadC = __assign({}, c);
// own methods are enumerable
var cplus = __assign({}, c, { plus: function () { return this.p + 1; } });
cplus.plus();
// new field's type conflicting with existing field is OK
var changeTypeAfter = __assign({}, o, { a: 'wrong type?' });
var changeTypeBefore = __assign({ a: 'wrong type?' }, o);
var changeTypeBoth = __assign({}, o, swap);
// optional
var definiteBoolean;
var definiteString;
var optionalString;
var optionalNumber;
var optionalUnionStops = __assign({}, definiteBoolean, definiteString, optionalNumber);
var optionalUnionDuplicates = __assign({}, definiteBoolean, definiteString, optionalString, optionalNumber);
var allOptional = __assign({}, optionalString, optionalNumber);
// computed property
var computedFirst = __assign((_a = {}, _a['before everything'] = 12, _a), o, { b: 'yes' });
var computedMiddle = __assign({}, o, (_b = {}, _b['in the middle'] = 13, _b.b = 'maybe?', _b), o2);
var computedAfter = __assign({}, o, (_c = { b: 'yeah' }, _c['at the end'] = 14, _c));
// shortcut syntax
var a = 12;
var shortCutted = __assign({}, o, { a: a });
// generics
function f(t, u) {
    return __assign({}, t, u, { id: 'id' });
}
var exclusive = f({ a: 1, b: 'yes' }, { c: 'no', d: false });
var overlap = f({ a: 1 }, { a: 2, b: 'extra' });
var overlapConflict = f({ a: 1 }, { a: 'mismatch' });
var overwriteId = f({ a: 1, id: true }, { c: 1, d: 'no' });
var D = (function () {
    function D() {
        this.q = 2;
    }
    D.prototype.m = function () { };
    ;
    return D;
}());
var classesAreWrong = f(new C(), new D());
var _a, _b, _c;
