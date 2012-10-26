using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Input;
using System.Windows.Threading;

namespace WickedSick.MVVM.DialogEx
{
    /// <summary>
    /// This control has no rendering of its own.
    /// When provided a ViewType and DataContext, it will construct the view/view model pair and show the dialog.
    /// The DialogResult along with the manipulated DataContext will be returned in the event "DialogComplete".
    /// </summary>
    [DesignTimeVisible(false)]
    public class DialogControl : Control
    {
        public static readonly DependencyProperty ViewTypeProperty = DependencyProperty.Register("ViewType", typeof(Type), typeof(DialogControl),
            new FrameworkPropertyMetadata(new PropertyChangedCallback(TryShowDialog)));
        public static readonly DependencyProperty ViewModelProperty = DependencyProperty.Register("ViewModel", typeof(ObservableObject), typeof(DialogControl),
            new FrameworkPropertyMetadata(new PropertyChangedCallback(TryShowDialog)));
        public static readonly DependencyProperty IsDialogVisibleProperty = DependencyProperty.Register("IsDialogVisible", typeof(bool), typeof(DialogControl),
            new FrameworkPropertyMetadata(false, FrameworkPropertyMetadataOptions.BindsTwoWayByDefault, TryShowDialog));
        public static readonly DependencyProperty DialogCompleteCommandProperty = DependencyProperty.Register("DialogCompleteCommand", typeof(ICommand), typeof(DialogControl));
        public static readonly DependencyProperty StartupLocationProperty =
            DependencyProperty.Register("StartupLocation", typeof(WindowStartupLocation), typeof(DialogControl), new UIPropertyMetadata(WindowStartupLocation.CenterOwner));

        public DialogControl()
        {
            // The control doesn't have any specific rendering of its own.
            Visibility = Visibility.Hidden;
            SetBinding(ViewModelProperty, new Binding("DialogDataContext"));
            SetBinding(IsDialogVisibleProperty, new Binding("IsRequestingChange") { Mode = BindingMode.TwoWay });
            SetBinding(DialogCompleteCommandProperty, new Binding("ChangedCommand"));
        }

        public Type ViewType
        {
            get { return (Type)GetValue(ViewTypeProperty); }
            set { SetValue(ViewTypeProperty, value); }
        }

        public ObservableObject ViewModel
        {
            get { return (ObservableObject)GetValue(ViewModelProperty); }
            set { SetValue(ViewModelProperty, value); }
        }

        public bool IsDialogVisible
        {
            get { return (bool)GetValue(IsDialogVisibleProperty); }
            set { SetValue(IsDialogVisibleProperty, value); }
        }

        public ICommand DialogCompleteCommand
        {
            get { return (ICommand)GetValue(DialogCompleteCommandProperty); }
            set { SetValue(DialogCompleteCommandProperty, value); }
        }

        public WindowStartupLocation StartupLocation
        {
            get { return (WindowStartupLocation)GetValue(StartupLocationProperty); }
            set { SetValue(StartupLocationProperty, value); }
        }


        private static void TryShowDialog(DependencyObject target, DependencyPropertyChangedEventArgs e)
        {
            var dc = target as DialogControl;
            if (dc == null)
                return;
            dc.TryShowDialog();
        }

        private bool _IgnoreChanges;
        private void TryShowDialog()
        {
            if (_IgnoreChanges)
                return;

            if (!IsDialogVisible)
                return;
            if (ViewType == null)
                return;
            if (ViewModel == null)
                return;
            if (!typeof(Window).IsAssignableFrom(ViewType))
                return;

            Window newDialog = Activator.CreateInstance(ViewType) as Window;
            newDialog.Owner = Window.GetWindow(this);
            newDialog.WindowStartupLocation = StartupLocation;
            newDialog.DataContext = ViewModel;
            bool? result = newDialog.ShowDialog();

            try
            {
                _IgnoreChanges = true;
                var be = GetBindingExpression(IsDialogVisibleProperty);
                be.UpdateTarget();
                SetCurrentValue(IsDialogVisibleProperty, false);
            }
            finally
            {
                _IgnoreChanges = false;
            }
            ICommand completeCommand = DialogCompleteCommand;
            if (completeCommand != null)
            {
                completeCommand.Execute(new DialogCompleteParameters(result, newDialog.DataContext));
            }
        }
    }
}