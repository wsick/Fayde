/// CODE
/// <reference path="PropertyPathParser.ts" />
/// <reference path="../Runtime/PropertyInfo.ts" />
/// <reference path="../Core/INotifyPropertyChanged.ts" />
/// <reference path="../Collections/INotifyCollectionChanged.ts" />
/// <reference path="CollectionViewSource.ts" />

module Fayde.Data {
    declare var AbstractMethod;

    export interface IPropertyPathWalkerListener {
        IsBrokenChanged();
        ValueChanged();
    }

    export interface IPropertyPathNode {
        Next: IPropertyPathNode;
        Value: any;
        IsBroken: bool;
        ValueType: Function;
        SetSource(source: any);
        SetValue(value: any);
        Listen(listener: IPropertyPathNodeListener);
        Unlisten(listener: IPropertyPathNodeListener);
    }
    export interface ICollectionViewNode extends IPropertyPathNode {
        BindToView: bool;
    }
    export interface IPropertyPathNodeListener {
        IsBrokenChanged(node: IPropertyPathNode);
        ValueChanged(node: IPropertyPathNode);
    }

    export class PropertyPathWalker implements IPropertyPathNodeListener {
        Path: string;
        IsDataContextBound: bool;
        Source: any;
        ValueInternal: any;
        Node: IPropertyPathNode;
        FinalNode: IPropertyPathNode;
        private _Listener: IPropertyPathWalkerListener;

        private _Value: any;
        get Value(): any { return this._Value; }

        get IsPathBroken(): bool {
            var path = this.Path;
            if (this.IsDataContextBound && (!path || path.length < 1))
                return false;

            var node = this.Node;
            while (node) {
                if (node.IsBroken)
                    return true;
                node = node.Next;
            }
            return false;
        }

        constructor(path: string, bindDirectlyToSource?: bool, bindsToView?: bool, isDataContextBound?: bool) {
            bindDirectlyToSource = bindDirectlyToSource !== false;
            bindsToView = bindsToView === true;
            this.IsDataContextBound = isDataContextBound === true;

            //begin

            this.Path = path;
            this.IsDataContextBound = isDataContextBound;

            var lastCVNode: ICollectionViewNode = null;

            if (!path || path === ".") {
                lastCVNode = createCollectionViewNode(bindDirectlyToSource, bindsToView);
                this.Node = lastCVNode;
                this.FinalNode = lastCVNode;
            } else {
                var data: IPropertyPathParserData = {
                    typeName: undefined,
                    propertyName: undefined,
                    index: undefined
                };
                var type: PropertyNodeType;
                var parser = new PropertyPathParser(path);
                while ((type = parser.Step(data)) !== PropertyNodeType.None) {
                    var isViewProperty = false;
                    //bool isViewProperty = CollectionViewProperties.Any (prop => prop.Name == propertyName);
                    //          static readonly PropertyInfo[] CollectionViewProperties = typeof (ICollectionView).GetProperties ();
                    var node = createCollectionViewNode(bindDirectlyToSource, isViewProperty);
                    lastCVNode = node;
                    switch (type) {
                        case PropertyNodeType.AttachedProperty:
                        case PropertyNodeType.Property:
                            node.Next = createStandardNode(data.typeName, data.propertyName);
                            break;
                        case PropertyNodeType.Indexed:
                            node.Next = createIndexedNode(data.index);
                            break
                        default:
                            break;
                    }

                    if (this.FinalNode)
                        this.FinalNode.Next = node;
                    else
                        this.Node = node;
                    this.FinalNode = node.Next;
                }
            }

            lastCVNode.BindToView = lastCVNode.BindToView || bindsToView;

            this.FinalNode.Listen(this);
        }

        GetValue(item: any) {
            this.Update(item);
            var o = this.FinalNode.Value;
            this.Update(null);
            return o;
        }
        Update(source: any) {
            this.Source = source;
            this.Node.SetSource(source);
        }

