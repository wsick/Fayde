/// <reference path="XamlObject.ts" />
/// CODE

module Fayde {
    export class FrameworkTemplate extends XamlObject {
        GetVisualTree(bindingSource: DependencyObject): XamlObject {
            var error = new BError();
            var vt = this._GetVisualTreeWithError(bindingSource, error);
            if (error.Message)
                error.ThrowException();
            return vt;
        }
        _GetVisualTreeWithError(templateBindingSource: DependencyObject, error: BError): XamlObject {
            error.Message = "Abstract Method";
            return undefined;
        }
    }
}