var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Panel.ts" />
    /// CODE
    /// <reference path="RowDefinition.ts" />
    /// <reference path="ColumnDefinition.ts" />
    (function (Controls) {
        var GridNode = (function (_super) {
            __extends(GridNode, _super);
            function GridNode(xobj) {
                        _super.call(this, xobj);
            }
            GridNode.prototype.ComputeBounds = function (baseComputer, lu) {
                _super.prototype.ComputeBounds.call(this, baseComputer, lu);
                if(this.XObject.ShowGridLines) {
                    rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                    rect.union(lu.ExtentsWithChildren, lu.Extents);
                    lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
                    rect.union(lu.BoundsWithChildren, lu.Bounds);
                    lu.ComputeGlobalBounds();
                    lu.ComputeSurfaceBounds();
                }
            };
            return GridNode;
        })(Controls.PanelNode);
        Controls.GridNode = GridNode;        
        Nullstone.RegisterType(GridNode, "GridNode");
        function createSegment(offered, min, max, unitType) {
            if(offered == null) {
                offered = 0.0;
            }
            if(min == null) {
                min = 0.0;
            }
            if(max == null) {
                max = Number.POSITIVE_INFINITY;
            }
            if(unitType == null) {
                unitType = Controls.GridUnitType.Pixel;
            }
            if(offered < min) {
                offered = min;
            } else if(offered > max) {
                offered = max;
            }
            return {
                DesiredSize: 0,
                OfferedSize: offered,
                OriginalSize: offered,
                Min: min,
                Max: max,
                Stars: 0,
                Type: unitType,
                Clamp: function (value) {
                    if(value < this.Min) {
                        return this.Min;
                    }
                    if(value > this.Max) {
                        return this.Max;
                    }
                    return value;
                },
                SetOfferedToDesired: function () {
                    return this.OfferedSize = this.DesiredSize;
                },
                SetDesiredToOffered: function () {
                    return this.DesiredSize = this.OfferedSize;
                }
            };
        }
        function createGridChildPlacement(matrix, row, col, size) {
            return {
                Matrix: matrix,
                Row: row,
                Col: col,
                Size: size
            };
        }
        function walkGrid(grid, rowMatrix, colMatrix) {
            var haa = false;
            var hsa = false;
            var has = false;
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;
            var col = 0;
            var row = 0;
            var colspan = 1;
            var rowspan = 1;
            var rowCount = rowMatrix.length;
            var colCount = colMatrix.length;
            var childNode = null;
            var child;
            var enumerator = grid.XamlNode.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
            while(enumerator.MoveNext()) {
                childNode = enumerator.Current;
                child = childNode.XObject;
                starCol = false;
                starRow = false;
                autoCol = false;
                autoRow = false;
                col = Math.min(Grid.GetColumn(child), colCount - 1);
                row = Math.min(Grid.GetRow(child), rowCount - 1);
                colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
                rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);
                for(var r = row; r < row + rowspan; r++) {
                    starRow = starRow || (rowMatrix[r][r].Type === Controls.GridUnitType.Star);
                    autoRow = autoRow || (rowMatrix[r][r].Type === Controls.GridUnitType.Auto);
                }
                for(var c = col; c < col + colspan; c++) {
                    starCol = starCol || (colMatrix[c][c].Type === Controls.GridUnitType.Star);
                    autoCol = autoCol || (colMatrix[c][c].Type === Controls.GridUnitType.Auto);
                }
                haa = haa || (autoRow && autoCol && !starRow && !starCol);
                hsa = hsa || (starRow && autoCol);
                has = has || (autoRow && starCol);
            }
            return {
                HasAutoAuto: haa,
                HasStarAuto: hsa,
                HasAutoStar: has
            };
        }
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid() {
                        _super.call(this);
                var cds = new Controls.ColumnDefinitionCollection();
                cds.Listen(this);
                Object.defineProperty(this, "ColumnDefinitions", {
                    value: cds,
                    writable: false
                });
                var rds = new Controls.RowDefinitionCollection();
                rds.Listen(this);
                Object.defineProperty(this, "RowDefinitions", {
                    value: rds,
                    writable: false
                });
            }
            Grid.prototype.CreateNode = function () {
                return new GridNode(this);
            };
            Grid._AttachedPropChanged = function _AttachedPropChanged(d, args) {
                var dNode = d.XamlNode;
                var gridNode = dNode.VisualParentNode;
                if(gridNode) {
                    gridNode.LayoutUpdater.InvalidateMeasure();
                }
                dNode.LayoutUpdater.InvalidateMeasure();
            };
            Grid.ColumnProperty = DependencyProperty.RegisterAttached("Column", function () {
                return Number;
            }, Grid, 0, Grid._AttachedPropChanged);
            Grid.GetColumn = function GetColumn(d) {
                return d.GetValue(Grid.ColumnProperty);
            };
            Grid.SetColumn = function SetColumn(d, value) {
                d.SetValue(Grid.ColumnProperty, value);
            };
            Grid.ColumnSpanProperty = DependencyProperty.RegisterAttached("ColumnSpan", function () {
                return Number;
            }, Grid, 1, Grid._AttachedPropChanged);
            Grid.GetColumnSpan = function GetColumnSpan(d) {
                return d.GetValue(Grid.ColumnSpanProperty);
            };
            Grid.SetColumnSpan = function SetColumnSpan(d, value) {
                d.SetValue(Grid.ColumnSpanProperty, value);
            };
            Grid.RowProperty = DependencyProperty.RegisterAttached("Row", function () {
                return Number;
            }, Grid, 0, Grid._AttachedPropChanged);
            Grid.GetRow = function GetRow(d) {
                return d.GetValue(Grid.RowProperty);
            };
            Grid.SetRow = function SetRow(d, value) {
                d.SetValue(Grid.RowProperty, value);
            };
            Grid.RowSpanProperty = DependencyProperty.RegisterAttached("RowSpan", function () {
                return Number;
            }, Grid, 1, Grid._AttachedPropChanged);
            Grid.GetRowSpan = function GetRowSpan(d) {
                return d.GetValue(Grid.RowSpanProperty);
            };
            Grid.SetRowSpan = function SetRowSpan(d, value) {
                d.SetValue(Grid.RowSpanProperty, value);
            };
            Grid.ShowGridLinesProperty = DependencyProperty.Register("ShowGridLines", function () {
                return Boolean;
            }, Grid, false, function (d, args) {
                return (d)._ShowGridLinesChanged(args);
            });
            Grid.prototype._MeasureOverride = function (availableSize, error) {
                //LayoutDebug(function () { return "Grid Measure Pass: " + this.__DebugToString() + " [" + availableSize.toString() + "]"; });
                var totalSize = size.copyTo(availableSize);
                var cols = this.ColumnDefinitions;
                var rows = this.RowDefinitions;
                var colCount = cols ? cols.Count : 0;
                var rowCount = rows ? rows.Count : 0;
                var totalStars = new size();
                var emptyRows = rowCount === 0;
                var emptyCols = colCount === 0;
                var hasChildren = this.Children.Count > 0;
                if(emptyRows) {
                    rowCount = 1;
                }
                if(emptyCols) {
                    colCount = 1;
                }
                this._CreateMatrices(rowCount, colCount);
                var rm = this._RowMatrix;
                var cm = this._ColMatrix;
                var defaultGridLength = new Controls.GridLength(1.0, Controls.GridUnitType.Star);
                var i = 0;
                var cell = null;
                var enumerator;
                if(emptyRows) {
                    cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, Controls.GridUnitType.Star);
                    cell.Stars = 1.0;
                    rm[0][0] = cell;
                    totalStars.Height += 1.0;
                } else {
                    i = 0;
                    enumerator = rows.GetEnumerator();
                    var rowdef = null;
                    var height = null;
                    while(enumerator.MoveNext()) {
                        rowdef = enumerator.Current;
                        height = rowdef.Height;
                        if(!height) {
                            height = defaultGridLength;
                        }
                        rowdef.SetValueInternal(Controls.RowDefinition.ActualHeightProperty, Number.POSITIVE_INFINITY);
                        cell = createSegment(0.0, rowdef.MinHeight, rowdef.MaxHeight, height.Type);
                        if(height.Type === Controls.GridUnitType.Pixel) {
                            cell.OfferedSize = cell.Clamp(height.Value);
                            rowdef.SetValueInternal(Controls.RowDefinition.ActualHeightProperty, cell.SetDesiredToOffered());
                        } else if(height.Type === Controls.GridUnitType.Star) {
                            cell.Stars = height.Value;
                            totalStars.Height += height.Value;
                        } else if(height.Type === Controls.GridUnitType.Auto) {
                            cell.OfferedSize = cell.Clamp(0);
                            cell.SetDesiredToOffered();
                        }
                        rm[i][i] = cell;
                        i++;
                    }
                }
                if(emptyCols) {
                    cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, Controls.GridUnitType.Star);
                    cell.Stars = 1.0;
                    cm[0][0] = cell;
                    totalStars.Width += 1.0;
                } else {
                    i = 0;
                    enumerator = cols.GetEnumerator();
                    var coldef = null;
                    var width = null;
                    while(enumerator.MoveNext()) {
                        coldef = enumerator.Current;
                        var width = coldef.Width;
                        if(!width) {
                            width = defaultGridLength;
                        }
                        coldef.SetValueInternal(Controls.ColumnDefinition.ActualWidthProperty, Number.POSITIVE_INFINITY);
                        cell = createSegment(0.0, coldef.MinWidth, coldef.MaxWidth, width.Type);
                        if(width.Type === Controls.GridUnitType.Pixel) {
                            cell.OfferedSize = cell.Clamp(width.Value);
                            coldef.SetValueInternal(Controls.ColumnDefinition.ActualWidthProperty, cell.SetDesiredToOffered());
                        } else if(width.Type === Controls.GridUnitType.Star) {
                            cell.Stars = width.Value;
                            totalStars.Width += width.Value;
                        } else if(width.Type === Controls.GridUnitType.Auto) {
                            cell.OfferedSize = cell.Clamp(0);
                            cell.SetDesiredToOffered();
                        }
                        cm[i][i] = cell;
                        i++;
                    }
                }
                var sizes = [];
                var separator = {
                    Matrix: null,
                    Row: 0,
                    Col: 0,
                    Size: 0,
                    Cell: null
                };
                sizes.push(separator);
                var separatorIndex = 0;
                var c = 0;
                var r = 0;
                var childNode = null;
                var child = null;
                var childLu = null;
                var childSize = new size();
                var starCol = false;
                var starRow = false;
                var autoCol = false;
                var autoRow = false;
                var col = 0;
                var row = 0;
                var colspan = 0;
                var rowspan = 0;
                var node = null;
                var gridState = walkGrid(this, rm, cm);
                for(i = 0; i < 6; i++) {
                    var autoAuto = i === 0;
                    var starAuto = i === 1;
                    var autoStar = i === 2;
                    var starAutoAgain = i === 3;
                    var nonStar = i === 4;
                    var remainingStar = i === 5;
                    if(hasChildren) {
                        this._ExpandStarCols(totalSize);
                        this._ExpandStarRows(totalSize);
                    }
                    enumerator = this.XamlNode.GetVisualTreeEnumerator();
                    while(enumerator.MoveNext()) {
                        childNode = enumerator.Current;
                        child = childNode.XObject;
                        childLu = childNode.LayoutUpdater;
                        childSize = new size();
                        starCol = false;
                        starRow = false;
                        autoCol = false;
                        autoRow = false;
                        col = Math.min(Grid.GetColumn(child), colCount - 1);
                        row = Math.min(Grid.GetRow(child), rowCount - 1);
                        colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
                        rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);
                        for(r = row; r < row + rowspan; r++) {
                            starRow = starRow || (rm[r][r].Type === Controls.GridUnitType.Star);
                            autoRow = autoRow || (rm[r][r].Type === Controls.GridUnitType.Auto);
                        }
                        for(c = col; c < col + colspan; c++) {
                            starCol = starCol || (cm[c][c].Type === Controls.GridUnitType.Star);
                            autoCol = autoCol || (cm[c][c].Type === Controls.GridUnitType.Auto);
                        }
                        if(autoRow && autoCol && !starRow && !starCol) {
                            if(!autoAuto) {
                                continue;
                            }
                            childSize.Width = Number.POSITIVE_INFINITY;
                            childSize.Height = Number.POSITIVE_INFINITY;
                        } else if(starRow && autoCol && !starCol) {
                            if(!(starAuto || starAutoAgain)) {
                                continue;
                            }
                            if(starAuto && gridState.HasAutoStar) {
                                childSize.Height = Number.POSITIVE_INFINITY;
                            }
                            childSize.Width = Number.POSITIVE_INFINITY;
                        } else if(autoRow && starCol && !starRow) {
                            if(!autoStar) {
                                continue;
                            }
                            childSize.Height = Number.POSITIVE_INFINITY;
                        } else if((autoRow || autoCol) && !(starRow || starCol)) {
                            if(!nonStar) {
                                continue;
                            }
                            if(autoRow) {
                                childSize.Height = Number.POSITIVE_INFINITY;
                            }
                            if(autoCol) {
                                childSize.Width = Number.POSITIVE_INFINITY;
                            }
                        } else if(!(starRow || starCol)) {
                            if(!nonStar) {
                                continue;
                            }
                        } else {
                            if(!remainingStar) {
                                continue;
                            }
                        }
                        for(r = row; r < row + rowspan; r++) {
                            childSize.Height += rm[r][r].OfferedSize;
                        }
                        for(c = col; c < col + colspan; c++) {
                            childSize.Width += cm[c][c].OfferedSize;
                        }
                        childLu._Measure(childSize, error);
                        if(!starAuto) {
                            node = createGridChildPlacement(rm, row + rowspan - 1, row, childLu.DesiredSize.Height);
                            if(node.Row === node.Col) {
                                sizes.splice(separatorIndex + 1, 0, node);
                            } else {
                                sizes.splice(separatorIndex, 0, node);
                                separatorIndex++;
                            }
                        }
                        node = createGridChildPlacement(cm, col + colspan - 1, col, childLu.DesiredSize.Width);
                        if(node.Row === node.Col) {
                            sizes.splice(separatorIndex + 1, 0, node);
                        } else {
                            sizes.splice(separatorIndex, 0, node);
                            separatorIndex++;
                        }
                    }
                    sizes.splice(separatorIndex, 1);
                    separatorIndex = -1;
                    while(node = sizes.pop()) {
                        cell = node.Matrix[node.Row][node.Col];
                        cell.DesiredSize = Math.max(cell.DesiredSize, node.Size);
                        this._AllocateDesiredSize(rowCount, colCount);
                    }
                    separatorIndex = sizes.push(separator) - 1;
                }
                this._SaveMeasureResults();
                //sizes.Remove(separator);
                var gridSize = new size();
                for(c = 0; c < colCount; c++) {
                    gridSize.Width += cm[c][c].DesiredSize;
                }
                for(r = 0; r < rowCount; r++) {
                    gridSize.Height += rm[r][r].DesiredSize;
                }
                return gridSize;
            };
            Grid.prototype._ArrangeOverride = function (finalSize, error) {
                //LayoutDebug(function () { return "Grid Arrange Pass: " + this.__DebugToString() + " [" + finalSize.toString() + "]"; });
                var cols = this.ColumnDefinitions;
                var rows = this.RowDefinitions;
                this._RestoreMeasureResults();
                var c = 0;
                var r = 0;
                var totalConsumed = new size();
                var cm = this._ColMatrix;
                for(c = 0; c < cm.length; c++) {
                    totalConsumed.Width += cm[c][c].SetOfferedToDesired();
                }
                var rm = this._RowMatrix;
                for(r = 0; r < rm.length; r++) {
                    totalConsumed.Height += rm[r][r].SetOfferedToDesired();
                }
                if(totalConsumed.Width !== finalSize.Width) {
                    this._ExpandStarCols(finalSize);
                }
                if(totalConsumed.Height !== finalSize.Height) {
                    this._ExpandStarRows(finalSize);
                }
                var i = 0;
                var enumerator = cols.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current).SetValueInternal(Controls.ColumnDefinition.ActualWidthProperty, cm[i][i].OfferedSize);
                    i++;
                }
                i = 0;
                enumerator = rows.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current).SetValueInternal(Controls.RowDefinition.ActualHeightProperty, rm[i][i].OfferedSize);
                    i++;
                }
                enumerator = this.XamlNode.GetVisualTreeEnumerator();
                var childNode;
                var child;
                while(enumerator.MoveNext()) {
                    childNode = enumerator.Current;
                    child = childNode.XObject;
                    var col = Math.min(Grid.GetColumn(child), cm.length - 1);
                    var row = Math.min(Grid.GetRow(child), rm.length - 1);
                    var colspan = Math.min(Grid.GetColumnSpan(child), cm.length - col);
                    var rowspan = Math.min(Grid.GetRowSpan(child), rm.length - row);
                    var childFinal = new rect();
                    for(c = 0; c < col; c++) {
                        childFinal.X += cm[c][c].OfferedSize;
                    }
                    for(c = col; c < col + colspan; c++) {
                        childFinal.Width += cm[c][c].OfferedSize;
                    }
                    for(r = 0; r < row; r++) {
                        childFinal.Y += rm[r][r].OfferedSize;
                    }
                    for(r = row; r < row + rowspan; r++) {
                        childFinal.Height += rm[r][r].OfferedSize;
                    }
                    childNode.LayoutUpdater._Arrange(childFinal, error);
                }
                return finalSize;
            };
            Grid.prototype.Render = function (ctx, lu, region) {
                var background = this.Background;
                var showGridLines = this.ShowGridLines;
                if(!background && !showGridLines) {
                    return;
                }
                var framework = lu.CoerceSize(size.fromRaw(lu.ActualWidth, lu.ActualHeight));
                if(framework.Width <= 0 || framework.Height <= 0) {
                    return;
                }
                var area = rect.fromSize(framework);
                ctx.Save();
                lu.RenderLayoutClip(ctx);
                if(background) {
                    ctx.FillRect(background, area);
                }
                if(showGridLines) {
                    var cctx = ctx.CanvasContext;
                    var enumerator;
                    var cuml = -1;
                    var cols = this.ColumnDefinitions;
                    if(cols) {
                        enumerator = cols.GetEnumerator();
                        while(enumerator.MoveNext()) {
                            cuml += (enumerator.Current).ActualWidth;
                            cctx.beginPath();
                            ctx.SetLineDash([
                                5
                            ]);
                            cctx.moveTo(cuml, 0);
                            cctx.lineTo(cuml, framework.Height);
                            cctx.stroke();
                        }
                    }
                    var rows = this.RowDefinitions;
                    if(rows) {
                        cuml = -1;
                        enumerator = rows.GetEnumerator();
                        while(enumerator.MoveNext()) {
                            cuml += (enumerator.Current).ActualHeight;
                            cctx.beginPath();
                            ctx.SetLineDash([
                                5
                            ]);
                            cctx.moveTo(0, cuml);
                            cctx.lineTo(framework.Width, cuml);
                            cctx.stroke();
                        }
                    }
                }
                ctx.Restore();
            };
            Grid.prototype._ExpandStarRows = function (availableSize) {
                availableSize = size.copyTo(availableSize);
                var rows = this.RowDefinitions;
                var rowsCount = rows ? rows.Count : 0;
                var rm = this._RowMatrix;
                var i = 0;
                var cur = null;
                for(i = 0; i < rm.length; i++) {
                    cur = rm[i][i];
                    if(cur.Type === Controls.GridUnitType.Star) {
                        cur.OfferedSize = 0;
                    } else {
                        availableSize.Height = Math.max(availableSize.Height - cur.OfferedSize, 0);
                    }
                }
                availableSize.Height = this._AssignSize(rm, 0, rm.length - 1, availableSize.Height, Controls.GridUnitType.Star, false);
                var row = null;
                i = 0;
                var enumerator = rows.GetEnumerator();
                while(enumerator.MoveNext()) {
                    row = enumerator.Current;
                    cur = rm[i][i];
                    if(cur.Type === Controls.GridUnitType.Star) {
                        row.SetValueInternal(Controls.RowDefinition.ActualHeightProperty, cur.OfferedSize);
                    }
                    i++;
                }
            };
            Grid.prototype._ExpandStarCols = function (availableSize) {
                availableSize = size.copyTo(availableSize);
                var cols = this.ColumnDefinitions;
                var columnsCount = cols ? cols.Count : 0;
                var i = 0;
                var cur = null;
                var cm = this._ColMatrix;
                for(i = 0; i < cm.length; i++) {
                    cur = cm[i][i];
                    if(cur.Type === Controls.GridUnitType.Star) {
                        cur.OfferedSize = 0;
                    } else {
                        availableSize.Width = Math.max(availableSize.Width - cur.OfferedSize, 0);
                    }
                }
                availableSize.Width = this._AssignSize(cm, 0, cm.length - 1, availableSize.Width, Controls.GridUnitType.Star, false);
                var col = null;
                i = 0;
                var enumerator = cols.GetEnumerator();
                while(enumerator.MoveNext()) {
                    col = enumerator.Current;
                    cur = cm[i][i];
                    if(cur.Type === Controls.GridUnitType.Star) {
                        col.SetValueInternal(Controls.ColumnDefinition.ActualWidthProperty, cur.OfferedSize);
                    }
                    i++;
                }
            };
            Grid.prototype._AllocateDesiredSize = function (rowCount, colCount) {
                var matrix;
                for(var i = 0; i < 2; i++) {
                    matrix = i === 0 ? this._RowMatrix : this._ColMatrix;
                    var count = i === 0 ? rowCount : colCount;
                    for(var row = count - 1; row >= 0; row--) {
                        for(var col = row; col >= 0; col--) {
                            var spansStar = false;
                            for(var j = row; j >= col; j--) {
                                spansStar = spansStar || (matrix[j][j].Type === Controls.GridUnitType.Star);
                            }
                            var current = matrix[row][col].DesiredSize;
                            var totalAllocated = 0;
                            for(var a = row; a >= col; a--) {
                                totalAllocated += matrix[a][a].DesiredSize;
                            }
                            if(totalAllocated < current) {
                                var additional = current - totalAllocated;
                                if(spansStar) {
                                    additional = this._AssignSize(matrix, col, row, additional, Controls.GridUnitType.Star, true);
                                } else {
                                    additional = this._AssignSize(matrix, col, row, additional, Controls.GridUnitType.Pixel, true);
                                    additional = this._AssignSize(matrix, col, row, additional, Controls.GridUnitType.Auto, true);
                                }
                            }
                        }
                    }
                }
                matrix = this._RowMatrix;
                for(var r = 0; r < matrix.length; r++) {
                    matrix[r][r].OfferedSize = matrix[r][r].DesiredSize;
                }
                matrix = this._ColMatrix;
                for(var c = 0; c < matrix.length; c++) {
                    matrix[c][c].OfferedSize = matrix[c][c].DesiredSize;
                }
            };
            Grid.prototype._AssignSize = function (matrix, start, end, size, unitType, desiredSize) {
                var count = 0;
                var assigned = false;
                var segmentSize = 0;
                var i = 0;
                var cur = null;
                for(i = start; i <= end; i++) {
                    cur = matrix[i][i];
                    segmentSize = desiredSize ? cur.DesiredSize : cur.OfferedSize;
                    if(segmentSize < cur.Max) {
                        count += (unitType === Controls.GridUnitType.Star) ? cur.Stars : 1;
                    }
                }
                do {
                    assigned = false;
                    var contribution = size / count;
                    for(i = start; i <= end; i++) {
                        cur = matrix[i][i];
                        segmentSize = desiredSize ? cur.DesiredSize : cur.OfferedSize;
                        if(!(cur.Type === unitType && segmentSize < cur.Max)) {
                            continue;
                        }
                        var newSize = segmentSize;
                        newSize += contribution * (unitType === Controls.GridUnitType.Star ? cur.Stars : 1);
                        newSize = Math.min(newSize, cur.Max);
                        assigned = assigned || (newSize > segmentSize);
                        size -= newSize - segmentSize;
                        if(desiredSize) {
                            cur.DesiredSize = newSize;
                        } else {
                            cur.OfferedSize = newSize;
                        }
                    }
                }while(assigned);
                return size;
            };
            Grid.prototype._CreateMatrices = function (rowCount, colCount) {
                var rm = this._RowMatrix = [];
                for(var r = 0; r < rowCount; r++) {
                    rm.push([]);
                    for(var rr = 0; rr <= r; rr++) {
                        rm[r].push(createSegment());
                    }
                }
                var cm = this._ColMatrix = [];
                for(var c = 0; c < colCount; c++) {
                    cm.push([]);
                    for(var cc = 0; cc <= c; cc++) {
                        cm[c].push(createSegment());
                    }
                }
            };
            Grid.prototype._SaveMeasureResults = function () {
                var i;
                var j;
                var rm = this._RowMatrix;
                for(i = 0; i < rm.length; i++) {
                    for(j = 0; j <= i; j++) {
                        rm[i][j].OriginalSize = rm[i][j].OfferedSize;
                    }
                }
                var cm = this._ColMatrix;
                for(i = 0; i < cm.length; i++) {
                    for(j = 0; j <= i; j++) {
                        cm[i][j].OriginalSize = cm[i][j].OfferedSize;
                    }
                }
            };
            Grid.prototype._RestoreMeasureResults = function () {
                var i;
                var j;
                var rm = this._RowMatrix;
                for(i = 0; i < rm.length; i++) {
                    for(j = 0; j <= i; j++) {
                        rm[i][j].OfferedSize = rm[i][j].OriginalSize;
                    }
                }
                var cm = this._ColMatrix;
                for(i = 0; i < cm.length; i++) {
                    for(j = 0; j <= i; j++) {
                        cm[i][j].OfferedSize = cm[i][j].OriginalSize;
                    }
                }
            };
            Grid.prototype._ShowGridLinesChanged = function (args) {
                var lu = this.XamlNode.LayoutUpdater;
                lu.Invalidate();
                lu.InvalidateMeasure();
            };
            Grid.prototype.RowDefinitionsChanged = function (rowDefinitions) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            Grid.prototype.ColumnDefinitionsChanged = function (colDefinitions) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            return Grid;
        })(Controls.Panel);
        Controls.Grid = Grid;        
        Nullstone.RegisterType(Grid, "Grid");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Grid.js.map
