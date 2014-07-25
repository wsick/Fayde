class TestObservable extends Fayde.MVVM.ObservableObject {
    Member1: number = 0;
    Member2: string = "";
} 
Fayde.MVVM.NotifyProperties(TestObservable, ["Member1", "Member2"]);
export = TestObservable;