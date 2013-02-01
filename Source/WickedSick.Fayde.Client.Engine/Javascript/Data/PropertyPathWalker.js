/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

(function (namespace) {
    var _PropertyPathWalker = Nullstone.Create("_PropertyPathWalker", undefined, 4);

    _PropertyPathWalker.Instance.Init = function (path, bindDirectlyToSource, bindsToView, isDataContextBound) {
        if (bindDirectlyToSource == null)
            bindDirectlyToSource = true;
        if (bindsToView == null)
            bindsToView = false;
        if (isDataContextBound == null)
            isDataContextBound = false;

        this.IsBrokenChanged = new MulticastEvent();
        this.ValueChanged = new MulticastEvent();

        //begin

        this.Path = path;
        this.IsDataContextBound = isDataContextBound;

        var lastCVNode;

        if (!path || path === ".") {
            lastCVNode = new namespace._CollectionViewNode(bindDirectlyToSource, bindsToView);
            this.Node = lastCVNode;
            this.FinalNode = lastCVNode;
        } else {
            var data = {
                typeName: undefined,
                propertyName: undefined,
                index: undefined
            };
            var type;
            var parser = new namespace._PropertyPathParser(path);
            while ((type = parser.Step(data)) !== namespace._PropertyNodeType.None) {
                var isViewProperty = false;
                var node = new namespace._CollectionViewNode(bindDirectlyToSource, isViewProperty);
                lastCVNode = node;
                switch (type) {
                    case namespace._PropertyNodeType.AttachedProperty:
                    case namespace._PropertyNodeType.Property:
                        node.Next = new namespace._StandardPropertyPathNode(data.typeName, data.propertyName);
                        break;
                    case namespace._PropertyNodeType.Indexed:
                        node.Next = new namespace._IndexedPropertyPathNode(data.index);
                        break;
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
        this.FinalNode.IsBrokenChanged.Subscribe(
            function (s, a) {
                this.ValueInternal = Nullstone.As(s, namespace._PropertyPathNode).Value;
                this.IsBrokenChanged.Raise(this, new EventArgs());
            }, this);
        this.FinalNode.ValueChanged.Subscribe(
            function (s, a) {
                this.ValueInternal = Nullstone.As(s, namespace._PropertyPathNode).Value;
                this.ValueChanged.Raise(this, new EventArgs());
            }, this);
    };

    //#region Properties

    Nullstone.AutoProperties(_PropertyPathWalker, [
        "Source",
        "Path",
        "Node",
        "FinalNode",
        "ValueInternal",
        "IsDataContextBound"
    ]);

    Nullstone.Property(_PropertyPathWalker, "Value", {
        get: function () { return this._Value; }
    });

    Nullstone.Property(_PropertyPathWalker, "IsPathBroken", {
        get: function () {
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
    });

    //#endregion

    _PropertyPathWalker.Instance.GetValue = function (item) {
        this.Update(item);
        var o = this.FinalNode.GetValue();
        this.Update(null);
        return o;
    };
    _PropertyPathWalker.Instance.Update = function (source) {
        this.Source = source;
        this.Node.SetSource(source);
    };

    namespace._PropertyPathWalker = Nullstone.FinishCreate(_PropertyPathWalker);
})(Nullstone.Namespace("Fayde.Data"));