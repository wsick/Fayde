interface ITestImpl {
    run(runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any);
}
export = ITestImpl;