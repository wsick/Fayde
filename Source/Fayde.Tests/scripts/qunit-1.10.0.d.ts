// Type definitions for QUnit 1.10.0
// Project: http://qunitjs.com/
// @by: Diullei Gomes <https://github.com/diullei>

interface DoneCallbackObject {
	failed: number;
	passed: number;
	total: number;
	runtime: number;
}

interface LogCallbackObject {
	result: boolean;
	actual: Object;
	expected: Object;
	message: string;
}

interface ModuleDoneCallbackObject {
	name: string;
	failed: number;
	passed: number;
	total: number;
}

interface TestDoneCallbackObject {
	name: string;
	module: string;
	failed: number;
	passed: number;
	total: number;
}

interface TestStartCallbackObject {
	name: string;
	module: string;
	failed: number;
	passed: number;
	total: number;
}

interface Config {
	altertitle: boolean;
	autostart: boolean;
	current: Object;
	reorder: boolean;
	requireExpects: boolean;
	urlConfig: Array;
}

interface LifecycleObject {
	setup?: () => any;
	teardown?: () => any;
}

interface QUnitAssert {
	/* ASSERT */
	deepEqual(actual: any, expected: any, message: string);
	equal(actual: any, expected: any, message: string);
	notDeepEqual(actual: any, expected: any, message: string);
	notEqual(actual: any, expected: any, message: string);
	notStrictEqual(actual: any, expected: any, message: string);
	ok(state: any, message: string);
	strictEqual(actual: any, expected: any, message: string);
	throws(block: () => any, expected: any, message: string);
	throws(block: () => any, message: string);
}

interface QUnitStatic extends QUnitAssert{	
	/* ASYNC CONTROL */
	start(decrement?: number);
	stop(increment? : number);

	/* CALLBACKS */
	begin(callback: () => any);
	done(callback: (details: DoneCallbackObject) => any);
	log(callback: (details: LogCallbackObject) => any);
	moduleDone(callback: (details: ModuleDoneCallbackObject) => any);
	moduleStart(callback: (name: string) => any);
	testDone(callback: (details: TestDoneCallbackObject) => any);
	testStart(callback: (details: TestStartCallbackObject) => any);

	/* CONFIGURATION */
	config: Config;

	/* TEST */
	asyncTest(name: string, expected: number, test: () => any);
	asyncTest(name: string, test: () => any);
	expect(amount: number);
	module(name: string, lifecycle?: LifecycleObject);
	test(title: string, expected: number, test: (assert: any) => any);
	test(title: string, test: (assert: any) => any);
}

/* ASSERT */
declare var deepEqual: (actual: any, expected: any, message: string) => any;
declare var equal: (actual: any, expected: any, message: string) => any;
declare var notDeepEqual: (actual: any, expected: any, message: string) => any;
declare var notEqual: (actual: any, expected: any, message: string) => any;
declare var notStrictEqual: (actual: any, expected: any, message: string) => any;
declare var ok: (state: any, message: string) => any;
declare var strictEqual: (actual: any, expected: any, message: string) => any;
// ** I Can't make overload here! :(
declare var throws: (block: () => void, expected: Object,  message: string) => any;
//declare var throws: (block: () => void, message: string) => any;

/* ASYNC CONTROL */
declare var start: (decrement?: number) => any;
declare var stop: (increment? : number) => any;

/* CALLBACKS */
declare var begin: (callback: () => any) => any;
declare var done: (callback: (details: DoneCallbackObject) => any) => any;
declare var log: (callback: (details: LogCallbackObject) => any) => any;
declare var moduleDone: (callback: (details: ModuleDoneCallbackObject) => any) => any;
declare var moduleStart: (callback: (name: string) => any) => any;
declare var testDone: (callback: (details: TestDoneCallbackObject) => any) => any;
declare var testStart: (callback: (details: TestStartCallbackObject) => any) => any;

/* TEST */
declare var asyncTest: (name: string, /*expected?: number, */test: () => any) => any;
declare var expect: (amount: number) => any;
// ** conflict with TypeScript module keyword. Must be used on QUnit namespace
//declare var module: (name: string, lifecycle?: LifecycleObject) => any;
// ** I can't make an overload here! :(
//declare var test: (title: string, expected: number, test: (assert?: QUnitAssert) => any) => any;
declare var test: (title: string, test: (assert?: any) => any) => any;

/* QUNIT */
declare var QUnit: QUnitStatic;