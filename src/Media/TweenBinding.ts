module Fayde.Media {
    import convert = nullstone.convertAnyToType;

    export class TweenBinding implements nullstone.markup.IMarkupExtension, ICloneable {
        Binding: Data.Binding;
        Duration: Duration;

        constructor();
        constructor(path: string|Data.PropertyPath);
        constructor(tbinding: TweenBinding);
        constructor(binding: Data.Binding);
        constructor(obj?: any) {
            if (obj instanceof TweenBinding) {
                this.Binding = obj.Binding ? obj.Binding.Clone() : null;
                this.Duration = obj.Duration ? obj.Duration.Clone() : null;
            } else if (obj instanceof Data.Binding) {
                this.Binding = obj.Clone();
            } else if (typeof obj === "string") {
                this.Binding = new Data.Binding(<string>obj);
            } else if (obj instanceof Data.PropertyPath) {
                this.Binding = new Data.Binding(obj);
            } else {
                this.Binding = new Data.Binding("");
            }
        }

        init(val: string): any {
            this.Binding = new Data.Binding(val);
        }

        transmute(os: any[]): any {
            this.$$coerce();
            this.$$validate();
            Object.freeze(this);
            return new TweenBindingExpression(this);
        }

        private $$coerce() {
            if (!(this.Binding instanceof Data.Binding))
                this.Binding = new Data.Binding(this.Binding);
            (<any>this.Binding).$$coerce();
            this.Duration = convert(this.Duration, Duration);
        }

        private $$validate() {
            if (this.Binding.Mode !== Data.BindingMode.OneWay)
                throw new Error("TweenBinding only supports one-way bindings currently.");
        }

        Clone(): any {
            return new TweenBinding(this);
        }
    }
    Fayde.CoreLibrary.add(TweenBinding);
}