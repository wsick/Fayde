/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// <reference path="Grid.js"/>
/// <reference path="TextBlock.js"/>
/// <reference path="ControlTemplate.js"/>
/// CODE

//#region ContentControl
var ContentControl = Nullstone.Create("ContentControl", Control);

ContentControl.Instance.Init = function () {
    this.Init$Control();
    this._ContentSetsParent = true;
};

//#region Dependency Properties

ContentControl._OnContentPropertyChanged = function (d, args) {
    d.OnContentChanged(args.OldValue, args.NewValue);
};
ContentControl.ContentProperty = DependencyProperty.RegisterCore("Content", function () { return Object; }, ContentControl, undefined, ContentControl._OnContentPropertyChanged);
ContentControl.Instance.GetContent = function () {
    return this.$GetValue(ContentControl.ContentProperty);
};
ContentControl.Instance.SetContent = function (value) {
    this.$SetValue(ContentControl.ContentProperty, value);
};

ContentControl._OnContentTemplatePropertyChanged = function (d, args) {
    d.OnContentTemplateChanged(args.OldValue, args.NewValue);
};
ContentControl.ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () { return ControlTemplate; }, ContentControl, undefined, ContentControl._OnContentTemplatePropertyChanged);
ContentControl.Instance.GetContentTemplate = function () {
    return this.$GetValue(ContentControl.ContentTemplateProperty);
};
ContentControl.Instance.SetContentTemplate = function (value) {
    this.$SetValue(ContentControl.ContentTemplateProperty, value);
};

//#endregion

//#region Properties

// <ControlTemplate><Grid><TextBlock Text="{Binding}" /></Grid></ControlTemplate>
ContentControl.Instance._CreateFallbackTemplate = function () {
    return new ControlTemplate(ContentControl, {
        Type: Grid,
        Children: [
            {
                Type: TextBlock,
                Props: {
                    Text: new BindingMarkup()
                }
            }
        ]
    });
};
ContentControl.Instance._GetFallbackRoot = function () {
    /// <returns type="UIElement" />
    if (this._FallbackRoot == null) {
        if (!ContentPresenter._FallbackTemplate)
            ContentPresenter._FallbackTemplate = this._CreateFallbackTemplate();
        this._FallbackRoot = ContentPresenter._FallbackTemplate.GetVisualTree(this);
    }
    return this._FallbackRoot;
};

//#endregion

//#region Instance Methods

ContentControl.Instance.OnContentChanged = function (oldContent, newContent) {
};
ContentControl.Instance.OnContentTemplateChanged = function (oldContentTemplate, newContentTemplate) {
};

ContentControl.Instance._GetDefaultTemplate = function () {
    var content = this.GetContent();
    if (!content)
        return null;
    var uie = Nullstone.As(content, UIElement);
    if (uie)
        return uie;
    return this._GetDefaultTemplate$Control();
};
ContentControl.Instance._GetDefaultTemplateCallback = function () {
    return _GetFallbackRoot();
};

ContentControl.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentControl) {
        this._OnPropertyChanged$Control(args, error);
        return;
    }

    if (args.Property._ID === ContentControl.ContentProperty._ID) {
        if (args.OldValue && Nullstone.Is(args.OldValue, FrameworkElement)) {
            if (this._ContentSetsParent) {
                args.OldValue._SetLogicalParent(null, error);
                if (error.IsErrored())
                    return;
            }
        }
        if (args.NewValue && Nullstone.Is(args.NewValue, FrameworkElement)) {
            if (this._ContentSetsParent) {
                args.NewValue._SetLogicalParent(this, error);
                if (error.IsErrored())
                    return;
            }
        }
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region Annotations

ContentControl.Annotations = {
    ContentProperty: ContentControl.ContentProperty
};

//#endregion

Nullstone.FinishCreate(ContentControl);
//#endregion