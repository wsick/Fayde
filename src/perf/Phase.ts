module perf {
    export enum Phases {
        Starting = 0,
        ResolveConfig = 1,
        ResolveApp = 2,
        ResolveTheme = 3,
        StartApp = 4,
        Loaded = 5
    }

    export var Phase;
    var phase: perf.Phases = Phases.Starting;
    Object.defineProperty(perf, "Phase", {
        get () {
            return phase;
        }
    });

    export function StartPhase (value: Phases) {
        impl.startPhase(phase = value);
    }

    export interface IPhaseTiming {
        phase: Phases;
        initial: number;
        duration: number;
    }
    module impl {
        export var phaseTimings: IPhaseTiming[] = [];
        var activePhaseTiming: IPhaseTiming;

        export function startPhase (phase: Phases) {
            endActivePhase();
            if (phase == null)
                return;
            activePhaseTiming = {
                phase: phase,
                initial: performance.now(),
                duration: NaN
            };
            phaseTimings.push(activePhaseTiming);
        }

        function endActivePhase () {
            if (!activePhaseTiming)
                return;
            activePhaseTiming.duration = performance.now() - activePhaseTiming.initial;
            activePhaseTiming = null;
        }
    }

    export function GetPhaseTimings (): IPhaseTiming[] {
        return impl.phaseTimings.slice(0);
    }
}
