module Fayde {
    export interface IPropertyChangedCallback {
        (dobj: DependencyObject, args: DependencyPropertyChangedEventArgs): void;
    }
    export interface IListenable {
        Listen(changed: () => void): () => void;
    }

    export function Reaction<TValue>(react: (uie: UIElement, oldValue: TValue, newValue: TValue) => void): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            react(uie, args.OldValue, args.NewValue);
        };
    }

    export function LReaction<TValue extends IListenable>(react: (uie: UIElement, oldValue: TValue, newValue: TValue) => void): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            var val = args.NewValue;
            if (args.OldValue === val)
                return; //TODO: Check to see if we can remove
            var detachers = (<any>uie).$$reaction_detachers = (<any>uie).$$reaction_detachers || {};
            var detach = detachers[args.Property._ID];
            if (detach)
                detach();
            react(uie, args.OldValue, val);
            if (val)
                detachers[args.Property._ID] = args.NewValue.Listen(() => react(uie, val, val));
        };
    }

    export function MReaction (minervaReactName: string): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            minerva.core.reactTo[minervaReactName](uie.XamlNode.LayoutUpdater, args.OldValue, args.NewValue);
        };
    }

    export function MLReaction<TValue extends IListenable> (minervaReactName: string): IPropertyChangedCallback {
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            var val = args.NewValue;
            if (args.OldValue === val)
                return; //TODO: Check to see if we can remove
            var detachers = (<any>uie).$$reaction_detachers = (<any>uie).$$reaction_detachers || {};
            var detach = detachers[args.Property._ID];
            if (detach)
                detach();
            minerva.core.reactTo[minervaReactName](uie.XamlNode.LayoutUpdater, args.OldValue, val);
            if (val)
                detachers[args.Property._ID] = args.NewValue.Listen(() => minerva.core.reactTo[minervaReactName](uie.XamlNode.LayoutUpdater, val, val));
        };
    }
}