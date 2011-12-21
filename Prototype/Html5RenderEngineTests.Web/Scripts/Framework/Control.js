/// <reference path="FrameworkElement.js" />

//Control.BackgroundProperty;
//Control.BorderBrushProperty;
//Control.BorderThicknessProperty;
//Control.FontFamilyProperty;
//Control.FontSizeProperty;
//Control.FontStretchProperty;
//Control.FontStyleProperty;
//Control.FontWeightProperty;
//Control.ForegroundProperty;
//Control.HorizontalContentAlignmentProperty;
Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", Control, true);
//Control.IsTemplateItemProperty;
//Control.IsTabStopProperty;
//Control.PaddingProperty;
//Control.TabIndexProperty;
//Control.TabNavigationProperty;
//Control.TemplateProperty;
//Control.VerticalContentAlignmentProperty;
//Control.DefaultStyleKeyProperty;
Control.prototype = new FrameworkElement;
Control.prototype.constructor = Control;
function Control() {
    FrameworkElement.call(this);
}