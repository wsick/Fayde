using System;
using System.Windows.Input;

namespace Fayde.Website.MVVM
{
    public class RelayCommand : ICommand
    {
        private Action _Execute;
        private Func<bool> _CanExecute;

        public RelayCommand(Action execute)
            : this(execute, () => true)
        {
        }

        public RelayCommand(Action execute, Func<bool> canExecute)
        {
            _Execute = execute;
            _CanExecute = canExecute;
        }

        public bool CanExecute(object parameter)
        {
            return _CanExecute();
        }

        public event EventHandler CanExecuteChanged;

        public void ForceCanExecuteChanged()
        {
            var obj = CanExecuteChanged;
            if (obj != null)
                obj(this, new EventArgs());
        }

        public void Execute(object parameter = null)
        {
            _Execute();
        }
    }

    public class RelayCommand<T> : ICommand
    {
        private Action<T> _Execute;
        private Func<T, bool> _CanExecute;

        public RelayCommand(Action<T> execute)
            : this(execute, t => true)
        {
        }

        public RelayCommand(Action<T> execute, Func<T, bool> canExecute)
        {
            if (execute == null)
                throw new ArgumentException("Invalid execute action.");
            if (canExecute == null)
                throw new ArgumentException("Invalid can execute func.");
            _Execute = execute;
            _CanExecute = canExecute;
        }

        public bool CanExecute(object parameter)
        {
            return _CanExecute((T)parameter);
        }

        public event EventHandler CanExecuteChanged;

        public void ForceCanExecuteChanged()
        {
            var obj = CanExecuteChanged;
            if (obj != null)
                obj(this, new EventArgs());
        }

        public void Execute(object parameter)
        {
            _Execute((T)parameter);
        }
    }
}
