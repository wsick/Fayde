/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="UIElement.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="PropertyValueProviders/StylePropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/ImplicitStylePropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/FrameworkElementPropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/InheritedDataContextPropertyValueProvider.js"/>
/// <reference path="UpdateMetrics.js"/>
/// CODE
/// <reference path="FrameworkElementMetrics.js"/>
/// <reference path="../Runtime/BError.js"/>
/// <reference path="Style.js"/>
/// <reference path="VisualTreeHelper.js"/>
/// <reference path="../Primitives.js"/>

(function (Fayde) {
    var UIElementFlags = Fayde.UIElementFlags;

    var FrameworkElement = Nullstone.Create("FrameworkElement", Fayde.UIElement);

    FrameworkElement.Instance.Init = function () {
        this.Init$UIElement();

        this.AddProvider(new Fayde._StylePropertyValueProvider(this));
        this.AddProvider(new Fayde._ImplicitStylePropertyValueProvider(this));
        this.AddProvider(new Fayde.FrameworkElementPropertyValueProvider(this));
        this.AddProvider(new Fayde._InheritedDataContextPropertyValueProvider(this));

        this.SizeChanged = new MulticastEvent();
        this.LayoutUpdated = {
            Subscribe: function (callback, closure) {
                var surface = App.Instance.MainSurface;
                if (surface)
                    surface.LayoutUpdated.Subscribe(callback, closure);
            },
            Unsubscribe: function (callback, closure) {
                var surface = App.Instance.MainSurface;
                if (surface)
                    surface.LayoutUpdated.Unsubscribe(callback, closure);
            }
        };
    };
    FrameworkElement.Instance.InitSpecific = function () {
        this._Metrics = new Fayde.FrameworkElementMetrics();
    };

    //#region Properties

    var marginAutoCreator = {
        GetValue: function (propd, dobj) {
            var t = new Thickness();
            dobj._UpdateMetrics.Margin = t;
            return t;
        }
    };

    FrameworkElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () { return new Enum(CursorType); }, FrameworkElement, CursorType.Default); //TODO: AutoCreator: FrameworkElement._CoerceCursor);
    FrameworkElement.HeightProperty = DependencyProperty.RegisterCore("Height", function () { return Number; }, FrameworkElement, NaN, function (d, args) { d._UpdateMetrics.Height = args.NewValue; });
    FrameworkElement.WidthProperty = DependencyProperty.RegisterCore("Width", function () { return Number; }, FrameworkElement, NaN, function (d, args) { d._UpdateMetrics.Width = args.NewValue; });
    FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () { return Number; }, FrameworkElement);
    FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () { return Number; }, FrameworkElement);
    FrameworkElement.DataContextProperty = DependencyProperty.RegisterCore("DataContext", function () { return Object; }, FrameworkElement);
    FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.RegisterCore("HorizontalAlignment", function () { return new Enum(Fayde.HorizontalAlignment); }, FrameworkElement, Fayde.HorizontalAlignment.Stretch, function (d, args) { d._UpdateMetrics.HorizontalAlignment = args.NewValue; });
    FrameworkElement.LanguageProperty = DependencyProperty.RegisterCore("Language", function () { return String; }, FrameworkElement);
    FrameworkElement.MarginProperty = DependencyProperty.RegisterFull("Margin", function () { return Thickness; }, FrameworkElement, undefined, function (d, args) { d._UpdateMetrics.Margin = args.NewValue; }, marginAutoCreator);
    FrameworkElement.MaxHeightProperty = DependencyProperty.RegisterCore("MaxHeight", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) { d._UpdateMetrics.MaxHeight = args.NewValue; });
    FrameworkElement.MaxWidthProperty = DependencyProperty.RegisterCore("MaxWidth", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) { d._UpdateMetrics.MaxWidth = args.NewValue; });
    FrameworkElement.MinHeightProperty = DependencyProperty.RegisterCore("MinHeight", function () { return Number; }, FrameworkElement, 0.0, function (d, args) { d._UpdateMetrics.MinHeight = args.NewValue; });
    FrameworkElement.MinWidthProperty = DependencyProperty.RegisterCore("MinWidth", function () { return Number; }, FrameworkElement, 0.0, function (d, args) { d._UpdateMetrics.MinWidth = args.NewValue; });
    FrameworkElement.VerticalAlignmentProperty = DependencyProperty.RegisterCore("VerticalAlignment", function () { return new Enum(Fayde.VerticalAlignment); }, FrameworkElement, Fayde.VerticalAlignment.Stretch, function (d, args) { d._UpdateMetrics.VerticalAlignment = args.NewValue; });
    FrameworkElement.StyleProperty = DependencyProperty.RegisterCore("Style", function () { return Fayde.Style; }, FrameworkElement);
    FrameworkElement.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () { return new Enum(Fayde.FlowDirection); }, FrameworkElement, Fayde.FlowDirection.LeftToRight, function (d, args) { d._UpdateMetrics.FlowDirection = args.NewValue; }, undefined, _Inheritable.FlowDirection);

    Nullstone.AutoProperties(FrameworkElement, [
        FrameworkElement.CursorProperty,
        FrameworkElement.WidthProperty,
        FrameworkElement.HeightProperty,
        FrameworkElement.DataContextProperty,
        FrameworkElement.HorizontalAlignmentProperty,
        FrameworkElement.LanguageProperty,
        FrameworkElement.MarginProperty,
        FrameworkElement.MaxWidthProperty,
        FrameworkElement.MaxHeightProperty,
        FrameworkElement.MinWidthProperty,
        FrameworkElement.MinHeightProperty,
        FrameworkElement.VerticalAlignmentProperty,
        FrameworkElement.StyleProperty,
        FrameworkElement.FlowDirectionProperty
    ]);

    Nullstone.AutoPropertiesReadOnly(FrameworkElement, [
        FrameworkElement.ActualWidthProperty,
        FrameworkElement.ActualHeightProperty
    ]);

    Nullstone.Property(FrameworkElement, "Parent", {
        get: function () {
            return this._LogicalParent;
        }
    });

    //#endregion

    //#region Instance Methods

    FrameworkElement.Instance.SetTemplateBinding = function (propd, tb) {
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="tb" type="TemplateBindingExpression"></param>
        try {
            this.$SetValue(propd, tb);
        } catch (err) {
        }
    };
    FrameworkElement.Instance.SetBinding = function (propd, binding) {
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="binding" type="Binding"></param>
        /// <returns type="BindingExpressionBase" />
        return Fayde.BindingOperations.SetBinding(this, propd, binding);
    };
    FrameworkElement.Instance.GetBindingExpression = function (propd) {
        var data = {};
        if (this._Expressions && this._Expressions.TryGetValue(propd, data))
            return data.Value;
        return null;
    };

    FrameworkElement.Instance._GetTransformOrigin = function () {
        var userXformOrigin = this.RenderTransformOrigin;
        var width = this.ActualWidth;
        var height = this.ActualHeight;
        return new Point(width * userXformOrigin.X, height * userXformOrigin.Y);
    };

    //#region Actual Size

    FrameworkElement.Instance._GetSizeForBrush = function () {
        return {
            Width: this.ActualWidth,
            Height: this.ActualHeight
        };
    };

    FrameworkElement.Instance._PurgeSizeCache = function () {
        delete this._CachedValues[FrameworkElement.ActualWidthProperty];
        delete this._CachedValues[FrameworkElement.ActualHeightProperty];
    };
    FrameworkElement.Instance._ComputeActualSize = function () {
        if (this.Visibility !== Fayde.Visibility.Visible)
            return new size();

        var parent = this.GetVisualParent();
        if ((parent && !(parent instanceof Fayde.Controls.Canvas)) || this.IsLayoutContainer())
            return size.clone(this._RenderSize);

        return this._ApplySizeConstraints(new size());
    };

    FrameworkElement.Instance._ApplySizeConstraints = function (s) {
        /// <param name="s" type="size"></param>
        return this._UpdateMetrics.CoerceSize(s);
    };

    //#endregion

    //#region Measure/Arrange

    FrameworkElement.Instance._MeasureOverride = function (availableSize, pass, error) {
        var desired = new size();

        availableSize = size.clone(availableSize);
        size.max(availableSize, desired);

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            child._Measure(availableSize, error);
            desired = size.clone(child._DesiredSize);
        }

        size.min(desired, availableSize);
        return desired;
    };
    FrameworkElement.Instance._ArrangeOverride = function (finalSize, pass, error) {
        var arranged = size.clone(finalSize);

        var walker = new Fayde._VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childRect = rect.fromSize(finalSize);
            child._Arrange(childRect, error);
            size.max(arranged, finalSize);
        }

        return arranged;
    };

    //#endregion

    //#region Hit Testing

    FrameworkElement.Instance._HitTestPoint = function (ctx, p, uielist) {
        if (!this._GetRenderVisible())
            return;
        if (!this._GetIsHitTestVisible())
            return;

        if (!this._InsideClip(ctx, p.X, p.Y))
            return;

        var node = uielist.Prepend(new Fayde.UIElementNode(this));
        var hit = false;
        var walker = Fayde._VisualTreeWalker.ZReverse(this);
        var child;
        while (child = walker.Step()) {
            child._HitTestPoint(ctx, p, uielist);
            if (!Nullstone.RefEquals(node, uielist.Head)) {
                hit = true;
                break;
            }
        }

        if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, p.X, p.Y)))
            uielist.Remove(node);
    };
    FrameworkElement.Instance._InsideObject = function (ctx, x, y) {
        var np = new Point(x, y);
        this._TransformPoint(np);
        if (np.X < 0 || np.Y < 0 || np.X > this.ActualWidth || np.Y > this.ActualHeight)
            return false;

        if (!this._InsideLayoutClip(x, y))
            return false;

        return this._InsideObject$UIElement(ctx, x, y);
    };
    FrameworkElement.Instance._InsideLayoutClip = function (x, y) {
        //NotImplemented("FrameworkElement._InsideLayoutClip(x, y)");
        return true;
    };

    //#endregion

    FrameworkElement.Instance._HasLayoutClip = function () {
        var element = this;
        while (element) {
            if (Fayde.LayoutInformation.GetLayoutClip(element))
                return true;
            if (element instanceof Fayde.Controls.Canvas || element instanceof Fayde.Controls.UserControl)
                break;
            element = element.GetVisualParent();
        }
        return false;
    };
    FrameworkElement.Instance._RenderLayoutClip = function (ctx) {
        var element = this;
        var iX = 0;
        var iY = 0;

        while (element) {
            var geom = Fayde.LayoutInformation.GetLayoutClip(element);
            if (geom)
                ctx.Clip(geom);

            if (element instanceof Fayde.Controls.Canvas || element instanceof Fayde.Controls.UserControl)
                break;
            var visualOffset = element._UpdateMetrics.VisualOffset;
            if (visualOffset) {
                ctx.Translate(-visualOffset.X, -visualOffset.Y);
                iX += visualOffset.X;
                iY += visualOffset.Y;
            }

            element = element.GetVisualParent();
        }
        ctx.Translate(iX, iY);
    };

    FrameworkElement.Instance._ElementRemoved = function (value) {
        this._ElementRemoved$UIElement(value);
        if (Nullstone.RefEquals(this._SubtreeObject, value))
            this._SubtreeObject = null;
    };

    FrameworkElement.Instance.UpdateLayout = function () {
        var error = new BError();
        if (this._IsAttached) {
            App.Instance.MainSurface._UpdateLayout(error);
        } else {
            var pass = new Fayde.LayoutPass();
            this._UpdateLayer(pass, error);
            if (pass.Updated)
                App.Instance.MainSurface.LayoutUpdated.Raise(this, new EventArgs());
        }
        if (error.Message)
            throw new Exception(error.Message);
    };
    FrameworkElement.Instance._UpdateLayer = function (pass, error) {
        var element = this;
        var parent;
        while (parent = element.GetVisualParent())
            element = parent;

        var uie;
        while (pass.Count < Fayde.LayoutPass.MaxCount) {
            while (uie = pass.ArrangeList.shift()) {
                uie._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
                LayoutDebug("PropagateFlagUp DirtyArrangeHint");
            }
            while (uie = pass.SizeList.shift()) {
                uie._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                LayoutDebug("PropagateFlagUp DirtySizeHint");
            }
            pass.Count = pass.Count + 1;

            var flag = UIElementFlags.None;
            if (element.Visibility === Fayde.Visibility.Visible) {
                if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                    flag = UIElementFlags.DirtyMeasureHint;
                else if (element._HasFlag(UIElementFlags.DirtyArrangeHint))
                    flag = UIElementFlags.DirtyArrangeHint;
                else if (element._HasFlag(UIElementFlags.DirtySizeHint))
                    flag = UIElementFlags.DirtySizeHint;
            }

            if (flag !== UIElementFlags.None) {
                var measureWalker = new Fayde._DeepTreeWalker(element);
                var child;
                while (child = measureWalker.Step()) {
                    if (child.Visibility !== Fayde.Visibility.Visible || !child._HasFlag(flag)) {
                        measureWalker.SkipBranch();
                        continue;
                    }
                    child._ClearFlag(flag);
                    switch (flag) {
                        case UIElementFlags.DirtyMeasureHint:
                            if (child._DirtyFlags & _Dirty.Measure)
                                pass.MeasureList.push(child);
                            break;
                        case UIElementFlags.DirtyArrangeHint:
                            if (child._DirtyFlags & _Dirty.Arrange)
                                pass.ArrangeList.push(child);
                            break;
                        case UIElementFlags.DirtySizeHint:
                            if (child._UpdateMetrics.LastRenderSize !== undefined)
                                pass.SizeList.push(child);
                            break;
                        default:
                            break;
                    }
                }
            }

            if (flag === UIElementFlags.DirtyMeasureHint) {
                LayoutDebug("Starting _MeasureList Update: " + pass.MeasureList.length);
                while (uie = pass.MeasureList.shift()) {
                    LayoutDebug("Measure [" + uie.__DebugToString() + "]");
                    uie._DoMeasureWithError(error);
                    pass.Updated = true;
                }
            } else if (flag === UIElementFlags.DirtyArrangeHint) {
                LayoutDebug("Starting _ArrangeList Update: " + pass.ArrangeList.length);
                while (uie = pass.ArrangeList.shift()) {
                    LayoutDebug("Arrange [" + uie.__DebugToString() + "]");
                    uie._DoArrangeWithError(error);
                    pass.Updated = true;
                    if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                        break;
                }
            } else if (flag === UIElementFlags.DirtySizeHint) {
                while (uie = pass.SizeList.shift()) {
                    pass.Updated = true;
                    
                    var last = uie._UpdateMetrics.LastRenderSize
                    if (last) {
                        uie._UpdateMetrics.LastRenderSize = undefined;
                        uie._PurgeSizeCache();
                        uie.SizeChanged.Raise(uie, new Fayde.SizeChangedEventArgs(last, uie._RenderSize));
                    }
                }
                LayoutDebug("Completed _SizeList Update");
            } else {
                break;
            }
        }
    };

    //#region Implicit Styles

    FrameworkElement.Instance._SetImplicitStyles = function (styleMask, styles) {
        var app = App.Instance;
        if (!app)
            return;

        if (!styles)
            styles = app._GetImplicitStyles(this, styleMask);

        var error = new BError();

        if (styles) {
            for (var i = 0; i < _StyleIndex.Count; i++) {
                var style = styles[i];
                if (!style)
                    continue;
                if (!Fayde.Validators.StyleValidator(this, FrameworkElement.StyleProperty, style, error)) {
                    Warn("Style validation failed. [" + error.Message + "]");
                    return;
                }
            }
        }

        this._Providers[_PropertyPrecedence.ImplicitStyle].SetStyles(styleMask, styles, error);
    };
    FrameworkElement.Instance._ClearImplicitStyles = function (styleMask) {
        var error = new BError();
        this._Providers[_PropertyPrecedence.ImplicitStyle].ClearStyles(styleMask, error);
    };

    //#endregion

    //#region Template

    FrameworkElement.Instance.OnApplyTemplate = function () { };
    FrameworkElement.Instance.ApplyTemplate = function () {
        var error = new BError();
        this._ApplyTemplateWithError(error);
        if (error.Message)
            throw new Exception(error.Message);
    };
    FrameworkElement.Instance._ApplyTemplateWithError = function (error) {
        if (this._SubtreeObject)
            return false;

        var result = this._DoApplyTemplateWithError(error);
        if (result)
            this.OnApplyTemplate();
        return result;
    };
    FrameworkElement.Instance._DoApplyTemplateWithError = function (error) {
        var uie = this._GetDefaultTemplate();
        if (uie) {
            uie._AddParent(this, true, error);
            if (error.Message)
                return false;
            this._SubtreeObject = uie;
            this._ElementAdded(uie);
        }
        return uie != null;
    };
    FrameworkElement.Instance._GetDefaultTemplate = function () {
        if (this._GetDefaultTemplateCallback)
            return this._GetDefaultTemplateCallback();
        return null;
    };

    //#endregion

    //#region Loaded

    FrameworkElement.Instance.InvokeLoaded = function () {
    };
    FrameworkElement.Instance._OnIsLoadedChanged = function (loaded) {
        if (loaded)
            this._SetImplicitStyles(_StyleMask.All);
        else
            this._ClearImplicitStyles(_StyleMask.VisualTree);

        this._OnIsLoadedChanged$UIElement(loaded);
        if (loaded)
            this.InvokeLoaded();

        if (this._Providers[_PropertyPrecedence.InheritedDataContext])
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    };

    //#endregion

    //#region Parent

    FrameworkElement.Instance.SetVisualParent = function (value) {
        /// <param name="value" type="UIElement"></param>
        this.SetVisualParent$UIElement(value);

        if (!this._LogicalParent && (!this._VisualParent || this._VisualParent instanceof FrameworkElement)) {
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(this._VisualParent);
            if (this._IsLoaded)
                this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
        }
    };
    FrameworkElement.Instance._SetLogicalParent = function (value, error) {
        if (Nullstone.RefEquals(this._LogicalParent, value))
            return;

        if (false/* TODO: IsShuttingDown */) {
            this._LogicalParent = null;
            return;
        }

        if (value && this._LogicalParent && !Nullstone.RefEquals(this._LogicalParent, value)) {
            error.SetErrored(BError.InvalidOperation, "Element is a child of another element");
            return;
        }

        var oldParent = this._LogicalParent;
        this._LogicalParent = value;
        this._OnLogicalParentChanged(oldParent, value);
    };
    FrameworkElement.Instance._GetLogicalParent = function () {
        return this._LogicalParent;
    };
    FrameworkElement.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
        if (false/* TODO: this._IsDisposing() */) {
        } else {
            var visualParent;
            if (newParent && newParent instanceof FrameworkElement)
                this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(newParent);
            else if ((visualParent = this.GetVisualParent()) && visualParent instanceof FrameworkElement)
                this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(visualParent);
            else
                this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(null);
            if (this._IsLoaded)
                this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
        }
    };

    //#endregion

    //#region Focus

    FrameworkElement.Instance._HasFocus = function () {
        for (var doh = Nullstone.As(Fayde.FocusManager.GetFocusedElement(), Fayde.DependencyObject) ; doh != null; doh = Fayde.VisualTreeHelper.GetParent(doh)) {
            if (Nullstone.RefEquals(doh, this))
                return true;
        }
        return false;
    };

    //#endregion

    //#endregion

    //#region Property Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        FrameworkElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== FrameworkElement) {
                this._OnPropertyChanged$UIElement(args, error);
                return;
            }

            var ivprop = false;
            switch (args.Property._ID) {
                case FrameworkElement.WidthProperty._ID:
                case FrameworkElement.MaxWidthProperty._ID:
                case FrameworkElement.MinWidthProperty._ID:
                case FrameworkElement.HeightProperty._ID:
                case FrameworkElement.MaxHeightProperty._ID:
                case FrameworkElement.MinHeightProperty._ID:
                case FrameworkElement.MarginProperty._ID:
                case FrameworkElement.FlowDirectionProperty._ID:
                    this._PurgeSizeCache();
                    ivprop = true;
                    break;
                case FrameworkElement.CursorProperty._ID:
                case FrameworkElement.HorizontalAlignmentProperty._ID:
                case FrameworkElement.VerticalAlignmentProperty._ID:
                    ivprop = true;
                    break;
                case FrameworkElement.StyleProperty._ID:
                    var newStyle = args.NewValue;
                    if (!error.Message)
                        this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
                    if (error.Message)
                        return;
                    break;
            }

            if (args.Property._ID === FrameworkElement.HorizontalAlignmentProperty._ID
                || args.Property._ID === FrameworkElement.WidthProperty._ID) {
                this.IsFixedWidth = this.CalculateIsFixedWidth();
            }
            if (args.Property._ID === FrameworkElement.VerticalAlignmentProperty._ID ||
                args.Property._ID === FrameworkElement.HeightProperty._ID) {
                this.IsFixedHeight = this.CalculateIsFixedHeight();
            }

            if (ivprop)
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        FrameworkElement.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== FrameworkElement) {
                this._OnPropertyChanged$UIElement(args, error);
                return;
            }

            var isSize = false;
            switch (args.Property._ID) {
                case FrameworkElement.WidthProperty._ID:
                case FrameworkElement.MaxWidthProperty._ID:
                case FrameworkElement.MinWidthProperty._ID:
                case FrameworkElement.HeightProperty._ID:
                case FrameworkElement.MaxHeightProperty._ID:
                case FrameworkElement.MinHeightProperty._ID:
                case FrameworkElement.MarginProperty._ID:
                case FrameworkElement.FlowDirectionProperty._ID:
                    isSize = true;
                    break;
                case FrameworkElement.HorizontalAlignmentProperty._ID:
                case FrameworkElement.VerticalAlignmentProperty._ID:
                    this._InvalidateArrange();
                    this._FullInvalidate(true);
                    break;
                case FrameworkElement.StyleProperty._ID:
                    var newStyle = args.NewValue;
                    if (!error.Message)
                        this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
                    if (error.Message)
                        return;
                    break;
            }
            if (isSize) {
                this._PurgeSizeCache();

                //TODO: var p = this._GetRenderTransformOrigin();
                //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
                this._FullInvalidate(false);

                var visualParent = this.GetVisualParent();
                if (visualParent)
                    visualParent._InvalidateMeasure();

                this._InvalidateMeasure();
                this._InvalidateArrange();
                this._UpdateBounds();
            }

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        FrameworkElement.Instance.GetContentHtmlElement = function () {
            return this.GetRootHtmlElement().firstChild;
        };
        FrameworkElement.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = document.createElement("div");
            var contentEl = rootEl.appendChild(document.createElement("div"));
            contentEl.style.zoom = "1";
            if (navigator.appName === "Microsoft Internet Explorer") {
                contentEl.style.filter = "inherit";
                contentEl.style.opacity = "inherit";
            }
            this.InitializeHtml(rootEl);
            return rootEl;
        };
        FrameworkElement.Instance.InitializeHtml = function (rootEl) {
            if (this.ApplySizing(rootEl)) {
                Surface._SizingAdjustments[this._ID] = this;
            }
        };
        FrameworkElement.Instance.OnHtmlAttached = function () {
            this.ApplyTemplate();
            var subtree = this._SubtreeObject;
            if (subtree) {
                this.GetRootHtmlElement().firstChild.appendChild(subtree.GetRootHtmlElement());
                subtree.OnHtmlAttached();
            }
        };
        FrameworkElement.Instance.OnHtmlDetached = function () {
            var subtree = this._SubtreeObject;
            if (subtree) {
                subtree.OnHtmlDetached();
                this.GetRootHtmlElement().firstChild.removeChild(subtree.GetRootHtmlElement());
            }
        };

        FrameworkElement.Instance.ApplySizing = function (rootEl) {
            var isStretchPlusShrink = false;
            var subEl = rootEl.firstChild;

            rootEl.style.display = "table";
            subEl.style.display = "table-cell";

            //apply resets
            rootEl.style.width = "";
            rootEl.style.left = "";
            rootEl.style.right = "";
            rootEl.style.height = "";
            rootEl.style.top = "";
            rootEl.style.bottom = "";

            subEl.style.maxWidth = "";
            subEl.style.maxHeight = "";
            subEl.style.width = "";
            subEl.style.height = "";
            subEl.style.left = "";
            subEl.style.right = "";
            subEl.style.top = "";
            subEl.style.bottom = "";

            //if width is explicitly set, stretch is changed to centered
            var horizontalAlignment = FrameworkElement.RealHorizontalAlignment(this.Width, this.HorizontalAlignment);
            //if height is explicitly set, stretch is changed to centered
            var verticalAlignment = FrameworkElement.RealVerticalAlignment(this.Height, this.VerticalAlignment);

            var horizontalLayoutType = HorizontalLayoutType.Shrink;
            if (horizontalAlignment === Fayde.HorizontalAlignment.Stretch && this.GetParentIsFixedWidth())
                //layout type only stays stretch if the parent is fixed width
                horizontalLayoutType = HorizontalLayoutType.Stretch;
            var verticalLayoutType = VerticalLayoutType.Shrink;
            if (verticalAlignment === Fayde.VerticalAlignment.Stretch && this.GetParentIsFixedHeight())
                //layout type only stays stretch if the parent is fixed height
                verticalLayoutType = VerticalLayoutType.Stretch;

            if (horizontalLayoutType == HorizontalLayoutType.Stretch || verticalLayoutType === VerticalLayoutType.Stretch) {
                rootEl.style.position = "absolute";
                subEl.style.position = "absolute";
                if (horizontalLayoutType === HorizontalLayoutType.Stretch) rootEl.style.width = "100%";
                if (verticalLayoutType === VerticalLayoutType.Stretch) rootEl.style.height = "100%";
                //if we are here we know width or height is stretch, if one of them is shrink then we have a stretch plus shrink scenario
                if (horizontalLayoutType === HorizontalLayoutType.Shrink || verticalLayoutType === VerticalLayoutType.Shrink) isStretchPlusShrink = true;
            }
            else {
                if (horizontalAlignment === Fayde.HorizontalAlignment.Left || horizontalAlignment === Fayde.HorizontalAlignment.Right || horizontalAlignment === Fayde.HorizontalAlignment.Center ||
                    verticalAlignment === Fayde.VerticalAlignment.Top || verticalAlignment === Fayde.VerticalAlignment.Bottom || verticalAlignment === Fayde.VerticalAlignment.Center) {
                    rootEl.style.position = "absolute";
                    subEl.style.position = "relative";
                    if (horizontalAlignment === Fayde.HorizontalAlignment.Left) rootEl.style.left = "0px";
                    if (horizontalAlignment === Fayde.HorizontalAlignment.Right) rootEl.style.right = "0px";
                    if (verticalAlignment === Fayde.VerticalAlignment.Top) rootEl.style.top = "0px";
                    if (verticalAlignment === Fayde.VerticalAlignment.Bottom) rootEl.style.bottom = "0px";
                }
                else {
                    rootEl.style.position = "relative";
                    subEl.style.position = "relative";
                }
            }

            this.ApplySizingMargin(rootEl, subEl, horizontalLayoutType, verticalLayoutType);
            this.ApplySizingSizes(rootEl, subEl);

            return isStretchPlusShrink;
        };
        FrameworkElement.Instance.ApplySizingMargin = function (rootEl, subEl, horizontalLayoutType, verticalLayoutType) {
            var margin = this.Margin;
            var left = margin.Left;
            if (isNaN(left)) left = 0;
            var top = margin.Top;
            if (isNaN(top)) top = 0;
            var right = margin.Right;
            if (isNaN(right)) right = 0;
            var bottom = margin.Bottom;
            if (isNaN(bottom)) bottom = 0;

            if (horizontalLayoutType === HorizontalLayoutType.Stretch) {
                subEl.style.left = left + "px";
                subEl.style.right = right + "px";
            } else {
                rootEl.style.marginLeft = left + "px";
                rootEl.style.marginRight = right + "px";
            }
            if (verticalLayoutType === VerticalLayoutType.Stretch) {
                subEl.style.top = top + "px";
                subEl.style.bottom = bottom + "px";
            } else {
                rootEl.style.marginTop = top + "px";
                rootEl.style.marginBottom = bottom + "px";
            }
        };
        FrameworkElement.Instance.ApplySizingSizes = function (rootEl, subEl) {
            if (!isNaN(this.Width)) {
                //explicit width
                rootEl.style.width = this.Width + "px";
            }
            if (!isNaN(this.Height)) {
                //explicit height
                rootEl.style.height = this.Height + "px";
            }

            //set max width and max height on root element
            rootEl.style.maxHeight = this.MaxHeight + "px";
            rootEl.style.maxWidth = this.MaxWidth + "px";
        };

        FrameworkElement.Instance.ApplyHtmlChanges = function (invalidations) {
            var sizingChecks = [Fayde.UIElement.IsFixedWidthProperty, Fayde.UIElement.IsFixedHeightProperty,
                FrameworkElement.HorizontalAlignmentProperty, FrameworkElement.VerticalAlignmentProperty,
                FrameworkElement.MarginProperty, FrameworkElement.WidthProperty, FrameworkElement.HeightProperty,
                FrameworkElement.MaxWidthProperty, FrameworkElement.MaxHeightProperty];
            for (var i = 0; i < sizingChecks.length; i++) {
                if (invalidations[sizingChecks[i]._ID]) {
                    if (this.ApplySizing(this.GetRootHtmlElement())) {
                        Surface._SizingAdjustments[this._ID] = this;
                    }
                    break;
                }
            }
            this.ApplyHtmlChanges$UIElement(invalidations);
        };
        FrameworkElement.Instance.CalculateAdjustedWidth = function (width) {
            var marginLeft = isNaN(this.Margin.Left) ? 0 : this.Margin.Left;
            var marginRight = isNaN(this.Margin.Right) ? 0 : this.Margin.Right;
            return width + marginLeft + marginRight;
        };
        FrameworkElement.Instance.CalculateAdjustedHeight = function (height) {
            var marginTop = isNaN(this.Margin.Top) ? 0 : this.Margin.Top;
            var marginBottom = isNaN(this.Margin.Bottom) ? 0 : this.Margin.Bottom;
            return height + marginTop + marginBottom;
        };
        FrameworkElement.Instance.UpdateAdjustedWidth = function (child, width) {
            delete Surface._SizingAdjustments[this._ID];
            if (!this.GetIsFixedWidth()) {
                this.GetContentHtmlElement().style.width = width + "px";
                var myWidth = this.CalculateAdjustedWidth(width);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedWidth(this, myWidth);
            }
        };
        FrameworkElement.Instance.UpdateAdjustedHeight = function (child, height) {
            delete Surface._SizingAdjustments[this._ID];
            if (!this.GetIsFixedHeight()) {
                this.GetContentHtmlElement().style.height = height + "px";
                var myHeight = this.CalculateAdjustedHeight(height);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedHeight(this, myHeight);
            }
        };
        FrameworkElement.Instance.FindAndSetAdjustedWidth = function () {
            var result;
            if (!this.GetIsFixedWidth()) {
                var subtree = this._SubtreeObject;
                var childWidth = 0;
                if (subtree && Nullstone.Is(subtree, FrameworkElement)) childWidth = subtree.FindAndSetAdjustedWidth();
                this.GetContentHtmlElement().style.width = childWidth + "px";
                result = this.CalculateAdjustedWidth(childWidth);
            }
            else result = this.CalculateAdjustedWidth(this.GetRootHtmlElement().offsetWidth);
            delete Surface._SizingAdjustments[this._ID];
            return result;
        };
        FrameworkElement.Instance.FindAndSetAdjustedHeight = function () {
            var result;
            if (!this.GetIsFixedHeight()) {
                var subtree = this._SubtreeObject;
                var childHeight = 0;
                if (subtree && Nullstone.Is(subtree, FrameworkElement)) childHeight = subtree.FindAndSetAdjustedHeight();
                this.GetContentHtmlElement().style.height = childHeight + "px";
                result = this.CalculateAdjustedHeight(childHeight);
            }
            else result = this.CalculateAdjustedHeight(this.GetRootHtmlElement().offsetHeight);
            delete Surface._SizingAdjustments[this._ID];
            return result;
        };
        FrameworkElement.RealHorizontalAlignment = function (width, horizontalAlignment) {
            //if width is defined, horizontal alignment is no longer stretched
            if (!isNaN(width) && horizontalAlignment === Fayde.HorizontalAlignment.Stretch) {
                //TODO: this should be centered, not left
                return Fayde.HorizontalAlignment.Left;
            }
            else {
                return horizontalAlignment;
            }
        };
        FrameworkElement.RealVerticalAlignment = function (height, verticalAlignment) {
            //if height is defined, vertical alignment is no longer stretched
            if (!isNaN(height) && verticalAlignment === Fayde.VerticalAlignment.Stretch) {
                //TODO: this should be centered, not top
                return Fayde.VerticalAlignment.Top;
            }
            else {
                return verticalAlignment;
            }
        };
        FrameworkElement.Instance.CalculateIsFixedWidth = function () {
            if (!isNaN(this.Width)) {
                return true;
            }
            if (FrameworkElement.RealHorizontalAlignment(this.Width, this.HorizontalAlignment) === Fayde.HorizontalAlignment.Stretch
                && this.GetParentIsFixedWidth()) {
                return true;
            }
            return false;
        };
        FrameworkElement.Instance.CalculateIsFixedHeight = function () {
            if (!isNaN(this.Height)) {
                return true;
            }
            if (FrameworkElement.RealVerticalAlignment(this.Height, this.VerticalAlignment) === Fayde.VerticalAlignment.Stretch
                && this.GetParentIsFixedHeight()) {
                return true;
            }
            return false;
        };
    }
    //#endif

    Fayde.FrameworkElement = Nullstone.FinishCreate(FrameworkElement);
})(Nullstone.Namespace("Fayde"));