/// <reference path="FrameworkElement.js" />

function Control() {
    FrameworkElement.apply(this);
}
Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", Control);
Control.prototype = new FrameworkElement();