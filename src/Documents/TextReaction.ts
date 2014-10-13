module Fayde.Documents {
    export interface ITextReactionCallback<T> {
        (updater: minerva.text.element.TextElementUpdater, ov: T, nv: T, te?: TextElement): void;
    }

    export function TextReaction<TValue>(propd: DependencyProperty, callback?: ITextReactionCallback<TValue>, listen?: boolean, sync?: any) {
        var changed: Function;
        if (sync === false) {
            changed = (listen === false) ? reaction<TValue>(callback) : lReaction<TValue>(callback);
        } else {
            var name = propd.Name;
            name = name.charAt(0).toLowerCase() + name.substr(1);
            if (typeof sync !== "function")
                changed = (listen === false) ? sReaction<TValue>(callback, name) : slReaction<TValue>(callback, name);
            else
                changed = (listen === false) ? sReaction<TValue>(callback, name, sync) : slReaction<TValue>(callback, name, sync);
        }
        propd.ChangedCallback = <any>changed;
    }

    function reaction<T>(callback: ITextReactionCallback<T>) {
        return (te: TextElement, args: DependencyPropertyChangedEventArgs) => {
            callback && callback(te.XamlNode.TextUpdater, args.OldValue, args.NewValue, te);
        };
    }

    function sReaction<T>(callback: ITextReactionCallback<T>, name: string, syncer?: (src: T, dest: T) => void) {
        return (te: TextElement, args: DependencyPropertyChangedEventArgs) => {
            var ov = args.OldValue;
            var nv = args.NewValue;
            var upd = te.XamlNode.TextUpdater;
            if (!syncer)
                upd.assets[name] = nv;
            else
                syncer(nv, upd.assets[name]);
            callback && callback(upd, ov, nv, te);
        };
    }

    function lReaction<T>(callback: ITextReactionCallback<T>) {
        return (te: TextElement, args: DependencyPropertyChangedEventArgs) => {
            var ov = args.OldValue;
            var nv = args.NewValue;
            var upd = te.XamlNode.TextUpdater;
            UnreactTo(ov, te);
            callback && callback(upd, ov, nv, te);
            ReactTo(nv, te, () => callback(upd, nv, nv, te));
        };
    }

    function slReaction<T>(callback: ITextReactionCallback<T>, name: string, syncer?: (src: T, dest: T) => void) {
        return (te: TextElement, args: DependencyPropertyChangedEventArgs) => {
            var ov = args.OldValue;
            var nv = args.NewValue;
            var upd = te.XamlNode.TextUpdater;
            UnreactTo(ov, te);
            if (!syncer)
                upd.assets[name] = nv;
            else
                syncer(nv, upd.assets[name]);
            callback && callback(upd, ov, nv, te);
            ReactTo(nv, te, () => callback && callback(upd, nv, nv, te));
        };
    }
}