/// <reference path="TextElement.ts" />
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Documents {
    export interface IInlinesChangedListener {
        InlinesChanged(newInline: Inline, isAdd: bool);
    }

    export class Inline extends TextElement {
        Autogen: bool = false;
    }
    Nullstone.RegisterType(Inline, "Inline");

    export class InlineCollection extends XamlObjectCollection {
        private _Listener: IInlinesChangedListener;
        Listen(listener: IInlinesChangedListener) { this._Listener = listener; }
        Unlisten(listener: IInlinesChangedListener) { if (this._Listener === listener) this._Listener = null; }

        AddedToCollection(value: Inline, error: BError): bool {
            if (!super.AddedToCollection(value, error))
                return false;
            var listener = this._Listener;
            if (listener) listener.InlinesChanged(value, true);
            return true;
        }
        RemovedFromCollection(value: Inline, isValueSafe: bool) {
            super.RemovedFromCollection(value, isValueSafe);
            var listener = this._Listener;
            if (listener) listener.InlinesChanged(value, false);
        }
    }
    Nullstone.RegisterType(InlineCollection, "InlineCollection");
}