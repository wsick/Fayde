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

ContentControl.ContentProperty = DependencyProperty.RegisterCore("Content", function () { return Object; }, ContentControl, undefined, function (d, args) { d.OnContentChanged(args.OldValue, args.NewValue); });
ContentControl.ContentTemplateProperty = DependencyProperty.RegisterCore("ContentTemplate", function () { return ControlTemplate; }, ContentControl, undefined, function (d, args) { d.OnContentTemplateChanged(args.OldValue, args.NewValue); });

Nullstone.AutoProperties(ContentControl, [
    ContentControl.ContentProperty,
    ContentControl.ContentTemplateProperty
]);

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
    var content = this.Content;
    if (!content)
        return null;
    var uie = Nullstone.As(content, UIElement);
    if (uie)
        return uie;
    return this._GetDefaultTemplate$Control();
};
ContentControl.Instance._GetDefaultTemplateCallback = function () {
    return this._GetFallbackRoot();
};

ContentControl.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== ContentControl) {
        this._OnPropertyChanged$Control(args, error);
        return;
    }

    if (args.Property._ID === ContentControl.ContentProperty._ID) {
        if (args.OldValue && args.OldValue instanceof UIElement) {
            if (args.OldValue instanceof FrameworkElement) {
                if (this._ContentSetsParent) {
                    args.OldValue._SetLogicalParent(null, error);
                    if (error.IsErrored())
                        return;
                }
            }
            this._ElementRemoved(args.OldValue);
            this._SetSubtreeObject(null);
        }
        if (args.NewValue && args.NewValue instanceof FrameworkElement) {
            if (this._ContentSetsParent) {
                args.NewValue._SetLogicalParent(this, error);
                if (error.IsErrored())
                    return;
            }
        }
        this._InvalidateMeasure();
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