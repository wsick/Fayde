/// <reference path="TextElement.ts" />

module Fayde.Documents {
    export interface IInlinesChangedListener {
        InlinesChanged(newInline: Inline, isAdd: boolean);
    }

    export class Inline extends TextElement {
        Autogen: boolean = false;
    }
    Fayde.RegisterType(Inline, "Fayde.Documents", Fayde.XMLNS);

    export class InlineCollection extends XamlObjectCollection<Inline> {
        private _Listener: IInlinesChangedListener;
        Listen(listener: IInlinesChangedListener) { this._Listener = listener; }
        Unlisten(listener: IInlinesChangedListener) { if (this._Listener === listener) this._Listener = null; }

        AddingToCollection(value: Inline, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            var listener = this._Listener;
            if (listener) listener.InlinesChanged(value, true);
            return true;
        }
        RemovedFromCollection(value: Inline, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            var listener = this._Listener;
            if (listener) listener.InlinesChanged(value, false);
        }
    }
    Fayde.RegisterType(InlineCollection, "Fayde.Documents", Fayde.XMLNS);
}