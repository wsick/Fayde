module Fayde.Clipboard {
    export class ClipboardBase implements IClipboard {
        CopyText(text: string) {

        }

        GetTextContents(callback: (text: string) => void) {
            var div = memoizePlaceholder("special_paste");
            div.addEventListener("keyup", () => {
                if (!callback)
                    return;
                var copier = memoizePlaceholder("special_copy");
                callback(copier.textContent);
                callback = null;
            });

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
            }
        }
    }
}