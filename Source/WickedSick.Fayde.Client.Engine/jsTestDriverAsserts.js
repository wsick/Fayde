function fail(msg) {
    /// <param name="msg" type="String"></param>
    /// <summary>Throws a JavaScript Error with given message string.</summary>
}

function assert(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <param name="actual" type="Boolean"></param>
}

function assertTrue(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <param name="actual" type="Boolean"></param>
    /// <summary>Fails if the result isn't truthy. To use a message, add it as the first parameter.</summary>
}

function assertFalse(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the result isn't falsy.</summary>
}

function assertEquals(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the expected and actual values can not be compared to be equal.</summary>
}

function assertNotEquals(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the expected and actual values can be compared to be equal.</summary>
}

function assertSame(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the expected and actual values are not references to the same object. (===)</summary>
}

function assertNotSame(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the expected and actual are references to the same object. (!==)</summary>
}

function assertNull(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not exactly null.</summary>
}

function assertNotNull(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is exactly null. </summary>
}

function assertUndefined(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not undefined. </summary>
}

function assertNotUndefined(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is undefined. </summary>
}

function assertNaN(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not a NaN. </summary>
}

function assertNotNaN(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is a NaN. </summary>
}

function assertException(msg, callback, error) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the code in the callback does not throw the given error. </summary>
}

function assertNoException(msg, callback) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the code in the callback throws an error. </summary>
}

function assertArray(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not an Array. </summary>
}

function assertTypeOf(msg, expected, value) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the JavaScript type of the value isn't the expected string. </summary>
}

function assertBoolean(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not a Boolean. Convenience function to assertTypeOf. </summary>
}

function assertFunction(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not a Function. Convenience function to assertTypeOf. </summary>
}

function assertObject(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not an Object. Convenience function to assertTypeOf. </summary>
}

function assertNumber(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not a Number. Convenience function to assertTypeOf. </summary>
}

function assertString(msg, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value is not a String. Convenience function to assertTypeOf. </summary>
}

function assertMatch(msg, regexp, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value does not match the given regular expression. </summary>
}

function assertNoMatch(msg, regexp, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given value matches the given regular expression. </summary>
}

function assertTagName(msg, tagName, element) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given DOM element is not of given tagName. </summary>
}

function assertClassName(msg, className, element) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given DOM element does not have given CSS class name. </summary>
}

function assertElementId(msg, id, element) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given DOM element does not have given ID. </summary>
}

function assertInstanceOf(msg, constructor, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given object is not an instance of given constructor. </summary>
}

function assertNotInstanceOf(msg, constructor, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Fails if the given object is an instance of given constructor. </summary>
}