import TestViewModel = require("../mocks/TestViewModel");

class TestViewModelProvider implements Fayde.MVVM.IViewModelProvider {
    ResolveViewModel(route: Fayde.Navigation.Route) {
        switch(route.View.toString()) {
            case "/Views/FantasyTeam.fayde":
                return new TestViewModel(+route.HashParams["id"]);
                break;
        }
    }
}
export = TestViewModelProvider;