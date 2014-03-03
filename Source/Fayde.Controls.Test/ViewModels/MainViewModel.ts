/// <reference path="../lib/Fayde/Fayde.d.ts" />

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    States: { Name: string }[] = [];
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