        Listen(listener: IPropertyPathWalkerListener) { this._Listener = listener; }
        Unlisten(listener: IPropertyPathWalkerListener) { if (this._Listener === listener) this._Listener = null; }

        IsBrokenChanged(node: IPropertyPathNode) {
            this.ValueInternal = node.Value;
            var listener = this._Listener;
            if (listener) listener.IsBrokenChanged();
        }
        ValueChanged(node: IPropertyPathNode) {
            this.ValueInternal = node.Value;
            var listener = this._Listener;
            if (listener) listener.ValueChanged();
        }
    }

    class PropertyPathNode implements IPropertyPathNode {
        Next: IPropertyPathNode;
        private _IsBroken: bool;
        private _Source: any;
        private _Value: any;
        DependencyProperty: DependencyProperty;
        PropertyInfo: IPropertyInfo;
        Listener: any;
        private _NodeListener: IPropertyPathNodeListener;
        ValueType: Function;

        get IsBroken(): bool { return this._IsBroken; }
        get Source(): any { return this._Source; }
        get Value(): any { return this._Value; }

        Listen(listener: IPropertyPathNodeListener) { this._NodeListener = listener; }
        Unlisten(listener: IPropertyPathNodeListener) { if (this._NodeListener === listener) this._NodeListener = null; }

        OnSourceChanged(oldSource, newSource) { }
        OnSourcePropertyChanged(o, e) { }

        UpdateValue() { AbstractMethod("PropertyPathNode.UpdateValue"); }
        SetValue(value: any) { AbstractMethod("PropertyPathNode.SetValue"); }

        SetSource(value: any) {
            if (value == null || !Nullstone.Equals(value, this._Source)) {
                var oldSource = this._Source;
                if (oldSource && Nullstone.ImplementsInterface(oldSource, INotifyPropertyChanged_))
                    (<INotifyPropertyChanged>oldSource).PropertyChanged.Unsubscribe(this.OnSourcePropertyChanged, this);

                this._Source = value;
                if (this._Source && Nullstone.ImplementsInterface(this._Source, INotifyPropertyChanged_)) {
                    (<INotifyPropertyChanged>this._Source).PropertyChanged.Subscribe(this.OnSourcePropertyChanged, this);
                }

                this.OnSourceChanged(oldSource, this._Source);
                this.UpdateValue();
                if (this.Next)
                    this.Next.SetSource(this._Value);
            }
        }

        UpdateValueAndIsBroken(newValue: any, isBroken: bool) {
            var emitBrokenChanged = this._IsBroken !== isBroken;
            var emitValueChanged = !Nullstone.Equals(this.Value, newValue);

            this._IsBroken = isBroken;
            this._Value = newValue;

            if (emitValueChanged) {
                var listener = this._NodeListener;
                if (listener) listener.ValueChanged(this);
            } else if (emitBrokenChanged) {
                var listener = this._NodeListener;
                if (listener) listener.IsBrokenChanged(this);
            }
        }
        _CheckIsBroken(): bool {
            return !this.Source || (!this.PropertyInfo && !this.DependencyProperty);
        }
    }

    function createStandardNode(typeName: string, propertyName: string): IPropertyPathNode {
        return new StandardPropertyPathNode(typeName, propertyName);
    }
    class StandardPropertyPathNode extends PropertyPathNode {
        private _STypeName: string;
        private _PropertyName: string;
        PropertyInfo: PropertyInfo;
        private _DPListener: Providers.IPropertyChangedListener;

        constructor(typeName: string, propertyName: string) {
            super();
            this._STypeName = typeName;
            this._PropertyName = propertyName;
        }

        SetValue(value: any) {
            if (this.DependencyProperty)
                (<DependencyObject>this.Source).SetValue(this.DependencyProperty, value);
            else if (this.PropertyInfo)
                this.PropertyInfo.SetValue(this.Source, value);
        }
        UpdateValue() {
            if (this.DependencyProperty) {
                this.ValueType = this.DependencyProperty.GetTargetType();
                this.UpdateValueAndIsBroken((<DependencyObject>this.Source).GetValue(this.DependencyProperty), this._CheckIsBroken());
            } else if (this.PropertyInfo) {
                //TODO: this.ValueType = PropertyInfo.PropertyType;
                this.ValueType = null;
                try {
                    this.UpdateValueAndIsBroken(this.PropertyInfo.GetValue(this.Source), this._CheckIsBroken());
                } catch (err) {
                    this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
                }
            } else {
                this.ValueType = null;
                this.UpdateValueAndIsBroken(null, this._CheckIsBroken());
            }
        }

