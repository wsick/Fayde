/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Panel.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>
/// <reference path="../Runtime/LinkedListNode.js"/>
/// <reference path="Enums.js"/>
/// <reference path="ColumnDefinition.js"/>
/// <reference path="RowDefinition.js"/>
/// <reference path="ColumnDefinitionCollection.js"/>
/// <reference path="RowDefinitionCollection.js"/>
/// <reference path="GridLength.js"/>
/// <reference path="../Core/VisualTreeWalker.js"/>

(function (namespace) {
    var Grid = Nullstone.Create("Grid", Panel);

    Grid.Instance.Init = function () {
        this.Init$Panel();
        this._RowMatrix = null;
        this._ColMatrix = null;
    };

    //#region Attached Dependency Properties

    Grid.ColumnProperty = DependencyProperty.RegisterAttached("Column", function () { return Number; }, Grid, 0);
    Grid.GetColumn = function (d) {
        return d.$GetValue(Grid.ColumnProperty);
    };
    Grid.SetColumn = function (d, value) {
        d.$SetValue(Grid.ColumnProperty, value);
    };

    Grid.ColumnSpanProperty = DependencyProperty.RegisterAttached("ColumnSpan", function () { return Number; }, Grid, 1);
    Grid.GetColumnSpan = function (d) {
        return d.$GetValue(Grid.ColumnSpanProperty);
    };
    Grid.SetColumnSpan = function (d, value) {
        d.$SetValue(Grid.ColumnSpanProperty, value);
    };

    Grid.RowProperty = DependencyProperty.RegisterAttached("Row", function () { return Number; }, Grid, 0);
    Grid.GetRow = function (d) {
        return d.$GetValue(Grid.RowProperty);
    };
    Grid.SetRow = function (d, value) {
        d.$SetValue(Grid.RowProperty, value);
    };

    Grid.RowSpanProperty = DependencyProperty.RegisterAttached("RowSpan", function () { return Number; }, Grid, 1);
    Grid.GetRowSpan = function (d) {
        return d.$GetValue(Grid.RowSpanProperty);
    };
    Grid.SetRowSpan = function (d, value) {
        d.$SetValue(Grid.RowSpanProperty, value);
    };

    //#endregion

    //#region Properties

    Grid.ShowGridLinesProperty = DependencyProperty.Register("ShowGridLines", function () { return Boolean; }, Grid, false);
    Grid.ColumnDefinitionsProperty = DependencyProperty.RegisterFull("ColumnDefinitions", function () { return ColumnDefinitionCollection; }, Grid, undefined, undefined, { GetValue: function () { return new ColumnDefinitionCollection(); } });
    Grid.RowDefinitionsProperty = DependencyProperty.RegisterFull("RowDefinitions", function () { return RowDefinitionCollection; }, Grid, undefined, undefined, { GetValue: function () { return new RowDefinitionCollection(); } });

    Nullstone.AutoProperties(Grid, [
        Grid.ShowGridLinesProperty,
        Grid.ColumnDefinitionsProperty,
        Grid.RowDefinitionsProperty
    ]);

    //#endregion

    //#region Measure/Arrange

    Grid.Instance._MeasureOverrideWithError = function (availableSize, error) {
        //LayoutDebug("Grid Measure Pass: " + this.__DebugToString() + " [" + availableSize.toString() + "]");
        var totalSize = availableSize.Copy();
        var cols = this._GetColumnDefinitionsNoAutoCreate();
        var rows = this._GetRowDefinitionsNoAutoCreate();
        var colCount = cols ? cols.GetCount() : 0;
        var rowCount = rows ? rows.GetCount() : 0;
        var totalStars = new Size();
        var emptyRows = rowCount === 0;
        var emptyCols = colCount === 0;
        var hasChildren = this.Children.GetCount() > 0;

        if (emptyRows) rowCount = 1;
        if (emptyCols) colCount = 1;

        this._CreateMatrices(rowCount, colCount);

        var i;
        var cell;
        if (emptyRows) {
            cell = new _Segment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
            cell._Stars = 1.0;
            this._RowMatrix[0][0] = cell;
            totalStars.Height += 1.0;
        } else {
            for (i = 0; i < rowCount; i++) {
                var rowdef = rows.GetValueAt(i);
                var height = rowdef.Height;

                rowdef.$SetValueInternal(RowDefinition.ActualHeightProperty, Number.POSITIVE_INFINITY);
                cell = new _Segment(0.0, rowdef.MinHeight, rowdef.MaxHeight, height.Type);

                if (height.Type === GridUnitType.Pixel) {
                    cell._OfferedSize = cell._Clamp(height.Value);
                    rowdef.$SetValueInternal(RowDefinition.ActualHeightProperty, cell._SetDesiredToOffered());
                } else if (height.Type === GridUnitType.Star) {
                    cell._Stars = height.Value;
                    totalStars.Height += height.Value;
                } else if (height.Type === GridUnitType.Auto) {
                    cell._OfferedSize = cell._Clamp(0);
                    cell._SetDesiredToOffered();
                }

                this._RowMatrix[i][i] = cell;
            }
        }

        if (emptyCols) {
            cell = new _Segment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
            cell._Stars = 1.0;
            this._ColMatrix[0][0] = cell;
            totalStars.Width += 1.0;
        } else {
            for (i = 0; i < colCount; i++) {
                var coldef = cols.GetValueAt(i);
                var width = coldef.Width;

                coldef.$SetValueInternal(ColumnDefinition.ActualWidthProperty, Number.POSITIVE_INFINITY);
                cell = new _Segment(0.0, coldef.MinWidth, coldef.MaxWidth, width.Type);

                if (width.Type === GridUnitType.Pixel) {
                    cell._OfferedSize = cell._Clamp(width.Value);
                    coldef.$SetValueInternal(ColumnDefinition.ActualWidthProperty, cell._SetDesiredToOffered());
                } else if (width.Type === GridUnitType.Star) {
                    cell._Stars = width.Value;
                    totalStars.Width += width.Value;
                } else if (width.Type === GridUnitType.Auto) {
                    cell._OfferedSize = cell._Clamp(0);
                    cell._SetDesiredToOffered();
                }

                this._ColMatrix[i][i] = cell;
            }
        }

        var sizes = new LinkedList();
        var separator = new _GridNode(null, 0, 0, 0);
        sizes.Append(separator);

        var c;
        var r;
        var node;
        var gridWalker = new _GridWalker(this, this._RowMatrix, this._RowMatrixDim, this._ColMatrix, this._ColMatrixDim);
        for (i = 0; i < 6; i++) {
            var autoAuto = i === 0;
            var starAuto = i === 1;
            var autoStar = i === 2;
            var starAutoAgain = i === 3;
            var nonStar = i === 4;
            var remainingStar = i === 5;

            if (hasChildren) {
                this._ExpandStarCols(totalSize);
                this._ExpandStarRows(totalSize);
            }

            var walker = new _VisualTreeWalker(this);
            var child;
            while (child = walker.Step()) {
                var childSize = new Size();
                var starCol = false;
                var starRow = false;
                var autoCol = false;
                var autoRow = false;

                var col = Math.min(Grid.GetColumn(child), colCount - 1);
                var row = Math.min(Grid.GetRow(child), rowCount - 1);
                var colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
                var rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

                for (r = row; r < row + rowspan; r++) {
                    starRow |= this._RowMatrix[r][r]._Type === GridUnitType.Star;
                    autoRow |= this._RowMatrix[r][r]._Type === GridUnitType.Auto;
                }
                for (c = col; c < col + colspan; c++) {
                    starCol |= this._ColMatrix[c][c]._Type === GridUnitType.Star;
                    autoCol |= this._ColMatrix[c][c]._Type === GridUnitType.Auto;
                }

                if (autoRow && autoCol && !starRow && !starCol) {
                    if (!autoAuto)
                        continue;
                    childSize.Width = Number.POSITIVE_INFINITY;
                    childSize.Height = Number.POSITIVE_INFINITY;
                } else if (starRow && autoCol && !starCol) {
                    if (!(starAuto || starAutoAgain))
                        continue;
                    if (starAuto && gridWalker._HasAutoStar)
                        childSize.Height = Number.POSITIVE_INFINITY;
                    childSize.Width = Number.POSITIVE_INFINITY;
                } else if (autoRow && starCol && !starRow) {
                    if (!autoStar)
                        continue;
                    childSize.Height = Number.POSITIVE_INFINITY;
                } else if ((autoRow || autoCol) && !(starRow || starCol)) {
                    if (!nonStar)
                        continue;
                    if (autoRow)
                        childSize.Height = Number.POSITIVE_INFINITY;
                    if (autoCol)
                        childSize.Width = Number.POSITIVE_INFINITY;
                } else if (!(starRow || starCol)) {
                    if (!nonStar)
                        continue;
                } else {
                    if (!remainingStar)
                        continue;
                }

                for (r = row; r < row + rowspan; r++) {
                    childSize.Height += this._RowMatrix[r][r]._OfferedSize;
                }
                for (c = col; c < col + colspan; c++) {
                    childSize.Width += this._ColMatrix[c][c]._OfferedSize;
                }

                child._MeasureWithError(childSize, error);
                var desired = child._DesiredSize;

                if (!starAuto) {
                    node = new _GridNode(this._RowMatrix, row + rowspan - 1, row, desired.Height);
                    sizes.InsertBefore(node, node._Row === node._Col ? separator.Next : separator);
                }
                node = new _GridNode(this._ColMatrix, col + colspan - 1, col, desired.Width);
                sizes.InsertBefore(node, node._Row === node._Col ? separator.Next : separator);
            }

            sizes.Remove(separator);

            while (node = sizes.Tail) {
                node._Cell._DesiredSize = Math.max(node._Cell._DesiredSize, node._Size);
                this._AllocateDesiredSize(rowCount, colCount);
                sizes.Remove(node);
            }
            sizes.Append(separator);
        }

        this._SaveMeasureResults();

        sizes.Remove(separator);

        var gridSize = new Size();
        for (c = 0; c < colCount; c++) {
            gridSize.Width += this._ColMatrix[c][c]._DesiredSize;
        }
        for (r = 0; r < rowCount; r++) {
            gridSize.Height += this._RowMatrix[r][r]._DesiredSize;
        }
        return gridSize;
    };
    Grid.Instance._ArrangeOverrideWithError = function (finalSize, error) {
        //LayoutDebug("Grid Arrange Pass: " + this.__DebugToString() + " [" + finalSize.toString() + "]");
        var columns = this._GetColumnDefinitionsNoAutoCreate();
        var rows = this._GetRowDefinitionsNoAutoCreate();

        var colCount = columns ? columns.GetCount() : 0;
        var rowCount = rows ? rows.GetCount() : 0;

        this._RestoreMeasureResults();

        var c;
        var r;

        var totalConsumed = new Size();
        for (c = 0; c < this._ColMatrixDim; c++) {
            totalConsumed.Width += this._ColMatrix[c][c]._SetOfferedToDesired();
        }
        for (r = 0; r < this._RowMatrixDim; r++) {
            totalConsumed.Height += this._RowMatrix[r][r]._SetOfferedToDesired();
        }

        if (totalConsumed.Width !== finalSize.Width)
            this._ExpandStarCols(finalSize);
        if (totalConsumed.Height !== finalSize.Height)
            this._ExpandStarRows(finalSize);

        for (c = 0; c < colCount; c++) {
            columns.GetValueAt(c).$SetValueInternal(ColumnDefinition.ActualWidthProperty, this._ColMatrix[c][c]._OfferedSize);
        }
        for (r = 0; r < rowCount; r++) {
            rows.GetValueAt(r).$SetValueInternal(RowDefinition.ActualHeightProperty, this._RowMatrix[r][r]._OfferedSize);
        }

        var walker = new _VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var col = Math.min(Grid.GetColumn(child), this._ColMatrixDim - 1);
            var row = Math.min(Grid.GetRow(child), this._RowMatrixDim - 1);
            var colspan = Math.min(Grid.GetColumnSpan(child), this._ColMatrixDim - col);
            var rowspan = Math.min(Grid.GetRowSpan(child), this._RowMatrixDim - row);

            var childFinal = new Rect(0, 0, 0, 0);
            for (c = 0; c < col; c++) {
                childFinal.X += this._ColMatrix[c][c]._OfferedSize;
            }
            for (c = col; c < col + colspan; c++) {
                childFinal.Width += this._ColMatrix[c][c]._OfferedSize;
            }

            for (r = 0; r < row; r++) {
                childFinal.Y += this._RowMatrix[r][r]._OfferedSize;
            }
            for (r = row; r < row + rowspan; r++) {
                childFinal.Height += this._RowMatrix[r][r]._OfferedSize;
            }
            child._ArrangeWithError(childFinal, error);
        }

        return finalSize;
    };

    Grid.Instance._ExpandStarRows = function (availableSize) {
        var availSize = availableSize.Copy();
        var rows = this._GetRowDefinitionsNoAutoCreate();
        var rowsCount = rows ? rows.GetCount() : 0;

        var i;
        var cur;
        for (i = 0; i < this._RowMatrixDim; i++) {
            cur = this._RowMatrix[i][i];
            if (cur._Type === GridUnitType.Star)
                cur._OfferedSize = 0;
            else
                availSize.Height = Math.max(availSize.Height - cur._OfferedSize, 0);
        }
        availSize.Height = this._AssignSize(this._RowMatrix, 0, this._RowMatrixDim - 1, availSize.Height, GridUnitType.Star, false);
        if (rowsCount > 0) {
            for (i = 0; i < this._RowMatrixDim; i++) {
                cur = this._RowMatrix[i][i];
                if (cur._Type === GridUnitType.Star)
                    rows.GetValueAt(i).$SetValueInternal(RowDefinition.ActualHeightProperty, cur._OfferedSize);
            }
        }
    };
    Grid.Instance._ExpandStarCols = function (availableSize) {
        var availSize = availableSize.Copy();
        var columns = this._GetColumnDefinitionsNoAutoCreate();
        var columnsCount = columns ? columns.GetCount() : 0;

        var i;
        var cur;
        for (i = 0; i < this._ColMatrixDim; i++) {
            cur = this._ColMatrix[i][i];
            if (cur._Type === GridUnitType.Star)
                cur._OfferedSize = 0;
            else
                availSize.Width = Math.max(availSize.Width - cur._OfferedSize, 0);
        }
        availSize.Width = this._AssignSize(this._ColMatrix, 0, this._ColMatrixDim - 1, availSize.Width, GridUnitType.Star, false);
        if (columnsCount > 0) {
            for (i = 0; i < this._ColMatrixDim; i++) {
                cur = this._ColMatrix[i][i];
                if (cur._Type === GridUnitType.Star) {
                    columns.GetValueAt(i).$SetValueInternal(ColumnDefinition.ActualWidthProperty, cur._OfferedSize);
                }
            }
        }
    };
    Grid.Instance._AllocateDesiredSize = function (rowCount, colCount) {
        for (var i = 0; i < 2; i++) {
            var matrix = i === 0 ? this._RowMatrix : this._ColMatrix;
            var count = i === 0 ? rowCount : colCount;

            for (var row = count - 1; row >= 0; row--) {
                for (var col = row; col >= 0; col--) {
                    var spansStar = false;
                    for (var j = row; j >= col; j--) {
                        spansStar |= matrix[j][j]._Type === GridUnitType.Star;
                    }
                    var current = matrix[row][col]._DesiredSize;
                    var totalAllocated = 0;
                    for (var a = row; a >= col; a--) {
                        totalAllocated += matrix[a][a]._DesiredSize;
                    }
                    if (totalAllocated < current) {
                        var additional = current - totalAllocated;
                        if (spansStar) {
                            additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Star, true);
                        } else {
                            additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Pixel, true);
                            additional = this._AssignSize(matrix, col, row, additional, GridUnitType.Auto, true);
                        }
                    }
                }
            }
        }
        for (var r = 0; r < this._RowMatrixDim; r++) {
            this._RowMatrix[r][r]._OfferedSize = this._RowMatrix[r][r]._DesiredSize;
        }
        for (var c = 0; c < this._ColMatrixDim; c++) {
            this._ColMatrix[c][c]._OfferedSize = this._ColMatrix[c][c]._DesiredSize;
        }
    };
    Grid.Instance._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
        var count = 0;
        var assigned;
        var segmentSize;
        var i;
        var cur;
        for (i = start; i <= end; i++) {
            cur = matrix[i][i];
            segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
            if (segmentSize < cur._Max)
                count += (unitType === GridUnitType.Star) ? cur._Stars : 1;
        }
        do {
            assigned = false;
            var contribution = size / count;
            for (i = start; i <= end; i++) {
                cur = matrix[i][i];
                segmentSize = desiredSize ? cur._DesiredSize : cur._OfferedSize;
                if (!(cur._Type === unitType && segmentSize < cur._Max))
                    continue;
                var newSize = segmentSize;
                newSize += contribution * (unitType === GridUnitType.Star ? cur._Stars : 1);
                newSize = Math.min(newSize, cur._Max);
                assigned |= newSize > segmentSize;
                size -= newSize - segmentSize;
                if (desiredSize)
                    cur._DesiredSize = newSize;
                else
                    cur._OfferedSize = newSize;
            }
        } while (assigned);
        return size;
    };

    //#endregion

    //#region Bounds

    Grid.Instance._ComputeBounds = function () {
        this._ComputeBounds$Panel();

        if (this.ShowGridLines) {
            this._Extents = new Rect(0, 0, this.ActualWidth, this.ActualHeight);
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
            this._Bounds = this._IntersectBoundsWithClipPath(this._Extents.GrowByThickness(this._EffectPadding), false).Transform(this._AbsoluteXform);
            this._BoundsWithChildren = this._BoundsWithChildren.Union(this._Bounds);

            this._ComputeGlobalBounds();
            this._ComputeSurfaceBounds();
        }
    };

    //#endregion

    //#region Matrix Management

    Grid.Instance._CreateMatrices = function (rowCount, colCount) {
        if (this._RowMatrix == null || this._ColMatrix == null || this._RowMatrixDim !== rowCount || this._ColMatrixDim !== colCount) {
            this._DestroyMatrices();

            this._RowMatrixDim = rowCount;
            this._RowMatrix = [];
            for (var i = 0; i < rowCount; i++) {
                this._RowMatrix.push([]);
            }

            this._ColMatrixDim = colCount;
            this._ColMatrix = [];
            for (var j = 0; j < colCount; j++) {
                this._ColMatrix.push([]);
            }
        }

        for (var r = 0; r < rowCount; r++) {
            this._RowMatrix[r] = [];
            for (var rr = 0; rr <= r; rr++) {
                this._RowMatrix[r].push(new _Segment());
            }
        }

        for (var c = 0; c < colCount; c++) {
            this._ColMatrix[c] = [];
            for (var cc = 0; cc <= c; cc++) {
                this._ColMatrix[c].push(new _Segment());
            }
        }
    };
    Grid.Instance._DestroyMatrices = function () {
        this._RowMatrix = null;
        this._ColMatrix = null;
    };
    Grid.Instance._SaveMeasureResults = function () {
        var i;
        var j;
        for (i = 0; i < this._RowMatrixDim; i++) {
            for (j = 0; j <= i; j++) {
                this._RowMatrix[i][j]._OriginalSize = this._RowMatrix[i][j]._OfferedSize;
            }
        }

        for (i = 0; i < this._ColMatrixDim; i++) {
            for (j = 0; j <= i; j++) {
                this._ColMatrix[i][j]._OriginalSize = this._ColMatrix[i][j]._OfferedSize;
            }
        }
    };
    Grid.Instance._RestoreMeasureResults = function () {
        var i;
        var j;
        for (i = 0; i < this._RowMatrixDim; i++) {
            for (j = 0; j <= i; j++) {
                this._RowMatrix[i][j]._OfferedSize = this._RowMatrix[i][j]._OriginalSize;
            }
        }

        for (i = 0; i < this._ColMatrixDim; i++) {
            for (j = 0; j <= i; j++) {
                this._ColMatrix[i][j]._OfferedSize = this._ColMatrix[i][j]._OriginalSize;
            }
        }
    };

    //#endregion

    //#region Changes

    Grid.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== Grid) {
            this._OnPropertyChanged$Panel(args, error);
            return;
        }

        if (args.Property._ID === Grid.ShowGridLinesProperty._ID) {
            this._Invalidate();
        }
        this._InvalidateMeasure();
        this.PropertyChanged.Raise(this, args);
    };
    Grid.Instance._OnCollectionChanged = function (col, args) {
        if (this._PropertyHasValueNoAutoCreate(Grid.ColumnDefinitionsProperty, col)
            || this._PropertyHasValueNoAutoCreate(Grid.RowDefinitionsProperty, col)) {
            this._InvalidateMeasure();
        } else {
            this._OnCollectionChanged$Panel(col, args);
        }
    };
    Grid.Instance._OnCollectionItemChanged = function (col, obj, args) {
        if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, col)) {
            if (args.Property._ID === Grid.ColumnProperty._ID
                || args.Property._ID === Grid.RowProperty._ID
                || args.Property._ID === Grid.ColumnSpanProperty._ID
                || args.Property._ID === Grid.RowSpanProperty._ID) {
                this._InvalidateMeasure();
                obj._InvalidateMeasure();
                return;
            }
        } else if (Nullstone.RefEquals(col, this._GetColumnDefinitionsNoAutoCreate())
            || Nullstone.RefEquals(col, this._GetRowDefinitionsNoAutoCreate())) {
            if (args.Property._ID !== ColumnDefinition.ActualWidthProperty._ID
                && args.Property._ID !== RowDefinition.ActualHeightProperty._ID) {
                this._InvalidateMeasure();
            }
            return;
        }
        this._OnCollectionItemChanged$Panel(col, obj, args);
    };

    //#endregion

    //#region Html Translations

    Grid.Instance.GetRowDefinition = function (index) {
        var rd = this.RowDefinitions.GetValueAt(index);
        if (!rd) {
            rd = new RowDefinition();
            rd.Height.Type = GridUnitType.Star;
            rd.Height.Value = 1;
        }
        return rd;
    };
    Grid.Instance.GetColumnDefinition = function (index) {
        var cd = this.ColumnDefinitions.GetValueAt(index);
        if (!cd) {
            cd = new ColumnDefinition();
            cd.Width.Type = GridUnitType.Star;
            cd.Width.Value = 1;
        }
        return cd;
    };
    Grid.Instance.InsertHtmlChild = function (child, index) {
        //TODO: what to do if row is set to a row number that doesn't exist?
        var table = this.GetHtmlChildrenContainer();
        var row = Grid.GetRow(child);
        var column = Grid.GetColumn(child);
        var rd = this.GetRowDefinition(row);
        var cd = this.GetColumnDefinition(column);
        var contentEl = table.children[row].children[column].firstChild.firstChild;
        contentEl.appendChild(child.GetRootHtmlElement());
    };
    Grid.Instance.RemoveHtmlChild = function (child, index) {
        //TODO: what to do if row is set to a row number that doesn't exist?
        var table = this.GetHtmlChildrenContainer();
        var row = Grid.GetRow(child);
        var column = Grid.GetColumn(child);
        var rd = this.GetRowDefinition(row);
        var cd = this.GetColumnDefinition(column);
        var contentEl = table.children[row].children[column].firstChild.firstChild;
        contentEl.removeChild(child.GetRootHtmlElement());
    };
    Grid.Instance.CreateCells = function (table) {
        var rows = this.RowDefinitions.GetCount();
        var columns = this.ColumnDefinitions.GetCount();

        var totalRowStars = 0;
        for (var i = 0; i < rows; i++) {
            var rd = this.RowDefinitions.GetValueAt(i).Height;
            if (rd.Type == GridUnitType.Star) {
                totalRowStars += rd.Value;
            }
        }

        var totalColumnStars = 0;
        for (var i = 0; i < columns; i++) {
            var cd = this.ColumnDefinitions.GetValueAt(i).Width;
            if (cd.Type == GridUnitType.Star) {
                totalColumnStars += cd.Value;
            }
        }

        //a grid must have at least one row and column to place the content in
        if (rows == 0) {
            rows = 1;
            totalRowStars = 1;
        }
        if (columns == 0) {
            columns = 1;
            totalColumnStars = 1;
        }
        for (var i = 0; i < rows; i++) {
            var rd = this.GetRowDefinition(i);
            var rowEl = table.appendChild(document.createElement("tr"));
            for (var j = 0; j < columns; j++) {
                var cd = this.GetColumnDefinition(j);
                var columnEl = rowEl.appendChild(document.createElement("td"));
                columnEl.style.padding = "0px";
                switch (rd.Height.Type) {
                    case GridUnitType.Star:
                        columnEl.style.height = (rd.Height.Value / totalRowStars) * 100 + "%";
                        break;
                    case GridUnitType.Pixel:
                        columnEl.style.height = rd.Height.Value + "px";
                        columnEl.style.minHeight = rd.Height.Value + "px";
                        break;
                    case GridUnitType.Auto:
                        columnEl.style.height = "auto";
                        columnEl.style.minHeight = rd.MinHeight + "px";
                        columnEl.style.maxHeight = rd.MaxHeight + "px";
                        break;
                }
                switch (cd.Width.Type) {
                    case GridUnitType.Star:
                        columnEl.style.width = (cd.Width.Value / totalColumnStars) * 100 + "%";
                        break;
                    case GridUnitType.Pixel:
                        columnEl.style.width = cd.Width.Value + "px";
                        columnEl.style.minWidth = cd.Width.Value + "px";
                        break;
                    case GridUnitType.Auto:
                        columnEl.style.width = "auto";
                        columnEl.style.minWidth = cd.MinWidth + "px";
                        columnEl.style.maxWidth = cd.MaxWidth + "px";
                        break;
                }
                columnEl.style.fontSize = "0px";
                columnEl.style.overflow = "hidden";
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
            }
        }
    };
    Grid.Instance.CreateHtmlChildrenContainer = function () {
        var table = document.createElement("table");
        table.style.borderSpacing = "0px";
        table.style.width = "100%";
        table.style.height = "100%";
        this.CreateCells(table);
        return table;
    };
    Grid.Instance.ApplyHtmlChange = function (change) {
        var propd = change.Property;
        if (propd.OwnerType !== Grid) {
            this.ApplyHtmlChange$Panel(change);
            return;
        }

        if (propd._ID === Grid.ShowGridLinesProperty._ID) {
            var table = this.GetHtmlChildrenContainer();
            for (var i = 0; i < table.children.length; i++) {
                var row = table.children[i];
                for (var j = 0; j < row.children.length; j++) {
                    var cell = row.children[j];
                    cell.style.border = "solid 1px black";
                }
            }
        }
    };
    Grid.Instance.UpdateAdjustedWidth = function (child, width) {
        delete Surface._SizingAdjustments[this._ID];
        var column = Grid.GetColumn(child);
        var row = Grid.GetRow(child);
        var cd = this.GetColumnDefinition(column);
        var rd = this.GetRowDefinition(row);
        if (cd.Width.Type == GridUnitType.Auto) {
            var table = this.GetHtmlChildrenContainer();
            table.children[row].children[column].firstChild.style.width = width + "px";
        }
        if (!this.GetIsFixedWidth()) {
            var myWidth = this.GetHtmlChildrenContainer().offsetWidth;
            this.GetContentHtmlElement().style.width = myWidth + "px";
            myWidth = this.CalculateAdjustedWidth(myWidth);
            var parent = this.GetVisualParent();
            if (parent) parent.UpdateAdjustedWidth(this, myWidth);
        }
    };
    Grid.Instance.UpdateAdjustedHeight = function (child, height) {
        delete Surface._SizingAdjustments[this._ID];
        var column = Grid.GetColumn(child);
        var row = Grid.GetRow(child);
        var cd = this.GetColumnDefinition(column);
        var rd = this.GetRowDefinition(row);
        if (rd.Height.Type == GridUnitType.Auto) {
            var table = this.GetHtmlChildrenContainer();
            table.children[row].children[column].firstChild.style.height = height + "px";
        }
        if (!this.GetIsFixedHeight()) {
            var myHeight = this.GetHtmlChildrenContainer().offsetHeight;
            this.GetContentHtmlElement().style.height = myHeight + "px";
            myHeight = this.CalculateAdjustedHeight(myHeight);
            var parent = this.GetVisualParent();
            if (parent) parent.UpdateAdjustedHeight(this, myHeight);
        }
    };
    Grid.Instance.GetIsFixedWidth = function (child) {
        if (child) {
            var column = Grid.GetColumn(child);
            var cd = this.GetColumnDefinition(column);
            if (cd.Width.Type == GridUnitType.Auto) return false;
            else return true;
        }
        else return this.IsFixedWidth;
    };
    Grid.Instance.GetIsFixedHeight = function (child) {
        if (child) {
            var row = Grid.GetRow(child);
            var rd = this.GetRowDefinition(row);
            if (rd.Height.Type == GridUnitType.Auto) return false;
            else return true;
        }
        else return this.IsFixedHeight;
    };

    //#endregion

    //#region Definition Retrieval

    Grid.Instance._GetRowDefinitionsNoAutoCreate = function () {
        return this._GetValueNoAutoCreate(Grid.RowDefinitionsProperty);
    }
    Grid.Instance._GetColumnDefinitionsNoAutoCreate = function () {
        return this._GetValueNoAutoCreate(Grid.ColumnDefinitionsProperty);
    }

    //#endregion

    Grid.__DebugMatrix = function (matrix) {
        var str = "";
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                str += "[";
                str += matrix[i][j].toString();
                str += "]";
            }
            str += "\n";
        }
        return str;
    };
    Grid.__DebugDiagonalMatrix = function (matrix) {
        var str = "";
        for (var i = 0; i < matrix.length; i++) {
            str += "[";
            str += matrix[i][i].toString();
            str += "]";
            str += "\n";
        }
        return str;
    };

    namespace.Grid = Nullstone.FinishCreate(Grid);
})(window);

