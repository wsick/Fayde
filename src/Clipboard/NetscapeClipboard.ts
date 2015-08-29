/// <reference path="ClipboardBase" />

module Fayde.Clipboard {
    export class NetscapeClipboard extends ClipboardBase {
        CopyText(text: string) {
            var div = memoizePlaceholder("special_copy");
            selectContent(div);

            tryRequestPrivilege();
            // Copy the selected content to the clipboard
            // Works in Firefox and in Safari before version 5
            if (!document.execCommand("copy", false, null))
                alert("Your browser does not allow copy to the clipboard. This feature will not function");
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