        OnSourceChanged(oldSource: any, newSource: any) {
            super.OnSourceChanged(oldSource, newSource);

            var oldDO: DependencyObject;
            var newDO: DependencyObject;
            if (oldSource instanceof DependencyObject) oldDO = <DependencyObject>oldSource;
            if (newSource instanceof DependencyObject) newDO = <DependencyObject>newSource;

            var listener = this._DPListener;
            if (listener) {
                listener.Detach();
                this._DPListener = listener = null;
            }

            this.DependencyProperty = null;
            this.PropertyInfo = null;
            if (!this.Source)
                return;

            if (newDO) {
                var propd = DependencyProperty.GetDependencyProperty(this.Source.constructor, this._PropertyName);
                if (propd) {
                    this.DependencyProperty = propd;
                    this._DPListener = listener = Fayde.ListenToPropertyChanged(newDO, propd, this.OnPropertyChanged, this);
                }
            }

            if (!this.DependencyProperty || !this.DependencyProperty.IsAttached) {
                this.PropertyInfo = PropertyInfo.Find(this.Source, this._PropertyName);
            }
        }
        OnPropertyChanged(sender, args: IDependencyPropertyChangedEventArgs) {
            try {
                this.UpdateValue();
                if (this.Next)
                    this.Next.SetSource(this.Value);
            } catch (err) {
            //Ignore
            }
        }
        OnSourcePropertyChanged(sender, e) {
            if (e.PropertyName === this._PropertyName && this.PropertyInfo) {
                this.UpdateValue();
                var next = this.Next;
                if (next)
                    next.SetSource(this.Value);
            }
        }
    }

    function createCollectionViewNode(bindsDirectlyToSource: bool, bindsToView: bool): ICollectionViewNode {
        return new CollectionViewNode(bindsDirectlyToSource, bindsToView);
    }
    class CollectionViewNode extends PropertyPathNode implements ICollectionViewNode {
        BindsDirectlyToSource: bool;
        BindToView: bool;
        private _ViewPropertyListener: Providers.IPropertyChangedListener;
        private _View: ICollectionView;

        constructor(bindsDirectlyToSource: bool, bindToView: bool) {
            super();
            this.BindsDirectlyToSource = bindsDirectlyToSource === true;
            this.BindToView = bindToView === true;
        }

        OnSourceChanged(oldSource: any, newSource: any) {
            super.OnSourceChanged(oldSource, newSource);
            this.DisconnectViewHandlers();
            this.ConnectViewHandlers(newSource, newSource);
        }
        ViewChanged(sender, e) {
            this.DisconnectViewHandlers(true);
            this.ConnectViewHandlers(null, e.NewValue);
            this.ViewCurrentChanged(this, EventArgs.Empty);
        }
        ViewCurrentChanged(sender, e) {
            this.UpdateValue();
            if (this.Next)
                this.Next.SetSource(this.Value);
        }
        SetValue() {
            throw new NotSupportedException("SetValue");
        }
        UpdateValue() {
            if (this.BindsDirectlyToSource) {
                this.ValueType = this.Source == null ? null : this.Source.constructor;
                this.UpdateValueAndIsBroken(this.Source, this._CheckIsBroken());
            } else {
                var usableSource = this.Source;
                var view;
                if (this.Source instanceof CollectionViewSource) {
                    usableSource = null;
                    view = this.Source.View;
                } else if (Nullstone.ImplementsInterface(this.Source, ICollectionView_)) {
                    view = this.Source;
                }

                if (!view) {
                    this.ValueType = usableSource == null ? null : usableSource.constructor;
                    this.UpdateValueAndIsBroken(usableSource, this._CheckIsBroken());
                } else {
                    if (this.BindToView) {
                        this.ValueType = view.constructor;
                        this.UpdateValueAndIsBroken(view, this._CheckIsBroken());
                    } else {
                        this.ValueType = view.GetCurrentItem() == null ? null : view.GetCurrentItem().constructor;
                        this.UpdateValueAndIsBroken(view.GetCurrentItem(), this._CheckIsBroken());
                    }
                }
            }
        }
        _CheckIsBroken(): bool { return this.Source == null; }