(function (namespace) {
    function _Segment(offered, min, max, unitType) {
        if (offered == null) offered = 0.0;
        if (min == null) min = 0.0;
        if (max == null) max = Number.POSITIVE_INFINITY;
        if (unitType == null) unitType = GridUnitType.Pixel;

        this._DesiredSize = 0;
        this._Min = min;
        this._Max = max;
        this._Stars = 0;
        this._Type = unitType;

        this._OfferedSize = this._Clamp(offered);
        this._OriginalSize = this._OfferedSize;
    }

    _Segment.prototype._SetOfferedToDesired = function () {
        this._OfferedSize = this._DesiredSize;
        return this._OfferedSize;
    };
    _Segment.prototype._SetDesiredToOffered = function () {
        this._DesiredSize = this._OfferedSize;
        return this._DesiredSize;
    };
    _Segment.prototype._Clamp = function (value) {
        if (value < this._Min)
            return this._Min;
        if (value > this._Max)
            return this._Max;
        return value;
    }
    _Segment.prototype.toString = function () {
        return this._OfferedSize.toString() + ";" + this._DesiredSize.toString();
    };

    namespace._Segment = _Segment;
})(window);

(function (namespace) {
    var _GridNode = Nullstone.Create("_GridNode", LinkedListNode, 4);

    _GridNode.Instance.Init = function (matrix, row, col, size) {
        this._Matrix = matrix;
        this._Row = row;
        this._Col = col;
        this._Size = size;
        this._Cell = this._Matrix == null ? null : this._Matrix[row][col];
    };

    namespace._GridNode = Nullstone.FinishCreate(_GridNode);
})(window);

