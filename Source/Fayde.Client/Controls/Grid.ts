/// <reference path="Panel.ts" />

module Fayde.Controls {
    export class GridNode extends PanelNode {
        XObject: Grid;
        constructor(xobj: Grid) {
            super(xobj);
        }
        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            if (this.XObject.ShowGridLines) {
                rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                rect.union(lu.ExtentsWithChildren, lu.Extents);
                lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
                rect.union(lu.BoundsWithChildren, lu.Bounds);

                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            } else {
                super.ComputeBounds(baseComputer, lu);
            }
        }
    }
    Fayde.RegisterType(GridNode, {
    	Name: "GridNode",
    	Namespace: "Fayde.Controls"
    });

    export interface ISegment {
        DesiredSize: number;
        OfferedSize: number;
        OriginalSize: number;
        Min: number;
        Max: number;
        Stars: number;
        Type: GridUnitType;
        Clamp: (value: number) => number;
        SetOfferedToDesired: () => number;
        SetDesiredToOffered: () => number;
    }
    function createSegment(offered?: number, min?: number, max?: number, unitType?: GridUnitType): ISegment {
        if (offered == null) offered = 0.0;
        if (min == null) min = 0.0;
        if (max == null) max = Number.POSITIVE_INFINITY;
        if (unitType == null) unitType = GridUnitType.Pixel;

        if (offered < min)
            offered = min;
        else if (offered > max)
            offered = max;

        return {
            DesiredSize: 0,
            OfferedSize: offered,
            OriginalSize: offered,
            Min: min,
            Max: max,
            Stars: 0,
            Type: unitType,
            Clamp: function (value: number): number {
                if (value < this.Min)
                    return this.Min;
                if (value > this.Max)
                    return this.Max;
                return value;
            },
            SetOfferedToDesired: function (): number { return this.OfferedSize = this.DesiredSize; },
            SetDesiredToOffered: function (): number { return this.DesiredSize = this.OfferedSize; }
        };
    }

    interface IGridStates {
        HasAutoAuto: boolean;
        HasStarAuto: boolean;
        HasAutoStar: boolean;
    }

    interface IGridChildPlacement {
        Matrix: ISegment[][];
        Row: number;
        Col: number;
        Size: number;
    }
    function createGridChildPlacement(matrix: ISegment[][], row: number, col: number, size: number): IGridChildPlacement {
        return {
            Matrix: matrix,
            Row: row,
            Col: col,
            Size: size
        };
    }
    
    function walkGrid(grid: Grid, rowMatrix: ISegment[][], colMatrix: ISegment[][]): IGridStates {
        var haa: boolean = false;
        var hsa: boolean = false;
        var has: boolean = false;

        var starCol = false;
        var starRow = false;
        var autoCol = false;
        var autoRow = false;

        var col: number = 0;
        var row: number = 0;
        var colspan: number = 1;
        var rowspan: number = 1;

        var rowCount = rowMatrix.length;
        var colCount = colMatrix.length;

        var childNode: UINode = null;
        var child: UIElement;
        var enumerator = grid.XamlNode.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        while (enumerator.MoveNext()) {
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

            for (var r = row; r < row + rowspan; r++) {
                starRow = starRow || (rowMatrix[r][r].Type === GridUnitType.Star);
                autoRow = autoRow || (rowMatrix[r][r].Type === GridUnitType.Auto);
            }
            for (var c = col; c < col + colspan; c++) {
                starCol = starCol || (colMatrix[c][c].Type === GridUnitType.Star);
                autoCol = autoCol || (colMatrix[c][c].Type === GridUnitType.Auto);
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

    export class Grid extends Panel implements IMeasurableHidden, IArrangeableHidden, IRowDefinitionsListener, IColumnDefinitionsListener {
        CreateNode(): GridNode { return new GridNode(this); }

        private static _AttachedPropChanged(d: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            var dNode = <UINode>d.XamlNode;
            var gridNode = dNode.VisualParentNode;
            if (gridNode)
                gridNode.LayoutUpdater.InvalidateMeasure();
            dNode.LayoutUpdater.InvalidateMeasure();
        }

        static ColumnProperty: DependencyProperty = DependencyProperty.RegisterAttached("Column", () => Number, Grid, 0, Grid._AttachedPropChanged);
        static GetColumn(d: DependencyObject): number { return d.GetValue(Grid.ColumnProperty); }
        static SetColumn(d: DependencyObject, value: number) { d.SetValue(Grid.ColumnProperty, value); }

        static ColumnSpanProperty: DependencyProperty = DependencyProperty.RegisterAttached("ColumnSpan", () => Number, Grid, 1, Grid._AttachedPropChanged);
        static GetColumnSpan(d: DependencyObject): number { return d.GetValue(Grid.ColumnSpanProperty); }
        static SetColumnSpan(d: DependencyObject, value: number) { d.SetValue(Grid.ColumnSpanProperty, value); }

        static RowProperty: DependencyProperty = DependencyProperty.RegisterAttached("Row", () => Number, Grid, 0, Grid._AttachedPropChanged);
        static GetRow(d: DependencyObject): number { return d.GetValue(Grid.RowProperty); }
        static SetRow(d: DependencyObject, value: number) { d.SetValue(Grid.RowProperty, value); }

        static RowSpanProperty: DependencyProperty = DependencyProperty.RegisterAttached("RowSpan", () => Number, Grid, 1, Grid._AttachedPropChanged);
        static GetRowSpan(d: DependencyObject): number { return d.GetValue(Grid.RowSpanProperty); }
        static SetRowSpan(d: DependencyObject, value: number) { d.SetValue(Grid.RowSpanProperty, value); }

        static ColumnDefinitionsProperty = DependencyProperty.RegisterImmutable("ColumnDefinitions", () => ColumnDefinitionCollection, Grid);
        static RowDefinitionsProperty = DependencyProperty.RegisterImmutable("RowDefinitions", () => RowDefinitionCollection, Grid);
        static ShowGridLinesProperty: DependencyProperty = DependencyProperty.Register("ShowGridLines", () => Boolean, Grid, false, (d, args) => (<Grid>d)._ShowGridLinesChanged(args));
        ShowGridLines: boolean;
        ColumnDefinitions: ColumnDefinitionCollection;
        RowDefinitions: RowDefinitionCollection;

        constructor() {
            super();
            <ColumnDefinitionCollection>Grid.ColumnDefinitionsProperty.Initialize(this).Listen(this);
            <RowDefinitionCollection>Grid.RowDefinitionsProperty.Initialize(this).Listen(this);
        }

        _MeasureOverride(availableSize: size, error: BError): size {
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

            if (emptyRows) rowCount = 1;
            if (emptyCols) colCount = 1;

            this._CreateMatrices(rowCount, colCount);

            var rm = this._RowMatrix;
            var cm = this._ColMatrix;
            
            var defaultGridLength: GridLength = new GridLength(1.0, GridUnitType.Star);

            var i: number = 0;
            var cell: ISegment = null;
            if (emptyRows) {
                cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
                cell.Stars = 1.0;
                rm[0][0] = cell;
                totalStars.Height += 1.0;
            } else {
                i = 0;
                var enumerator = rows.GetEnumerator();
                var rowdef: RowDefinition = null;
                var height: GridLength = null;
                while (enumerator.MoveNext()) {
                    rowdef = enumerator.Current;
                    height = rowdef.Height;
                    if (!height) height = defaultGridLength;
                    rowdef.SetValueInternal(RowDefinition.ActualHeightProperty, Number.POSITIVE_INFINITY);
                    cell = createSegment(0.0, rowdef.MinHeight, rowdef.MaxHeight, height.Type);
                    
                    if (height.Type === GridUnitType.Pixel) {
                        cell.OfferedSize = cell.Clamp(height.Value);
                        rowdef.SetValueInternal(RowDefinition.ActualHeightProperty, cell.SetDesiredToOffered());
                    } else if (height.Type === GridUnitType.Star) {
                        cell.Stars = height.Value;
                        totalStars.Height += height.Value;
                    } else if (height.Type === GridUnitType.Auto) {
                        cell.OfferedSize = cell.Clamp(0);
                        cell.SetDesiredToOffered();
                    }

                    rm[i][i] = cell;
                    i++;
                }
            }

            if (emptyCols) {
                cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
                cell.Stars = 1.0;
                cm[0][0] = cell;
                totalStars.Width += 1.0;
            } else {
                i = 0;
                var enumerator2 = cols.GetEnumerator();
                var coldef: ColumnDefinition = null;
                var width: GridLength = null;
                while (enumerator2.MoveNext()) {
                    coldef = enumerator2.Current;
                    var width = coldef.Width;
                    if (!width) width = defaultGridLength;
                    coldef.SetValueInternal(ColumnDefinition.ActualWidthProperty, Number.POSITIVE_INFINITY);
                    cell = createSegment(0.0, coldef.MinWidth, coldef.MaxWidth, width.Type);

                    if (width.Type === GridUnitType.Pixel) {
                        cell.OfferedSize = cell.Clamp(width.Value);
                        coldef.SetValueInternal(ColumnDefinition.ActualWidthProperty, cell.SetDesiredToOffered());
                    } else if (width.Type === GridUnitType.Star) {
                        cell.Stars = width.Value;
                        totalStars.Width += width.Value;
                    } else if (width.Type === GridUnitType.Auto) {
                        cell.OfferedSize = cell.Clamp(0);
                        cell.SetDesiredToOffered();
                    }

                    cm[i][i] = cell;
                    i++;
                }
            }

            var sizes: IGridChildPlacement[] = [];
            var separator: IGridChildPlacement = {
                Matrix: null,
                Row: 0,
                Col: 0,
                Size: 0,
                Cell: null
            };
            sizes.push(separator);
            var separatorIndex: number = 0;
            
            var c: number = 0;
            var r: number = 0;
            var childNode: UINode = null;
            var child: UIElement = null;
            var childLu: LayoutUpdater = null;
            
            var childSize = new size();
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;
            
            var col = 0;
            var row = 0;
            var colspan = 0;
            var rowspan = 0;

            var node: IGridChildPlacement = null;
            var gridState = walkGrid(this, rm, cm);
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

                var e4 = this.XamlNode.GetVisualTreeEnumerator();
                while (e4.MoveNext()) {
                    childNode = e4.Current;
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

                    for (r = row; r < row + rowspan; r++) {
                        starRow = starRow || (rm[r][r].Type === GridUnitType.Star);
                        autoRow = autoRow || (rm[r][r].Type === GridUnitType.Auto);
                    }
                    for (c = col; c < col + colspan; c++) {
                        starCol = starCol || (cm[c][c].Type === GridUnitType.Star);
                        autoCol = autoCol || (cm[c][c].Type === GridUnitType.Auto);
                    }

                    if (autoRow && autoCol && !starRow && !starCol) {
                        if (!autoAuto)
                            continue;
                        childSize.Width = Number.POSITIVE_INFINITY;
                        childSize.Height = Number.POSITIVE_INFINITY;
                    } else if (starRow && autoCol && !starCol) {
                        if (!(starAuto || starAutoAgain))
                            continue;
                        if (starAuto && gridState.HasAutoStar)
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
                        childSize.Height += rm[r][r].OfferedSize;
                    }
                    for (c = col; c < col + colspan; c++) {
                        childSize.Width += cm[c][c].OfferedSize;
                    }

                    childLu._Measure(childSize, error);

                    if (!starAuto) {
                        node = createGridChildPlacement(rm, row + rowspan - 1, row, childLu.DesiredSize.Height);
                        if (node.Row === node.Col) {
                            sizes.splice(separatorIndex + 1, 0, node);
                        } else {
                            sizes.splice(separatorIndex, 0, node);
                            separatorIndex++;
                        }
                    }
                    node = createGridChildPlacement(cm, col + colspan - 1, col, childLu.DesiredSize.Width);
                    if (node.Row === node.Col) {
                        sizes.splice(separatorIndex + 1, 0, node);
                    } else {
                        sizes.splice(separatorIndex, 0, node);
                        separatorIndex++;
                    }
                }

                sizes.splice(separatorIndex, 1);
                separatorIndex = -1;

                while (node = sizes.pop()) {
                    cell = node.Matrix[node.Row][node.Col];
                    cell.DesiredSize = Math.max(cell.DesiredSize, node.Size);
                    this._AllocateDesiredSize(rowCount, colCount);
                }
                separatorIndex = sizes.push(separator) - 1;
            }
            this._SaveMeasureResults();
            //sizes.Remove(separator);

            var gridSize = new size();
            for (c = 0; c < colCount; c++) {
                gridSize.Width += cm[c][c].DesiredSize;
            }
            for (r = 0; r < rowCount; r++) {
                gridSize.Height += rm[r][r].DesiredSize;
            }
            return gridSize;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            //LayoutDebug(function () { return "Grid Arrange Pass: " + this.__DebugToString() + " [" + finalSize.toString() + "]"; });
            var cols = this.ColumnDefinitions;
            var rows = this.RowDefinitions;

            this._RestoreMeasureResults();

            var c: number = 0;
            var r: number = 0;

            var totalConsumed = new size();
            var cm = this._ColMatrix;
            for (c = 0; c < cm.length; c++) {
                totalConsumed.Width += cm[c][c].SetOfferedToDesired();
            }
            var rm = this._RowMatrix;
            for (r = 0; r < rm.length; r++) {
                totalConsumed.Height += rm[r][r].SetOfferedToDesired();
            }

            if (totalConsumed.Width !== finalSize.Width)
                this._ExpandStarCols(finalSize);
            if (totalConsumed.Height !== finalSize.Height)
                this._ExpandStarRows(finalSize);

            var i: number = 0;
            var enumerator = cols.GetEnumerator();
            while (enumerator.MoveNext()) {
                enumerator.Current.SetValueInternal(ColumnDefinition.ActualWidthProperty, cm[i][i].OfferedSize);
                i++;
            }

            i = 0;
            var enumerator2 = rows.GetEnumerator();
            while (enumerator2.MoveNext()) {
                enumerator2.Current.SetValueInternal(RowDefinition.ActualHeightProperty, rm[i][i].OfferedSize);
                i++;
            }

            var enumerator3 = this.XamlNode.GetVisualTreeEnumerator();
            var childNode: UINode;
            var child: UIElement;
            while (enumerator3.MoveNext()) {
                childNode = enumerator3.Current;
                child = childNode.XObject;

                var col = Math.min(Grid.GetColumn(child), cm.length - 1);
                var row = Math.min(Grid.GetRow(child), rm.length - 1);
                var colspan = Math.min(Grid.GetColumnSpan(child), cm.length - col);
                var rowspan = Math.min(Grid.GetRowSpan(child), rm.length - row);

                var childFinal = new rect();
                for (c = 0; c < col; c++) {
                    childFinal.X += cm[c][c].OfferedSize;
                }
                for (c = col; c < col + colspan; c++) {
                    childFinal.Width += cm[c][c].OfferedSize;
                }

                for (r = 0; r < row; r++) {
                    childFinal.Y += rm[r][r].OfferedSize;
                }
                for (r = row; r < row + rowspan; r++) {
                    childFinal.Height += rm[r][r].OfferedSize;
                }
                childNode.LayoutUpdater._Arrange(childFinal, error);
            }

            return finalSize;
        }

        Render(ctx: RenderContextEx, lu: LayoutUpdater, region: rect) {
            var background = this.Background;
            var showGridLines = this.ShowGridLines;
            if (!background && !showGridLines)
                return;

            var framework = lu.CoerceSize(size.fromRaw(lu.ActualWidth, lu.ActualHeight));
            if (framework.Width <= 0 || framework.Height <= 0)
                return;

            var area = rect.fromSize(framework);
            ctx.save();
            lu.RenderLayoutClip(ctx);
            if (background)
                ctx.fillRectEx(background, area);
            if (showGridLines) {
                var cuml = -1;
                var cols = this.ColumnDefinitions;
                if (cols) {
                    var enumerator = cols.GetEnumerator();
                    while (enumerator.MoveNext()) {
                        cuml += enumerator.Current.ActualWidth;
                        ctx.beginPath();
                        ctx.setLineDash([5]);
                        ctx.moveTo(cuml, 0);
                        ctx.lineTo(cuml, framework.Height);
                        ctx.stroke();
                    }
                }
                var rows = this.RowDefinitions;
                if (rows) {
                    cuml = -1;
                    var enumerator2 = rows.GetEnumerator();
                    while (enumerator2.MoveNext()) {
                        cuml += enumerator2.Current.ActualHeight;
                        ctx.beginPath();
                        ctx.setLineDash([5]);
                        ctx.moveTo(0, cuml);
                        ctx.lineTo(framework.Width, cuml);
                        ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }


        private _ExpandStarRows(availableSize: size) {
            availableSize = size.copyTo(availableSize);
            var rows = this.RowDefinitions;
            var rowsCount = rows ? rows.Count : 0;

            var rm = this._RowMatrix;
            var i: number = 0;
            var cur: ISegment = null;
            for (i = 0; i < rm.length; i++) {
                cur = rm[i][i];
                if (cur.Type === GridUnitType.Star)
                    cur.OfferedSize = 0;
                else
                    availableSize.Height = Math.max(availableSize.Height - cur.OfferedSize, 0);
            }
            availableSize.Height = this._AssignSize(rm, 0, rm.length - 1, availableSize.Height, GridUnitType.Star, false);
            
            var row: RowDefinition = null;
            i = 0;
            var enumerator = rows.GetEnumerator();
            while (enumerator.MoveNext()) {
                row = enumerator.Current;
                cur = rm[i][i];
                if (cur.Type === GridUnitType.Star)
                    row.SetValueInternal(RowDefinition.ActualHeightProperty, cur.OfferedSize);
                i++;
            }
        }
        private _ExpandStarCols(availableSize: size) {
            availableSize = size.copyTo(availableSize);
            var cols = this.ColumnDefinitions;
            var columnsCount = cols ? cols.Count : 0;

            var i: number = 0;
            var cur: ISegment = null;
            var cm = this._ColMatrix;
            for (i = 0; i < cm.length; i++) {
                cur = cm[i][i];
                if (cur.Type === GridUnitType.Star)
                    cur.OfferedSize = 0;
                else
                    availableSize.Width = Math.max(availableSize.Width - cur.OfferedSize, 0);
            }
            availableSize.Width = this._AssignSize(cm, 0, cm.length - 1, availableSize.Width, GridUnitType.Star, false);
            
            var col: ColumnDefinition = null;
            i = 0;
            var enumerator = cols.GetEnumerator();
            while (enumerator.MoveNext()) {
                col = enumerator.Current;
                cur = cm[i][i];
                if (cur.Type === GridUnitType.Star)
                    col.SetValueInternal(ColumnDefinition.ActualWidthProperty, cur.OfferedSize);
                i++;
            }
        }
        private _AllocateDesiredSize(rowCount:number, colCount:number) {
            var matrix: ISegment[][];
            for (var i = 0; i < 2; i++) {
                matrix = i === 0 ? this._RowMatrix : this._ColMatrix;
                var count = i === 0 ? rowCount : colCount;

                for (var row = count - 1; row >= 0; row--) {
                    for (var col = row; col >= 0; col--) {
                        var spansStar = false;
                        for (var j = row; j >= col; j--) {
                            spansStar = spansStar || (matrix[j][j].Type === GridUnitType.Star);
                        }
                        var current = matrix[row][col].DesiredSize;
                        var totalAllocated = 0;
                        for (var a = row; a >= col; a--) {
                            totalAllocated += matrix[a][a].DesiredSize;
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
            matrix = this._RowMatrix;
            for (var r = 0; r < matrix.length; r++) {
                matrix[r][r].OfferedSize = matrix[r][r].DesiredSize;
            }
            matrix = this._ColMatrix;
            for (var c = 0; c < matrix.length; c++) {
                matrix[c][c].OfferedSize = matrix[c][c].DesiredSize;
            }
        }
        private _AssignSize(matrix: ISegment[][], start: number, end: number, size: number, unitType: GridUnitType, desiredSize: boolean): number {
            var count: number = 0;
            var assigned: boolean = false;
            var segmentSize: number = 0;
            var i: number = 0;
            var cur: ISegment = null;
            for (i = start; i <= end; i++) {
                cur = matrix[i][i];
                segmentSize = desiredSize ? cur.DesiredSize : cur.OfferedSize;
                if (segmentSize < cur.Max)
                    count += (unitType === GridUnitType.Star) ? cur.Stars : 1;
            }
            do {
                assigned = false;
                var contribution = size / count;
                for (i = start; i <= end; i++) {
                    cur = matrix[i][i];
                    segmentSize = desiredSize ? cur.DesiredSize : cur.OfferedSize;
                    if (!(cur.Type === unitType && segmentSize < cur.Max))
                        continue;
                    var newSize = segmentSize;
                    newSize += contribution * (unitType === GridUnitType.Star ? cur.Stars : 1);
                    newSize = Math.min(newSize, cur.Max);
                    assigned = assigned || (newSize > segmentSize);
                    size -= newSize - segmentSize;
                    if (desiredSize)
                        cur.DesiredSize = newSize;
                    else
                        cur.OfferedSize = newSize;
                }
            } while (assigned);
            return size;
        }

        private _RowMatrix: ISegment[][];
        private _ColMatrix: ISegment[][];
        private _CreateMatrices(rowCount: number, colCount: number) {
            var rm = this._RowMatrix = [];
            for (var r = 0; r < rowCount; r++) {
                rm.push([]);
                for (var rr = 0; rr <= r; rr++) {
                    rm[r].push(createSegment());
                }
            }

            var cm = this._ColMatrix = [];
            for (var c = 0; c < colCount; c++) {
                cm.push([]);
                for (var cc = 0; cc <= c; cc++) {
                    cm[c].push(createSegment());
                }
            }
        }
        private _SaveMeasureResults() {
            var i: number;
            var j: number;
            var rm = this._RowMatrix;
            for (i = 0; i < rm.length; i++) {
                for (j = 0; j <= i; j++) {
                    rm[i][j].OriginalSize = rm[i][j].OfferedSize;
                }
            }

            var cm = this._ColMatrix;
            for (i = 0; i < cm.length; i++) {
                for (j = 0; j <= i; j++) {
                    cm[i][j].OriginalSize = cm[i][j].OfferedSize;
                }
            }
        }
        private _RestoreMeasureResults() {
            var i: number;
            var j: number;
            var rm = this._RowMatrix;
            for (i = 0; i < rm.length; i++) {
                for (j = 0; j <= i; j++) {
                    rm[i][j].OfferedSize = rm[i][j].OriginalSize;
                }
            }

            var cm = this._ColMatrix;
            for (i = 0; i < cm.length; i++) {
                for (j = 0; j <= i; j++) {
                    cm[i][j].OfferedSize = cm[i][j].OriginalSize;
                }
            }
        }


        private _ShowGridLinesChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.Invalidate();
            lu.InvalidateMeasure();
        }
        RowDefinitionsChanged(rowDefinitions: RowDefinitionCollection) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        ColumnDefinitionsChanged(colDefinitions: ColumnDefinitionCollection) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
    }
    Fayde.RegisterType(Grid, {
    	Name: "Grid",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}