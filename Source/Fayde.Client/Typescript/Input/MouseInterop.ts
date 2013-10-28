module Fayde.Input {
    var isIE = navigator.appName === "Microsoft Internet Explorer";
    var isNetscape = navigator.appName === "Netscape";
    var isContextMenuDisabled = false;
    export class MouseInterop {
        static IsLeftButton(button: number): boolean {
            return button === 1;
        }
        static IsRightButton(button: number): boolean {
            if (isNetscape) return button === 3;
            return button === 2;
        }
        static CreateModifiers(e): IModifiersOn {
            return {
                Shift: e.shiftKey,
                Ctrl: e.ctrlKey,
                Alt: e.altKey
            };
        }

        static DisableBrowserContextMenu() {
            isContextMenuDisabled = true;
        }
        static get IsBrowserContextMenuDisabled(): boolean {
            if (!isContextMenuDisabled)
                return false;
            isContextMenuDisabled = false;
            return true;
        }
    }
}