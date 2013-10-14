/// <reference path="UpDownBase.ts" />
/// <reference path="Enums.ts" />

module Fayde.Controls.Input {
    export class DomainUpDown extends UpDownBase<any> {
        private _Items = new Internal.ObservableObjectCollection();
        private _ValueDuringInit: any = null;
        private _IsNotAllowedToEditByFocus: boolean = false;
        private _IsEditing: boolean = false;
        private _IsInvalidInput: boolean = false;
        private _InitialCurrentIndex: number = -1;
        private _CurrentIndexDuringInit: number = null;
        private _CurrentIndexNestLevel: number = 0;
        private _Interaction: Internal.InteractionHelper;
        
        static ValueProperty = DependencyProperty.Register("Value", () => Object, DomainUpDown, null, (d, args) => (<DomainUpDown>d)._OnValueChanged(args));

        static CurrentIndexProperty = DependencyProperty.Register("CurrentIndex", () => Number, DomainUpDown, -1, (d, args) => (<DomainUpDown>d)._OnCurrentIndexChanged(args));
        CurrentIndex: number;
        private _OnCurrentIndexChanged(args: IDependencyPropertyChangedEventArgs) {
            var index = <number>args.NewValue;
            var oldValue = <number>args.OldValue;
            if (!this.IsValidCurrentIndex(index)) {
                ++this._CurrentIndexNestLevel;
                this.SetValue(args.Property, oldValue);
                --this._CurrentIndexNestLevel;
                if (this._CurrentIndexDuringInit == null)
                    this._CurrentIndexDuringInit = index;
                else
                    throw new ArgumentOutOfRangeException("Invalid current index.");

            } else {
                if (this._CurrentIndexNestLevel == 0)
                    this._InitialCurrentIndex = oldValue;
                ++this._CurrentIndexNestLevel;
                var num = this.CoerceSelectedIndex(index);
                if (index !== num)
                    this.CurrentIndex = num;
                --this._CurrentIndexNestLevel;
                if (this._CurrentIndexNestLevel != 0 || this.CurrentIndex === this._InitialCurrentIndex)
                    return;
                this.OnCurrentIndexChanged(oldValue, this.CurrentIndex);
            }
        }
        OnCurrentIndexChanged(oldValue: number, newValue: number) {
            this.Value = Enumerable.ElementAtOrDefault<any>(this.GetActualItems(), newValue);
            this.SetIsEditing(false);
            this.SetValidSpinDirection();
        }

        static IsCyclicProperty = DependencyProperty.Register("IsCyclic", () => Boolean, DomainUpDown, false, (d, args) => (<DomainUpDown>d)._OnIsCyclicChanged(args));
        IsCyclic: boolean;
        private _OnIsCyclicChanged(args: IDependencyPropertyChangedEventArgs) {
            this.SetValidSpinDirection();
        }

        static InvalidInputActionProperty = DependencyProperty.Register("InvalidInputAction", () => new Enum(InvalidInputAction), DomainUpDown, InvalidInputAction.UseFallbackItem, (d, args) => (<DomainUpDown>d)._OnInvalidInputActionPropertyChanged(args));
        InvalidInputAction: InvalidInputAction;
        private _OnInvalidInputActionPropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            switch (args.NewValue) {
                case InvalidInputAction.UseFallbackItem:
                    break;
                case InvalidInputAction.TextBoxCannotLoseFocus:
                    break;
                default:
                    throw new ArgumentException("Invalid input action.");
            }
        }

        static FallbackItemProperty = DependencyProperty.Register("FallbackItem", () => Object, DomainUpDown, null);
        FallbackItem: any;

