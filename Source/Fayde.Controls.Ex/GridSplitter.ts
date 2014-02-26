module Fayde.Controls {
    enum GridResizeDirection {
        Auto,
        Columns,
        Rows
    }

    enum GridResizeBehavior {
        BasedOnAlignment,
        CurrentAndNext,
        PreviousAndCurrent,
        PreviousAndNext
    }

    enum SplitBehavior {
        Split,
        ResizeDefinition1,
        ResizeDefinition2
    }

    class DefinitionAbstraction {

        private _asColumnDefinition: Fayde.Controls.ColumnDefinition;
        get AsColumnDefinition(): Fayde.Controls.ColumnDefinition {
            return this._asColumnDefinition;
        }

        private _asRowDefinition: Fayde.Controls.RowDefinition;
        get AsRowDefinition(): Fayde.Controls.RowDefinition {
            return this._asRowDefinition;
        }

        get MaxSize(): number {
            if (this.AsRowDefinition != null) {
                if (this.AsRowDefinition.MaxHeight)
                    return this.AsRowDefinition.MaxHeight;
                else
                    return Number.POSITIVE_INFINITY;
            }
            if (this.AsColumnDefinition.MaxWidth)
                return this.AsColumnDefinition.MaxWidth;
            else
                return Number.POSITIVE_INFINITY;

        }

        get MinSize(): number {
            if (this.AsRowDefinition != null) {
                if (this.AsRowDefinition.MinHeight)
                    return this.AsRowDefinition.MinHeight;
                else
                    return 0;
            }
            if (this.AsColumnDefinition.MinWidth)
                return this.AsColumnDefinition.MinWidth;
            else
                return 0;
        }

        get Size(): GridLength {
            if (this.AsRowDefinition != null) {
                return this.AsRowDefinition.Height;
            }
            return this.AsColumnDefinition.Width;
        }

        constructor(definition: Fayde.DependencyObject) {
            this._asRowDefinition = <Fayde.Controls.RowDefinition>definition;
            if (definition instanceof (Fayde.Controls.RowDefinition))
                this._asRowDefinition = <Fayde.Controls.RowDefinition>definition;
            else {
                this._asColumnDefinition = <Fayde.Controls.ColumnDefinition>definition;
            }
        }
    }

    class ResizeData {
        Definition1: DefinitionAbstraction;
        Definition2: DefinitionAbstraction;
        Definition1Index: number;
        Definition2Index: number;
        Grid: Fayde.Controls.Grid;

        MaxChange: number;
        MinChange: number;

        OriginalDefinition1ActualLength: number;
        OriginalDefinition1Length: GridLength;

        OriginalDefinition2ActualLength: number;
        OriginalDefinition2Length: GridLength;

        ResizeBehavior: GridResizeBehavior;
        ResizeDirection: GridResizeDirection;

        SplitBehavior: SplitBehavior;
        SplitterIndex: number;
        SplitterLength: number;
    }

    class DoubleUtil {
        private static Epsilon: number = 1.192093E-07;
        private static ScalarAdjustment: number = 10;

        static AreClose(value1: number, value2: number): boolean {
            if (value1 == value2) {
                return true;
            }
            var num = (Math.abs(value1) + Math.abs(value2) + 10) * 1.192093E-07;
            var num1 = value1 - value2;
            if (-num >= num1) {
                return false;
            }
            return num > num1;
        }
    }

    export class GridSplitter extends Control {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.IsEnabledChanged.Subscribe(this.OnIsEnabledChanged, this);
            this.KeyDown.Subscribe(this.GridSplitter_KeyDown, this);
            this.LayoutUpdated.Subscribe(this.UpdateTemplateOrientation, this);
            this._dragValidator = new Fayde.Controls.Internal.DragValidator(<UIElement>this);

            this._dragValidator.DragStartedEvent.Subscribe(this.DragValidator_OnDragStarted, this);
            this._dragValidator.DragDeltaEvent.Subscribe(this.DragValidator_OnDragDelta, this);
            this._dragValidator.DragCompletedEvent.Subscribe(this.DragValidator_OnDragCompleted, this);
            this.MouseEnter.Subscribe(()=>{
                this._isMouseOver = true;
                this.ChangeVisualState(true);
            }, this);

            this.MouseLeave.Subscribe(() => {
                this._isMouseOver = false;
                if (this.ResizeDataInternal == null) {
                    this.ChangeVisualState(true);
                }
            }, this);

            this.GotFocus.Subscribe(() => { this.ChangeVisualState(true); }, this);
            this.LostFocus.Subscribe(() => { this.ChangeVisualState(true); }, this);
        }

        private DragIncrement = 1;
        private KeyboardIncrement = 10;
        private _dragValidator: Fayde.Controls.Internal.DragValidator;
        private _currentGridResizeDirection: GridResizeDirection;
       
        HorizontalTemplateElement: FrameworkElement;
        VerticalTemplateElement: FrameworkElement;

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.HorizontalTemplateElement = <FrameworkElement>this.GetTemplateChild("HorizontalTemplate", FrameworkElement);
            this.VerticalTemplateElement = <FrameworkElement>this.GetTemplateChild("VerticalTemplate", FrameworkElement);
            this._currentGridResizeDirection = GridResizeDirection.Auto;
            this.UpdateTemplateOrientation();
            this.ChangeVisualState(false);
        }

        get HasKeyboardFocus(): boolean {
            return this.XamlNode.GetFocusedElement() === this;
        }

        private ResizeDataInternal: ResizeData;
        private _isMouseOver: boolean;

        private CancelResize(): void {
            //if (!this.ResizeDataInternal.ShowsPreview) {
            //    this.SetLengths(this.ResizeDataInternal.OriginalDefinition1ActualLength, this.ResizeDataInternal.OriginalDefinition2ActualLength);
            //}
            //else {
            //    this.RemovePreviewControl();
            //}
            this.ResizeDataInternal = null;
        }

        private ChangeVisualState(useTransitions : boolean): void {
            var vsm = Fayde.Media.VSM.VisualStateManager;
            if (!this.IsEnabled) {
                vsm.GoToState(this, "Disabled", useTransitions);
            }
            else if (!this._isMouseOver) {
                vsm.GoToState(this, "Normal", useTransitions);
            }
            else {
                vsm.GoToState(this, "MouseOver", useTransitions);
            }
            if (!this.HasKeyboardFocus || !this.IsEnabled) {
                vsm.GoToState(this, "Unfocused", useTransitions);
            }
            else {
                vsm.GoToState(this, "Focused", useTransitions);
            }

            if (this.GetEffectiveResizeDirection() == GridResizeDirection.Columns) {
                this.Cursor = CursorType.SizeWE;
                return;
            }
            this.Cursor = CursorType.SizeNS;
        }

        private DragValidator_OnDragCompleted(sender : any, e: Fayde.Controls.Primitives.DragCompletedEventArgs) {
            if (this.ResizeDataInternal != null) {
                if (e.Canceled) {
                    this.CancelResize();
                }
                this.ResizeDataInternal = null;
            }
            this.ChangeVisualState(true);
        }

        private DragValidator_OnDragDelta(sender: any, e: Fayde.Controls.Primitives.DragDeltaEventArgs) {
            if (this.ResizeDataInternal != null) {
                this.MoveSplitter(e.HorizontalChange, e.VerticalChange);
            }
        }

        private DragValidator_OnDragStarted(sender : any, e: Fayde.Controls.Primitives.DragStartedEventArgs) {
            if (this.IsEnabled) {
                this.Focus();
                this.InitializeData();
            }
        }

        private FlipForRTL(value : number) : number
        {
            if (this.FlowDirection != FlowDirection.RightToLeft) {
                return value;
            }
            return -value;
        }

        private static GetActualLength(definition: DefinitionAbstraction): number {
            if (definition.AsColumnDefinition != null) {
                return definition.AsColumnDefinition.ActualWidth;
            }
            return definition.AsRowDefinition.ActualHeight;
        }

        private GetDeltaConstraints(): number[] {
            var num;
            var num1;
            var actualLength = GridSplitter.GetActualLength(this.ResizeDataInternal.Definition1);
            var minSize = this.ResizeDataInternal.Definition1.MinSize;
            var maxSize = this.ResizeDataInternal.Definition1.MaxSize;

            var actualLength1 = GridSplitter.GetActualLength(this.ResizeDataInternal.Definition2);
            var minSize1 = this.ResizeDataInternal.Definition2.MinSize;
            var maxSize1 = this.ResizeDataInternal.Definition2.MaxSize;

            if (this.ResizeDataInternal.SplitterIndex == this.ResizeDataInternal.Definition1Index) {
                minSize = Math.max(minSize, this.ResizeDataInternal.SplitterLength);
            }
            else if (this.ResizeDataInternal.SplitterIndex == this.ResizeDataInternal.Definition2Index) {
                minSize1 = Math.max(minSize1, this.ResizeDataInternal.SplitterLength);
            }
            if (this.ResizeDataInternal.SplitBehavior == SplitBehavior.Split) {
                num = -Math.min(<number>(actualLength - minSize), <number>(maxSize1 - actualLength1));
                num1 = Math.min(<number>(maxSize - actualLength), <number>(actualLength1 - minSize1));
            }
            else if (this.ResizeDataInternal.SplitBehavior != SplitBehavior.ResizeDefinition1) {
                num = actualLength1 - maxSize1;
                num1 = actualLength1 - minSize1;
            }
            else {
                num = minSize - actualLength;
                num1 = maxSize - actualLength;
            }
            return [num, num1];
        }

        private GetEffectiveResizeBehavior(direction: GridResizeDirection): GridResizeBehavior {
            if (direction != GridResizeDirection.Columns) {
                switch (this.VerticalAlignment) {
                    case VerticalAlignment.Top:
                        return GridResizeBehavior.PreviousAndCurrent;
                    case VerticalAlignment.Center:
                        return GridResizeBehavior.PreviousAndNext;
                    case VerticalAlignment.Bottom:
                        return GridResizeBehavior.CurrentAndNext;
                    default:
                        return GridResizeBehavior.PreviousAndNext;
                }
            }
            switch (this.HorizontalAlignment) {
                case HorizontalAlignment.Left:
                    return GridResizeBehavior.PreviousAndCurrent;
                case HorizontalAlignment.Center:
                    return GridResizeBehavior.PreviousAndNext;
                case HorizontalAlignment.Right:
                    return GridResizeBehavior.CurrentAndNext;
                default:
                    return GridResizeBehavior.PreviousAndNext;
            }
        }

        private GetEffectiveResizeDirection(): GridResizeDirection {
            if (this.HorizontalAlignment != HorizontalAlignment.Stretch) {
                return GridResizeDirection.Columns;
            }
            if (this.VerticalAlignment == VerticalAlignment.Stretch && this.ActualWidth <= this.ActualHeight) {
                return GridResizeDirection.Columns;
            }
            return GridResizeDirection.Rows;
        }

        private static GetGridDefinition(grid: Grid, index: number, direction: GridResizeDirection): DefinitionAbstraction {
            if (direction != GridResizeDirection.Columns) {
                return new DefinitionAbstraction(<Fayde.DependencyObject>grid.RowDefinitions.GetValueAt(index));
            }
            return new DefinitionAbstraction(<Fayde.DependencyObject>grid.ColumnDefinitions.GetValueAt(index));
        }

        GridSplitter_KeyDown(sender: any, e: Fayde.Input.KeyEventArgs) : void {
            if (e.Key == Fayde.Input.Key.Escape) {
                if (this.ResizeDataInternal == null) {
                    return;
                }
                this.CancelResize();
                e.Handled = true;
                return;
            }
            switch (e.Key) {
                case Fayde.Input.Key.Left:
                    {
                        e.Handled = this.KeyboardMoveSplitter(this.FlipForRTL(-10), 0);
                        return;
                    }
                case Fayde.Input.Key.Up:
                    {
                        e.Handled = this.KeyboardMoveSplitter(0, -10);
                        return;
                    }
                case Fayde.Input.Key.Right:
                    {
                        e.Handled = this.KeyboardMoveSplitter(this.FlipForRTL(10), 0);
                        return;
                    }
                case Fayde.Input.Key.Down:
                    {
                        e.Handled = this.KeyboardMoveSplitter(0, 10);
                        return;
                    }
                default:
                    {
                        return;
                    }
            }
        }

        InitializeAndMoveSplitter(horizontalChange : number, verticalChange : number): boolean {
            if (this.ResizeDataInternal != null) {
                return false;
            }
            this.InitializeData();
            if (this.ResizeDataInternal == null) {
                return false;
            }
            this.MoveSplitter(horizontalChange, verticalChange);
            this.ResizeDataInternal = null;
            return true;
        }

        private InitializeData() : void {
            var parent = this.VisualParent;
            if (parent instanceof(Grid)) {
                this.ResizeDataInternal = new ResizeData();
                this.ResizeDataInternal.Grid = <Grid>parent;
                this.ResizeDataInternal.ResizeDirection = this.GetEffectiveResizeDirection();
                this.ResizeDataInternal.ResizeBehavior = this.GetEffectiveResizeBehavior(this.ResizeDataInternal.ResizeDirection);
                this.ResizeDataInternal.SplitterLength = Math.min(this.ActualWidth, this.ActualHeight);
                if (!this.SetupDefinitionsToResize()) {
                    this.ResizeDataInternal = null;
                    return;
                }
            }
        }

        private static IsStar(definition: DefinitionAbstraction): boolean
        {
            if (definition.AsColumnDefinition != null) {
                return definition.AsColumnDefinition.Width.Type === GridUnitType.Star;
            }
            return definition.AsRowDefinition.Height.Type === GridUnitType.Star;
        }

        private KeyboardMoveSplitter(horizontalChange : number, verticalChange : number): boolean
        {
            if (!this.HasKeyboardFocus || !this.IsEnabled) {
                return false;
            }
            return this.InitializeAndMoveSplitter(horizontalChange, verticalChange);
        }

        private MoveSplitter(horizontalChange: number, verticalChange : number): void
        {
            var num = (this.ResizeDataInternal.ResizeDirection == GridResizeDirection.Columns ? horizontalChange : verticalChange);
            var definition1 = this.ResizeDataInternal.Definition1;
            var definition2 = this.ResizeDataInternal.Definition2;
            if (definition1 != null && definition2 != null) {
                var actualLength = GridSplitter.GetActualLength(definition1);
                var actualLength1 = GridSplitter.GetActualLength(definition2);
                if (this.ResizeDataInternal.SplitBehavior == SplitBehavior.Split && !DoubleUtil.AreClose((actualLength + actualLength1), (this.ResizeDataInternal.OriginalDefinition1ActualLength + this.ResizeDataInternal.OriginalDefinition2ActualLength))) {
                    this.CancelResize();
                    return;
                }
                var deltaConstraints = this.GetDeltaConstraints();
                var num1 = deltaConstraints[0];
                var num2 = deltaConstraints[1];
                num = Math.min(Math.max(num, num1), num2);
                this.SetLengths(actualLength + num, actualLength1 - num);
            }
        }

        private static SetDefinitionLength(definition: DefinitionAbstraction, length: GridLength): void
        {
            if (definition.AsColumnDefinition != null) {
                definition.AsColumnDefinition.SetValue(ColumnDefinition.WidthProperty, length);
                return;
            }
            definition.AsRowDefinition.SetValue(RowDefinition.HeightProperty, length);
        }

        private SetLengths(definition1Pixels: number, definition2Pixels: number): void 
        {
            var columnDefinitions;
            if (this.ResizeDataInternal.SplitBehavior != SplitBehavior.Split) {
                if (this.ResizeDataInternal.SplitBehavior == SplitBehavior.ResizeDefinition1) {
                    GridSplitter.SetDefinitionLength(this.ResizeDataInternal.Definition1, new GridLength(definition1Pixels, GridUnitType.Pixel));
                    return;
                }
                GridSplitter.SetDefinitionLength(this.ResizeDataInternal.Definition2, new GridLength(definition2Pixels, GridUnitType.Pixel));
            }
            else {
                if (this.ResizeDataInternal.ResizeDirection == GridResizeDirection.Columns) {
                    columnDefinitions = this.ResizeDataInternal.Grid.ColumnDefinitions;
                }
                else {
                    columnDefinitions = this.ResizeDataInternal.Grid.RowDefinitions;
                }
                var enumerable = columnDefinitions;
                var num = 0;
                for(var dependencyObject in columnDefinitions) {
                    var definitionAbstraction = new DefinitionAbstraction(dependencyObject);
                    if (num == this.ResizeDataInternal.Definition1Index) {
                        GridSplitter.SetDefinitionLength(definitionAbstraction, new GridLength(definition1Pixels, GridUnitType.Star));
                    }
                    else if (num == this.ResizeDataInternal.Definition2Index) {
                        GridSplitter.SetDefinitionLength(definitionAbstraction, new GridLength(definition2Pixels, GridUnitType.Star));
                    }
                    else if (GridSplitter.IsStar(definitionAbstraction)) {
                        GridSplitter.SetDefinitionLength(definitionAbstraction, new GridLength(GridSplitter.GetActualLength(definitionAbstraction), GridUnitType.Star));
                    }
                    num++;
                }
            }
        }

        private SetupDefinitionsToResize(): boolean
        {
            var num;
            var num1;
            if (this.GetValue((this.ResizeDataInternal.ResizeDirection == GridResizeDirection.Columns ? Grid.ColumnSpanProperty : Grid.RowSpanProperty)) == 1)
            {
                var value = this.GetValue((this.ResizeDataInternal.ResizeDirection == GridResizeDirection.Columns ? Grid.ColumnProperty : Grid.RowProperty));
                switch (this.ResizeDataInternal.ResizeBehavior) {
                    case GridResizeBehavior.CurrentAndNext:
                    {
                        num = value;
                        num1 = value + 1;
                        break;
                    }
                    case GridResizeBehavior.PreviousAndCurrent:
                    {
                        num = value - 1;
                        num1 = value;
                        break;
                    }
                    default:
                    {
                        num = value - 1;
                        num1 = value + 1;
                        break;
                    }
                }
                if (num >= 0 && num1 < (this.ResizeDataInternal.ResizeDirection == GridResizeDirection.Columns ? this.ResizeDataInternal.Grid.ColumnDefinitions.Count : this.ResizeDataInternal.Grid.RowDefinitions.Count)) {
                    this.ResizeDataInternal.SplitterIndex = value;
                    this.ResizeDataInternal.Definition1Index = num;
                    this.ResizeDataInternal.Definition1 = GridSplitter.GetGridDefinition(this.ResizeDataInternal.Grid, num, this.ResizeDataInternal.ResizeDirection);
                    this.ResizeDataInternal.OriginalDefinition1Length = this.ResizeDataInternal.Definition1.Size;
                    this.ResizeDataInternal.OriginalDefinition1ActualLength = GridSplitter.GetActualLength(this.ResizeDataInternal.Definition1);
                    this.ResizeDataInternal.Definition2Index = num1;
                    this.ResizeDataInternal.Definition2 = GridSplitter.GetGridDefinition(this.ResizeDataInternal.Grid, num1, this.ResizeDataInternal.ResizeDirection);
                    this.ResizeDataInternal.OriginalDefinition2Length = this.ResizeDataInternal.Definition2.Size;
                    this.ResizeDataInternal.OriginalDefinition2ActualLength = GridSplitter.GetActualLength(this.ResizeDataInternal.Definition2);
                    var flag = GridSplitter.IsStar(this.ResizeDataInternal.Definition1);
                    var flag1 = GridSplitter.IsStar(this.ResizeDataInternal.Definition2);
                    if (!flag || !flag1) {
                        this.ResizeDataInternal.SplitBehavior = (!flag ? SplitBehavior.ResizeDefinition1 : SplitBehavior.ResizeDefinition2);
                    }
                    else {
                        this.ResizeDataInternal.SplitBehavior = SplitBehavior.Split;
                    }
                    return true;
                }
            }
            return false;
        }

        private UpdateTemplateOrientation(): void {
            var effectiveResizeDirection = this.GetEffectiveResizeDirection();

            if (this._currentGridResizeDirection != effectiveResizeDirection) {

                if (effectiveResizeDirection != GridResizeDirection.Columns) {
                    if (this.HorizontalTemplateElement != null) {
                        this.HorizontalTemplateElement.Visibility = Visibility.Visible;
                    }
                    if (this.VerticalTemplateElement != null) {
                        this.VerticalTemplateElement.Visibility = Visibility.Collapsed;
                    }
                }
                else {
                    if (this.HorizontalTemplateElement != null) {
                        this.HorizontalTemplateElement.Visibility = Visibility.Collapsed;
                    }
                    if (this.VerticalTemplateElement != null) {
                        this.VerticalTemplateElement.Visibility = Visibility.Visible;
                    }
                }
                this._currentGridResizeDirection = effectiveResizeDirection;
            }
        }
    }
} 