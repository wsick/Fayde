/// <reference path="Panel.js"/>
/// <reference path="DependencyObjectCollection.js"/>
/// <reference path="List.js"/>

var GridUnitType = {
    Auto: 0,
    Pixel: 1,
    Star: 2
};

Grid.prototype = new Panel;
Grid.prototype.constructor = Grid;
function Grid() {
    Panel.call(this);
    this._RowMatrix = null;
    this._ColMatrix = null;
}

//////////////////////////////////////////
// ATTACHED DEPENDENCY PROPERTIES
//////////////////////////////////////////
Grid.ColumnProperty = DependencyProperty.RegisterAttached("Column", Grid, 0);
Grid.GetColumn = function (d) {
    return d.GetValue(Grid.ColumnProperty);
};
Grid.SetColumn = function (d, value) {
    d.SetValue(Grid.ColumnProperty, value);
};

Grid.ColumnSpanProperty = DependencyProperty.RegisterAttached("ColumnSpan", Grid, 1);
Grid.GetColumnSpan = function (d) {
    return d.GetValue(Grid.ColumnSpanProperty);
};
Grid.SetColumnSpan = function (d, value) {
    d.SetValue(Grid.ColumnSpanProperty, value);
};

Grid.RowProperty = DependencyProperty.RegisterAttached("Row", Grid, 0);
Grid.GetRow = function (d) {
    return d.GetValue(Grid.RowProperty);
};
Grid.SetRow = function (d, value) {
    d.SetValue(Grid.RowProperty, value);
};

Grid.RowSpanProperty = DependencyProperty.RegisterAttached("RowSpan", Grid, 1);
Grid.GetRowSpan = function (d) {
    return d.GetValue(Grid.RowSpanProperty);
};
Grid.SetRowSpan = function (d, value) {
    d.SetValue(Grid.RowSpanProperty, value);
};

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
Grid.ShowGridLinesProperty = DependencyProperty.Register("ShowGridLines", Grid, false);
Grid.prototype.GetShowGridLines = function () {
    return this.GetValue(Grid.ShowGridLinesProperty);
};
Grid.prototype.SetShowGridLines = function (value) {
    this.SetValue(Grid.ShowGridLinesProperty, value);
};

Grid.ColumnDefinitionsProperty = DependencyProperty.Register("ColumnDefinitions", Grid);
Grid.prototype.GetColumnDefinitions = function () {
    return this.GetValue(Grid.ColumnDefinitionsProperty);
};
Grid.prototype.SetColumnDefinitions = function (value) {
    this.SetValue(Grid.ColumnDefinitionsProperty, value);
};

