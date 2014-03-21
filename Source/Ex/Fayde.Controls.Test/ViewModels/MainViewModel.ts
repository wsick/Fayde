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
}
export = MainViewModel; 