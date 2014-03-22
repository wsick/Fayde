/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    Items = [
        {
            FirstName: "First",
            LastName: "Last"
        },
        {
            FirstName: "First",
            LastName: "Last"
        },
        {
            FirstName: "First",
            LastName: "Last"
        },
        {
            FirstName: "First",
            LastName: "Last"
        }
    ];
}
export = MainViewModel;