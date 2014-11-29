import ITestImpl = require('../ITestImpl');

class StressTest implements ITestImpl {
    run (runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any) {
        if (!this.prepare(() => this.$$finishRun(runCount, onStatus, onOutput)))
            return this.$$finishRun(runCount, onStatus, onOutput);

    }

    private $$finishRun (runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any) {
        var all: number[] = [];

        //Pre-run
        for (var i = 0; i < 5; i++) {
            this.prepareIteration();
            this.runIteration();
        }

        console.profile();
        var start = new Date().getTime();
        for (var i = 0; i < runCount; i++) {
            var s = new Date().getTime();
            this.prepareIteration();
            this.runIteration();
            all.push(new Date().getTime() - s);
        }
        var total = new Date().getTime() - start;
        console.profileEnd();

        var min = all.reduce((agg, ms) => Math.min(agg, ms), Number.POSITIVE_INFINITY);
        var max = all.reduce((agg, ms) => Math.max(agg, ms), Number.NEGATIVE_INFINITY);
        var sum = all.reduce((agg, ms) => agg + ms, 0);
        var avg = total / runCount;
        var sd = calcStdDev(all, sum);

        var status = [
            "Iterations Complete: " + runCount.toString(),
            "Total Elapsed: " + createTimingString(total)
        ].join("<br />");
        onStatus(status);

        var output = [
            "Sum: " + createTimingString(sum),
            "Min: " + createTimingString(min),
            "Max: " + createTimingString(max),
            "Average: " + createTimingString(avg),
            "Std Dev: " + createTimingString(sd)
        ].join("<br />");
        onOutput(output);
    }

    prepare (ready?: () => any): boolean {
        return false;
    }

    prepareIteration () {

    }

    runIteration () {
    }
}

function createTimingString (ms: number): string {
    return ms.toString()
        + "ms ("
        + (ms / 1000).toFixed(1)
        + "s)";
}

function calcStdDev (all: number[], total: number): number {
    var avg = total / all.length;
    return Math.sqrt(all.reduce((agg, ms) => agg + Math.pow(ms - avg, 2), 0) / all.length);
}

export = StressTest;