Grid.RowDefinitionsProperty = DependencyProperty.Register("RowDefinitions", Grid);
Grid.prototype.GetRowDefinitions = function () {
    return this.GetValue(Grid.RowDefinitionsProperty);
};
Grid.prototype.SetRowDefinitions = function (value) {
    this.SetValue(Grid.RowDefinitionsProperty, value);
};

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
Grid.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var totalSize = availableSize;
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var colCount = cols ? cols.GetCount() : 0;
    var rowCount = rows ? rows.GetCount() : 0;
    var totalStars = new Size(0, 0);
    var emptyRows = rowCount == 0;
    var emptyCols = colCount == 0;
    var hasChildren = this.GetChildren().GetCount() > 0;

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
            var height = rowdef.GetHeight();

            rowdef.SetActualHeight(Number.POSITIVE_INFINITY);
            cell = new _Segment(0.0, rowdef.GetMinHeight(), rowdef.GetMaxHeight(), height.Type);

            if (height.Type == GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(height.Value);
                rowdef.SetActualHeight(cell._SetDesiredToOffered());
            } else if (height.Type == GridUnitType.Star) {
                cell._Stars = height.Value;
                totalStars.Height += height.Value;
            } else if (height.Type == GridUnitType.Auto) {
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
            var width = coldef.GetWidth();

            coldef.SetActualWidth(Number.POSITIVE_INFINITY);
            cell = new _Segment(0.0, coldef.GetMinWidth(), coldef.GetMaxWidth(), width.Type);

            if (width.Type == GridUnitType.Pixel) {
                cell._OfferedSize = cell._Clamp(width.Value);
                coldef.SetActualWidth(cell._SetDesiredToOffered());
            } else if (width.Type == GridUnitType.Star) {
                cell._Stars = width.Value;
                totalStars.Width += width.Value;
            } else if (width.Type == GridUnitType.Auto) {
                cell._OfferedSize = cell._Clamp(0);
                cell._SetDesiredToOffered();
            }

            this._ColMatrix[i][i] = cell;
        }
    }

    var sizes = new List();
    var separator = new _GridNode(null, 0, 0, 0);
    sizes.Append(separator);

    var c;
    var r;
    var node;
    var gridWalker = new _GridWalker(this, this._RowMatrix, this._RowMatrixDim, this._ColMatrix, this._ColMatrixDim);
    for (i = 0; i < 6; i++) {
        var autoAuto = i == 0;
        var starAuto = i == 1;
        var autoStar = i == 2;
        var starAutoAgain = i == 3;
        var nonStar = i == 4;
        var remainingStar = i == 5;

        if (hasChildren) {
            this._ExpandStarCols(totalSize);
            this._ExpandStarRows(totalSize);
        }

        var walker = new _VisualTreeWalker(this);
        var child;
        while (child = walker.Step()) {
            var childSize = new Size(0, 0);
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;

            var col = Math.min(Grid.GetColumn(child), colCount - 1);
            var row = Math.min(Grid.GetRow(child), rowCount - 1);
            var colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
            var rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

            for (r = 0; r < row + rowspan; r++) {
                starRow = starRow || (this._RowMatrix[r][r]._Type == GridUnitType.Star);
                autoRow = autoRow || (this._RowMatrix[r][r]._Type == GridUnitType.Auto);
            }
            for (c = 0; c < col + colspan; c++) {
                starCol = starCol || (this._ColMatrix[c][c]._Type == GridUnitType.Star);
                autoCol = autoCol || (this._ColMatrix[c][c]._Type == GridUnitType.Auto);
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
            var desired = child.GetDesiredSize();

            if (!starAuto) {
                node = new _GridNode(this._RowMatrix, row + rowspan - 1, row, desired.Height);
                sizes.InsertBefore(node, node._Row == node._Col ? separator.Next : separator);
            }
            node = new _GridNode(this._ColMatrix, col + colspan - 1, col, desired.Width);
            sizes.InsertBefore(node, node._Row == node._Col ? separator.Next : separator);
        }

        sizes.Remove(separator);

        while (node = sizes.Last()) {
            this._Cell._DesiredSize = Math.max(this._Cell._DesiredSize, node._Size);
            this._AllocateDesiredSize(rowCount, colCount);
            sizes.Remove(node);
        }
        sizes.Append(separator);
    }

    this._SaveMeasureResults();

    sizes.Remove(separator);

    var gridSize = new Size(0, 0);
    for (c = 0; c < colCount; c++) {
        gridSize.Width += this._ColMatrix[c][c]._DesiredSize;
    }
    for (r = 0; r < rowCount; r++) {
        gridSize.Height += this._RowMatrix[c][c]._DesiredSize;
    }
    return gridSize;
};
Grid.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var rows = this._GetRowDefinitionsNoAutoCreate();

    var colCount = columns ? columns.GetCount() : 0;
    var rowCount = rows ? rows.GetCount() : 0;

    this._RestoreMeasureResults();

    var c;
    var r;

    var totalConsumed = new Size(0, 0);
    for (c = 0; c < this._ColMatrixDim; c++) {
        totalConsumed.Width += this._ColMatrix[c][c]._SetOfferedToDesired();
    }
    for (r = 0; r < this._RowMatrixDim; r++) {
        totalConsumed.Height += this._RowMatrix[r][r]._SetOfferedToDesired();
    }

    if (totalConsumed.Width != finalSize.Width)
        this._ExpandStarCols(finalSize);
    if (totalConsumed.Height != finalSize.Height)
        this._ExpandStarRows(finalSize);

    for (c = 0; c < colCount; c++) {
        columns.GetValueAt(c).SetActualWidth(this._ColMatrix[c][c]._OfferedSize);
    }
    for (r = 0; r < rowCount; r++) {
        rows.GetValueAt(r).SetActualHeight(this._RowMatrix[r][r]._OfferedSize);
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

Grid.prototype._ExpandStarRows = function (availableSize) {
    var rows = this._GetRowDefinitionsNoAutoCreate();
    var rowsCount = rows ? rows.GetCount() : 0;

    for (var i = 0; i < this._RowMatrixDim; i++) {
        if (this._RowMatrix[i][i]._Type == GridUnitType.Star)
            this._RowMatrix[i][i]._OfferedSize = 0;
        else
            availableSize.Height = Math.max(availableSize.Height - this._RowMatrix[i][i]._OfferedSize, 0);
    }
    availableSize.Height = this._AssignSize(this._RowMatrix, 0, this._RowMatrixDim - 1, availableSize.Height, GridUnitType.Star, false);
    if (rowsCount > 0) {
        for (var j = 0; j < this._RowMatrixDim; j++) {
            if (this._RowMatrix[j][j]._Type == GridUnitType.Star)
                rows.GetValueAt(j).SetActualHeight(this._RowMatrix[j][j]._OfferedSize);
        }
    }
};
Grid.prototype._ExpandStarCols = function (availableSize) {
    var columns = this._GetColumnDefinitionsNoAutoCreate();
    var columnsCount = columns ? columns.GetCount() : 0;

    for (var i = 0; i < this._ColMatrixDim; i++) {
        if (this._ColMatrix[i][i]._Type == GridUnitType.Star)
            this._ColMatrix[i][i]._OfferedSize = 0;
        else
            availableSize.Width = Math.max(availableSize.Width - this._ColMatrix[i][i]._OfferedSize, 0);
    }
    availableSize.Width = this._AssignSize(this._ColMatrix, 0, this._ColMatrixDim - 1, availableSize.Width, GridUnitType.Star, false);
    if (columnsCount > 0) {
        for (var j = 0; j < this._ColMatrixDim; j++) {
            if (this._ColMatrix[j][j]._Type == GridUnitType.Star) {
                columns.GetValueAt(j).SetActualWidth(this._ColMatrix[j][j]._OfferedSize);
            }
        }
    }
};
Grid.prototype._AllocateDesiredSize = function (rowCount, colCount) {
    for (var i = 0; i < 2; i++) {
        var matrix = i == 0 ? this._RowMatrix : this._ColMatrix;
        var count = i == 0 ? rowCount : colCount;

        for (var row = count - 1; row >= 0; row--) {
            for (var col = row; col >= 0; col--) {
                var spansStar = false;
                for (var j = row; j >= col; j--) {
                    spansStar = spansStar || (matrix[j][j]._Type == GridUnitType.Star);
                }
                var current = matrix[row][col]._DesiredSize;
                var totalAllocated = 0;
                for (var a = row; a >= col; a--) {
                    totalAllocated += matrix[i][i]._DesiredSize;
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
Grid.prototype._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
    var count = 0;
    var assigned;
    var segmentSize;
    for (var i = start; i <= end; i++) {
        segmentSize = this._DesiredSize != null ? matrix[i][i]._DesiredSize : matrix[i][i]._OfferedSize;
        if (segmentSize < matrix[i][i]._Max)
            count += (unitType == GridUnitType.Star) ? matrix[i][i]._Stars : 1;
    }
    do {
        assigned = false;
        var contribution = size / count;
        for (var j = start; j <= end; j++) {
            segmentSize = this._DesiredSize != null ? matrix[i][i]._DesiredSize : matrix[i][i]._OfferedSize;
            if (!(matrix[i][i]._Type == unitType && segmentSize < matrix[i][i]._Max))
                continue;
            var newSize = segmentSize;
            newSize += contribution * (unitType == GridUnitType.Star ? matrix[i][i]._Stars : 1);
            newSize = Math.min(newSize, matrix[i][i]._Max);
            assigned = assigned || (newSize > segmentSize);
            size -= newSize - segmentSize;
            if (desiredSize)
                matrix[i][i]._DesiredSize = newSize;
            else
                matrix[i][i]._OfferedSize = newSize;
        }
    } while (assigned);
    return size;
};

Grid.prototype._CreateMatrices = function (rowCount, colCount) {
    if (this._RowMatrix == null || this._ColMatrix == null || this._RowMatrixDim != rowCount || this._ColMatrixDim != colCount) {
        this._DestroyMatrices();

        this._RowMatrixDim = rowCount;
        this._RowMatrix = new Array();
        for (var i = 0; i < rowCount; i++) {
            this._RowMatrix.push(new Array());
        }

        this._ColMatrixDim = colCount;
        this._ColMatrix = new Array();
        for (var j = 0; j < colCount; j++) {
            this._RowMatrix.push(new Array());
        }
    }

    for (var r = 0; r < rowCount; r++) {
        for (var rr = 0; rr <= r; rr++) {
            this._RowMatrix[r][rr] = new _Segment();
        }
    }

    for (var c = 0; c < colCount; c++) {
        for (var cc = 0; cc <= c; cc++) {
            this._ColMatrix[c][cc] = new _Segment();
        }
    }
};
Grid.prototype._DestroyMatrices = function () {
    this._RowMatrix = null;
    this._ColMatrix = null;
};
Grid.prototype._SaveMeasureResults = function () {
    for (var i = 0; i < this._RowMatrixDim; i++) {
        for (var j = 0; j < this._RowMatrixDim; j++) {
            this._RowMatrix[i][j]._OriginalSize = this._RowMatrix[i][j]._OfferedSize;
        }
    }

    for (var a = 0; a < this._ColMatrixDim; a++) {
        for (var b = 0; b < this._ColMatrixDim; b++) {
            this._ColMatrix[a][b]._OriginalSize = this._ColMatrix[i][j]._OfferedSize;
        }
    }
};
Grid.prototype._RestoreMeasureResults = function () {
    for (var i = 0; i < this._RowMatrixDim; i++) {
        for (var j = 0; j < this._RowMatrixDim; j++) {
            this._RowMatrix[i][j]._OfferedSize = this._RowMatrix[i][j]._OriginalSize;
        }
    }

    for (var a = 0; a < this._ColMatrixDim; a++) {
        for (var b = 0; b < this._ColMatrixDim; b++) {
            this._ColMatrix[a][b]._OfferedSize = this._ColMatrix[i][j]._OriginalSize;
        }
    }
};

Grid.prototype._ComputeBounds = function () {
    Panel.prototype._ComputeBounds.call(this);

    if (this.GetShowGridLines()) {
        this._Extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
        this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/* .GrowByThickness(this._EffectPadding) */, false); //.Transform(this._AbsoluteTransform);
        this._BoundsWithChildren = this._BoundsWithChildren.Union(this._Bounds);

        this._ComputeGlobalBounds();
        this._ComputeSurfaceBounds();
    }
};

Grid.prototype._GetRowDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.RowDefinitionsProperty);
    return value == undefined ? null : value;
}
Grid.prototype._GetColumnDefinitionsNoAutoCreate = function () {
    var value = this._GetValueNoAutoCreate(Grid.ColumnDefinitionsProperty);
    return value == undefined ? null : value;
}

Grid.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Grid) {
        Panel.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == Grid.ShowGridLinesProperty) {
        this._Invalidate();
    }
    this._InvalidateMeasure();
    this.PropertyChange.Raise(this, args);
};
Grid.prototype._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Grid.ColumnDefinitionsProperty, sender)
        || this._PropertyHasValueNoAutoCreate(Grid.RowDefinitionsProperty, sender)) {
        
    } else {
        Panel.prototype._OnCollectionChanged.call(this, sender, args);
    }
};
Grid.prototype._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property == Grid.ColumnProperty
            || args.Property == Grid.RowProperty
            || args.Property == Grid.ColumnSpanProperty
            || args.Property == Grid.RowSpanProperty) {
            this._InvalidateMeasure();
            args.Item._InvalidateMeasure();
            return;
        }
    } else if (sender == this._GetColumnDefinitionsNoAutoCreate()
        || sender == this._GetRowDefinitionsNoAutoCreate()) {
        if (args.Property != ColumnDefinition.ActualWidthProperty
            && args.Property != RowDefinition.ActualHeightProperty) {
            this._InvalidateMeasure();
        }
        return;
    }
    Panel.prototype._OnCollectionChanged.call(this, sender, args);
};




