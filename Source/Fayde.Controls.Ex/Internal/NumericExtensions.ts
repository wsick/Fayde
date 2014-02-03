module Fayde.Controls.Internal {
    export class NumericExtensions {
        static IsZero(value: number): boolean {
            return Math.abs(value) < 2.22044604925031E-15;
        }
        static IsGreaterThan(left: number, right: number): boolean {
            if (left > right)
                return !NumericExtensions.AreClose(left, right);
            else
                return false;
        }
        static IsLessThanOrClose(left: number, right: number): boolean {
            if (left >= right)
                return NumericExtensions.AreClose(left, right);
            else
                return true;
        }
        static AreClose(left: number, right: number): boolean {
            if (left === right)
                return true;
            var num1 = (Math.abs(left) + Math.abs(right) + 10.0) * 2.22044604925031E-16;
            var num2 = left - right;
            if (-num1 < num2)
                return num1 > num2;
            else
                return false;
        }
    }
}