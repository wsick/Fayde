using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Threading;
using WatiN.Core;
using WickedSick.MVVM;
using WickedSick.MVVM.DialogEx;
using WickedSick.Thea.Helpers;

namespace WickedSick.Thea.ViewModels
{
    public class MainViewModel : ViewModelBase, IDisposable
    {
        private FaydeInterop _Interop;
        private DispatcherTimer _Timer;

        public MainViewModel()
        {
        }

        #region Properties

        private Browser _AttachedBrowser;
        public Browser AttachedBrowser
        {
            get { return _AttachedBrowser; }
            set
            {
                _AttachedBrowser = value;
                OnPropertyChanged("AttachedBrowser");
            }
        }

        private ObservableCollection<VisualViewModel> _RootLayers = new ObservableCollection<VisualViewModel>();
        public ObservableCollection<VisualViewModel> RootLayers
        {
            get { return _RootLayers; }
            set
            {
                _RootLayers = value;
                OnPropertyChanged("RootLayers");
            }
        }

        private VisualViewModel _SelectedVisual;
        public VisualViewModel SelectedVisual
        {
            get { return _SelectedVisual; }
            set
            {
                _SelectedVisual = value;
                OnPropertyChanged("SelectedVisual");
            }
        }

        #endregion

        #region Load

        private DialogViewModel<LoadViewModel> _LoadCommand;
        public DialogViewModel<LoadViewModel> LoadCommand
        {
            get
            {
                if (_LoadCommand == null)
                    _LoadCommand = CreateLoadCommand();
                return _LoadCommand;
            }
        }

        private DialogViewModel<LoadViewModel> CreateLoadCommand()
        {
            return new DialogViewModel<LoadViewModel>
            {
                ViewModelBuilder = o => new LoadViewModel(),
                AcceptAction = lvm => AttachToBrowser(lvm.SelectedBrowser),
                CompleteAction = o =>
                {
                    var lvm = (LoadViewModel)o.Data;
                    lvm.Dispose();
                    if (o.Result != true)
                        App.Current.Shutdown();
                },
            };
        }

        public void Load()
        {
            LoadCommand.RequestChangeCommand.Execute(null);
        }

        #endregion

        #region ChooseVisualStudio

        private DialogViewModel<ChooseVisualStudioViewModel> _ChooseVisualStudioCommand;
        public DialogViewModel<ChooseVisualStudioViewModel> ChooseVisualStudioCommand
        {
            get
            {
                if (_ChooseVisualStudioCommand == null)
                    _ChooseVisualStudioCommand = CreateChooseVisualStudioCommand();
                return _ChooseVisualStudioCommand;
            }
        }

        private DialogViewModel<ChooseVisualStudioViewModel> CreateChooseVisualStudioCommand()
        {
            return new DialogViewModel<ChooseVisualStudioViewModel>
            {
                ViewModelBuilder = cvsvm => new ChooseVisualStudioViewModel(),
                AcceptAction = cvsvm => AttachToVisualStudio(cvsvm.SelectedInstance),
            };
        }

        #endregion

        private void AttachToBrowser(Browser browser)
        {
            AttachedBrowser = browser;
            _Interop = new FaydeInterop(AttachedBrowser);
            MergeTree(_Interop.GetVisualTree());
            //_Interop.PopulateProperties(RootLayers[0]);
            StartTimer();
        }

        private void AttachToVisualStudio(VisualStudioInterop.VisualStudioInstance instance)
        {
            if (_Timer != null)
            {
                _Timer.Tick -= _Timer_Tick;
                if (_Timer.IsEnabled)
                    _Timer.Stop();
            }

            _Interop.AttachToVisualStudio(instance);
            StartTimer();
        }

        private void StartTimer()
        {
            _Timer = new DispatcherTimer();
            _Timer.Tick += _Timer_Tick;
            _Timer.Interval = TimeSpan.FromSeconds(1);
            _Timer.Start();
        }

        private void _Timer_Tick(object sender, EventArgs e)
        {
            RefreshTree();

            var allVisuals = RootLayers
                .SelectMany(l => l.AllChildren)
                .Concat(RootLayers)
                .ToList();

            //RefreshThisVisual(allVisuals);
            RefreshHitTestVisuals(allVisuals);
        }

        private void RefreshTree()
        {
            if (_Interop.IsCacheInvalidated)
                MergeTree(_Interop.GetVisualTree());
        }


        private void RefreshThisVisual(List<VisualViewModel> allVisuals)
        {
            var sid = _Interop.EvalAgainstStackFrame("this._ID");
            if (sid == null)
                return;

            foreach (var v in allVisuals)
                v.IsThisOnStackFrame = false;
            var thisVisual = allVisuals.FirstOrDefault(vvm => vvm.ID == sid);
            if (thisVisual != null)
                thisVisual.IsThisOnStackFrame = true;
        }

        private void RefreshHitTestVisuals(List<VisualViewModel> allVisuals)
        {
            var hitTested = _Interop.GetVisualIDsInHitTest().ToList();
            if (hitTested == null)
                return;

            foreach (var v in allVisuals)
                v.IsInHitTest = false;

            foreach (var v in allVisuals.Where(vvm => hitTested.Any(s => vvm.ID == s)))
                v.IsInHitTest = true;
        }

        private void MergeTree(IEnumerable<VisualViewModel> allVisuals)
        {
            RootLayers.Clear();
            foreach (var v in allVisuals)
            {
                RootLayers.Add(v);
            }
        }

        public void Dispose()
        {
            if (AttachedBrowser != null)
            {
                AttachedBrowser.Dispose();
                AttachedBrowser = null;
            }
        }

        protected override void OnPropertyChanged(string propertyName)
        {
            base.OnPropertyChanged(propertyName);
            if (propertyName == "SelectedVisual")
            {
                _Interop.PopulateProperties(SelectedVisual);
            }
        }
    }
}