module Fayde.Clipboard {
    export interface IClipboard {
        CopyText(text: string);
        GetTextContents(callback: (text: string) => void);
    }

    var cp = new nullstone.Memoizer((key) => {
        var div = document.createElement("div");
        div.id = key;
        ((style: CSSStyleDeclaration) => {
            style.opacity = "0.0";
            style.position = "absolute";
            style.left = "-300px";
            //style.top = "-150px";
        })(div.style);
        document.body.appendChild(div);
        div.contentEditable = "true";
        return div;
    });

    export function memoizePlaceholder(key: string): HTMLDivElement {
        return cp.memoize(key);
    }
}