GridLength.prototype = new Object;
GridLength.prototype.constructor = GridLength;
function GridLength(value, type) {
    this.Value = value == null ? 0 : value;
    this.Type = type == null ? GridUnitType.Auto : type;
}
GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};



RowDefinition.prototype = new DependencyObject;
RowDefinition.prototype.constructor = RowDefinition;
function RowDefinition() {
    DependencyObject.call(this);
}

RowDefinition.HeightProperty = DependencyProperty.Register("Height", RowDefinition, new GridLength(1.0, GridUnitType.Star));
RowDefinition.prototype.GetHeight = function () {
    return this.GetValue(RowDefinition.HeightProperty);
};
RowDefinition.prototype.SetHeight = function (value) {
    this.SetValue(RowDefinition.HeightProperty, value);
};

RowDefinition.MaxHeightProperty = DependencyProperty.Register("MaxHeight", RowDefinition, Number.POSITIVE_INFINITY);
RowDefinition.prototype.GetMaxHeight = function () {
    return this.GetValue(RowDefinition.MaxHeightProperty);
};
RowDefinition.prototype.SetMaxHeight = function (value) {
    this.SetValue(RowDefinition.MaxHeightProperty, value);
};

RowDefinition.MinHeightProperty = DependencyProperty.Register("MinHeight", RowDefinition, 0.0);
RowDefinition.prototype.GetMinHeight = function () {
    return this.GetValue(RowDefinition.MinHeightProperty);
};
RowDefinition.prototype.SetMinHeight = function (value) {
    this.SetValue(RowDefinition.MinHeightProperty, value);
};

