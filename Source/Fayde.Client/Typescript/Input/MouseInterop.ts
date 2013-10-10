module Fayde.Input {
    var isIE = navigator.appName === "Microsoft Internet Explorer";
    var isNetscape = navigator.appName === "Netscape";
    export class MouseInterop {
        static IsLeftButton(button: number): boolean {
            return button === 1;
        }
        static IsRightButton(button: number): boolean {
            if (isNetscape) return button === 3;
            return button === 2;
        }
    }
}