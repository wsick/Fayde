
module Gerudo {
    export function eval(e: string, onResult: (result: any) => void, onError?: () => void, useContentScriptContext?: boolean) {
        function handle(result: any, isException: boolean) {
            if (isException)
                return onError && onError();
            return onResult(result);
        }
        if (useContentScriptContext)
            (<any>chrome.devtools.inspectedWindow).eval(e, { useContentScriptContext: true }, handle);
        else
            chrome.devtools.inspectedWindow.eval(e, handle);
    }
    export function evalFn(fn: Function, args: any, onResult: (result: any) => void, onError?: () => void) {
        var e = "(" + fn.toString() + ")(window, " + JSON.stringify(args || {}) + ");";
        eval(e, onResult, onError);
    }
}