RowDefinition.ActualHeightProperty = DependencyProperty.Register("ActualHeight", RowDefinition, 0.0);
RowDefinition.prototype.GetActualHeight = function () {
    return this.GetValue(RowDefinition.ActualHeightProperty);
};
RowDefinition.prototype.SetActualHeight = function (value) {
    this.SetValue(RowDefinition.ActualHeightProperty, value);
};



RowDefinitionCollection.prototype = new DependencyObjectCollection;
RowDefinitionCollection.prototype.constructor = RowDefinitionCollection;
function RowDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
RowDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "RowDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};





ColumnDefinition.prototype = new DependencyObject;
ColumnDefinition.prototype.constructor = ColumnDefinition;
function ColumnDefinition() {
    DependencyObject.call(this);
}

ColumnDefinition.WidthProperty = DependencyProperty.Register("Width", ColumnDefinition, new GridLength(1.0, GridUnitType.Star));
ColumnDefinition.prototype.GetWidth = function () {
    return this.GetValue(ColumnDefinition.WidthProperty);
};
ColumnDefinition.prototype.SetWidth = function (value) {
    this.SetValue(ColumnDefinition.WidthProperty, value);
};

ColumnDefinition.MaxWidthProperty = DependencyProperty.Register("MaxWidth", ColumnDefinition, Number.POSITIVE_INFINITY);
ColumnDefinition.prototype.GetMaxWidth = function () {
    return this.GetValue(ColumnDefinition.MaxWidthProperty);
};
ColumnDefinition.prototype.SetMaxWidth = function (value) {
    this.SetValue(ColumnDefinition.MaxWidthProperty, value);
};

