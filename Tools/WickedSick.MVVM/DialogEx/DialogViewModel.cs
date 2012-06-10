using System;
using System.Windows.Threading;

namespace WickedSick.MVVM.DialogEx
{
    public class DialogViewModel : DialogViewModel<object, object>
    {
    }

    public class DialogViewModel<T> : DialogViewModel<T, T>
    {
    }

    public class DialogViewModel<TBuilder, TAccept> : ViewModelBase
    {
        private bool _IsRequestingChange;
        private RelayCommand<TBuilder> _RequestChangeCommand;
        private ObservableObject _DialogDataContext;
        private RelayCommand<IDialogCompleteParameters> _ChangedCommand;

        public DialogViewModel()
        {
            RequestChangeCommand = new RelayCommand<TBuilder>(RequestChange_Execute, RequestChange_CanExecute);
            ChangedCommand = new RelayCommand<IDialogCompleteParameters>(Changed_Execute);
        }

        public Action<TAccept> AcceptAction { get; set; }
        public Action<IDialogCompleteParameters> CompleteAction { get; set; }
        public Func<TBuilder, ObservableObject> ViewModelBuilder { get; set; }
        public Func<TBuilder, bool> CanChange { get; set; }

        public bool IsRequestingChange
        {
            get { return _IsRequestingChange; }
            set
            {
                _IsRequestingChange = value;
                OnPropertyChanged("IsRequestingChange");
            }
        }

        public RelayCommand<TBuilder> RequestChangeCommand
        {
            get { return _RequestChangeCommand; }
            set
            {
                _RequestChangeCommand = value;
                OnPropertyChanged("RequestChangeCommand");
            }
        }

        public ObservableObject DialogDataContext
        {
            get { return _DialogDataContext; }
            set
            {
                _DialogDataContext = value;
                OnPropertyChanged("DialogDataContext");
            }
        }

        public RelayCommand<IDialogCompleteParameters> ChangedCommand
        {
            get { return _ChangedCommand; }
            set
            {
                _ChangedCommand = value;
                OnPropertyChanged("ChangedCommand");
            }
        }

        private void Changed_Execute(IDialogCompleteParameters parameter)
        {
            if (parameter.Result == true)
            {
                if (AcceptAction != null)
                {
                    if (parameter.Data == null)
                        AcceptAction(default(TAccept));
                    else
                        AcceptAction((TAccept)parameter.Data);
                }
            }
            if (CompleteAction != null)
                CompleteAction(parameter);
        }

        private void RequestChange_Execute(TBuilder parameter)
        {
            if (ViewModelBuilder != null)
            {
                var vm = ViewModelBuilder(parameter);
                if (vm == null)
                    return;
                DialogDataContext = vm;
            }
            IsRequestingChange = true;
        }

        private bool RequestChange_CanExecute(TBuilder parameter)
        {
            if (CanChange != null)
                return CanChange(parameter);
            return true;
        }
    }
}