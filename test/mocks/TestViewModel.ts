class TestViewModel extends Fayde.MVVM.ViewModelBase {
    TeamId: number;

    constructor(teamId: number) {
        super();
        this.TeamId = teamId;
    }
}
export = TestViewModel;