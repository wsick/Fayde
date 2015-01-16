module Fayde.Timing {
    export enum Phases {
        Starting = 0,
        ResolveConfig = 1,
        ResolveApp = 2,
        ResolveTheme = 3,
        StartApp = 4,
        Loaded = 5
    }

    export enum MarkerTypes {
        LoadMarkup = 0,
    }

    export var Phase = Phases.Starting;
}