class RepeatButtonViewModel extends Fayde.MVVM.ViewModelBase {
    private _Counter: number = 0;
    get Counter () {
        return this._Counter;
    }

    set Counter (value: number) {
        this._Counter = value;
        this.OnPropertyChanged("Counter");
    }

    RepeatBtn_Click () {
        this.Counter++;
    }
}
export = RepeatButtonViewModel;