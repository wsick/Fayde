/// <reference path="BasicClipboard" />

module Fayde.Clipboard {
    export class NetscapeClipboard implements IClipboard {
        private $$fn: (text: string) => void = null;

        constructor() {
            document.body.contentEditable = "true";
            document.body.style.cursor = "default";
            document.body.addEventListener("paste", this.$$notify);
        }

        CopyText(text: string) {
            var div = memoizePlaceholder("special_copy");
            div.textContent = text;
            selectContent(div);

            tryRequestPrivilege();
            // Copy the selected content to the clipboard
            // Works in Firefox and in Safari before version 5
            if (!document.execCommand("copy", false, null))
                alert("Your browser does not allow copy to the clipboard. This feature will not function");
        }

        GetTextContents(callback: (text: string) => void) {
            this.$$fn = callback;
        }

        private $$notify = (e: any) => {
            if (!this.$$fn)
                return;
            var ev = e.originalEvent || e;
            var dt = ev.clipboardData;
            this.$$fn(dt.getData('text/plain'));
            this.$$fn = null;
        }
    }

    function selectContent(element: HTMLDivElement) {
        var rangeToSelect = document.createRange();
        rangeToSelect.selectNodeContents(element);

        // select the contents
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(rangeToSelect);
    }

    function tryRequestPrivilege() {
        var netscape = window ? (<any>window).netscape : null;
        if (netscape && netscape.security) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
    }
}