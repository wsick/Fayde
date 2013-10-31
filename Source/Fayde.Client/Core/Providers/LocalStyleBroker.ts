
module Fayde.Providers {
    export interface IStyleHolder {
        _LocalStyle: Style;
    }

    export class LocalStyleBroker {
        static Set(fe: FrameworkElement, newStyle: Style) {
            var holder = <IStyleHolder>fe.XamlNode;
            var arr = (<IPropertyStorageOwner>fe)._PropertyStorage;

            var oldWalker = SingleStyleWalker(holder._LocalStyle);
            var newWalker = SingleStyleWalker(newStyle);
            newStyle.Seal();
            var oldSetter = oldWalker.Step();
            var newSetter = newWalker.Step();
            var oldProp: DependencyProperty;
            var newProp: DependencyProperty;
            
            var storage: IPropertyStorage;
            var oldValue = undefined;
            var newValue = undefined;
            var propd: DependencyProperty;
            while (oldSetter || newSetter) {
                if (oldSetter) {
                    propd = oldProp = oldSetter.Property;
                    oldValue = oldSetter.ConvertedValue;
                }
                if (newSetter) {
                    propd = newProp = newSetter.Property;
                    newValue = newSetter.ConvertedValue;
                }

                storage = arr[propd._ID];
                if (!storage)
                    storage = arr[propd._ID] = propd.Store.CreateStorage(fe, propd);
                propd.Store.SetLocalStyleValue(storage, newValue);

                if (oldProp)
                    oldSetter = oldWalker.Step();
                if (newProp)
                    newSetter = newWalker.Step();
            }

            holder._LocalStyle = newStyle;
        }
    }
}