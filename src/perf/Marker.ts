module perf {
    export enum MarkerTypes {
        LoadMarkup = 0,
    }
    export interface IMarker {
        type: MarkerTypes;
        context: any;
        phase: Phases;
        begin: number;
        duration: number;
    }

    var markers: IMarker[] = [];
    var real = {
        active: <IMarker[]>[],
        start (type: MarkerTypes, context: any, phase: Phases) {
            var marker = <IMarker>{
                type: type,
                context: context,
                phase: phase,
                begin: performance.now(),
                duration: NaN
            };
            markers.push(marker);
            this.active.push(marker);
        },
        end () {
            var marker = <IMarker>this.active.shift();
            marker.duration = performance.now() - marker.begin;
        }
    };
    var fake = {
        start (type: MarkerTypes, context: any, phase: Phases) {
        },
        end () {
        }
    };
    var active = perf.IsEnabled ? real : fake;

    export function SetEnableMarkers (value: boolean) {
        active = !value ? fake : real;
        if (!value)
            real.active.length = 0;
    }

    export function Mark (type: MarkerTypes, context: any) {
        return active.start(type, context, perf.Phase);
    }

    export function MarkEnd () {
        return active.end();
    }

    export function GetMarkers (): IMarker[] {
        return markers.slice(0);
    }
}