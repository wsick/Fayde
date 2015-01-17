/// <reference path="../_" />

interface Console {
    table(data: any[]);
}

module perf {
    export module Timings {
        export function Table () {
            var records: TimingRecord[][] = enumValues(perf.MarkerTypes)
                .map(mk => {
                    return enumValues(perf.Phases)
                        .map(pk => new TimingRecord(mk, pk))
                        .concat([new TimingRecord(mk, null)]);
                });

            //Totals Record
            var totals = enumValues(perf.Phases)
                .map(pk => new TimingRecord(null, pk))
                .concat([new TimingRecord(null, null)]);

            var data = records
                .concat([totals])
                .map(rec => {
                    var mk = rec[0].type;
                    var obj = {"(marker)": (mk != null ? perf.MarkerTypes[mk] : "Total")};
                    rec.filter(tr => !isNaN(tr.percentage))
                        .forEach(tr => tr.mapOnto(obj));
                    return obj;
                });

            console.table(data);
        }

        function enumValues (enumObject: any) {
            return Object.keys(enumObject)
                .map(mk => parseInt(mk))
                .filter(mk => !isNaN(mk));
        }

        class TimingRecord {
            total: number;
            percentage: number;

            constructor (public type: perf.MarkerTypes, public phase: perf.Phases) {
                this.total = Total(this.type, this.phase);
                this.percentage = this.total / Total(null, this.phase) * 100;
            }

            mapOnto (obj: any) {
                var phaseName = perf.Phases[this.phase] || "[Total]";
                obj[phaseName + '(ms)'] = round(this.total, 2);
                obj[phaseName + '(%)'] = round(this.percentage, 2);
            }
        }

        function round (num: number, digits: number): number {
            var factor = Math.pow(10, digits);
            return Math.round(num * factor) / factor;
        }
    }
}