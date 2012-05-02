/// <reference path="../jsTestDriverAsserts.js"/>
/// <reference path="../Javascript/Runtime/Nullstone.js"/>

function assertNullstoneRefEquals(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Performs Nullstone.RefEquals on expected and actual. Fails if they are not the exact same object.</summary>
    assertTrue(msg, Nullstone.RefEquals(expected, actual));
}
function assertNullstoneNotRefEquals(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Performs Nullstone.RefEquals on expected and actual. Fails if they are the exact same object.</summary>
    assertFalse(msg, Nullstone.RefEquals(expected, actual));
}

function assertNumberClose(msg, expected, actual) {
    /// <param name="msg" type="String"></param>
    /// <summary>Compares expected and actual values for numbers that are close in value. Fails if numbers are not within 0.0000001.</summary>
    assertTrue(msg, Math.abs(expected - actual) < 0.0000001);
}

function assertMatrix(expected, actual) {
    /// <param name="expected" type="Matrix"></param>
    /// <param name="actual" type="Matrix"></param>
    assertNotNull("M11 was not set.", actual.GetM11());
    assertNotNull("M12 was not set.", actual.GetM12());
    assertNotNull("M21 was not set.", actual.GetM21());
    assertNotNull("M22 was not set.", actual.GetM22());
    assertNotNull("Offset X was not set.", actual.GetOffsetX());
    assertNotNull("Offset Y was not set.", actual.GetOffsetY());
    assertSame("M11 is not set properly.", expected.GetM11(), actual.GetM11());
    assertSame("M12 is not set properly.", expected.GetM12(), actual.GetM12());
    assertSame("M21 is not set properly.", expected.GetM21(), actual.GetM21());
    assertSame("M22 is not set properly.", expected.GetM22(), actual.GetM22());
    assertSame("Offset X is not set properly.", expected.GetOffsetX(), actual.GetOffsetX());
    assertSame("Offset Y is not set properly.", expected.GetOffsetY(), actual.GetOffsetY());
    assertSame("Matrix Type is not set properly.", expected._Type, actual._Type);
}