(function (namespace) {
    var _GridWalker = Nullstone.Create("_GridWalker", undefined, 5);

    _GridWalker.Instance.Init = function (grid, rowMatrix, rowCount, colMatrix, colCount) {
        this._HasAutoAuto = false;
        this._HasStarAuto = false;
        this._HasAutoStar = false;

        var walker = new _VisualTreeWalker(grid, _VisualTreeWalkerDirection.Logical);
        var child;
        while (child = walker.Step()) {
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;

            var col = Math.min(Grid.GetColumn(child), colCount - 1);
            var row = Math.min(Grid.GetRow(child), rowCount - 1);
            var colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
            var rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

            for (var r = row; r < row + rowspan; r++) {
                starRow |= rowMatrix[r][r].Type === GridUnitType.Star;
                autoRow |= rowMatrix[r][r].Type === GridUnitType.Auto;
            }
            for (var c = col; c < col + colspan; c++) {
                starCol |= colMatrix[c][c].Type === GridUnitType.Star;
                autoCol |= colMatrix[c][c].Type === GridUnitType.Auto;
            }

            this._HasAutoAuto |= autoRow && autoCol && !starRow && !starCol;
            this._HasStarAuto |= starRow && autoCol;
            this._HasAutoStar |= autoRow && starCol;
        }
    };

    namespace._GridWalker = Nullstone.FinishCreate(_GridWalker);
})(window);