/// <reference path="Panel.js" />
/// CODE

(function (namespace) {
    var StackPanel = Nullstone.Create("StackPanel", Panel);

    //#region Properties

    StackPanel._OrientationChanged = function (d, args) {
        var sp = Nullstone.As(d, StackPanel);
        if (!sp)
            return;
        d._InvalidateMeasure();
        d._InvalidateArrange();
        d._UpdateHtmlOrientation(args.NewValue);
    };
    StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, StackPanel, Orientation.Vertical, StackPanel._OrientationChanged);

    Nullstone.AutoProperties(StackPanel, [
        StackPanel.OrientationProperty
    ]);

    //#endregion

    StackPanel.Instance.MeasureOverride = function (constraint) {
        //Info("StackPanel.MeasureOverride [" + this._TypeName + "]");
        var childAvailable = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        var measured = new Size(0, 0);

        var orientation = this.Orientation;
        if (orientation === Orientation.Vertical) {
            childAvailable.Width = constraint.Width;
            var width = this.Width;
            if (!isNaN(width))
                childAvailable.Width = width;
            childAvailable.Width = Math.min(childAvailable.Width, this.MaxWidth);
            childAvailable.Width = Math.max(childAvailable.Width, this.MinWidth);
        } else {
            childAvailable.Height = constraint.Height;
            var height = this.Height;
            if (!isNaN(height))
                childAvailable.Height = height;
            childAvailable.Height = Math.min(childAvailable.Height, this.MaxHeight);
            childAvailable.Height = Math.max(childAvailable.Height, this.MinHeight);
        }

        var children = this.Children;
        for (var i = 0; i < children.GetCount() ; i++) {
            var child = children.GetValueAt(i);
            child.Measure(childAvailable);
            var size = child._DesiredSize;

            if (orientation === Orientation.Vertical) {
                measured.Height += size.Height;
                measured.Width = Math.max(measured.Width, size.Width);
            } else {
                measured.Width += size.Width;
                measured.Height = Math.max(measured.Height, size.Height);
            }
        }

        return measured;
    };
    StackPanel.Instance.ArrangeOverride = function (arrangeSize) {
        //Info("StackPanel.ArrangeOverride [" + this._TypeName + "]");
        var arranged = arrangeSize;
        var orientation = this.Orientation;

        if (orientation === Orientation.Vertical)
            arranged.Height = 0;
        else
            arranged.Width = 0;

        var children = this.Children;
        for (var i = 0; i < children.GetCount() ; i++) {
            var child = children.GetValueAt(i);
            var size = child._DesiredSize;
            var childFinal;
            if (orientation === Orientation.Vertical) {
                size.Width = arrangeSize.Width;

                childFinal = new Rect(0, arranged.Height, size.Width, size.Height);

                if (childFinal.IsEmpty())
                    child.Arrange(new Rect());
                else
                    child.Arrange(childFinal);

                arranged.Width = Math.max(arranged.Width, size.Width);
                arranged.Height += size.Height;
            } else {
                size.Height = arrangeSize.Height;

                childFinal = new Rect(arranged.Width, 0, size.Width, size.Height);
                if (childFinal.IsEmpty())
                    child.Arrange(new Rect());
                else
                    child.Arrange(childFinal);

                arranged.Width += size.Width;
                arranged.Height = Math.max(arranged.Height, size.Height);
            }
        }

        if (orientation === Orientation.Vertical)
            arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
        else
            arranged.Width = Math.max(arranged.Width, arrangeSize.Width);

        return arranged;

    };

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        StackPanel.Instance.CreateHtmlObjectImpl = function () {
            var rootEl = this.CreateHtmlObjectImpl$Panel();
            rootEl.firstChild.style.fontSize = "0px";
            return rootEl;
        };
        StackPanel.Instance.CreateHtmlChildrenContainer = function () {
            var table = document.createElement("table");
            table.style.borderSpacing = "0px";
            table.style.width = "100%";
            table.style.height = "100%";
            var rowEl = table.appendChild(document.createElement("tr"));
            var columnEl = rowEl.appendChild(document.createElement("td"));
            columnEl.style.padding = "0px";
            columnEl.style.height = "100%";
            columnEl.style.width = "100%";
            return table;
        };
        StackPanel.Instance.InsertHtmlChild = function (child, index) {
            var table = this.GetHtmlChildrenContainer();
            var children = this.Children;
            var nextEl;
            if (this.Orientation == Orientation.Horizontal) {

                var columnEl = document.createElement("td");
                columnEl.style.height = "100%";
                columnEl.style.width = "auto";
                columnEl.style.padding = "0px";
                var sizingEl = columnEl.appendChild(document.createElement("div"));
                sizingEl.style.position = "relative";
                sizingEl.style.display = "table";
                sizingEl.style.width = "100%";
                sizingEl.style.height = "100%";
                var contentEl = sizingEl.appendChild(document.createElement("div"));
                contentEl.style.position = "absolute";
                contentEl.style.display = "table-cell";
                contentEl.style.width = "100%";
                contentEl.style.height = "100%";
                contentEl.appendChild(child.GetRootHtmlElement());

                var rowEl = table.children[0];
                nextEl = rowEl.children[index];
                rowEl.insertBefore(columnEl, nextEl);
            }
            else {

                var rowEl = document.createElement("tr");
                var columnEl = rowEl.appendChild(document.createElement("td"));
                columnEl.style.padding = "0px";
                columnEl.style.height = "auto";
                columnEl.style.width = "100%";
                var sizingEl = columnEl.appendChild(document.createElement("div"));
                sizingEl.style.position = "relative";
                sizingEl.style.display = "table";
                sizingEl.style.width = "100%";
                sizingEl.style.height = "100%";
                var contentEl = sizingEl.appendChild(document.createElement("div"));
                contentEl.style.position = "absolute";
                contentEl.style.display = "table-cell";
                contentEl.style.width = "100%";
                contentEl.style.height = "100%";
                contentEl.appendChild(child.GetRootHtmlElement());

                nextEl = table.children[index];
                table.insertBefore(rowEl, nextEl);
            }
        };
        StackPanel.Instance.RemoveHtmlChild = function (child, index) {
            var table = this.GetHtmlChildrenContainer();
            if (this.Orientation == Orientation.Horizontal)
                table.children[0].removeChild(table.children[0].children[index]);
            else
                table.removeChild(table.children[index]);
        };

        StackPanel.Instance._UpdateHtmlOrientation = function (orientation) {
            /*
            this.InvalidateChildrenFixedWidth();
            this.InvalidateChildrenFixedHeight();
            var children = this.Children;
            var len = children.GetCount();
            var child;
            for (var i = 0; i < len; i++) {
                child = children.GetValueAt(i);
                var wrapper = child.GetRootHtmlElement().parentNode;
                if (this.Orientation === Orientation.Horizontal) {
                    wrapper.style.height = "100%";
                    wrapper.style.width = "auto";
                }
                else {
                    wrapper.style.width = "100%";
                    wrapper.style.height = "auto";
                }
            }
            */
        };
        StackPanel.Instance.UpdateAdjustedWidth = function (child, width) {
            delete Surface._SizingAdjustments[this._ID];
            if (this.Orientation === Orientation.Horizontal) {
                var cell = child.GetRootHtmlElement().parentNode.parentNode.parentNode;
                cell.style.width = width + "px";
                cell.style.minWidth = width + "px";
            }
            if (!this.GetIsFixedWidth()) {
                var myWidth = this.GetHtmlChildrenContainer().offsetWidth;
                this.GetContentHtmlElement().style.width = myWidth + "px";
                myWidth = this.CalculateAdjustedWidth(myWidth);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedWidth(this, myWidth);
            }
        };
        StackPanel.Instance.UpdateAdjustedHeight = function (child, height) {
            delete Surface._SizingAdjustments[this._ID];
            if (this.Orientation === Orientation.Vertical) {
                var cell = child.GetRootHtmlElement().parentNode.parentNode.parentNode;
                cell.style.height = height + "px";
                cell.style.minHeight = height + "px";
            }
            if (!this.GetIsFixedHeight()) {
                var myHeight = this.GetHtmlChildrenContainer().offsetHeight;
                this.GetContentHtmlElement().style.height = myHeight + "px";
                myHeight = this.CalculateAdjustedHeight(myHeight);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedHeight(this, myHeight);
            }
        };
        StackPanel.Instance.GetIsFixedWidth = function (child) {
            //when a child is passed, this means we need to tell the child how to render
            //otherwise, we are adjusting ourself
            if (child) {
                if (this.Orientation == Orientation.Horizontal) return false;
                else return true;
            }
            else {
                return this.IsFixedWidth;
            }
        };
        StackPanel.Instance.GetIsFixedHeight = function (child) {
            //when a child is passed, this means we need to tell the child how to render
            //otherwise, we are adjusting ourself
            if (child) {
                if (this.Orientation == Orientation.Vertical) return false;
                else return true;
            }
            else {
                return this.IsFixedHeight;
            }
        };
    }
    //#endif

    namespace.StackPanel = Nullstone.FinishCreate(StackPanel);
})(window);