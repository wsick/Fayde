/// <reference path="Fayde.d.ts" />
/// <reference path="Primitives/MenuBase.ts" />

module Fayde.Controls.Input {
    export class MenuItem extends Fayde.Controls.HeaderedItemsControl {
        ParentMenuBase: Primitives.MenuBase;
        Click = new RoutedEvent<RoutedEventArgs>();

        static CommandProperty: DependencyProperty = DependencyProperty.Register("Command", () => Fayde.Input.ICommand_, MenuItem, undefined, (d, args) => (<MenuItem>d).OnCommandChanged(args));
        Command: Fayde.Input.ICommand;
        private OnCommandChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldcmd = <Fayde.Input.ICommand>args.OldValue;
            if (Nullstone.ImplementsInterface(oldcmd, Fayde.Input.ICommand_))
                oldcmd.CanExecuteChanged.Unsubscribe(this._CanExecuteChanged, this);
            var newcmd = <Fayde.Input.ICommand>args.NewValue;
            if (Nullstone.ImplementsInterface(newcmd, Fayde.Input.ICommand_))
                newcmd.CanExecuteChanged.Subscribe(this._CanExecuteChanged, this);
            this.UpdateIsEnabled();
        }
        private _CanExecuteChanged(sender: any, e: EventArgs) { this.UpdateIsEnabled(); }

        static CommandParameterProperty: DependencyProperty = DependencyProperty.Register("CommandParameter", () => Object, MenuItem, undefined, (d, args) => (<MenuItem>d).OnCommandParameterChanged(args));
        CommandParameter: any;
        private OnCommandParameterChanged(args: IDependencyPropertyChangedEventArgs) { this.UpdateIsEnabled(); }

        static IconProperty = DependencyProperty.Register("Icon", () => Object, MenuItem);
        Icon: any;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.UpdateIsEnabled();
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        private UpdateIsEnabled() {
            this.IsEnabled = this.Command == null || this.Command.CanExecute(this.CommandParameter);
            this.UpdateVisualState(true);
        }

        OnGotFocus(e: Fayde.RoutedEventArgs) {
            super.OnGotFocus(e);
            this.UpdateVisualState(true);
        }
        OnLostFocus(e: Fayde.RoutedEventArgs) {
            super.OnLostFocus(e);
            this.UpdateVisualState(true);
        }

        OnMouseEnter(e: Fayde.Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.Focus();
            this.UpdateVisualState(true);
        }
        OnMouseLeave(e: Fayde.Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            if (this.ParentMenuBase != null)
                this.ParentMenuBase.Focus();
            this.UpdateVisualState(true);
        }
        OnMouseLeftButtonDown(e: Fayde.Input.MouseButtonEventArgs) {
            if (!e.Handled) {
                this.OnClick();
                e.Handled = true;
            }
            super.OnMouseLeftButtonDown(e);
        }
        OnMouseRightButtonDown(e: Fayde.Input.MouseButtonEventArgs) {
            if (!e.Handled) {
                this.OnClick();
                e.Handled = true;
            }
            super.OnMouseRightButtonDown(e);
        }
        OnKeyDown(e: Fayde.Input.KeyEventArgs) {
            if (!e.Handled && Fayde.Input.Key.Enter === e.Key) {
                this.OnClick();
                e.Handled = true;
            }
            super.OnKeyDown(e);
        }

        private OnClick() {
            var contextMenu = <ContextMenu>this.ParentMenuBase;
            if (contextMenu instanceof ContextMenu)
                contextMenu.ChildMenuItemClicked();
            this.Click.Raise(this, new RoutedEventArgs());
            if (this.Command == null || !this.Command.CanExecute(this.CommandParameter))
                return;
            this.Command.Execute(this.CommandParameter);
        }

        GoToStateCommon(gotoFunc: (state: string) => boolean): boolean {
            if (!this.IsEnabled)
                return gotoFunc("Disabled");
            return gotoFunc("Normal");
        }
    }
    Fayde.RegisterType(MenuItem, {
        Name: "MenuItem",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });
}