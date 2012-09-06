/// <reference path="../../Runtime/EventArgs.js"/>

//#region SelectionChangedEventArgs
var SelectionChangedEventArgs = Nullstone.Create("SelectionChangedEventArgs", EventArgs, 2);

SelectionChangedEventArgs.Instance.Init = function (oldVals, newVals) {
    this.Init$EventArgs();
    this.OldValues = oldVals.slice(0);
    this.NewValues = newVals.slice(0);
};

Nullstone.FinishCreate(SelectionChangedEventArgs);
//#endregion