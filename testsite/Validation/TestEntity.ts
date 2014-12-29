var NAME_REQUIRED = "Name is required.";

class TestEntity extends Fayde.MVVM.ObservableObject implements Fayde.Data.IDataErrorInfo {
    Error: string = null;

    private _Errors = new Map<string, string[]>();

    constructor () {
        super();
        this.Name = "";
    }

    GetError (propertyName: string): string {
        var all = this._Errors;
        if (!all.has(propertyName))
            return null;
        var errs = all.get(propertyName);
        if (errs)
            return errs.join("\n");
        return null;
    }

    AddError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            all.set(propertyName, []);
        var errs = all.get(propertyName);
        errs.push(error);
    }

    RemoveError (propertyName: string, error: string) {
        var all = this._Errors;
        if (!all.has(propertyName))
            return;
        var errs = all.get(propertyName);
        var index = errs.indexOf(error);
        if (index < 0)
            return;
        errs.splice(index, 1);
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
        (!value) ? this.AddError("Name", NAME_REQUIRED) : this.RemoveError("Name", NAME_REQUIRED);
        this._Name = value;
        this.OnPropertyChanged("Name");
    }
}
Fayde.Data.IDataErrorInfo_.mark(TestEntity);
export = TestEntity;