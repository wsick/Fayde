import DataErrorsChangedEventArgs = Fayde.Data.DataErrorsChangedEventArgs;

var NAME_REQUIRED = "Name is required.";

class NotifyTestEntity extends Fayde.MVVM.ObservableObject implements Fayde.Data.INotifyDataErrorInfo {
    constructor () {
        super();
        this.Name = "";
    }

    private _Id: number = -1;
    get Id (): number {
        return this._Id;
    }

    set Id (value: number) {
        this._Id = value;
        this.OnPropertyChanged("Id");
    }

    private _Name: string;
    get Name (): string {
        return this._Name;
    }

    set Name (value: string) {
        if (this._Name === value)
            return;
        this._Name = value;
        (!value) ? this.AddError("Name", NAME_REQUIRED) : this.RemoveError("Name", NAME_REQUIRED);
        this.OnPropertyChanged("Name");
    }


    private _Errors = new Map<string, string[]>();
    ErrorsChanged = new nullstone.Event<DataErrorsChangedEventArgs>();

    get HasErrors (): boolean {
        return this._Errors.size > 0;
    }

    GetErrors (propertyName: string): nullstone.IEnumerable<string> {
        var all = this._Errors;
        if (!all.has(propertyName))
            return null;
        var errs = all.get(propertyName);
        return nullstone.IEnumerable_.fromArray(errs);
    }

    AddError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            all.set(propertyName, []);
        var errs = all.get(propertyName);
        errs.push(error);
        this.ErrorsChanged.raise(this, new DataErrorsChangedEventArgs(propertyName));
    }

    RemoveError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            return;
        var errs = all.get(propertyName);
        var index = errs.indexOf(error);
        if (index >= 0)
            errs.splice(index, 1);
        if (errs.length < 1)
            all.delete(propertyName);
        this.ErrorsChanged.raise(this, new DataErrorsChangedEventArgs(propertyName));
    }
}
Fayde.Data.INotifyDataErrorInfo_.mark(NotifyTestEntity);
export = NotifyTestEntity;