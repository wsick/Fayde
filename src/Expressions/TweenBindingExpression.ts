module Fayde.Media {
    export class TweenBindingExpression extends Data.BindingExpression {
        constructor(tbinding: TweenBinding) {
            super(tbinding.Binding);
        }
    }
}