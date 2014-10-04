module Fayde {
    export interface IPropertyChangedCallback {
        (dobj: DependencyObject, args: DependencyPropertyChangedEventArgs): void;
    }
    interface IReactable {
        $$reaction_sources: any[];
        $$reactions: IReaction[];
    }
    interface IReaction {
        (): void;
    }

    export function Incite (obj: any) {
        if (!dobj)
            return;
        var reactions = (<IReactable>dobj).$$reactions;
        if (!reactions)
            return;
        for (var i = 0; i < reactions.length; i++) {
            reactions[i]();
        }
    }

    export function ReactTo (obj: any, scope: any, changed: () => void) {
        if (!obj)
            return;
        var rs = obj.$$reaction_sources = obj.$$reaction_sources || [];
        rs.push(scope);
        var reactions = obj.$$reactions = obj.$$reactions || [];
        reactions.push(changed);
    }

    export function UnreactTo (obj: any, scope: any) {
        if (!obj)
            return;
        var reactions = obj.$$reactions;
        if (!reactions)
            return;
        var rs = obj.$$reaction_sources;
        var index = rs.indexOf(scope);
        if (index < 0)
            return;
        rs.splice(index, 1);
        reactions.splice(index, 1);
    }

    export function Reaction<TValue>(react: (dobj: DependencyObject, oldValue: TValue, newValue: TValue) => void): IPropertyChangedCallback {
        return (dobj: DependencyObject, args: DependencyPropertyChangedEventArgs) => {
            react(dobj, args.OldValue, args.NewValue);
        };
    }

    export function LReaction<TValue>(react: (dobj: DependencyObject, oldValue: TValue, newValue: TValue) => void): IPropertyChangedCallback {
        return (dobj: DependencyObject, args: DependencyPropertyChangedEventArgs) => {
            var val = args.NewValue;
            if (args.OldValue === val)
                return; //TODO: Check to see if we can remove
            UnreactTo(args.OldValue, dobj);
            react(dobj, args.OldValue, val);
            ReactTo(args.NewValue, dobj, () => react(dobj, val, val));
        };
    }

    export function MReaction<TValue> (minervaReactName: string, syncer?: minerva.core.ISyncer<TValue>, extra?: (uie: UIElement, oldValue: any, newValue: any) => void): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            var upd = uie.XamlNode.LayoutUpdater;
            minerva.core.sync<TValue>(upd, minervaReactName, args.NewValue, syncer);
            minerva.core.reactTo[minervaReactName](upd, args.OldValue, args.NewValue);
            extra && extra(uie, args.OldValue, args.NewValue);
        };
    }

    export function MLReaction<TValue> (minervaReactName: string, syncer?: minerva.core.ISyncer<TValue>, extra?: (uie: UIElement, oldValue: TValue, newValue: TValue) => void): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            var val = args.NewValue;
            if (args.OldValue === val)
                return; //TODO: Check to see if we can remove
            UnreactTo(args.OldValue, uie);
            var upd = uie.XamlNode.LayoutUpdater;
            minerva.core.sync<TValue>(upd, minervaReactName, val, syncer);
            minerva.core.reactTo[minervaReactName](upd, args.OldValue, val);
            extra && extra(uie, args.OldValue, value);
            ReactTo(args.NewValue, uie, () => minerva.core.reactTo[minervaReactName](uie.XamlNode.LayoutUpdater, val, val));
        };
    }
}