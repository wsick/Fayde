declare module Fayde.Controls {
    class HeaderedItemsControl extends Controls.ItemsControl {
        private _HeaderIsItem;
        private _ItemsControlHelper;
        static HeaderProperty: DependencyProperty;
        public Header: any;
        public OnHeaderChanged(oldHeader: any, newHeader: any): void;
        static HeaderTemplateProperty: DependencyProperty;
        public HeaderTemplate: Fayde.DataTemplate;
        public OnHeaderTemplateChanged(oldHeaderTemplate: Fayde.DataTemplate, newHeaderTemplate: Fayde.DataTemplate): void;
        static ItemContainerStyleProperty: DependencyProperty;
        public ItemContainerStyle: Fayde.Style;
        private OnItemContainerStyleChanged(args);
        constructor();
        public OnApplyTemplate(): void;
        public PrepareContainerForItem(element: Fayde.DependencyObject, item: any): void;
        static PrepareHeaderedItemsControlContainer(control: HeaderedItemsControl, item: any, parentItemsControl: Controls.ItemsControl, parentItemContainerStyle: Fayde.Style): void;
        private static HasDefaultValue(control, propd);
    }
}
declare module Fayde.Controls {
    class Spinner extends Controls.Control {
        static ValidSpinDirectionProperty: DependencyProperty;
        public ValidSpinDirection: Controls.ValidSpinDirections;
        public OnValidSpinDirectionChanged(args: IDependencyPropertyChangedEventArgs): void;
        public Spin: Fayde.RoutedEvent<Controls.SpinEventArgs>;
        public OnSpin(e: Controls.SpinEventArgs): void;
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateIncrease(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateDecrease(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Controls {
    class ButtonSpinner extends Controls.Spinner {
        private IsPressed;
        private _IncreaseButton;
        private _DecreaseButton;
        private _Interaction;
        static ContentProperty: DependencyProperty;
        public Content: any;
        public OnContentChanged(oldValue: any, newValue: any): void;
        static Annotations: {
            ContentProperty: DependencyProperty;
        };
        public OnValidSpinDirectionChanged(args: IDependencyPropertyChangedEventArgs): void;
        constructor();
        public OnApplyTemplate(): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        private SetIncreaseButton(d);
        private SetDecreaseButton(d);
        private Button_Click(sender, e);
        private SetButtonUsage();
    }
}
declare module Fayde.Controls.Primitives {
    class MenuBase extends Controls.ItemsControl {
        static ItemContainerStyleProperty: DependencyProperty;
        public ItemContainerStyle: Fayde.Style;
        public IsItemItsOwnContainer(item: any): boolean;
        public GetContainerForItem(): Fayde.DependencyObject;
        public PrepareContainerForItem(element: Fayde.DependencyObject, item: any): void;
        private static HasDefaultValue(control, propd);
    }
}
declare module Fayde.Controls {
    class ContextMenu extends Controls.Primitives.MenuBase {
        static HorizontalOffsetProperty: DependencyProperty;
        public HorizontalOffset: number;
        private OnHorizontalOffsetChanged(args);
        static VerticalOffsetProperty: DependencyProperty;
        public VerticalOffset: number;
        private OnVerticalOffsetChanged(args);
        static IsOpenProperty: DependencyProperty;
        public IsOpen: boolean;
        private OnIsOpenChanged(args);
        public Opened: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        public Closed: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        constructor();
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseRightButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        private _Owner;
        public Owner : Fayde.DependencyObject;
        private _MousePosition;
        private _PopupAlignmentPoint;
        private _SettingIsOpen;
        private _RootVisual;
        private _Popup;
        private _Overlay;
        private _HandleLayoutUpdated(sender, e);
        private _HandleOwnerMouseRightButtonDown(sender, e);
        private _HandleRootVisualMouseMove(sender, e);
        private _HandleOverlayMouseButtonDown(sender, e);
        private _HandleContextMenuSizeChanged(sender, e);
        public ChildMenuItemClicked(): void;
        private InitializeRootVisual();
        private UpdateContextMenuPlacement();
        private OpenPopup(position);
        public OnOpened(e: Fayde.RoutedEventArgs): void;
        private ClosePopup();
        public OnClosed(e: Fayde.RoutedEventArgs): void;
        private FocusNextItem(down);
    }
}
declare module Fayde.Controls {
    class ContextMenuService {
        static ContextMenuProperty: DependencyProperty;
        static GetContextMenu(d: Fayde.DependencyObject): Controls.ContextMenu;
        static SetContextMenu(d: Fayde.DependencyObject, value: Controls.ContextMenu): void;
        private static OnContextMenuPropertyChanged(d, args);
    }
}
declare module Fayde.Controls {
    class UpDownBase<T> extends Controls.Control {
        private _IgnoreValueChange;
        public _TextBox: Controls.TextBox;
        public _Spinner: Controls.Spinner;
        private _Text;
        static SpinnerStyleProperty: DependencyProperty;
        public SpinnerStyle: Fayde.Style;
        private OnSpinnerStyleChanged(oldStyle, newStyle);
        public Value: T;
        public _OnValueChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnValueChanging(e: Fayde.RoutedPropertyChangingEventArgs<T>): void;
        public OnValueChanged(e: Fayde.RoutedPropertyChangedEventArgs<T>): void;
        static IsEditableProperty: DependencyProperty;
        public IsEditable: boolean;
        private OnIsEditableChanged(args);
        public ValueChanging: Fayde.RoutedPropertyChangingEvent<T>;
        public ValueChanged: Fayde.RoutedPropertyChangedEvent<T>;
        public Parsing: Fayde.RoutedEvent<Controls.UpDownParsingEventArgs<T>>;
        public ParseError: Fayde.RoutedEvent<Controls.UpDownParseErrorEventArgs>;
        constructor();
        public OnApplyTemplate(): void;
        private SetTextBox(d);
        private SetSpinner(d);
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public OnMouseWheel(e: Fayde.Input.MouseWheelEventArgs): void;
        public ApplyValue(text: string): void;
        public OnParseError(e: Controls.UpDownParseErrorEventArgs): void;
        public OnParsing(e: Controls.UpDownParsingEventArgs<T>): void;
        public ParseValue(text: string): T;
        public FormatValue(): string;
        public SelectAllText(): void;
        public SetTextBoxText(): void;
        private TextBox_LostFocus(sender, e);
        private TextBox_GotFocus(sender, e);
        private Spinner_Spin(sender, e);
        public OnSpin(e: Controls.SpinEventArgs): void;
        private ProcessUserInput();
        private DoDecrement();
        public OnDecrement(): void;
        private DoIncrement();
        public OnIncrement(): void;
    }
}
declare module Fayde.Controls {
    class DomainUpDown extends Controls.UpDownBase<any> {
        private _Items;
        private _ValueDuringInit;
        private _IsNotAllowedToEditByFocus;
        private _IsEditing;
        private _IsInvalidInput;
        private _InitialCurrentIndex;
        private _CurrentIndexDuringInit;
        private _CurrentIndexNestLevel;
        private _Interaction;
        static ValueProperty: DependencyProperty;
        static CurrentIndexProperty: DependencyProperty;
        public CurrentIndex: number;
        private _OnCurrentIndexChanged(args);
        public OnCurrentIndexChanged(oldValue: number, newValue: number): void;
        static IsCyclicProperty: DependencyProperty;
        public IsCyclic: boolean;
        private _OnIsCyclicChanged(args);
        static InvalidInputActionProperty: DependencyProperty;
        public InvalidInputAction: Controls.InvalidInputAction;
        private _OnInvalidInputActionPropertyChanged(args);
        static FallbackItemProperty: DependencyProperty;
        public FallbackItem: any;
        static ItemsSourceProperty: DependencyProperty;
        public ItemsSource: Fayde.IEnumerable<any>;
        public OnItemsSourceChanged(oldItemsSource: Fayde.IEnumerable<any>, newItemsSource: Fayde.IEnumerable<any>): void;
        static ItemTemplateProperty: DependencyProperty;
        public ItemTemplate: Fayde.DataTemplate;
        public Items : Fayde.Collections.ObservableCollection<any>;
        public IsEditing : boolean;
        private SetIsEditing(value);
        private SetIsInvalidInput(value);
        public ValueMemberPath : string;
        private _ValueBindingEvaluator;
        public ValueMemberBinding : Fayde.Data.Binding;
        private GetActualItems();
        constructor();
        public OnApplyTemplate(): void;
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateEditing(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateValid(gotoFunc: (state: string) => boolean): boolean;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs): void;
        private SetValidSpinDirection();
        private OnItemsChanged(sender, e);
        public OnValueChanging(e: Fayde.RoutedPropertyChangingEventArgs<any>): void;
        public OnValueChanged(e: Fayde.RoutedPropertyChangedEventArgs<any>): void;
        public ApplyValue(text: string): void;
        public ParseValue(text: string): any;
        public FormatValue(): string;
        public OnIncrement(): void;
        public OnDecrement(): void;
        private TryEnterEditMode();
        public SelectAllText(): void;
        private CoerceSelectedIndex(index);
        private IsValidCurrentIndex(value);
    }
}
declare module Fayde.Controls {
    enum ValidSpinDirections {
        None = 0,
        Increase = 1,
        Decrease = 2,
    }
    enum SpinDirection {
        Increase = 0,
        Decrease = 1,
    }
    enum InvalidInputAction {
        UseFallbackItem = 0,
        TextBoxCannotLoseFocus = 1,
    }
    enum Dock {
        Left = 0,
        Top = 1,
        Right = 2,
        Bottom = 3,
    }
}
declare module Fayde.Controls.Internal {
    class BindingSourceEvaluator<T> extends Fayde.FrameworkElement {
        static ValueProperty: DependencyProperty;
        public Value: T;
        private _ValueBinding;
        public ValueBinding : Fayde.Data.Binding;
        constructor(binding: Fayde.Data.Binding);
        public GetDynamicValue(source: any): T;
    }
}
declare module Fayde.Controls.Internal {
    class ObservableObjectCollection extends Fayde.Collections.ObservableCollection<any> {
        public IsReadOnly: boolean;
        constructor(collection?: Fayde.IEnumerable<any>);
        public Insert(item: any, index: number): void;
        public RemoveAt(index: number): void;
        public SetValueAt(index: number, item: any): void;
        public Clear(): void;
    }
}
declare module Fayde.Controls {
    class MenuItem extends Controls.HeaderedItemsControl {
        public ParentMenuBase: Controls.Primitives.MenuBase;
        public Click: Fayde.RoutedEvent<Fayde.RoutedEventArgs>;
        static CommandProperty: DependencyProperty;
        public Command: Fayde.Input.ICommand;
        private OnCommandChanged(args);
        private _CanExecuteChanged(sender, e);
        static CommandParameterProperty: DependencyProperty;
        public CommandParameter: any;
        private OnCommandParameterChanged(args);
        static IconProperty: DependencyProperty;
        public Icon: any;
        constructor();
        public OnApplyTemplate(): void;
        private UpdateIsEnabled();
        public OnGotFocus(e: Fayde.RoutedEventArgs): void;
        public OnLostFocus(e: Fayde.RoutedEventArgs): void;
        public OnMouseEnter(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeave(e: Fayde.Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnMouseRightButtonDown(e: Fayde.Input.MouseButtonEventArgs): void;
        public OnKeyDown(e: Fayde.Input.KeyEventArgs): void;
        private OnClick();
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Controls {
    class NumericUpDown extends Controls.UpDownBase<number> {
        private _LevelsFromRootCall;
        private _InitialMin;
        private _InitialMax;
        private _InitialVal;
        private _InitialInc;
        private _RequestedMin;
        private _RequestedMax;
        private _RequestedVal;
        private _RequestedInc;
        private _Interaction;
        static ValueProperty: DependencyProperty;
        static MinimumProperty: DependencyProperty;
        public Minimum: number;
        private _OnMinimumChanged(args);
        public OnMinimumChanged(oldMinimum: number, newMinimum: number): void;
        static MaximumProperty: DependencyProperty;
        public Maximum: number;
        private _OnMaximumChanged(args);
        public OnMaximumChanged(oldMaximum: number, newMaximum: number): void;
        static IncrementProperty: DependencyProperty;
        public Increment: number;
        private _OnIncrementChanged(args);
        public OnIncrementChanged(oldIncrement: number, newIncrement: number): void;
        static DecimalPlacesProperty: DependencyProperty;
        public DecimalPlaces: number;
        private _OnDecimalPlacesChanged(args);
        public OnDecimalPlacesChanged(oldDecimalPlaces: number, newDecimalPlaces: number): void;
        constructor();
        public OnApplyTemplate(): void;
        private SetValidSpinDirection();
        public OnValueChanging(e: Fayde.RoutedPropertyChangingEventArgs<number>): void;
        public OnValueChanged(e: Fayde.RoutedPropertyChangedEventArgs<number>): void;
        public ParseValue(text: string): number;
        public FormatValue(): string;
        public OnIncrement(): void;
        public OnDecrement(): void;
        private CoerceMaximum();
        private CoerceValue();
        private _EnsureValidDoubleValue(propd, oldValue, newValue);
        private _EnsureValidIncrementValue(e);
        private _EnsureValidDecimalPlacesValue(e);
    }
}
declare module Fayde.Controls {
    class Separator extends Controls.Control {
        constructor();
    }
}
declare module Fayde.Controls {
    class SpinEventArgs extends Fayde.RoutedEventArgs {
        public Direction: Controls.SpinDirection;
        constructor(direction: Controls.SpinDirection);
    }
}
declare module Fayde.Controls {
    class UpDownParseErrorEventArgs extends Fayde.RoutedEventArgs {
        public Text: string;
        public Error: Error;
        public Handled: boolean;
        constructor(text: string, error: Error);
    }
}
declare module Fayde.Controls {
    class UpDownParsingEventArgs<T> extends Fayde.RoutedEventArgs {
        public Text: string;
        public Value: T;
        public Handled: boolean;
        constructor(text: string);
    }
}
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
        public HasItems: boolean;
        private $SetHasItems(value);
        public IsExpanded: boolean;
        public IsSelected: boolean;
        public IsSelectionActive: boolean;
        private $SetIsSelectionActive(value);
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
        public SelectedItem: any;
        public SelectedValue: any;
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
declare module Fayde.Controls {
    class TabPanel extends Controls.Panel {
        private _NumberOfRows;
        private _RowHeight;
        private TabAlignment;
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
        private _ArrangeHorizontal(arrangeSize);
        private _ArrangeVertical(arrangeSize);
        private _GetActiveRow(solution);
        private _CalculateHeaderDistribution(rowWidthLimit, headerWidth);
        private _GetHeadersSize();
    }
}
declare module Fayde.Controls {
    class TabControl extends Controls.ItemsControl {
        static SelectedItemProperty: DependencyProperty;
        static SelectedIndexProperty: DependencyProperty;
        static SelectedContentProperty: DependencyProperty;
        static TabStripPlacementProperty: DependencyProperty;
        public SelectedItem: any;
        public SelectedIndex: number;
        public SelectedContent: any;
        public TabStripPlacement: Controls.Dock;
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
        private _SelectedElements;
        private _UnselectedElements;
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
        public UpdateVisualState(useTransitions?: boolean): void;
        private _UpdateHeaderVisuals();
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
