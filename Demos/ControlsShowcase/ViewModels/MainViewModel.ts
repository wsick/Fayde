/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    States: { Name: string }[] = [];
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
    constructor() {
        super();
        this.States.push({ Name: "Florida" });
        this.States.push({ Name: "Georgia" });
        this.States.push({ Name: "South Carolina" });
        this.States.push({ Name: "Alabama" });
        this.States.push({ Name: "Tennessee" });
    }
}
export = MainViewModel;