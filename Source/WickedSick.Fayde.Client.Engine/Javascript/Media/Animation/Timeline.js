/// <reference path="DependencyObject.js"/>
/// CODE

//#region Timeline

function Timeline() {
    DependencyObject.call(this);
    this.Completed = new MulticastEvent();
}
Timeline.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

Timeline.DurationProperty = DependencyProperty.Register("Duration", function () { return Duration; }, Timeline);
Timeline.prototype.GetDuration = function () {
    ///<returns type="Duration"></returns>
    return this.GetValue(Timeline.DurationProperty);
};
Timeline.prototype.SetDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this.SetValue(Timeline.DurationProperty, value);
};

//#endregion

//#endregion