module Fayde.Controls {
    export class TabItem extends ContentControl {
        static HasHeaderProperty = DependencyProperty.Register("HasHeader", () => Boolean, TabItem, false);
        static HeaderProperty = DependencyProperty.Register("Header", () => Object, TabItem, null, (d, args) => (<TabItem>d)._OnHeaderChanged(args));
        static HeaderTemplateProperty = DependencyProperty.Register("HeaderTemplate", () => DataTemplate, TabItem, (d, args) => (<TabItem>d).OnHeaderTemplateChanged(<DataTemplate>args.OldValue, <DataTemplate>args.NewValue));
        static IsFocusedProperty = DependencyProperty.Register("IsFocused", () => Boolean, TabItem, false);
        static IsSelectedProperty = DependencyProperty.Register("IsSelected", () => Boolean, TabItem, false, (d, args) => (<TabItem>d)._OnIsSelectedChanged(args));
        HasHeader: boolean;
        Header: any;
        HeaderTemplate: DataTemplate;
        IsFocused: boolean;
        IsSelected: boolean;

        private _ElementTemplateTopSelected: FrameworkElement;
        private _ElementTemplateBottomSelected: FrameworkElement;
        private _ElementTemplateLeftSelected: FrameworkElement;
        private _ElementTemplateRightSelected: FrameworkElement;
        private _ElementTemplateTopUnselected: FrameworkElement;
        private _ElementTemplateBottomUnselected: FrameworkElement;
        private _ElementTemplateLeftUnselected: FrameworkElement;
        private _ElementTemplateRightUnselected: FrameworkElement;
        private _ElementHeaderTopSelected: ContentControl;
        private _ElementHeaderBottomSelected: ContentControl;
        private _ElementHeaderLeftSelected: ContentControl;
        private _ElementHeaderRightSelected: ContentControl;
        private _ElementHeaderTopUnselected: ContentControl;
        private _ElementHeaderBottomUnselected: ContentControl;
        private _ElementHeaderLeftUnselected: ContentControl;
        private _ElementHeaderRightUnselected: ContentControl;

        private _PreviousTemplate: FrameworkElement = null;
        private _PreviousHeader: ContentControl = null;

        get TabStripPlacement(): Dock {
            var tabControlParent = this.TabControlParent;
            if (tabControlParent != null)
                return tabControlParent.TabStripPlacement;
            return Dock.Top;
        }
        private get TabControlParent(): TabControl {
            return VisualTreeHelper.GetParentOfType<TabControl>(this, TabControl);
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
            if (contentControl != null)
                contentControl.Content = null;
            this._ElementTemplateTopSelected = <FrameworkElement>this.GetTemplateChild("TemplateTopSelected");
            this._ElementTemplateBottomSelected = <FrameworkElement>this.GetTemplateChild("TemplateBottomSelected");
            this._ElementTemplateLeftSelected = <FrameworkElement>this.GetTemplateChild("TemplateLeftSelected");
            this._ElementTemplateRightSelected = <FrameworkElement>this.GetTemplateChild("TemplateRightSelected");
            this._ElementTemplateTopUnselected = <FrameworkElement>this.GetTemplateChild("TemplateTopUnselected");
            this._ElementTemplateBottomUnselected = <FrameworkElement>this.GetTemplateChild("TemplateBottomUnselected");
            this._ElementTemplateLeftUnselected = <FrameworkElement>this.GetTemplateChild("TemplateLeftUnselected");
            this._ElementTemplateRightUnselected = <FrameworkElement>this.GetTemplateChild("TemplateRightUnselected");
            this._ElementHeaderTopSelected = <ContentControl>this.GetTemplateChild("HeaderTopSelected");
            this._ElementHeaderBottomSelected = <ContentControl>this.GetTemplateChild("HeaderBottomSelected");
            this._ElementHeaderLeftSelected = <ContentControl>this.GetTemplateChild("HeaderLeftSelected");
            this._ElementHeaderRightSelected = <ContentControl>this.GetTemplateChild("HeaderRightSelected");
            this._ElementHeaderTopUnselected = <ContentControl>this.GetTemplateChild("HeaderTopUnselected");
            this._ElementHeaderBottomUnselected = <ContentControl>this.GetTemplateChild("HeaderBottomUnselected");
            this._ElementHeaderLeftUnselected = <ContentControl>this.GetTemplateChild("HeaderLeftUnselected");
            this._ElementHeaderRightUnselected = <ContentControl>this.GetTemplateChild("HeaderRightUnselected");
            this._UpdateHeaderVisuals();
            this.UpdateVisualState(false);
        }

        private _OnHeaderChanged(args: IDependencyPropertyChangedEventArgs) {
            this.HasHeader = args.NewValue != null;
            this.OnHeaderChanged(args.OldValue, args.NewValue);
        }
        OnHeaderChanged(oldValue: any, newValue: any) {
            this._UpdateHeaderVisuals();
        }
        OnHeaderTemplateChanged(oldHeaderTemplate: DataTemplate, newHeaderTemplate: DataTemplate) {
            this._UpdateHeaderVisuals();
        }
        private _OnIsSelectedChanged(args: IDependencyPropertyChangedEventArgs) {
            var isSelected = <boolean>args.NewValue;
            var e1 = new RoutedEventArgs();
            if (isSelected)
                this.OnSelected(e1);
            else
                this.OnUnselected(e1);
            this.IsTabStop = isSelected;
            this.UpdateVisualState();
        }
        OnSelected(e: RoutedEventArgs) {
            var parent = this.TabControlParent;
            if (!parent)
                return;
            parent.SelectedItem = this;
        }
        OnUnselected(e: RoutedEventArgs) {
            var parent = this.TabControlParent;
            if (!parent || parent.SelectedItem != this)
                return;
            parent.SelectedIndex = -1;
        }

