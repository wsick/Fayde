var NAME_REQUIRED = "Name is required.";

class ExcTestEntity extends Fayde.MVVM.ObservableObject {
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
        if (!value)
            throw new Exception(NAME_REQUIRED);
        this._Name = value;
        this.OnPropertyChanged("Name");
    }
}
export = ExcTestEntity;