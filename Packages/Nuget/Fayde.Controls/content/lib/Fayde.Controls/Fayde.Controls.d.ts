declare module Fayde.Controls {
    class TimePicker extends Control {
        static SelectedHourProperty: DependencyProperty;
        static SelectedMinuteProperty: DependencyProperty;
        static SelectedSecondProperty: DependencyProperty;
        static SelectedTimeProperty: DependencyProperty;
        static IsSecondsShownProperty: DependencyProperty;
        static DisplayModeProperty: DependencyProperty;
        public SelectedHour: number;
        public SelectedMinute: number;
        public SelectedSecond: number;
        public SelectedTime: TimeSpan;
        public IsSecondsShown: boolean;
        public DisplayMode: TimeDisplayMode;
        private OnSelectedHourChanged(args);
        private OnSelectedMinuteChanged(args);
        private OnSelectedSecondChanged(args);
        private OnSelectedTimeChanged(args);
        private OnDisplayModeChanged(args);
        private _HourTextBox;
        private _MinuteTextBox;
        private _SecondTextBox;
        private _SecondSeparator;
        private _SuffixTextBlock;
        private _HourGesture;
        private _MinuteGesture;
        private _SecondGesture;
        private _SuffixGesture;
        private _SelectionHandler;
        constructor();
        public OnApplyTemplate(): void;
        private _GetHourInput();
        private CoerceHour(hour);
        private CoerceMinute(minute);
        private CoerceSecond(second);
        private CoerceTime();
        private ToggleAmPm();
        private _UpdateText();
    }
}
declare module Fayde.Controls {
    class GridSplitter extends Control {
        private _Helper;
        private _HorizontalTemplate;
        private _VerticalTemplate;
        private _DragStart;
        private _IsDragging;
        constructor();
        public OnApplyTemplate(): void;
        private _OnLayoutUpdated(sender, e);
        private _OnResizeDirectionChanged();
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        private InitHelper();
        private _HandleMove(horiz, vert, isKeyboard);
        private _GetTransformedPos(e);
    }
}
declare module Fayde.Controls {
    class HeaderedItemsControl extends ItemsControl {
        private _HeaderIsItem;
        private _ItemsControlHelper;
        static HeaderProperty: DependencyProperty;
        public Header: any;
        public OnHeaderChanged(oldHeader: any, newHeader: any): void;
        static HeaderTemplateProperty: DependencyProperty;
        public HeaderTemplate: DataTemplate;
        public OnHeaderTemplateChanged(oldHeaderTemplate: DataTemplate, newHeaderTemplate: DataTemplate): void;
        static ItemContainerStyleProperty: DependencyProperty;
        public ItemContainerStyle: Style;
        private OnItemContainerStyleChanged(args);
        constructor();
        public OnApplyTemplate(): void;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        static PrepareHeaderedItemsControlContainer(control: HeaderedItemsControl, item: any, parentItemsControl: ItemsControl, parentItemContainerStyle: Style): void;
        private static HasDefaultValue(control, propd);
    }
}
declare module Fayde.Controls.Internal {
    enum GridResizeDirection {
        Auto = 0,
        Columns = 1,
        Rows = 2,
    }
    enum GridResizeBehavior {
        BasedOnAlignment = 0,
        CurrentAndNext = 1,
        PreviousAndCurrent = 2,
        PreviousAndNext = 3,
    }
    enum SplitBehavior {
        Split = 0,
        ResizeDefinition1 = 1,
        ResizeDefinition2 = 2,
    }
    class GridSplitterResizer {
        public Direction: GridResizeDirection;
        public Behavior: GridResizeBehavior;
        public SplitBehavior: SplitBehavior;
        public SplitterIndex: number;
        public SplitterLength: number;
        public DS1: IDefinitionSize;
        public DS2: IDefinitionSize;
        constructor(gs: GridSplitter);
        public Setup(gs: GridSplitter, grid: Grid): boolean;
        public Move(grid: Grid, horiz: number, vert: number): boolean;
        public UpdateResizeDirection(gs: GridSplitter): boolean;
        private SetLengths(grid, definition1Pixels, definition2Pixels);
        private GetConstraints();
        private GetBehaviorIndices(index);
    }
    interface IDefinitionSize {
        ActualSize: number;
        MaxSize: number;
        MinSize: number;
        Size: GridLength;
        IsStar: boolean;
        Index: number;
        OrigActualSize: number;
    }
}
declare module Fayde.Controls.Internal {
    interface IFormattedRange extends IRange {
        DecimalPlaces: number;
        OnDecimalPlacesChanged(oldDecPlaces: number, newDecPlaces: number): any;
    }
    interface IFormattedRangeCoercer extends IRangeCoercer {
        OnDecimalPlacesChanged(oldDecPlaces: number, newDecPlaces: number): any;
        AddToValue(inc: number): any;
    }
    class FormattedRangeCoercer extends RangeCoercer implements IFormattedRangeCoercer {
        public OnCoerceFormat: () => void;
        constructor(range: IFormattedRange, onCoerceMaximum: (val: any) => void, onCoerceValue: (val: any) => void, OnCoerceFormat: () => void);
        public OnDecimalPlacesChanged(oldDecPlaces: number, newDecPlaces: number): void;
        public AddToValue(inc: number): void;
    }
}
declare module Fayde.Controls.Internal {
    interface IFormattedControl<T> {
        Value: T;
        IsEditable: boolean;
        ParseValue(text: string): T;
        FormatValue(val: T): string;
        Parsing: RoutedEvent<UpDownParsingEventArgs<T>>;
        ParseError: RoutedEvent<UpDownParseErrorEventArgs>;
    }
    interface ITextBoxFormatter {
        ProcessUserInput(): any;
        Dispose(): any;
        UpdateTextBoxText(): any;
        UpdateIsEditable(): any;
    }
    class TextBoxFormatter<T> implements ITextBoxFormatter {
        public Control: IFormattedControl<T>;
        public TextBox: TextBox;
        public OnCoerceValue: (val: any) => void;
        public Value : T;
        public Text: string;
        constructor(Control: IFormattedControl<T>, TextBox: TextBox, OnCoerceValue: (val: any) => void);
        public ProcessUserInput(): void;
        public Dispose(): void;
        private TextBox_LostFocus(sender, e);
        private TextBox_GotFocus(sender, e);
        public ApplyValue(text: string): void;
        public OnParseError(e: UpDownParseErrorEventArgs): void;
        public OnParsing(e: UpDownParsingEventArgs<T>): void;
        public SelectAllText(): void;
        public UpdateTextBoxText(): void;
        public UpdateIsEditable(): void;
    }
}
declare module Fayde.Controls.Internal {
    interface ISpinOwner extends UIElement {
        OnSpin(): any;
        OnIncrement(): any;
        OnDecrement(): any;
    }
    interface ISpinFlow {
        UpdateValid(increase: boolean, decrease: boolean): any;
        Dispose(): any;
    }
    class SpinFlow implements ISpinFlow {
        public Owner: ISpinOwner;
        public Spinner: Spinner;
        constructor(Owner: ISpinOwner, Spinner: Spinner);
        public UpdateValid(increase: boolean, decrease: boolean): void;
        public Dispose(): void;
        private OnKeyDown(sender, e);
        private OnMouseWheel(sender, e);
        private Spinner_Spin(sender, e);
        private DoIncrement();
        private DoDecrement();
    }
}
declare module Fayde.Controls.Internal {
    interface IDomainOwner extends UIElement {
        Items: ObservableObjectCollection;
        InvalidInputAction: InvalidInputAction;
        FallbackItem: any;
        Value: any;
        CurrentIndex: number;
        IsEditable: boolean;
        OnValueChanged(oldValue: any, newValue: any): any;
        OnCurrentIndexChanged(oldIndex: number, newIndex: number): any;
        OnIsEditingChanged(isEditing: boolean): any;
        OnIsInvalidInputChanged(isInvalidInput: boolean): any;
        TryParseValue(text: string, ov: IOutValue): boolean;
        FormatValue(): string;
        ParseError: RoutedEvent<UpDownParseErrorEventArgs>;
    }
    interface IDomainCoercer {
        IsEditing: boolean;
        IsInvalidInput: boolean;
        OnValueChanged(oldValue: any, newValue: any): any;
        OnCurrentIndexChanged(oldIndex: number, newIndex: number): any;
        UpdateTextBoxText(): any;
        UpdateIsEditable(): any;
        ProcessUserInput(): any;
        Attach(textBox: TextBox): any;
        Detach(): any;
        EscapeFocus(): any;
    }
    class DomainCoercer implements IDomainCoercer {
        public Owner: IDomainOwner;
        public OnCoerceValue: (val: any) => void;
        public OnCoerceCurrentIndex: (val: number) => void;
        public TextBox: TextBox;
        public Text: string;
        public IsCoercing: boolean;
        private _IsEditing;
        public IsEditing : boolean;
        private OnIsEditingChanged(isEditing);
        private _IsInvalidInput;
        public IsInvalidInput : boolean;
        constructor(Owner: IDomainOwner, OnCoerceValue: (val: any) => void, OnCoerceCurrentIndex: (val: number) => void);
        public Attach(textBox: TextBox): void;
        public Detach(): void;
        private OnKeyDown(sender, e);
        public EscapeFocus(): void;
        public OnValueChanged(oldValue: any, newValue: any): void;
        public OnCurrentIndexChanged(oldIndex: number, newIndex: number): void;
        private TextBox_LostFocus(sender, e);
        private TextBox_GotFocus(sender, e);
        public SelectAllText(): void;
        public UpdateTextBoxText(): void;
        public UpdateIsEditable(): void;
        public ProcessUserInput(): void;
        public OnParseError(e: UpDownParseErrorEventArgs): void;
        private ApplyValue(text);
    }
}
declare module Fayde.Controls.Internal {
    class MultiClickHelper {
        public ClickCount: number;
        public LastClickTime: number;
        public LastClickPosition: Point;
        public OnMouseLeftButtonDown(control: Control, e: Input.MouseButtonEventArgs): void;
    }
}
declare module Fayde.Controls {
    class DatePicker extends Control {
        static SelectedMonthProperty: DependencyProperty;
        static SelectedDayProperty: DependencyProperty;
        static SelectedYearProperty: DependencyProperty;
        static SelectedDateProperty: DependencyProperty;
        public SelectedMonth: number;
        public SelectedDay: number;
        public SelectedYear: number;
        public SelectedDate: DateTime;
        private OnSelectedMonthChanged(args);
        private OnSelectedDayChanged(args);
        private OnSelectedYearChanged(args);
        private OnSelectedDateChanged(args);
        private _MonthTextBox;
        private _DayTextBox;
        private _YearTextBox;
        private _MonthGesture;
        private _DayGesture;
        private _YearGesture;
        private _SelectionHandler;
        constructor();
        public OnApplyTemplate(): void;
        private CoerceMonth(month);
        private CoerceDay(day);
        private CoerceYear(year);
        private CoerceDate();
        private _UpdateText();
    }
}
declare module Fayde.Controls.Internal {
    class SelectionHandler {
        private _ActiveBox;
        public ActiveBox : TextBox;
        private _IsMouseDown;
        private _TextBoxes;
        constructor(textBoxes: TextBox[]);
        public Dispose(): void;
        private _GotFocus(sender, e);
        private _MouseDown(sender, e);
        private _MouseUp(sender, e);
        private _LostFocus(sender, e);
    }
}
declare module Fayde.Controls.Internal {
    class EventGesture<T extends UIElement> {
        public Target: UIElement;
        private _Callback;
        public Attach(event: MulticastEvent<EventArgs>, callback: (t: T, e: EventArgs) => void): void;
        public Detach(): void;
        private _OnEvent(sender, e);
    }
}
declare module Fayde.Controls {
    class Spinner extends ContentControl {
        static ValidSpinDirectionProperty: DependencyProperty;
        public ValidSpinDirection: ValidSpinDirections;
        public OnValidSpinDirectionChanged(args: IDependencyPropertyChangedEventArgs): void;
        public Spin: RoutedEvent<SpinEventArgs>;
        public OnSpin(e: SpinEventArgs): void;
        private _IncreaseButton;
        private _DecreaseButton;
        constructor();
        public OnApplyTemplate(): void;
        private OnIncreaseClick(sender, e);
        private OnDecreaseClick(sender, e);
        private EnableButtons();
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateIncrease(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateDecrease(gotoFunc: (state: string) => boolean): boolean;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
    }
}
declare module Fayde.Controls.Primitives {
    class MenuBase extends ItemsControl {
        static ItemContainerStyleProperty: DependencyProperty;
        public ItemContainerStyle: Style;
        public IsItemItsOwnContainer(item: any): boolean;
        public GetContainerForItem(): UIElement;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        private static HasDefaultValue(control, propd);
    }
}
declare module Fayde.Controls {
    class ContextMenu extends Primitives.MenuBase {
        static HorizontalOffsetProperty: DependencyProperty;
        public HorizontalOffset: number;
        private OnHorizontalOffsetChanged(args);
        static VerticalOffsetProperty: DependencyProperty;
        public VerticalOffset: number;
        private OnVerticalOffsetChanged(args);
        static IsOpenProperty: DependencyProperty;
        public IsOpen: boolean;
        private OnIsOpenChanged(args);
        public Opened: RoutedEvent<RoutedEventArgs>;
        public Closed: RoutedEvent<RoutedEventArgs>;
        constructor();
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseRightButtonDown(e: Input.MouseButtonEventArgs): void;
        private _Owner;
        public Owner : DependencyObject;
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
        public OnOpened(e: RoutedEventArgs): void;
        private ClosePopup();
        public OnClosed(e: RoutedEventArgs): void;
        private FocusNextItem(down);
    }
}
declare module Fayde.Controls {
    class ContextMenuService {
        static ContextMenuProperty: DependencyProperty;
        static GetContextMenu(d: DependencyObject): ContextMenu;
        static SetContextMenu(d: DependencyObject, value: ContextMenu): void;
        private static OnContextMenuPropertyChanged(d, args);
    }
}
declare module Fayde.Controls {
    class UpDownBase<T> extends Control {
        private _IgnoreValueChange;
        public _TextBox: TextBox;
        public _Spinner: Spinner;
        private _Text;
        static SpinnerStyleProperty: DependencyProperty;
        public SpinnerStyle: Style;
        private OnSpinnerStyleChanged(oldStyle, newStyle);
        public Value: T;
        public _OnValueChanged(args: IDependencyPropertyChangedEventArgs): void;
        public OnValueChanging(e: RoutedPropertyChangingEventArgs<T>): void;
        public OnValueChanged(e: RoutedPropertyChangedEventArgs<T>): void;
        static IsEditableProperty: DependencyProperty;
        public IsEditable: boolean;
        private OnIsEditableChanged(args);
        public ValueChanging: RoutedPropertyChangingEvent<T>;
        public ValueChanged: RoutedPropertyChangedEvent<T>;
        public Parsing: RoutedEvent<UpDownParsingEventArgs<T>>;
        public ParseError: RoutedEvent<UpDownParseErrorEventArgs>;
        constructor();
        public OnApplyTemplate(): void;
        private SetTextBox(d);
        private SetSpinner(d);
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public OnMouseWheel(e: Input.MouseWheelEventArgs): void;
        public ApplyValue(text: string): void;
        public OnParseError(e: UpDownParseErrorEventArgs): void;
        public OnParsing(e: UpDownParsingEventArgs<T>): void;
        public ParseValue(text: string): T;
        public FormatValue(): string;
        public SelectAllText(): void;
        public SetTextBoxText(): void;
        private TextBox_LostFocus(sender, e);
        private TextBox_GotFocus(sender, e);
        private Spinner_Spin(sender, e);
        public OnSpin(e: SpinEventArgs): void;
        private ProcessUserInput();
        private DoDecrement();
        public OnDecrement(): void;
        private DoIncrement();
        public OnIncrement(): void;
    }
}
declare module Fayde.Controls {
    class DomainUpDown extends Control {
        static ValueProperty: DependencyProperty;
        static IsEditableProperty: DependencyProperty;
        static SpinnerStyleProperty: DependencyProperty;
        static CurrentIndexProperty: DependencyProperty;
        static IsCyclicProperty: DependencyProperty;
        static InvalidInputActionProperty: DependencyProperty;
        static FallbackItemProperty: DependencyProperty;
        static ItemsSourceProperty: DependencyProperty;
        static ItemTemplateProperty: DependencyProperty;
        public Value: any;
        public IsEditable: boolean;
        public SpinnerStyle: Style;
        public CurrentIndex: number;
        public IsCyclic: boolean;
        public InvalidInputAction: InvalidInputAction;
        public FallbackItem: any;
        public ItemsSource: IEnumerable<any>;
        public ItemTemplate: DataTemplate;
        public Items: Internal.ObservableObjectCollection;
        public OnValueChanged(oldItem: any, newItem: any): void;
        public OnCurrentIndexChanged(oldIndex: number, newIndex: number): void;
        private _OnIsCyclicChanged(args);
        private _OnItemsSourceChanged(oldItemsSource, newItemsSource);
        private _ItemsSourceModified(sender, e);
        private _OnItemsChanged(sender, e);
        public ValueChanging: RoutedPropertyChangingEvent<number>;
        public ParseError: RoutedEvent<UpDownParseErrorEventArgs>;
        public ValueMemberPath : string;
        private _ValueBindingEvaluator;
        public ValueMemberBinding : Data.Binding;
        private _Coercer;
        private _SpinFlow;
        private _CanEditByFocus;
        constructor();
        public OnApplyTemplate(): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateEditing(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateValid(gotoFunc: (state: string) => boolean): boolean;
        private UpdateValidSpinDirection();
        private TryEnterEditMode();
        public OnIsEditingChanged(isEditing: boolean): void;
        public OnIsInvalidInputChanged(isInvalid: boolean): void;
        public OnSpin(): void;
        public OnIncrement(): void;
        public OnDecrement(): void;
        public TryParseValue(text: string, ov: IOutValue): boolean;
        public FormatValue(): string;
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
    enum DatePickerFormat {
        Long = 0,
        Short = 1,
    }
    enum TimeDisplayMode {
        Regular = 0,
        Military = 1,
    }
}
declare module Fayde.Controls.Internal {
    class BindingSourceEvaluator<T> extends FrameworkElement {
        static ValueProperty: DependencyProperty;
        public Value: T;
        private _ValueBinding;
        public ValueBinding : Data.Binding;
        constructor(binding: Data.Binding);
        public GetDynamicValue(source: any): T;
    }
}
declare module Fayde.Controls.Internal {
    class ObservableObjectCollection extends Collections.ObservableCollection<any> {
        public IsReadOnly: boolean;
        constructor(collection?: IEnumerable<any>);
        public Add(value: any): void;
        public AddRange(values: any[]): void;
        public Insert(item: any, index: number): void;
        public RemoveAt(index: number): void;
        public SetValueAt(index: number, item: any): void;
        public Clear(): void;
    }
}
declare module Fayde.Controls {
    class MenuItem extends HeaderedItemsControl {
        public ParentMenuBase: Primitives.MenuBase;
        public Click: RoutedEvent<RoutedEventArgs>;
        static CommandProperty: DependencyProperty;
        public Command: Input.ICommand;
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
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseRightButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        private OnClick();
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
    }
}
declare module Fayde.Controls {
    class NumericUpDown extends Control {
        static MinimumProperty: DependencyProperty;
        static MaximumProperty: DependencyProperty;
        static ValueProperty: DependencyProperty;
        static IncrementProperty: DependencyProperty;
        static DecimalPlacesProperty: DependencyProperty;
        static SpinnerStyleProperty: DependencyProperty;
        static IsEditableProperty: DependencyProperty;
        public Minimum: number;
        public Maximum: number;
        public Value: number;
        public Increment: number;
        public DecimalPlaces: number;
        public SpinnerStyle: Style;
        public IsEditable: boolean;
        public OnMinimumChanged(oldMinimum: number, newMinimum: number): void;
        public OnMaximumChanged(oldMaximum: number, newMaximum: number): void;
        public OnValueChanged(oldValue: number, newValue: number): void;
        public OnIncrementChanged(oldIncrement: number, newIncrement: number): void;
        public OnDecimalPlacesChanged(oldDecimalPlaces: number, newDecimalPlaces: number): void;
        public Parsing: RoutedEvent<UpDownParsingEventArgs<number>>;
        public ParseError: RoutedEvent<UpDownParseErrorEventArgs>;
        private _Coercer;
        private _Formatter;
        private _SpinFlow;
        constructor();
        public OnApplyTemplate(): void;
        private UpdateValidSpinDirection();
        public ParseValue(text: string): number;
        public FormatValue(val: number): string;
        public OnSpin(): void;
        public OnIncrement(): void;
        public OnDecrement(): void;
    }
}
declare module Fayde.Controls {
    class Separator extends Control {
        constructor();
    }
}
declare module Fayde.Controls {
    class SpinEventArgs extends RoutedEventArgs {
        public Direction: SpinDirection;
        constructor(direction: SpinDirection);
    }
}
declare module Fayde.Controls {
    class UpDownParseErrorEventArgs extends RoutedEventArgs {
        public Text: string;
        public Error: Error;
        public Handled: boolean;
        constructor(text: string, error: Error);
    }
}
declare module Fayde.Controls {
    class UpDownParsingEventArgs<T> extends RoutedEventArgs {
        public Text: string;
        public Value: T;
        public Handled: boolean;
        constructor(text: string);
    }
}
declare module Fayde.Controls.Internal {
    class ItemsControlHelper {
        private _itemsHost;
        private _scrollHost;
        public ItemsControl: ItemsControl;
        public ItemsHost : Panel;
        public ScrollHost : ScrollViewer;
        constructor(control: ItemsControl);
        public OnApplyTemplate(): void;
        static PrepareContainerForItemOverride(element: DependencyObject, parentItemContainerStyle: Style): void;
        public UpdateItemContainerStyle(itemContainerStyle: Style): void;
        public ScrollIntoView(element: FrameworkElement): void;
    }
}
declare module Fayde.Controls.Internal {
    class ScrollEx {
        static HandleKey(sv: ScrollViewer, key: Input.Key, flowDirection: FlowDirection): boolean;
        static LineUp(viewer: ScrollViewer): void;
        static LineDown(viewer: ScrollViewer): void;
        static LineLeft(viewer: ScrollViewer): void;
        static LineRight(viewer: ScrollViewer): void;
        static PageUp(viewer: ScrollViewer): void;
        static PageDown(viewer: ScrollViewer): void;
        static PageLeft(viewer: ScrollViewer): void;
        static PageRight(viewer: ScrollViewer): void;
        static ScrollToTop(viewer: ScrollViewer): void;
        static ScrollToBottom(viewer: ScrollViewer): void;
        static GetTopAndBottom(element: FrameworkElement, parent: FrameworkElement, top: IOutValue, bottom: IOutValue): void;
    }
}
declare module Fayde.Controls {
    class TreeViewItem extends HeaderedItemsControl {
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
        public Collapsed: RoutedEvent<RoutedEventArgs>;
        public Expanded: RoutedEvent<RoutedEventArgs>;
        public Selected: RoutedEvent<RoutedEventArgs>;
        public Unselected: RoutedEvent<RoutedEventArgs>;
        private _AllowWrite;
        public IgnorePropertyChange: boolean;
        private ContainsSelection;
        private CancelGotFocusBubble;
        public RequiresContainsSelectionUpdate: boolean;
        private UserInitiatedExpansion;
        private _expanderButton;
        private ExpanderButton;
        private _headerElement;
        public HeaderElement : FrameworkElement;
        private _expansionStateGroup;
        private ExpansionStateGroup;
        private _parentItemsControl;
        public ParentItemsControl : ItemsControl;
        private ParentTreeViewItem;
        private ParentTreeView;
        private IsRoot;
        private CanExpandOnInput;
        private _MultiClick;
        private _IsPressed;
        constructor();
        public OnApplyTemplate(): void;
        private OnExpansionStateGroupStateChanged(sender, e);
        private BringIntoView();
        public GoToStates(gotoFunc: (state: string) => boolean): void;
        public GoToStateCommon(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateExpansion(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateHasItems(gotoFunc: (state: string) => boolean): boolean;
        public GoToStateSelection(gotoFunc: (state: string) => boolean): boolean;
        public GetContainerForItem(): UIElement;
        public IsItemItsOwnContainer(item: any): boolean;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        public ClearContainerForItem(element: UIElement, item: any): void;
        public OnItemsChanged(e: Collections.CollectionChangedEventArgs): void;
        public OnExpanded(e: RoutedEventArgs): void;
        public OnCollapsed(e: RoutedEventArgs): void;
        private ToggleExpanded();
        public OnSelected(e: RoutedEventArgs): void;
        public OnUnselected(e: RoutedEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        private OnExpanderGotFocus(sender, e);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        private OnHeaderMouseLeftButtonDown(sender, e);
        private OnExpanderClick(sender, e);
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public HandleRightKey(): boolean;
        public HandleLeftKey(): boolean;
        public HandleDownKey(): boolean;
        public HandleUpKey(): boolean;
        public HandleScrollByPage(up: boolean, scrollHost: ScrollViewer, viewportHeight: number, top: number, bottom: number, currentDelta: IOutValue): boolean;
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
    class TreeView extends ItemsControl {
        static SelectedItemProperty: DependencyProperty;
        static SelectedValueProperty: DependencyProperty;
        static SelectedValuePathProperty: DependencyProperty;
        static ItemContainerStyleProperty: DependencyProperty;
        public SelectedItem: any;
        public SelectedValue: any;
        public SelectedValuePath: string;
        public ItemContainerStyle: Style;
        private OnSelectedItemChanged(e);
        private OnSelectedValueChanged(e);
        private OnSelectedValuePathChanged(e);
        private OnItemContainerStyleChanged(e);
        private _AllowWrite;
        private _IgnorePropertyChange;
        public SelectedContainer: TreeViewItem;
        public IsSelectedContainerHookedUp: boolean;
        public IsSelectionChangeActive: boolean;
        public ItemsControlHelper: Internal.ItemsControlHelper;
        private SelectedItemChanged;
        constructor();
        public OnApplyTemplate(): void;
        public GetContainerForItem(): UIElement;
        public IsItemItsOwnContainer(item: any): boolean;
        public PrepareContainerForItem(element: UIElement, item: any): void;
        public ClearContainerForItem(element: UIElement, item: any): void;
        public OnItemsChanged(e: Collections.CollectionChangedEventArgs): void;
        public CheckForSelectedDescendents(item: TreeViewItem): void;
        public PropagateKeyDown(e: Input.KeyEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        private HandleScrollByPage(up);
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseMove(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public HandleMouseButtonDown(): boolean;
        public OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public ChangeSelection(itemOrContainer: any, container: TreeViewItem, selected: boolean): void;
        private UpdateSelectedValue(item);
        private SelectFirstItem();
        private FocusFirstItem();
        private FocusLastItem();
    }
}
declare module Fayde.Controls {
    class TabPanel extends Panel {
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
    class TabControl extends ItemsControl {
        static SelectedItemProperty: DependencyProperty;
        static SelectedIndexProperty: DependencyProperty;
        static SelectedContentProperty: DependencyProperty;
        static TabStripPlacementProperty: DependencyProperty;
        public SelectedItem: any;
        public SelectedIndex: number;
        public SelectedContent: any;
        public TabStripPlacement: Dock;
        public SelectionChanged: RoutedEvent<Primitives.SelectionChangedEventArgs>;
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
        public OnItemsChanged(e: Collections.CollectionChangedEventArgs): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        private _FindEndTabItem();
        private _FindHomeTabItem();
        private SelectItem(oldItem, newItem);
        public OnSelectionChanged(e: Primitives.SelectionChangedEventArgs): void;
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
    class TabItem extends ContentControl {
        static HasHeaderProperty: DependencyProperty;
        static HeaderProperty: DependencyProperty;
        static HeaderTemplateProperty: DependencyProperty;
        static IsFocusedProperty: DependencyProperty;
        static IsSelectedProperty: DependencyProperty;
        public HasHeader: boolean;
        public Header: any;
        public HeaderTemplate: DataTemplate;
        public IsFocused: boolean;
        public IsSelected: boolean;
        private _SelectedElements;
        private _UnselectedElements;
        private _PreviousTemplate;
        private _PreviousHeader;
        public TabStripPlacement : Dock;
        private TabControlParent;
        constructor();
        public OnApplyTemplate(): void;
        private _OnHeaderChanged(args);
        public OnHeaderChanged(oldValue: any, newValue: any): void;
        public OnHeaderTemplateChanged(oldHeaderTemplate: DataTemplate, newHeaderTemplate: DataTemplate): void;
        private _OnIsSelectedChanged(args);
        public OnSelected(e: RoutedEventArgs): void;
        public OnUnselected(e: RoutedEventArgs): void;
        public UpdateVisualState(useTransitions?: boolean): void;
        private _UpdateHeaderVisuals();
        public OnMouseLeave(e: Input.MouseEventArgs): void;
        public OnMouseEnter(e: Input.MouseEventArgs): void;
        public OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs): void;
        public OnGotFocus(e: RoutedEventArgs): void;
        public OnLostFocus(e: RoutedEventArgs): void;
        public OnContentChanged(oldContent: any, newContent: any): void;
        public OnKeyDown(e: Input.KeyEventArgs): void;
        public GetTemplate(isSelected: boolean, tabPlacement: Dock): FrameworkElement;
        private _GetContentControl(isSelected, tabPlacement);
        private _FindPreviousTabItem(startIndex);
        private _FindNextTabItem(startIndex);
    }
}
declare module Fayde.Controls {
    class WrapPanel extends Panel {
        static OrientationProperty: DependencyProperty;
        public Orientation: Orientation;
        static ItemWidthProperty: DependencyProperty;
        public ItemWidth: number;
        static ItemHeightProperty: DependencyProperty;
        public ItemHeight: number;
        private OnPropertyChange();
        public MeasureOverride(availableSize: size): size;
        public ArrangeOverride(finalSize: size): size;
    }
}
