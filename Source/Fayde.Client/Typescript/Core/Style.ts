/// <reference path="DependencyObject.ts" />

module Fayde {
    export class Style extends DependencyObject {
        private _IsSealed: boolean = false;

        static SettersProperty = DependencyProperty.RegisterImmutable("Setters", () => SetterCollection, Style);
        static BasedOnProperty: DependencyProperty = DependencyProperty.Register("BasedOn", () => Style, Style);
        static TargetTypeProperty: DependencyProperty = DependencyProperty.Register("TargetType", () => Function, Style);
        Setters: SetterCollection;
        BasedOn: Style;
        TargetType: Function;

        static Annotations = { ContentProperty: Style.SettersProperty }

        constructor() {
            super();
            var coll = Style.SettersProperty.Initialize<SetterCollection>(this);
            coll.AttachTo(this);
        }

        Seal() {
            if (this._IsSealed)
                return;
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;

            var base = this.BasedOn;
            if (base)
                base.Seal();
        }

        Validate(instance: DependencyObject, error: BError): boolean {
            var parentType = <Function>(<any>instance).constructor;

            if (this._IsSealed) {
                if (!(instance instanceof this.TargetType)) {
                    //if (!Nullstone.DoesInheritFrom(parentType, style.TargetType)) {
                    error.Number = BError.XamlParse;
                    error.Message = "Style.TargetType (" + (<any>this.TargetType)._TypeName + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                    return false;
                }
                return true;
            }

            // 1 Check for circular references in the BasedOn tree
            var cycles = [];
            var root = this;
            while (root) {
                if (cycles.indexOf(root) > -1) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Circular reference in Style.BasedOn";
                    return false;
                }
                cycles.push(root);
                root = root.BasedOn;
            }
            cycles = null;

            // 2 Check that the instance is a subclass of Style::TargetType and also all the styles TargetTypes are
            //   subclasses of their BasedOn styles TargetType.
            root = this;
            var targetType: Function;
            while (root) {
                targetType = root.TargetType;
                if (root === this) {
                    if (!targetType) {
                        error.Number = BError.InvalidOperation;
                        error.Message = "TargetType cannot be null";
                        return false;
                    } else if (!Nullstone.DoesInheritFrom(parentType, targetType)) {
                        error.Number = BError.XamlParse; 
                        error.Message = "Style.TargetType (" + (<any>targetType)._TypeName + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                        return false;
                    }
                } else if (!targetType || !Nullstone.DoesInheritFrom(parentType, targetType)) {
                    error.Number = BError.InvalidOperation;
                    error.Message = "Style.TargetType (" + (targetType ? (<any>targetType)._TypeName : "<Not Specified>") + ") is not a subclass of (" + (<any>parentType)._TypeName + ")";
                    return false;
                }
                parentType = targetType;
                root = root.BasedOn;
            }

            // 3 This style is now OK and never needs to be checked again.
            this.Seal();
            return true;
        }
    }
    Fayde.RegisterType(Style, {
    	Name: "Style",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}