module perf {
    export function GetTime (type: MarkerTypes, phase?: Phases): number {
        return GetMarkers()
            .filter(m => m.type === type)
            .filter(m => phase == null || m.phase === phase)
            .reduce((agg, m) => agg + (m.duration || 0), 0);
    }
}