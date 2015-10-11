module Fayde.Clipboard {
    export class BasicClipboard implements IClipboard {
        CopyText(text: string) {
            var res = (<any>window).clipboardData.setData("Text", text);
            if (!res)
                alert("Your browser do not allow copy to the clipboard.");
        }

        GetTextContents(callback: (text: string) => void) {
            var text = (<any>window).clipboardData.getData("Text");
            callback(text);
        }
    }
}