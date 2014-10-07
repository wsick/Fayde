module Fayde {
    export function UIReactionAttached<TValue>(propd: DependencyProperty, callback?: IUIReactionCallback<TValue>) {
        var aname = GetTypeName(propd.OwnerType) + '.' + propd.Name;
        return (uie: UIElement, args: DependencyPropertyChangedEventArgs) => {
            var ov = args.OldValue;
            var nv = args.NewValue;
            var upd = uie.XamlNode.LayoutUpdater;
            upd.setAttachedValue(aname, nv);
            callback && callback(upd, ov, nv, uie);
        };
    }
}