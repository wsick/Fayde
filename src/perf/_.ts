module perf {
    export var timing: boolean;

    var isEnabled = perf.timing === true;
    delete perf.timing;
    export var IsEnabled: boolean;
    Object.defineProperties(perf, {
        "IsEnabled": {
            get (): boolean {
                return isEnabled;
            },
            set (value: boolean) {
                if (isEnabled === value)
                    return;
                isEnabled = value;
                SetEnableMarkers(value);
            }
        }
    });
}