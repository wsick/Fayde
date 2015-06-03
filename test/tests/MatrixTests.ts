export function load() {
    QUnit.module("Matrix Tests");

    test("Matrix to Raw mapping", () => {
        var m: Fayde.Media.Matrix;

	m = new Fayde.Media.Matrix();
	m.M11 = 0;
	m.M12 = 1;
	m.M21 = 2;
	m.M22 = 3;
	m.OffsetX = 4;
	m.OffsetY = 5;

	for (var i=0; i<6; i++)
	{
	    strictEqual(m._Raw[i], i, "Matrix[" + i + "]");
	}
    });
}