        static ItemsSourceProperty = DependencyProperty.Register("ItemsSource", () => Fayde.IEnumerable_, DomainUpDown, null);
        ItemsSource: Fayde.IEnumerable<any>;
        OnItemsSourceChanged(oldItemsSource: Fayde.IEnumerable<any>, newItemsSource: Fayde.IEnumerable<any>) {
            if (oldItemsSource && Nullstone.ImplementsInterface(oldItemsSource, Collections.INotifyCollectionChanged_)) {
                (<Collections.INotifyCollectionChanged><any>oldItemsSource).CollectionChanged.Unsubscribe(this.OnItemsChanged, this);
            }

            if (newItemsSource != null) {
                var index = getIndexOf(newItemsSource, this.Value);
                if (index > -1) {
                    this.CurrentIndex = index;
                } else {
                    var source = newItemsSource;
                    if (this._CurrentIndexDuringInit != null && this._CurrentIndexDuringInit > -1) {
                        if (this.IsValidCurrentIndex(this.CurrentIndex))
                            this.Value = Enumerable.ElementAt<any>(source, this.CurrentIndex);
                        else
                            this.Value = this.IsValidCurrentIndex(this._CurrentIndexDuringInit) ? Enumerable.ElementAt<any>(source, this._CurrentIndexDuringInit) : Enumerable.FirstOrDefault<any>(source);
                        this._CurrentIndexDuringInit = -1;
                    } else if (Enumerable.Contains<any>(source, this._ValueDuringInit)) {
                        this.Value = this._ValueDuringInit;
                        this._ValueDuringInit = {};
                    } else
                        this.Value = this.IsValidCurrentIndex(this.CurrentIndex) ? Enumerable.ElementAtOrDefault<any>(source, this.CurrentIndex) : Enumerable.FirstOrDefault<any>(source);
                }
                if (Nullstone.ImplementsInterface(newItemsSource, Collections.INotifyCollectionChanged_)) {
                    (<Collections.INotifyCollectionChanged><any>newItemsSource).CollectionChanged.Subscribe(this.OnItemsChanged, this);
                }
            } else
                this._Items.Clear();
            this.SetValidSpinDirection();
        }

        static ItemTemplateProperty = DependencyProperty.Register("ItemTemplate", () => DataTemplate, DomainUpDown);
        ItemTemplate: DataTemplate;

        get Items(): Fayde.Collections.ObservableCollection<any> {
            if (!this.ItemsSource)
                return this._Items;
            var coll = new Internal.ObservableObjectCollection(this.ItemsSource);
            coll.IsReadOnly = true;
            return coll;
        }

        get IsEditing(): boolean { return this._IsEditing; }
        private SetIsEditing(value: boolean) {
            if (value === this._IsEditing || !this.IsEditable && value)
                return;
            this._IsEditing = value;
            this.UpdateVisualState(true);
            if (!this._TextBox)
                return;
            if (!value) {
                this._TextBox.Text = this.FormatValue();
                this._TextBox.IsHitTestVisible = false;
            } else {
                if (this.XamlNode.GetFocusedElement() === this._TextBox)
                    this._TextBox.Select(0, this._TextBox.Text.length);
                this._TextBox.IsHitTestVisible = true;
            }
        }
        private SetIsInvalidInput(value: boolean) {
            if (value === this._IsInvalidInput)
                return;
            this._IsInvalidInput = value;
            this.UpdateVisualState(true);
        }

        get ValueMemberPath(): string {
            var vb = this.ValueMemberBinding;
            return vb ? vb.Path.Path : null;
        }
        set ValueMemberPath(value: string) {
            var vb = this.ValueMemberBinding;
            if (!value) {
                if (!vb)
                    return;
                var binding1 = new Fayde.Data.Binding();
                binding1.Converter = vb.Converter;
                binding1.ConverterCulture = vb.ConverterCulture;
                binding1.ConverterParameter = vb.ConverterParameter;
                this.ValueMemberBinding = binding1;
            } else if (vb != null) {
                var binding1 = new Fayde.Data.Binding(value);
                binding1.Converter = vb.Converter;
                binding1.ConverterCulture = vb.ConverterCulture;
                binding1.ConverterParameter = vb.ConverterParameter;
                this.ValueMemberBinding = binding1;
            } else
                this.ValueMemberBinding = new Fayde.Data.Binding(value);
        }

        private _ValueBindingEvaluator: Internal.BindingSourceEvaluator<string> = null;
        get ValueMemberBinding(): Fayde.Data.Binding {
            var vbe = this._ValueBindingEvaluator;
            return vbe ? vbe.ValueBinding : null;
        }
        set ValueMemberBinding(value: Fayde.Data.Binding) {
            this._ValueBindingEvaluator = new Internal.BindingSourceEvaluator<string>(value);
        }

        private GetActualItems(): IEnumerable<any> {
            var is = this.ItemsSource;
            return is == null ? this._Items : is;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this._Interaction = new Internal.InteractionHelper(this);
            this._Items.CollectionChanged.Subscribe(this.OnItemsChanged, this);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.SetValidSpinDirection();
        }

