/// <reference path="Fayde.d.ts" />
declare module Fayde.Controls.Internal {
    class InteractionHelper {
        public Control: Controls.Control;
        public IsFocused: boolean;
        public IsMouseOver: boolean;
        public IsReadOnly: boolean;
        public IsPressed: boolean;
        public LastClickTime: number;
        public LastClickPosition: Point;
        public ClickCount: number;
        constructor(control: Controls.Control);
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        private OnLoaded(sender, e);
        private OnIsEnabledChanged(sender, args);
        public OnIsReadOnlyChanged(value: boolean): void;
        public AllowGotFocus(e: Fayde.RoutedEventArgs): boolean;
        public AllowLostFocus(e: Fayde.RoutedEventArgs): boolean;
        public OnLostFocusBase(): void;
        public AllowMouseEnter(e: Fayde.Input.MouseEventArgs): boolean;
        public AllowMouseLeave(e: Fayde.Input.MouseEventArgs): boolean;
        public AllowMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): boolean;
        public AllowMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): boolean;
        public AllowKeyDown(e: Fayde.Input.KeyEventArgs): boolean;
        public AllowKeyUp(e: Fayde.Input.KeyEventArgs): boolean;
        static GetLogicalKey(flowDirection: Fayde.FlowDirection, originalKey: Fayde.Input.Key): Fayde.Input.Key;
        static TryGetVisualStateGroup(control: Controls.Control, name: string): Fayde.Media.VSM.VisualStateGroup;
    }
}
declare module Fayde.Controls.Internal {
    class NumericExtensions {
        static IsZero(value: number): boolean;
        static IsGreaterThan(left: number, right: number): boolean;
        static IsLessThanOrClose(left: number, right: number): boolean;
        static AreClose(left: number, right: number): boolean;
    }
}
declare module Fayde.Controls.Internal {
    class ItemsControlHelper {
        private _itemsHost;
        private _scrollHost;
        public ItemsControl: Controls.ItemsControl;
        public ItemsHost : Controls.Panel;
        public ScrollHost : Controls.ScrollViewer;
        constructor(control: Controls.ItemsControl);
        public OnApplyTemplate(): void;
        static PrepareContainerForItemOverride(element: Fayde.DependencyObject, parentItemContainerStyle: Fayde.Style): void;
        public UpdateItemContainerStyle(itemContainerStyle: Fayde.Style): void;
        public ScrollIntoView(element: Fayde.FrameworkElement): void;
    }
}
declare module Fayde.Controls.Internal {
    class ScrollExtensions {
        static LineUp(viewer: Controls.ScrollViewer): void;
        static LineDown(viewer: Controls.ScrollViewer): void;
        static LineLeft(viewer: Controls.ScrollViewer): void;
        static LineRight(viewer: Controls.ScrollViewer): void;
        static PageUp(viewer: Controls.ScrollViewer): void;
        static PageDown(viewer: Controls.ScrollViewer): void;
        static PageLeft(viewer: Controls.ScrollViewer): void;
        static PageRight(viewer: Controls.ScrollViewer): void;
        static ScrollToTop(viewer: Controls.ScrollViewer): void;
        static ScrollToBottom(viewer: Controls.ScrollViewer): void;
        static GetTopAndBottom(element: Fayde.FrameworkElement, parent: Fayde.FrameworkElement, top: IOutValue, bottom: IOutValue): void;
    }
}
declare module Fayde.Controls {
    class TreeViewItem extends Controls.HeaderedItemsControl {
        static HasItemsProperty: DependencyProperty;
        static IsExpandedProperty: DependencyProperty;
        static IsSelectedProperty: DependencyProperty;
        static IsSelectionActiveProperty: DependencyProperty;
        public HasItems : boolean;
        public IsExpanded: boolean;
        public IsSelected: boolean;
        public IsSelectionActive : boolean;
        private OnHasItemsChanged(e);
        private OnIsExpandedPropertyChanged(e);
        private OnIsSelectedChanged(e);
        private OnIsSelectionActiveChanged(e);
        public Collapsed: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        public Expanded: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        public Selected: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        public Unselected: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        private _AllowWrite;
        public IgnorePropertyChange: boolean;
        private Interaction;
        private ContainsSelection;
        private CancelGotFocusBubble;
        public RequiresContainsSelectionUpdate: boolean;
        private UserInitiatedExpansion;
        private _expanderButton;
        private ExpanderButton;
        private _headerElement;
        public HeaderElement : Fayde.FrameworkElement;
        private _expansionStateGroup;
        private ExpansionStateGroup;
        private _parentItemsControl;
        public ParentItemsControl : Controls.ItemsControl;
        private ParentTreeViewItem;
        private ParentTreeView;
        private IsRoot;
        private CanExpandOnInput;
        constructor();
        public OnApplyTemplate(): void;
        private OnExpansionStateGroupStateChanged(sender, e);
        private BringIntoView();
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GetContainerForItem(): Fayde.DependencyObject;
        public IsItemItsOwnContainer(item: any): boolean;
        public PrepareContainerForItem(element: Fayde.DependencyObject, item: any): void;
        public ClearContainerForItem(element: Fayde.DependencyObject, item: any): void;
        public OnItemsChanged(e: Fayde.Collections.NotifyCollectionChangedEventArgs): void;
        public OnExpanded(e: Fayde.RoutedEventArgs): void;
        public OnCollapsed(e: Fayde.RoutedEventArgs): void;
        private ToggleExpanded();
        public OnSelected(e: Fayde.RoutedEventArgs): void;
        public OnUnselected(e: Fayde.RoutedEventArgs): void;
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        private OnExpanderGotFocus(sender, e);
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        private OnHeaderMouseLeftButtonDown(sender, e);
        private OnExpanderClick(sender, e);
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public HandleDownKey(): boolean;
        public OnKeyUp(e: Fayde.Input.KeyEventArgs): void;
        public HandleUpKey(): boolean;
        public HandleScrollByPage(up: boolean, scrollHost: Controls.ScrollViewer, viewportHeight: number, top: number, bottom: number, currentDelta: IOutValue): boolean;
        private Select(selected);
        public UpdateContainsSelection(selected: boolean): void;
        private AllowKeyHandleEvent();
        public FocusDown(): boolean;
        public FocusInto(): boolean;
        private FindNextFocusableItem(recurse);
        private FindLastFocusableItem();
        private FindPreviousFocusableItem();
    }
}
declare module Fayde.Controls {
    class TreeView extends Controls.ItemsControl {
        static SelectedItemProperty: DependencyProperty;
        static SelectedValueProperty: DependencyProperty;
        static SelectedValuePathProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        public SelectedItem : any;
        public SelectedValue : any;
        public SelectedValuePath: string;
        public ItemContainerStyle: Fayde.Style;
        private OnSelectedItemChanged(e);
        private OnSelectedValueChanged(e);
        private OnSelectedValuePathChanged(e);
        private OnItemContainerStyleChanged(e);
        private _AllowWrite;
        private _IgnorePropertyChange;
        public SelectedContainer: Controls.TreeViewItem;
        public IsSelectedContainerHookedUp: boolean;
        public IsSelectionChangeActive: boolean;
        public ItemsControlHelper: Controls.Internal.ItemsControlHelper;
        private Interaction;
        private SelectedItemChanged;
        constructor();
        public OnApplyTemplate(): void;
        public GetContainerForItem(): Fayde.DependencyObject;
        public IsItemItsOwnContainer(item: any): boolean;
        public PrepareContainerForItem(element: Fayde.DependencyObject, item: any): void;
        public ClearContainerForItem(element: Fayde.DependencyObject, item: any): void;
        public OnItemsChanged(e: Fayde.Collections.NotifyCollectionChangedEventArgs): void;
        public CheckForSelectedDescendents(item: Controls.TreeViewItem): void;
        public PropagateKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        private HandleScrollKeys(key);
        private HandleScrollByPage(up);
        public OnKeyUp(e: Fayde.Input.KeyEventArgs): void;
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseMove(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): void;
        public HandleMouseButtonDown(): boolean;
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        public ChangeSelection(itemOrContainer: any, container: Controls.TreeViewItem, selected: boolean): void;
        private UpdateSelectedValue(item);
        private SelectFirstItem();
        private FocusFirstItem();
        private FocusLastItem();
    }
}
declare module Fayde.Controls.Primitives {
    class TabPanel extends Controls.Panel {
        private _NumberOfRows;
        private _RowHeight;
        private TabAlignment;
        public _MeasureOverride(availableSize: size): size;
        public _ArrangeOverride(finalSize: size): size;
        private _ArrangeHorizontal(arrangeSize);
        private _ArrangeVertical(arrangeSize);
        private _GetActiveRow(solution);
        private _CalculateHeaderDistribution(rowWidthLimit, headerWidth);
        private _GetHeadersSize();
    }
}
declare module Fayde.Controls {
    enum Dock {
        Left = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
    }
    class TabControl extends Controls.ItemsControl {
        static SelectedItemProperty: DependencyProperty;
        static SelectedIndexProperty: DependencyProperty;
        static SelectedContentProperty: DependencyProperty;
        static TabStripPlacementProperty: DependencyProperty;
        public SelectedItem: any;
        public SelectedIndex: number;
        public SelectedContent: any;
        public TabStripPlacement: Dock;
        public SelectionChanged: Fayde.RoutedEvent<Controls.Primitives.SelectionChangedEventArgs>;
        private _ElementTemplateTop;
        private _ElementTemplateBottom;
        private _ElementTemplateLeft;
        private _ElementTemplateRight;
        private _ElementTabPanelTop;
        private _ElementTabPanelBottom;
        private _ElementTabPanelLeft;
        private _ElementTabPanelRight;
        private _ElementContentTop;
        private _ElementContentBottom;
        private _ElementContentLeft;
        private _ElementContentRight;
        private _UpdateIndex;
        private _DesiredIndex;
        constructor();
        public OnApplyTemplate(): void;
        private OnSelectedItemChanged(args);
        private OnSelectedIndexChanged(args);
        private OnSelectedContentChanged(args);
        private OnTabStripPlacementPropertyChanged(args);
        public OnItemsChanged(e: Fayde.Collections.NotifyCollectionChangedEventArgs): void;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        private _FindEndTabItem();
        private _FindHomeTabItem();
        private SelectItem(oldItem, newItem);
        public OnSelectionChanged(e: Controls.Primitives.SelectionChangedEventArgs): void;
        private UpdateTabPanelLayout(oldValue, newValue);
        private UpdateSelectedContent(content);
        private EnsureLanguageBinding(tabItem);
        private ClearLanguageBinding(tabItem);
        private _AddToTabPanel(ti);
        private _InsertIntoTabPanel(index, ti);
        private _RemoveFromTabPanel(ti);
        private _ClearTabPanel();
        private _GetTabPanel(tabPlacement);
        private _GetTemplate(tabPlacement);
        private _GetContentHost(tabPlacement);
        private _GetItemAtIndex(index);
        private _ThrowInvalidTabItem(obj);
    }
}
declare module Fayde.Controls {
    class TabItem extends Controls.ContentControl {
        static HasHeaderProperty: DependencyProperty;
        static HeaderProperty: DependencyProperty;
        static HeaderTemplateProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static IsSelectedProperty: DependencyProperty;
        public HasHeader: boolean;
        public Header: any;
        public HeaderTemplate: Fayde.DataTemplate;
        public IsFocused: boolean;
        public IsSelected: boolean;
        private _ElementTemplateTopSelected;
        private _ElementTemplateBottomSelected;
        private _ElementTemplateLeftSelected;
        private _ElementTemplateRightSelected;
        private _ElementTemplateTopUnselected;
        private _ElementTemplateBottomUnselected;
        private _ElementTemplateLeftUnselected;
        private _ElementTemplateRightUnselected;
        private _ElementHeaderTopSelected;
        private _ElementHeaderBottomSelected;
        private _ElementHeaderLeftSelected;
        private _ElementHeaderRightSelected;
        private _ElementHeaderTopUnselected;
        private _ElementHeaderBottomUnselected;
        private _ElementHeaderLeftUnselected;
        private _ElementHeaderRightUnselected;
        private _PreviousTemplate;
        private _PreviousHeader;
        public TabStripPlacement : Controls.Dock;
        private TabControlParent;
        constructor();
        public OnApplyTemplate(): void;
        private _OnHeaderChanged(args);
        public OnHeaderChanged(oldValue: any, newValue: any): void;
        public OnHeaderTemplateChanged(oldHeaderTemplate: Fayde.DataTemplate, newHeaderTemplate: Fayde.DataTemplate): void;
        private _OnIsSelectedChanged(args);
        public OnSelected(e: Fayde.RoutedEventArgs): void;
        public OnUnselected(e: Fayde.RoutedEventArgs): void;
        private _UpdateHeaderVisuals();
        private UpdateTabItemVisuals();
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        public OnContentChanged(oldContent: any, newContent: any): void;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public GetTemplate(isSelected: boolean, tabPlacement: Controls.Dock): Fayde.FrameworkElement;
        private _GetContentControl(isSelected, tabPlacement);
        private _FindPreviousTabItem(startIndex);
        private _FindNextTabItem(startIndex);
    }
}
