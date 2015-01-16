module Fayde.Timing {
    export interface IMarker {
        isStart: boolean;
        type: MarkerTypes;
        context: any;
        phase: Phases;
    }

    var markers: IMarker[] = [];
    var real = {
        active: <IMarker[]>[],
        start (type: MarkerTypes, context: any, phase: Phases) {
            var marker = <IMarker>{
                isStart: true,
                type: type,
                context: context,
                phase: phase
            };
            markers.push(marker);
            this.active.push(marker);
        },
        end (phase: Phases) {
            var begin = <IMarker>this.active.shift();
            var marker = <IMarker>{
                isStart: false,
                type: begin.type,
                context: begin.context,
                phase: phase
            };
            markers.push(marker);
        }
    };
    var fake = {
        start (type: MarkerTypes, context: any, phase: Phases) {
        },
        end (phase: Phases) {
        }
    };
    var active = fake;

    export function SetIsEnabled (value: boolean) {
        active = !value ? fake : real;
        if (!value)
            real.active.length = 0;
    }

    export function Start (type: MarkerTypes, context: any) {
        return active.start(type, context, Timing.Phase);
    }

    export function End () {
        return active.end(Timing.Phase);
    }

    export function GetMarkers (): IMarker[] {
        return markers.slice(0);
    }
}