ColumnDefinition.MinWidthProperty = DependencyProperty.Register("MinWidth", ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetMinWidth = function () {
    return this.GetValue(ColumnDefinition.MinWidthProperty);
};
ColumnDefinition.prototype.SetMinWidth = function (value) {
    this.SetValue(ColumnDefinition.MinWidthProperty, value);
};

ColumnDefinition.ActualWidthProperty = DependencyProperty.Register("ActualWidth", ColumnDefinition, 0.0);
ColumnDefinition.prototype.GetActualWidth = function () {
    return this.GetValue(ColumnDefinition.ActualWidthProperty);
};
ColumnDefinition.prototype.SetActualWidth = function (value) {
    this.SetValue(ColumnDefinition.ActualWidthProperty, value);
};



ColumnDefinitionCollection.prototype = new DependencyObjectCollection;
ColumnDefinitionCollection.prototype.constructor = ColumnDefinitionCollection;
function ColumnDefinitionCollection() {
    DependencyObjectCollection.call(this);
}
ColumnDefinitionCollection.prototype.AddedToCollection = function (value, error) {
    if (this.Contains(value)) {
        error.SetErrored(BError.Argument, "ColumnDefinition is already a member of this collection.");
        return false;
    }
    return DependencyObjectCollection.prototype.AddedToCollection.call(this, value, error);
};



_Segment.prototype = new Object;
_Segment.prototype.constructor = _Segment;
function _Segment(offered, min, max, unitType) {
    this._DesiredSize = offered == null ? 0 : offered;
    this._Min = min == null ? 0.0 : min;
    this._Max = max == null ? Number.POSITIVE_INFINITY : max;
    this._Stars = 0;
    this._Type = unitType == null ? GridUnitType.Pixel : unitType;

    this._OfferedSize = this._Clamp(offered);
    this._OriginalSize = this._OfferedSize;
}
_Segment.prototype._SetOfferedToDesired = function () {
    this._OfferedSize = this._DesiredSize;
    return this._OfferedSize;
};
_Segment.prototype._SetDesiredToOffered = function(){
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



_GridNode.prototype = new Node;
_GridNode.prototype.constructor = _GridNode;
function _GridNode(matrix, row, col, size) {
    Node.call(this);
    this._Matrix = matrix;
    this._Row = row;
    this._Col = col;
    this._Size = size;
    this._Cell = this._Matrix[row][col];
}




_GridWalker.prototype = new Object;
_GridWalker.prototype.constructor = _GridWalker;
function _GridWalker(grid, rowMatrix, rowCount, colMatrix, colCount) {
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
            starRow = starRow || (rowMatrix[r][r].Type == GridUnitType.Star);
            autoRow = autoRow || (rowMatrix[r][r].Type == GridUnitType.Auto);
        }
        for (var c = col; c < col + colspan; c++) {
            starCol = starCol || (colMatrix[c][c].Type == GridUnitType.Star);
            starRow = starRow || (colMatrix[c][c].Type == GridUnitType.Auto);
        }

        this._HasAutoAuto = this._HasAutoAuto || (autoRow && autoCol && !starRow && !starCol);
        this._HasStarAuto = this._HasStarAuto || (starRow && autoCol);
        this._HasAutoStar = this._HasAutoStar || (autoRow && starCol);
    }
}