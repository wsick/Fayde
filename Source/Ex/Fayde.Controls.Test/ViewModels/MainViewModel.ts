/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {

    States: { Name: string }[] = [
        { Name: "Florida" },
        { Name: "Georgia" },
        { Name: "South Carolina" },
        { Name: "Alabama" },
        { Name: "Tennessee" },
    ];
    TreeData = [{
        Name: "Root",
        Children: [
            {
                Name: "Level 2 - 1",
                Children: [
                    { Name: "Level 3 - 1" },
                    { Name: "Level 3 - 2" }
                ]
            }
        ]
    }];

    private _list: Fayde.Collections.ObservableCollection<string> = new Fayde.Collections.ObservableCollection<string>();
    get List() {
        return this._list;
    }

    constructor() {
        super();
        for (var i = 0; i < 200; i++)
            this._list.Add("Test Item " + i);
    }
   
}
export = MainViewModel; 