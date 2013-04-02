/// <reference path="Panel.js" />
/// CODE
/// <reference path="../Primitives.js"/>

(function (namespace) {
    var StackPanel = Nullstone.Create("StackPanel", namespace.Panel);

    //#region Properties

    StackPanel._OrientationChanged = function (d, args) {
        var sp = Nullstone.As(d, StackPanel);
        if (!sp)
            sp._UpdateHtmlOrientation(args.NewValue);
    };
    StackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Fayde.Orientation); }, StackPanel, Fayde.Orientation.Vertical, StackPanel._OrientationChanged);

    Nullstone.AutoProperties(StackPanel, [
        StackPanel.OrientationProperty
    ]);

    //#endregion

    StackPanel.Instance._MeasureOverride = function (constraint, pass, error) {
        //Info("StackPanel.MeasureOverride [" + this._TypeName + "]");
        var childAvailable = size.createInfinite();
        var measured = new size();

        var metrics = pass.UpdateMetrics;
        var orientation = this.Orientation;
        if (orientation === Fayde.Orientation.Vertical) {
            childAvailable.Width = constraint.Width;
            var width = metrics.Width;
            if (!isNaN(width))
                childAvailable.Width = width;
            childAvailable.Width = Math.min(childAvailable.Width, metrics.MaxWidth);
            childAvailable.Width = Math.max(childAvailable.Width, metrics.MinWidth);
        } else {
            childAvailable.Height = constraint.Height;
            var height = metrics.Height;
            if (!isNaN(height))
                childAvailable.Height = height;
            childAvailable.Height = Math.min(childAvailable.Height, metrics.MaxHeight);
            childAvailable.Height = Math.max(childAvailable.Height, metrics.MinHeight);
        }

        var children = this.Children;
        for (var i = 0; i < children.GetCount() ; i++) {
            var child = children.GetValueAt(i);
            child.Measure(childAvailable);
            var s = child._DesiredSize;

            if (orientation === Fayde.Orientation.Vertical) {
                measured.Height += s.Height;
                measured.Width = Math.max(measured.Width, s.Width);
            } else {
                measured.Width += s.Width;
                measured.Height = Math.max(measured.Height, s.Height);
            }
        }

        return measured;
    };
    StackPanel.Instance._ArrangeOverride = function (arrangeSize, pass, error) {
        //Info("StackPanel.ArrangeOverride [" + this._TypeName + "]");
        var arranged = size.clone(arrangeSize);
        var orientation = this.Orientation;

        if (orientation === Fayde.Orientation.Vertical)
            arranged.Height = 0;
        else
            arranged.Width = 0;

        var children = this.Children;
        for (var i = 0; i < children.GetCount() ; i++) {
            var child = children.GetValueAt(i);
            var s = size.clone(child._DesiredSize);
            if (orientation === Fayde.Orientation.Vertical) {
                s.Width = arrangeSize.Width;

                var childFinal = rect.fromSize(s);
                childFinal.Y = arranged.Height;

                if (rect.isEmpty(childFinal))
                    rect.clear(childFinal);
                child.Arrange(childFinal);

                arranged.Width = Math.max(arranged.Width, s.Width);
                arranged.Height += s.Height;
            } else {
                s.Height = arrangeSize.Height;

                var childFinal = rect.fromSize(s);
                childFinal.X = arranged.Width;

                if (rect.isEmpty(childFinal))
                    rect.clear(childFinal);
                child.Arrange(childFinal);

                arranged.Width += s.Width;
                arranged.Height = Math.max(arranged.Height, s.Height);
            }
        }

        if (orientation === Fayde.Orientation.Vertical)
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
            var nextEl;
            if (this.Orientation === Fayde.Orientation.Horizontal) {

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
            if (this.Orientation === Fayde.Orientation.Horizontal)
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
                if (this.Orientation === Fayde.Orientation.Horizontal) {
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
        //this is called when a auto grid column has changed width due to another item in the same column
        //this only gets called if the width is larger than the existing width
        //if orientation is vertical, we should update each child's container width (the containers take the entire width)
        //make sure to update our own width as well
        StackPanel.Instance.CoerceWidth = function (width) {
            if (this.Orientation === Fayde.Orientation.Vertical) {
                var table = this.GetHtmlChildrenContainer();
                //we have a row and cell for each child
                //loop through each child container and update its width to the StackPanel inner width
                var len = table.children.size;
                var iWidth = this.CalculateInnerWidth(width);
                for (var i = 0; i < len; i++) {
                    var cell = table.children[i].children[0];
                    cell.style.width = iWidth;
                    cell.style.minWidth = iWidth;
                }
            }
            //now adjust ourself, but only if we aren't fixed width
            //and don't make ourself smaller than our contents
            if (!this.GetIsFixedWidth()) {
                var childrenWidth = this.GetHtmlChildrenContainer().offsetWidth;
                var iWidth = this.CalculateInnerWidth(width);
                if (iWidth > childrenWidth) {
                    this.GetContentHtmlElement().style.width = iWidth + "px";
                }
            }
        };
        StackPanel.Instance.CoerceHeight = function (height) {
            if (this.Orientation === Fayde.Orientation.Horizontal) {
                var table = this.GetHtmlChildrenContainer();
                //we have one row total and one cell for each child
                //loop through each child container and update its height to the StackPanel inner height
                var len = table.children[0].children.size;
                var iHeight = this.CalculateInnerHeight(height);
                for (var i = 0; i < len; i++) {
                    var cell = table.children[0].children[i];
                    cell.style.height = iHeight;
                    cell.style.minHeight = iHeight;
                }
            }
            //now adjust ourself, but only if we aren't fixed width
            //and don't make ourself smaller than our contents
            if (!this.GetIsFixedHeight()) {
                var childrenHeight = this.GetHtmlChildrenContainer().offsetHeight;
                var iHeight = this.CalculateInnerHeight(height);
                if (iHeight > childrenHeight) {
                    this.GetContentHtmlElement().style.height = iHeight + "px";
                }
            }
        };
        StackPanel.Instance.UpdateAdjustedWidth = function (child, width) {
            delete Surface._SizingAdjustments[this._ID];
            if (this.Orientation === Fayde.Orientation.Horizontal) {
                //the child lives in a container, update that container's width because it should stretch to the size of the child
                var cell = child.GetRootHtmlElement().parentNode.parentNode.parentNode;
                cell.style.width = width + "px";
                cell.style.minWidth = width + "px";
            }
            //now update myself, always updating the content element
            if (!this.GetIsFixedWidth()) {
                var myWidth = this.GetHtmlChildrenContainer().offsetWidth;
                this.GetContentHtmlElement().style.width = myWidth + "px";
                myWidth = this.CalculateOuterWidth(myWidth);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedWidth(this, myWidth);
            }
        };
        StackPanel.Instance.UpdateAdjustedHeight = function (child, height) {
            delete Surface._SizingAdjustments[this._ID];
            if (this.Orientation === Fayde.Orientation.Vertical) {
                //the child lives in a container, update that container's height because it should stretch to the size of the child
                var cell = child.GetRootHtmlElement().parentNode.parentNode.parentNode;
                cell.style.height = height + "px";
                cell.style.minHeight = height + "px";
            }
            //now update myself, always updating the content element
            if (!this.GetIsFixedHeight()) {
                var myHeight = this.GetHtmlChildrenContainer().offsetHeight;
                this.GetContentHtmlElement().style.height = myHeight + "px";
                myHeight = this.CalculateOuterHeight(myHeight);
                var parent = this.GetVisualParent();
                if (parent) parent.UpdateAdjustedHeight(this, myHeight);
            }
        };
        StackPanel.Instance.GetIsFixedWidth = function (child) {
            //when a child is passed, this means we need to tell the child how to render
            //otherwise, we are adjusting ourself
            if (child) {
                if (this.Orientation === Fayde.Orientation.Horizontal) return false;
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
                if (this.Orientation === Fayde.Orientation.Vertical) return false;
                else return true;
            }
            else {
                return this.IsFixedHeight;
            }
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        StackPanel.Instance._UpdateHtmlOrientation = function (orientation) {
            this._InvalidateMeasure();
            this._InvalidateArrange();
        };
    }
    //#endif

    namespace.StackPanel = Nullstone.FinishCreate(StackPanel);
})(Nullstone.Namespace("Fayde.Controls"));