        GetVisualStateNamesToActivate(useTransitions?: boolean): string[] {
            var arr = super.GetVisualStateNamesToActivate();
            arr.push(this.IsEditing ? "Edit" : "Display");
            arr.push(this._IsInvalidInput ? "InvalidDomain" : "ValidDomain");
            return arr;
        }

        OnKeyDown(e: Fayde.Input.KeyEventArgs) {
            if (e != null && ((e.Key === Fayde.Input.Key.Enter || e.Key === Fayde.Input.Key.Space) && !this.IsEditing && this.IsEditable)) {
                this.SetIsEditing(true);
                e.Handled = true;
            } else {
                super.OnKeyDown(e);
                if (e == null || e.Handled)
                    return;
                if (e.Key === Fayde.Input.Key.Escape) {
                    this.SetIsInvalidInput(false);
                    this.SetIsEditing(false);
                    e.Handled = true;
                } else if (!this.IsEditing && this.IsEditable)
                    this.SetIsEditing(true);
            }
        }

        OnGotFocus(e: RoutedEventArgs) {
            if (!this._Interaction.AllowGotFocus(e))
                return;
            this.TryEnterEditMode();
            this.UpdateVisualState(true);
            super.OnGotFocus(e);
        }
        OnLostFocus(e: RoutedEventArgs) {
            if (!this._Interaction.AllowLostFocus(e))
                return;
            if (!this._IsInvalidInput)
                this.SetIsEditing(false);
            else if (this.InvalidInputAction === InvalidInputAction.TextBoxCannotLoseFocus && this.XamlNode.GetFocusedElement() !== this._TextBox)
                window.setTimeout(() => this._TextBox.Focus(), 1);
            this._Interaction.OnLostFocusBase();
            super.OnLostFocus(e);
        }
        OnMouseEnter(e: Fayde.Input.MouseEventArgs) {
            if (!this._Interaction.AllowMouseEnter(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseEnter(e);
        }
        OnMouseLeave(e: Fayde.Input.MouseEventArgs) {
            if (!this._Interaction.AllowMouseLeave(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeave(e);
        }
        OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs) {
            if (!this._Interaction.AllowMouseLeftButtonDown(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseLeftButtonUp(e: Fayde.Input.MouseButtonEventArgs) {
            if (!this._Interaction.AllowMouseLeftButtonUp(e))
                return;
            this.UpdateVisualState(true);
            super.OnMouseLeftButtonUp(e);
            if (!this.IsEditing) {
                this.Focus();
                this.TryEnterEditMode();
            }
        }

        private SetValidSpinDirection() {
            var num = Enumerable.Count<any>(this.GetActualItems());
            var validSpinDirections = ValidSpinDirections.None;
            if (this.IsCyclic || this.CurrentIndex < num - 1)
                validSpinDirections |= ValidSpinDirections.Decrease;
            if (this.IsCyclic || this.CurrentIndex > 0)
                validSpinDirections |= ValidSpinDirections.Increase;
            if (this._Spinner)
                this._Spinner.ValidSpinDirection = validSpinDirections;
        }

        private OnItemsChanged(sender: any, e: Collections.NotifyCollectionChangedEventArgs) {
            if (this._CurrentIndexDuringInit != null && this._CurrentIndexDuringInit > -1 && this.IsValidCurrentIndex(this._CurrentIndexDuringInit)) {
                this.Value = Enumerable.ElementAt<any>(this.GetActualItems(), this._CurrentIndexDuringInit);
                this._CurrentIndexDuringInit = -1;
            }
            else if (this._ValueDuringInit != null && Enumerable.Contains<any>(this.GetActualItems(), this._ValueDuringInit)) {
                this.Value = this._ValueDuringInit;
                this._ValueDuringInit = {};
            }
            else if (this.Value == null || !Enumerable.Contains<any>(this.GetActualItems(), this.Value))
                this.Value = Enumerable.FirstOrDefault<any>(this.GetActualItems());
            this.SetValidSpinDirection();
        }

        OnValueChanging(e: RoutedPropertyChangingEventArgs<any>) {
            if (e != null && (e.NewValue == null && Enumerable.Count<any>(this.GetActualItems()) > 0 || e.NewValue != null && !Enumerable.Contains<any>(this.GetActualItems(), e.NewValue))) {
                e.Cancel = true;
                if (this._ValueDuringInit != null || e.NewValue == null)
                    return;
                this._ValueDuringInit = e.NewValue;
            } else
                super.OnValueChanging(e);
        }
        OnValueChanged(e: RoutedPropertyChangedEventArgs<any>) {
            super.OnValueChanged(e);
            this.CurrentIndex = getIndexOf(this.GetActualItems(), this.Value);
            this.SetIsEditing(false);
        }

        ApplyValue(text: string) {
            if (!this.IsEditable)
                return;
            this.SetIsEditing(true);
            try {
                this.Value = this.ParseValue(text);
            } catch (err) {
                var e = new UpDownParseErrorEventArgs(text, err);
                this.OnParseError(e);
                if (!e.Handled)
                    this.SetTextBoxText();
            } finally {
                if (!this._IsInvalidInput || this.InvalidInputAction !== InvalidInputAction.TextBoxCannotLoseFocus)
                    this.SetIsEditing(false);
            }
        }
        ParseValue(text: string): any {
            var obj: any = null;
            if (!!text) {
                var vb = this._ValueBindingEvaluator;
                obj = Enumerable.FirstOrDefault<any>(this.GetActualItems(), function (item: any): boolean {
                    var s: string;
                    if (!vb)
                        s = item.toString();
                    else
                        s = vb.GetDynamicValue(item) || "";
                    return s === text
                });
                if (obj == null) {
                    if (this.InvalidInputAction === InvalidInputAction.UseFallbackItem) {
                        this.SetIsInvalidInput(false);
                        if (this.FallbackItem != null && Enumerable.Contains<any>(this.GetActualItems(), this.FallbackItem))
                            obj = this.FallbackItem;
                        else
                            throw new ArgumentException("Cannot parse value.");
                    } else if (this.InvalidInputAction === InvalidInputAction.TextBoxCannotLoseFocus) {
                        this.SetIsInvalidInput(true);
                        obj = this.Value;
                    }
                } else
                    this.SetIsInvalidInput(false);
            } else {
                this.SetIsInvalidInput(false);
                obj = this.Value;
            }
            return obj;
        }
        FormatValue(): string {
            if (!this.Value)
                return "";
            try {
                var vb = this._ValueBindingEvaluator;
                if (vb)
                    return vb.GetDynamicValue(this.Value);
            } catch (err) {
            }
            return this.Value.toString();
        }
        OnIncrement() {
            if (this.CurrentIndex > 0)
                --this.CurrentIndex;
            else if (this.IsCyclic)
                this.CurrentIndex = Enumerable.Count<any>(this.GetActualItems()) - 1;
            this.SetIsInvalidInput(false);
            this._IsNotAllowedToEditByFocus = true;
            this.Focus();
            window.setTimeout(() => this._IsNotAllowedToEditByFocus = false, 1);
        }
        OnDecrement() {
            if (this.IsValidCurrentIndex(this.CurrentIndex + 1))
                ++this.CurrentIndex;
            else if (this.IsCyclic)
                this.CurrentIndex = 0;
            this.SetIsInvalidInput(false);
            this._IsNotAllowedToEditByFocus = true;
            this.Focus();
            window.setTimeout(() => this._IsNotAllowedToEditByFocus = false, 1);
        }

        private TryEnterEditMode() {
            if (this._IsNotAllowedToEditByFocus || !this.IsEditable)
                return;
            this.SetIsEditing(true);
        }
        SelectAllText() { }

        private CoerceSelectedIndex(index: number): number {
            if (this.IsValidCurrentIndex(index))
                return index;
            return Enumerable.Count<any>(this.GetActualItems()) == 0 ? -1 : 0;
        }
        private IsValidCurrentIndex(value: number): boolean {
            var num = Enumerable.Count<any>(this.GetActualItems());
            return value === -1 && num === 0 || value >= 0 && value < num;
        }
    }
    Fayde.RegisterType(DomainUpDown, {
        Name: "DomainUpDown",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: "http://schemas.wsick.com/fayde/input"
    });

    function getIndexOf(sequence: Fayde.IEnumerable<any>, item: any): number {
        var i = 0;
        var enumerator = sequence.GetEnumerator();
        while (enumerator.MoveNext()) {
            if (enumerator.Current === item)
                return i;
            i++;
        }
        return -1;
    }

    
}