        ConnectViewHandlers(source: CollectionViewSource, view: ICollectionView) {
            if (source instanceof CollectionViewSource) {
                this._ViewPropertyListener = Fayde.ListenToPropertyChanged(source, CollectionViewSource.ViewProperty, this.ViewChanged, this);
                view = source.View;
            }
            if (Nullstone.ImplementsInterface(view, ICollectionView_)) {
                this._View = view;
                this._View.CurrentChanged.Subscribe(this.ViewCurrentChanged, this);
            }

        }
        DisconnectViewHandlers(onlyView?: bool) {
            if (!onlyView)
                onlyView = false;
            if (this._ViewPropertyListener && !onlyView) {
                this._ViewPropertyListener.Detach();
                this._ViewPropertyListener = null;
            }
            if (this._View) {
                this._View.CurrentChanged.Unsubscribe(this.ViewCurrentChanged, this);
            }
        }
    }

    function createIndexedNode(index: number): IPropertyPathNode {
        return new IndexedPropertyPathNode(index);
    }
    class IndexedPropertyPathNode extends PropertyPathNode {
        private _Index: number;
        private _Source: any; //Defind in PropertyPathNode
        private _IsBroken: bool; //Defind in PropertyPathNode
        PropertyInfo: IndexedPropertyInfo;

        constructor(index: any) {
            super();
            this._IsBroken = false;
            var val = parseInt(index, 10);
            if (isNaN(val))
                this._Index = index;
            else
                this._Index = val;
        }

        get Index(): number { return this._Index; }

        UpdateValue() {
            if (this.PropertyInfo == null) {
                this._IsBroken = true;
                this.ValueType = null;
                this.UpdateValueAndIsBroken(null, this._IsBroken);
                return;
            }

            try {
                var newVal = this.PropertyInfo.GetValue(this.Source, this._Index);
                this._IsBroken = false;
                this.ValueType = this.PropertyInfo.PropertyType;
                this.UpdateValueAndIsBroken(newVal, this._IsBroken);
            } catch (err) {
                this._IsBroken = true;
                this.ValueType = null;
                this.UpdateValueAndIsBroken(null, this._IsBroken);
            }
        }
        SetValue(value: any) {
            if (this.PropertyInfo != null)
                this.PropertyInfo.SetValue(this.Source, this._Index, value);
        }

        _CheckIsBroken(): bool {
            return this._IsBroken || super._CheckIsBroken();
        }

        OnSourcePropertyChanged(o, e) {
            this.UpdateValue();
            if (this.Next != null)
                this.Next.SetSource(this.Value);
        }
        OnSourceChanged(oldSource: any, newSource: any) {
            super.OnSourceChanged(oldSource, newSource);
            if (this.Listener != null) {
                this.Listener.Detach();
                this.Listener = null;
            }

            if (Nullstone.ImplementsInterface(newSource, Collections.INotifyCollectionChanged_)) {
                (<Collections.INotifyCollectionChanged>newSource).CollectionChanged.Subscribe(this.CollectionChanged, this);
            }

            this._GetIndexer();
        }

        private _GetIndexer() {
            this.PropertyInfo = null;
            if (this._Source != null) {
                this.PropertyInfo = IndexedPropertyInfo.Find(this._Source);
            }
        }

        CollectionChanged(o, e) {
            this.UpdateValue();
            if (this.Next != null)
                this.Next.SetSource(this.Value);
        }
    }
}