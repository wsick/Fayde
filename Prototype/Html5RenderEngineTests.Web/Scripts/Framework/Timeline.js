/// <reference path="DependencyObject.js"/>
/// <reference path="Collections.js"/>
/// CODE

//#region Timeline

function Timeline() {
    DependencyObject.call(this);
}
Timeline.InheritFrom(DependencyObject);

//#endregion

//#region TimelineCollection

function TimelineCollection() {
    PresentationFrameworkCollection.call(this);
}
TimelineCollection.InheritFrom(PresentationFrameworkCollection);

//#endregion