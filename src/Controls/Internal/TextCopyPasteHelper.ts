module Fayde.Controls.Internal {
    export class TextCopyPasteHelper {
        private callback: any = false;
        private pastedText: string = "";

		GetPastedText(): string {
            return this.pastedText;
        }

        private createElement(text: string): HTMLDivElement {
            (<any>document.body).scroll = "no";
            document.documentElement.style.overflow = "hidden";
            var div = document.createElement("div");
            div.id = "special_copy";
            div.style.left = "-1000px";
            div.style.top = "-1000px";
            div.style.position = "absolute";
            div.textContent = text;
            document.body.appendChild(div);
            div.contentEditable = "true";
            return div;
        }

        private selectContent(element: HTMLDivElement) {
            var rangeToSelect = document.createRange();
            rangeToSelect.selectNodeContents(element);

            // select the contents
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(rangeToSelect);
        }

        CopyText(text: string): void {
            var win = <any>window;

            if (win.clipboardData) { // internet explorer
                var res = win.clipboardData.setData("Text", text);
                if (!res)
                    alert("Your browser do not allow copy to the clipboard");
            } else {
                var div = this.createElement(text);
                this.selectContent(div);

                if (win.netscape && netscape.security) {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }

                // Copy the selected content to the clipboard
                // Works in Firefox and in Safari before version 5
                if (!document.execCommand("copy", false, null))
                    alert("Your browser does not allow copy to the clipboard. This feature will not function");

                document.body.removeChild(div);
            }
        }

        PasteText(callback: any) {
            var div = this.createElement("");
            this.callback = callback;

            div.addEventListener("keyup", function() {
                if (!this.callback) return;
                var div = document.getElementById("special_copy");
                this.pastedText = div.textContent;
                this.callback.call(null, this.pastedText);
                this.callback = false;
                this.pastedText = false;
                document.body.removeChild(div);
            }.bind(this));

            if (document.createRange) {
                var rng = document.createRange();
                rng.selectNodeContents(div);
                var saveSelection = [];
                var selection = window.getSelection();
                for (var i = 0; i < selection.rangeCount; i++) {
                    saveSelection[i] = selection.getRangeAt(i);
                }
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(rng);
                div.focus();
                this.callback = callback;
            }
        }
    }
}