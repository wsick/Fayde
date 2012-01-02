/// <reference path="Panel.js"/>
/// <reference path="DependencyObjectCollection.js"/>

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
    NotImplemented("Grid._MeasureOverrideWithEror");
};
Grid.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    NotImplemented("Grid._ArrangeOverrideWithError");
};

Grid.prototype._ExpandStarRows = function (availableSize) {
    NotImplemented("Grid._ExpandStarRows");
};
Grid.prototype._ExpandStarCols = function (availableSize) {
    NotImplemented("Grid._ExpandStarCols");
};
Grid.prototype._AllocateDesiredSize = function (rowCount, colCount) {
    NotImplemented("Grid._AllocateDesiredSize");
};
Grid.prototype._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
    NotImplemented("Grid._AssignSize");
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

Grid.Clamp = function (value, min, max) {
    if (value < min)
        return min;
    if (val > max)
        return max;
    return val;
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

    this._OfferedSize = Grid.Clamp(offered, min, max);
    this._OriginalSize = this._OfferedSize;
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