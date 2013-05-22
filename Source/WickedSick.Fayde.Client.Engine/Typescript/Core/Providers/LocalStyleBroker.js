var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../FrameworkElement.ts" />
    (function (Providers) {
        var LocalStyleBroker = (function () {
            function LocalStyleBroker() { }
            LocalStyleBroker.Set = function Set(fe, newStyle) {
                var holder = fe.XamlNode;
                var arr = (fe)._PropertyStorage;
                var oldWalker = Fayde.SingleStyleWalker(holder._LocalStyle);
                var newWalker = Fayde.SingleStyleWalker(newStyle);
                newStyle.Seal();
                var oldSetter = oldWalker.Step();
                var newSetter = newWalker.Step();
                var oldProp;
                var newProp;
                var storage;
                var oldValue = undefined;
                var newValue = undefined;
                var propd;
                while(oldSetter || newSetter) {
                    if(oldSetter) {
                        propd = oldProp = oldSetter.Property;
                        oldValue = oldSetter.ConvertedValue;
                    }
                    if(newSetter) {
                        propd = newProp = newSetter.Property;
                        newValue = newSetter.ConvertedValue;
                    }
                    storage = arr[propd._ID];
                    if(!storage) {
                        storage = arr[propd._ID] = propd.Store.CreateStorage(fe, propd);
                    }
                    propd.Store.SetLocalStyleValue(storage, newValue);
                    if(oldProp) {
                        oldSetter = oldWalker.Step();
                    }
                    if(newProp) {
                        newSetter = newWalker.Step();
                    }
                }
                holder._LocalStyle = newStyle;
            };
            return LocalStyleBroker;
        })();
        Providers.LocalStyleBroker = LocalStyleBroker;        
    })(Fayde.Providers || (Fayde.Providers = {}));
    var Providers = Fayde.Providers;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LocalStyleBroker.js.map
