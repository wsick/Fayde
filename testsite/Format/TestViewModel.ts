/// <reference path="../lib/Fayde/Fayde.d.ts" />

class TestViewModel extends Fayde.MVVM.ViewModelBase {
    private _Now: DateTime = DateTime.Now;

    get Now(): DateTime {
        return this._Now;
    }
    set Now(value: DateTime) {
        this._Now = value;
        this.OnPropertyChanged("Now");
    }
}
export = TestViewModel;