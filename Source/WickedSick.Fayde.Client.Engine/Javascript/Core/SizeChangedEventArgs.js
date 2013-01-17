/// <reference path="RoutedEventArgs.js"/>
/// CODE
/// <reference path="../Primitives/Size.js"/>

(function (namespace) {
    var SizeChangedEventArgs = Nullstone.Create("SizeChangedEventArgs", RoutedEventArgs, 2);

    SizeChangedEventArgs.Instance.Init = function (prevSize, newSize) {
        /// <param name="prevSize" type="Size"></param>
        /// <param name="newSize" type="Size"></param>
        this.Init$RoutedEventArgs();
        this.PreviousSize = prevSize.Copy();
        this.NewSize = newSize.Copy();
    };

    namespace.SizeChangedEventArgs = Nullstone.FinishCreate(SizeChangedEventArgs);
})(window);