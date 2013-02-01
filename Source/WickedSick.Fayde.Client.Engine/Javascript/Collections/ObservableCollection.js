/// <reference path="../Core/Collections/InternalCollection.js" />
/// CODE
/// <reference path="INotifyCollectionChanged.js"/>
/// <reference path="NotifyCollectionChangedEventArgs.js"/>

(function (Collections) {
    var ObservableCollection = Nullstone.Create("ObservableCollection", Fayde.InternalCollection, 0, [Collections.INotifyCollectionChanged]);

    ObservableCollection.Instance.Init = function () {
        this.Init$InternalCollection();
        this.CollectionChanged = new MulticastEvent();
    };

    ObservableCollection.Instance._RaiseChanged = function (args) {
        var argsClass = Collections.NotifyCollectionChangedEventArgs;
        var rargs;
        if (args.IsReset) {
            rargs = argsClass.Reset();
        } else if (args.IsReplace) {
            rargs = argsClass.Replace(args.NewValue, args.OldValue, args.Index);
        } else if (args.IsAdd) {
            rargs = argsClass.Add(args.NewValue, args.Index);
        } else if (args.IsRemove) {
            rargs = argsClass.Remove(args.OldValue, args.Index);
        }
        this.CollectionChanged.Raise(this, rargs);
    };

    Collections.ObservableCollection = Nullstone.FinishCreate(ObservableCollection);
})(Nullstone.Namespace("Fayde.Collections"));