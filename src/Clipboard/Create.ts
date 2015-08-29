module Fayde.Clipboard {
    export function Create(): IClipboard {
        if ((<any>window).clipboardData)
            return new IEClipboard();
        return new NetscapeClipboard();
    }
}