        private _UpdateHeaderVisuals() {
            var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
            if (contentControl == null)
                return;
            contentControl.Content = this.Header;
            contentControl.ContentTemplate = this.HeaderTemplate;
        }

        private UpdateTabItemVisuals() {
            var template = this.GetTemplate(this.IsSelected, this.TabStripPlacement);
            if (this._PreviousTemplate != null && this._PreviousTemplate !== template)
                this._PreviousTemplate.Visibility = Visibility.Collapsed;
            this._PreviousTemplate = template;
            if (template != null)
                template.Visibility = Visibility.Visible;
            var contentControl = this._GetContentControl(this.IsSelected, this.TabStripPlacement);
            if (this._PreviousHeader != null && this._PreviousHeader !== contentControl)
                this._PreviousHeader.Content = null;
            this._PreviousHeader = contentControl;
            this._UpdateHeaderVisuals();
        }

        OnMouseLeave(e: Input.MouseEventArgs) {
            this.UpdateVisualState();
        }
        OnMouseEnter(e: Input.MouseEventArgs) {
            this.UpdateVisualState();
        }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            if (!this.IsEnabled || this.TabControlParent == null || (this.IsSelected || e.Handled))
                return;
            this.IsTabStop = true;
            e.Handled = this.Focus();
            this.TabControlParent.SelectedIndex = this.TabControlParent.Items.IndexOf(this);
        }

        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.SetValueInternal(TabItem.IsFocusedProperty, true);
            this.UpdateVisualState();
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.SetValueInternal(TabItem.IsFocusedProperty, false);
            this.UpdateVisualState();
        }

        OnContentChanged(oldContent: any, newContent: any) {
            super.OnContentChanged(oldContent, newContent);
            var parent = this.TabControlParent;
            if (!parent == null || !this.IsSelected)
                return;
            parent.SelectedContent = newContent;
        }

        OnKeyDown(e: Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (e.Handled)
                return;
            var parent = this.TabControlParent;
            var logicalKey = Input.InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key);
            var startIndex = parent.Items.IndexOf(this);
            var nextTabItem: TabItem = null;
            switch (logicalKey) {
                case Input.Key.Left:
                case Input.Key.Up:
                    nextTabItem = this._FindPreviousTabItem(startIndex);
                    break;
                case Input.Key.Right:
                case Input.Key.Down:
                    nextTabItem = this._FindNextTabItem(startIndex);
                    break;
                default:
                    return;
            }
            if (!nextTabItem || nextTabItem === parent.SelectedItem)
                return;
            e.Handled = true;
            parent.SelectedItem = nextTabItem;
            nextTabItem.Focus();
        }

        GetTemplate(isSelected: boolean, tabPlacement: Dock): FrameworkElement {
            switch (tabPlacement) {
                case Dock.Left:
                    if (!isSelected)
                        return this._ElementTemplateLeftUnselected;
                    else
                        return this._ElementTemplateLeftSelected;
                case Dock.Top:
                    if (!isSelected)
                        return this._ElementTemplateTopUnselected;
                    else
                        return this._ElementTemplateTopSelected;
                case Dock.Right:
                    if (!isSelected)
                        return this._ElementTemplateRightUnselected;
                    else
                        return this._ElementTemplateRightSelected;
                case Dock.Bottom:
                    if (!isSelected)
                        return this._ElementTemplateBottomUnselected;
                    else
                        return this._ElementTemplateBottomSelected;
                default:
                    return null;
            }
        }
        private _GetContentControl(isSelected: boolean, tabPlacement: Dock): ContentControl {
            switch (tabPlacement) {
                case Dock.Left:
                    if (!isSelected)
                        return this._ElementHeaderLeftUnselected;
                    else
                        return this._ElementHeaderLeftSelected;
                case Dock.Top:
                    if (!isSelected)
                        return this._ElementHeaderTopUnselected;
                    else
                        return this._ElementHeaderTopSelected;
                case Dock.Right:
                    if (!isSelected)
                        return this._ElementHeaderRightUnselected;
                    else
                        return this._ElementHeaderRightSelected;
                case Dock.Bottom:
                    if (!isSelected)
                        return this._ElementHeaderBottomUnselected;
                    else
                        return this._ElementHeaderBottomSelected;
                default:
                    return null;
            }
        }

        private _FindPreviousTabItem(startIndex: number): TabItem {
            var parent = this.TabControlParent;
            var items = parent.Items;
            var tabItem: TabItem = null;
            for (var i = startIndex; i >= 0; i--) {
                tabItem = <TabItem>items.GetValueAt(i);
                if (tabItem.IsEnabled && tabItem.Visibility === Visibility.Visible)
                    return tabItem;
            }
            return null;
        }
        private _FindNextTabItem(startIndex: number): TabItem {
            var parent = this.TabControlParent;
            var items = parent.Items;
            var len = items.Count;
            var tabItem: TabItem = null;
            for (var i = startIndex; i < len; i++) {
                tabItem = <TabItem>items.GetValueAt(i);
                if (tabItem.IsEnabled && tabItem.Visibility === Visibility.Visible)
                    return tabItem;
            }
            return null;
        }
    }
}