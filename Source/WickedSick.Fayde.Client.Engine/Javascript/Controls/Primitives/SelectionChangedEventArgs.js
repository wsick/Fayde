/// <reference path="../../Runtime/EventArgs.js"/>

(function (namespace) {
    var SelectionChangedEventArgs = Nullstone.Create("SelectionChangedEventArgs", EventArgs, 2);

    SelectionChangedEventArgs.Instance.Init = function (oldVals, newVals) {
        this.OldValues = oldVals.slice(0);
        this.NewValues = newVals.slice(0);
    };

    namespace.SelectionChangedEventArgs = Nullstone.FinishCreate(SelectionChangedEventArgs);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));