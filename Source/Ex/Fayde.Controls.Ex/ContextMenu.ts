/// <reference path="Primitives/MenuBase.ts" />

module Fayde.Controls {
    export class ContextMenu extends Primitives.MenuBase {
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, ContextMenu, 0.0);
        HorizontalOffset: number;
        private OnHorizontalOffsetChanged(args: IDependencyPropertyChangedEventArgs) {
            this.UpdateContextMenuPlacement();
        }

        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, ContextMenu, 0.0);
        VerticalOffset: number;
        private OnVerticalOffsetChanged(args: IDependencyPropertyChangedEventArgs) {
            this.UpdateContextMenuPlacement();
        }

        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, ContextMenu, false);
        IsOpen: boolean;
        private OnIsOpenChanged(args: IDependencyPropertyChangedEventArgs) {
            if (this._SettingIsOpen)
                return;
            if (args.NewValue === true)
                this.OpenPopup(this._MousePosition);
            else
                this.ClosePopup();
        }

        Opened = new RoutedEvent<RoutedEventArgs>();
        Closed = new RoutedEvent<RoutedEventArgs>();

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.LayoutUpdated.Subscribe(this._HandleLayoutUpdated, this);
        }

        OnKeyDown(e: Input.KeyEventArgs) {
            switch (e.Key) {
                case Input.Key.Escape:
                    this.ClosePopup();
                    e.Handled = true;
                    break;
                case Input.Key.Up:
                    this.FocusNextItem(false);
                    e.Handled = true;
                    break;
                case Input.Key.Down:
                    this.FocusNextItem(true);
                    e.Handled = true;
                    break;
            }
            super.OnKeyDown(e)
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            e.Handled = true;
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseRightButtonDown(e: Input.MouseButtonEventArgs) {
            e.Handled = true;
            super.OnMouseRightButtonDown(e);
        }

        private _Owner: DependencyObject = null;
        get Owner(): DependencyObject { return this._Owner; }
        set Owner(value: DependencyObject) {
            if (this._Owner) {
                var fe = this._Owner instanceof FrameworkElement ? <FrameworkElement>this._Owner : null;
                if (fe)
                    fe.MouseRightButtonDown.Unsubscribe(this._HandleOwnerMouseRightButtonDown, this);
            }
            this._Owner = value;
            if (!this._Owner)
                return;
            fe = this._Owner instanceof FrameworkElement ? <FrameworkElement>this._Owner : null;
            if (fe)
                fe.MouseRightButtonDown.Subscribe(this._HandleOwnerMouseRightButtonDown, this);
        }
        private _MousePosition = new Point();
        private _PopupAlignmentPoint = new Point();
        private _SettingIsOpen: boolean = false;
        private _RootVisual: FrameworkElement = null;
        private _Popup: Controls.Primitives.Popup = null;
        private _Overlay: Panel = null;

        private _HandleLayoutUpdated(sender: any, e: EventArgs) {
            if (!Fayde.Application.Current.RootVisual)
                return;
            this.InitializeRootVisual();
            this.LayoutUpdated.Unsubscribe(this._HandleLayoutUpdated, this);
        }
        private _HandleOwnerMouseRightButtonDown(sender: any, e: Fayde.Input.MouseButtonEventArgs) {
            this.OpenPopup(e.GetPosition(null));
            e.Handled = true;
        }
        private _HandleRootVisualMouseMove(sender: any, e: Fayde.Input.MouseEventArgs) {
            this._MousePosition = e.GetPosition(null);
        }
        private _HandleOverlayMouseButtonDown(sender: any, e: Fayde.Input.MouseButtonEventArgs) {
            this.ClosePopup();
            e.Handled = true;
        }
        private _HandleContextMenuSizeChanged(sender: any, e: Fayde.SizeChangedEventArgs) {
            this.UpdateContextMenuPlacement();
        }

        ChildMenuItemClicked() {
            this.ClosePopup();
        }

        private InitializeRootVisual() {
            if (this._RootVisual)
                return;
            var rv = Fayde.Application.Current.RootVisual;
            this._RootVisual = rv instanceof FrameworkElement ? <FrameworkElement>rv : null;
            if (this._RootVisual)
                this._RootVisual.MouseMove.Subscribe(this._HandleRootVisualMouseMove, this);
        }

        private UpdateContextMenuPlacement() {
            if (!this._RootVisual || !this._Overlay)
                return;
            var x = this._PopupAlignmentPoint.X;
            var y = this._PopupAlignmentPoint.Y;
            var val1_1 = x + this.HorizontalOffset;
            var val1_2 = y + this.VerticalOffset;
            var val1_3 = Math.min(val1_1, this._RootVisual.ActualWidth - this.ActualWidth);
            var val1_4 = Math.min(val1_2, this._RootVisual.ActualHeight - this.ActualHeight);
            var length1 = Math.max(val1_3, 0.0);
            var length2 = Math.max(val1_4, 0.0);
            Controls.Canvas.SetLeft(this, length1);
            Controls.Canvas.SetTop(this, length2);
            this._Overlay.Width = this._RootVisual.ActualWidth;
            this._Overlay.Height = this._RootVisual.ActualHeight;
        }
        private OpenPopup(position: Point) {
            this._PopupAlignmentPoint = position;
            this.InitializeRootVisual();
            var contextMenu1 = this;
            var canvas1 = new Canvas();
            canvas1.Background = new Fayde.Media.SolidColorBrush(Color.KnownColors.Transparent);
            var canvas2 = canvas1;
            contextMenu1._Overlay = canvas2;
            this._Overlay.MouseLeftButtonDown.Subscribe(this._HandleOverlayMouseButtonDown, this);
            this._Overlay.MouseRightButtonDown.Subscribe(this._HandleOverlayMouseButtonDown, this);
            this._Overlay.Children.Add(this);
            var contextMenu2 = this;
            var popup1 = new Controls.Primitives.Popup();
            popup1.Child = this._Overlay;
            var popup2 = popup1;
            contextMenu2._Popup = popup2;
            this.SizeChanged.Subscribe(this._HandleContextMenuSizeChanged, this);
            if (this._RootVisual)
                this._RootVisual.SizeChanged.Subscribe(this._HandleContextMenuSizeChanged, this);
            this.UpdateContextMenuPlacement();
            if (this.ReadLocalValue(DependencyObject.DataContextProperty) === DependencyProperty.UnsetValue) {
                var dependencyObject = this.Owner;
                if (!dependencyObject) dependencyObject = this._RootVisual;
                var contextMenu3 = this;
                var dp = FrameworkElement.DataContextProperty;
                var binding1 = new Fayde.Data.Binding("DataContext");
                binding1.Source = dependencyObject;
                var binding2 = binding1;
                contextMenu3.SetBinding(dp, binding2);
            }
            this._Popup.IsOpen = true;
            this.Focus();
            this._SettingIsOpen = true;
            this.IsOpen = true;
            this._SettingIsOpen = false;
            this.OnOpened(new RoutedEventArgs());
        }
        OnOpened(e: RoutedEventArgs) {
            this.Opened.Raise(this, e);
        }
        private ClosePopup() {
            if (this._Popup) {
                this._Popup.IsOpen = false;
                this._Popup.Child = null;
                this._Popup = null;
            }
            if (this._Overlay) {
                this._Overlay.Children.Clear();
                this._Overlay = null;
            }
            this.SizeChanged.Unsubscribe(this._HandleContextMenuSizeChanged, this);
            if (this._RootVisual)
                this._RootVisual.SizeChanged.Unsubscribe(this._HandleContextMenuSizeChanged, this);
            this._SettingIsOpen = true;
            this.IsOpen = false;
            this._SettingIsOpen = false;
            this.OnClosed(new RoutedEventArgs());
        }
        OnClosed(e: RoutedEventArgs) {
            this.Closed.Raise(this, e);
        }

        private FocusNextItem(down: boolean) {
            var count = this.Items.Count;
            var num = down ? -1 : count;
            var menuItem1 = <MenuItem>this.XamlNode.GetFocusedElement();
            if (menuItem1 instanceof MenuItem && this === menuItem1.ParentMenuBase)
                num = this.ItemContainersManager.IndexFromContainer(menuItem1);
            var index = num;
            var menuItem2;
            do {
                index = (index + count + (down ? 1 : -1)) % count;
                menuItem2 = this.ItemContainersManager.ContainerFromIndex(index);
                if (!(menuItem2 instanceof MenuItem)) menuItem2 = null;
            }
            while ((!menuItem2 || (!menuItem2.IsEnabled || !menuItem2.Focus())) && index !== num);
        }
    }
}