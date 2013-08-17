using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Windows.Data;
using WickedSick.Thea.Models;

namespace WickedSick.Thea.ViewModels
{
    public class TimelineViewModel : MVVM.ViewModelBase
    {
        public ObservableCollection<TimelineGroup> Items { get; private set; }
        public CollectionView SortedItems { get; private set; }
        public int TimelineMax { get; private set; }

        public TimelineViewModel()
        {
            Items = new ObservableCollection<TimelineGroup>();
            Items.Add(new TimelineGroup() { Data = "App.Resources", Start = 2, Length = 0, Type = "Parse" });
            Items.Add(new TimelineGroup() { Data = "App", Start = 3, Length = 4, Type = "Parse" });
            Items.Add(new TimelineGroup() { Data = "", Start = 38, Length = 11, Type = "LayoutPass" });
            Items.Add(new TimelineGroup() { Data = "Page", Start = 236, Length = 106, Type = "Parse" });
            Items.Add(new TimelineGroup() { Data = "http://localhost/NflDraft/default.fap#", Start = 8, Length = 335, Type = "Navigate" });
            Items.Add(new TimelineGroup() { Data = "", Start = 334, Length = 451, Type = "LayoutPass" });
            Items.CollectionChanged += Items_CollectionChanged;
            CalculateTimelineMax();

            SortedItems = (CollectionView)CollectionViewSource.GetDefaultView(Items);
            SortedItems.SortDescriptions.Add(new SortDescription("Start", ListSortDirection.Ascending));
        }

        private void CalculateTimelineMax()
        {
            int max = 0;
            foreach (TimelineGroup tg in Items)
            {
                max = Math.Max(max, tg.Start + tg.Length);
            }
            TimelineMax = max;
        }

        private void Items_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
        {
            CalculateTimelineMax();
        }
    }
}
