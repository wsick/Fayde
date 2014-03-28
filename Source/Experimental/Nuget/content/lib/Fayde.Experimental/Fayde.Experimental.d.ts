declare module Fayde.Experimental {
    class GridItemsControlNode extends Fayde.Controls.ControlNode {
        public XObject: GridItemsControl;
        constructor(xobj: GridItemsControl);
        public ItemsPresenter: Experimental.GridItemsPresenter;
        public GetDefaultVisualTree(): Fayde.UIElement;
    }
    class GridItemsControl extends Fayde.Controls.Control {
        public XamlNode: GridItemsControlNode;
        public CreateNode(): GridItemsControlNode;
        static ItemsSourceProperty: DependencyProperty;
        public ItemsSource: Fayde.IEnumerable<any>;
        public OnItemsSourceChanged(oldItemsSource: Fayde.IEnumerable<any>, newItemsSource: Fayde.IEnumerable<any>): void;
        private _OnItemsSourceUpdated(sender, e);
        static ColumnsProperty: ImmutableDependencyProperty<Experimental.GridColumnCollection>;
        public Columns: Experimental.GridColumnCollection;
        private _Items;
        public Items : any[];
        private _AddItems(index, newItems);
        private _RemoveItems(index, oldItems);
        constructor();
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
        private _ColumnsChanged(sender, e);
        private _ColumnChanged(sender, e);
    }
}
declare module Fayde.Experimental {
    class GridItemsPresenterNode extends Fayde.FENode {
        public XObject: GridItemsPresenter;
        constructor(xobj: GridItemsPresenter);
        private _ElementRoot;
        public ElementRoot : Fayde.Controls.Grid;
        public DoApplyTemplateWithError(error: BError): boolean;
    }
    class GridItemsPresenter extends Fayde.FrameworkElement {
        public TemplateOwner: Experimental.GridItemsControl;
        public XamlNode: GridItemsPresenterNode;
        public CreateNode(): GridItemsPresenterNode;
        public GridItemsControl : Experimental.GridItemsControl;
        public Panel : Fayde.Controls.Grid;
        private _CellContainers;
        private _Columns;
        public OnColumnAdded(index: number, newColumn: Experimental.GridColumn): void;
        public OnColumnRemoved(index: number): void;
        public OnColumnsCleared(): void;
        public OnColumnChanged(col: Experimental.GridColumn): void;
        public OnItemsAdded(index: number, newItems: any[]): void;
        public OnItemsRemoved(index: number, oldItems: any[]): void;
    }
}
declare module Fayde.Experimental {
    class GridCell extends Fayde.Controls.ContentControl {
    }
}
declare module Fayde.Experimental {
    class GridColumn extends Fayde.DependencyObject {
        static WidthProperty: DependencyProperty;
        static MaxWidthProperty: DependencyProperty;
        static MinWidthProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        public Width: Fayde.Controls.GridLength;
        public MaxWidth: number;
        public MinWidth: number;
        public ActualWidth: number;
        public GetContainerForCell(item: any): Fayde.UIElement;
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
        private _Definition;
        private _ActualWidthListener;
        public AttachToDefinition(coldef: Fayde.Controls.ColumnDefinition): void;
        private _OnActualWidthChanged(sender, args);
        public DetachDefinition(): void;
    }
    class GridColumnCollection extends Fayde.XamlObjectCollection<GridColumn> {
        public ColumnChanged: MulticastEvent<Experimental.GridColumnChangedEventArgs>;
        public CollectionChanged: MulticastEvent<Fayde.Collections.NotifyCollectionChangedEventArgs>;
        public _RaiseItemAdded(value: GridColumn, index: number): void;
        public _RaiseItemRemoved(value: GridColumn, index: number): void;
        public _RaiseItemReplaced(removed: GridColumn, added: GridColumn, index: number): void;
        public _RaiseCleared(old: GridColumn[]): void;
    }
}
declare module Fayde.Experimental {
    class GridColumnChangedEventArgs extends EventArgs {
        public GridColumn: Experimental.GridColumn;
        constructor(col: Experimental.GridColumn);
    }
}
declare module Fayde.Experimental {
    class GridTextColumn extends Experimental.GridColumn {
        static DisplayMemberPathProperty: DependencyProperty;
        public DisplayMemberPath: string;
        private OnDisplayMemberChanged(args);
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
    }
}
declare module Fayde.Experimental {
    class GridTemplateColumn extends Experimental.GridColumn {
        static CellTemplateProperty: DependencyProperty;
        public CellTemplate: Fayde.DataTemplate;
        public PrepareContainerForCell(cell: Fayde.UIElement, item: any): void;
        public ClearContainerForCell(cell: Fayde.UIElement, item: any): void;
    }
}
