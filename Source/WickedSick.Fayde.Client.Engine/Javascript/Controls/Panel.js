/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />
/// CODE
/// <reference path="../Media/Brush.js"/>
/// <reference path="PanelMetrics.js"/>

(function (namespace) {
    var Panel = Nullstone.Create("Panel", Fayde.FrameworkElement);

    Panel.Instance.InitSpecific = function () {
        this._Metrics = new Fayde.Controls.PanelMetrics();
    };

    //#region Properties

    Panel.BackgroundProperty = DependencyProperty.Register("Background", function () { return Fayde.Media.Brush; }, Panel);
    Panel._CreateChildren = {
        GetValue: function (propd, obj) {
            var col = new Fayde.UIElementCollection();
            col._SetIsSecondaryParent(true);
            if (obj)
                obj._SubtreeObject = col;
            return col;
        }
    };
    Panel.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return Fayde.UIElementCollection; }, Panel, undefined, undefined, Panel._CreateChildren);
    Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", function () { return Boolean; }, Panel, false);

    Nullstone.AutoProperties(Panel, [
        Panel.BackgroundProperty,
        Panel.ChildrenProperty,
        Panel.IsItemsHostProperty
    ]);

    Panel.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () { return Number; }, Panel, 0);
    Panel.GetZIndex = function (d) {
        ///<returns type="Number"></returns>
        return d.$GetValue(Panel.ZIndexProperty);
    };
    Panel.SetZIndex = function (d, value) {
        ///<param name="value" type="Number"></param>
        d.$SetValue(Panel.ZIndexProperty, value);
    };

    Panel.ZProperty = DependencyProperty.RegisterAttached("Z", function () { return Number; }, Panel, NaN);
    Panel.GetZ = function (d) {
        ///<returns type="Number"></returns>
        return d.$GetValue(Panel.ZProperty);
    };
    Panel.SetZ = function (d, value) {
        ///<param name="value" type="Number"></param>
        d.$SetValue(Panel.ZProperty, value);
    };

    //#endregion

    //#region Instance Methods

    Panel.Instance.IsLayoutContainer = function () { return true; };
    Panel.Instance.IsContainer = function () { return true; };
    Panel.Instance._EmptyBackground = function () {
        return this.Background == null;
    };
    Panel.Instance._MeasureOverrideWithError = function (availableSize, error) {
        Info("Panel._MeasureOverrideWithError [" + this._TypeName + "]");
        var result = new Size(0, 0);
        return result;
    };
    Panel.Instance._Render = function (ctx, region) {
        /// <param name="ctx" type="_RenderContext"></param>
        var background = this.Background;
        if (!background)
            return;
        var framework = new Size(this.ActualWidth, this.ActualHeight);
        framework = this._ApplySizeConstraints(framework);
        if (framework.Width <= 0 || framework.Height <= 0)
            return;
        var area = new Rect(0, 0, framework.Width, framework.Height);

        ctx.Save();
        this._RenderLayoutClip(ctx);
        ctx.FillRect(background, area);
        ctx.Restore();
    };

    Panel.Instance._CanFindElement = function () { return this.Background != null; }
    Panel.Instance._InsideObject = function (ctx, x, y) {
        if (this.Background)
            return this._InsideObject$FrameworkElement(ctx, x, y);
        return false;
    };

    //#if ENABLE_CANVAS
    if (Fayde.IsCanvasEnabled) {
        Panel.Instance._ElementAdded = function (item) {
            this._ElementAdded$FrameworkElement(item);
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
        };
        Panel.Instance._ElementRemoved = function (item) {
            this._ElementRemoved$FrameworkElement(item);
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
        };
    }
    //#endif

    //#endregion

    //#region Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Panel.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Panel) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }
            var item;
            if (args.Property._ID === Panel.BackgroundProperty._ID) {
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            } else if (args.Property._ID === Panel.ChildrenProperty._ID) {
                var collection;
                var count;
                var i;
                this._SubtreeObject = args.NewValue ? args.NewValue : null;
                if (args.OldValue) {
                    collection = args.OldValue;
                    count = collection.GetCount();
                    for (i = 0; i < count; i++) {
                        item = collection.GetValueAt(i);
                        this._ElementRemoved(item);
                        if (this._IsAttached)
                            this.RemoveHtmlChild(item, i);
                    }
                }
                if (args.NewValue) {
                    collection = args.NewValue;
                    count = collection.GetCount();
                    for (i = 0; i < count; i++) {
                        item = collection.GetValueAt(i);
                        this._ElementAdded(item);
                        if (this._IsAttached)
                            this.InsertHtmlChild(item, i);
                    }
                }
            }
            this.PropertyChanged.Raise(this, args);
        };
        Panel.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd && propd._ID === Panel.BackgroundProperty._ID) {
                this.InvalidateProperty(propd);
            } else {
                this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
            }
        };
        Panel.Instance._OnCollectionChanged = function (col, args) {
            if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, col)) {
                var error = new BError();
                if (args.IsAdd || args.IsReplace) {
                    if (args.IsReplace) {
                        if (args.OldValue instanceof Fayde.FrameworkElement)
                            args.OldValue._SetLogicalParent(null, error);
                        this._ElementRemoved(args.OldValue);
                        if (this._IsAttached)
                            this.RemoveHtmlChild(args.OldValue, args.Index);
                    }
                    if (args.NewValue instanceof Fayde.FrameworkElement)
                        args.NewValue._SetLogicalParent(this, error);
                    this._ElementAdded(args.NewValue);
                    if (this._IsAttached)
                        this.InsertHtmlChild(args.NewValue, args.Index);
                } else if (args.IsRemove) {
                    if (args.OldValue instanceof Fayde.FrameworkElement)
                        args.OldValue._SetLogicalParent(null, error);
                    this._ElementRemoved(args.OldValue);
                    if (this._IsAttached)
                        this.RemoveHtmlChild(args.OldValue, args.Index);
                }
            } else {
                this._OnCollectionChanged$FrameworkElement(col, args);
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Panel.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Panel) {
                this._OnPropertyChanged$FrameworkElement(args, error);
                return;
            }
            if (args.Property._ID === Panel.BackgroundProperty._ID) {
                this._UpdateBounds();
                this._Invalidate();
            } else if (args.Property._ID === Panel.ChildrenProperty._ID) {
                var collection;
                var count;
                var i;
                this._SubtreeObject = args.NewValue ? args.NewValue : null;
                if (args.OldValue) {
                    collection = args.OldValue;
                    count = collection.GetCount();
                    for (i = 0; i < count; i++) {
                        this._ElementRemoved(collection.GetValueAt(i));
                    }
                }
                if (args.NewValue) {
                    collection = args.NewValue;
                    count = collection.GetCount();
                    for (i = 0; i < count; i++) {
                        this._ElementAdded(collection.GetValueAt(i));
                    }
                }
                this._UpdateBounds();
            }
            this.PropertyChanged.Raise(this, args);
        };
        Panel.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd && propd._ID === Panel.BackgroundProperty._ID) {
                this._Invalidate();
            } else {
                this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
            }
        };
        Panel.Instance._OnCollectionChanged = function (col, args) {
            if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, col)) {
                var error = new BError();
                if (args.IsAdd || args.IsReplace) {
                    if (args.IsReplace) {
                        if (args.OldValue instanceof Fayde.FrameworkElement)
                            args.OldValue._SetLogicalParent(null, error);
                        this._ElementRemoved(args.OldValue);
                    }
                    if (args.NewValue instanceof Fayde.FrameworkElement)
                        args.NewValue._SetLogicalParent(this, error);
                    this._ElementAdded(args.NewValue);
                } else if (args.IsRemove) {
                    if (args.OldValue instanceof Fayde.FrameworkElement)
                        args.OldValue._SetLogicalParent(null, error);
                    this._ElementRemoved(args.OldValue);
                }
            } else {
                this._OnCollectionChanged$FrameworkElement(col, args);
            }
        };
        Panel.Instance._OnCollectionItemChanged = function (col, obj, args) {
            if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, col)) {
                if (args.Property._ID === Panel.ZIndexProperty._ID) {
                    args.Item._Invalidate();
                    if (this._IsAttached) {
                        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
                    }
                    return;
                }
            }
            this._OnCollectionItemChanged$FrameworkElement(col, obj, args);
        };
        Panel.Instance._OnIsAttachedChanged = function (value) {
            this._OnIsAttachedChanged$FrameworkElement(value);
            if (value) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Panel.Instance.OnHtmlAttached = function () {
            var children = this.Children;
            if (children) {
                var len = children.GetCount();
                for (var i = 0; i < len; i++) {
                    var child = children.GetValueAt(i);
                    this.InsertHtmlChild(child, i);
                    child.OnHtmlAttached();
                }
            }
        };
        Panel.Instance.OnHtmlDetached = function () {
            var children = this.Children;
            if (children) {
                var len = children.GetCount();
                for (var i = 0; i < len; i++) {
                    var child = children.GetValueAt(i);
                    this.RemoveHtmlChild(child, i);
                    child.OnHtmlDetached();
                }
            }
        };

        Panel.Instance.GetHtmlChildrenContainer = function () {
            var contentEl = this.GetContentHtmlElement();
            if (!contentEl.firstChild)
                contentEl.appendChild(this.CreateHtmlChildrenContainer());
            return contentEl.firstChild;
        };
        Panel.Instance.CreateHtmlChildrenContainer = function () { };

        Panel.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Panel) {
                this.ApplyHtmlChange$FrameworkElement(change);
                return;
            }

            var contentEl = this.GetRootHtmlElement().firstChild;
            if (propd._ID === Panel.BackgroundProperty._ID) {
                var brush = change.NewValue;
                if (!brush)
                    brush = this.Background;
                brush.SetupBrush(null, null);
                contentEl.style.background = brush.ToHtml5Object();
            }
        };
        Panel.Instance.InsertHtmlChild = function () { };
        Panel.Instance.RemoveHtmlChild = function () { };
    }
    //#endif

    //#region Annotations

    Panel.Annotations = {
        ContentProperty: Panel.ChildrenProperty
    };

    //#endregion

    namespace.Panel = Nullstone.FinishCreate(Panel);
})(Nullstone.Namespace("Fayde.Controls"));