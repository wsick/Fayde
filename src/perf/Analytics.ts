/// <reference path="_" />

module perf {
    export module Timings {
        export function Get (type?: MarkerTypes, phase?: Phases) {
            return Timings.Markers
                .filter(m => type == null || m.type === type)
                .filter(m => phase == null || m.phase === phase);
        }

        export function Total (type: MarkerTypes, phase?: Phases): number {
            return Get(type, phase)
                .reduce((agg, m) => agg + (m.duration || 0), 0);
        }
    }
}