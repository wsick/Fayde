/// <reference path="ClipboardBase" />

module Fayde.Clipboard {
    export class IEClipboard extends ClipboardBase {
        CopyText(text: string) {
            var res = (<any>window).clipboardData.setData("Text", text);
            if (!res)
                alert("Your browser do not allow copy to the clipboard.");
        }
    }
}