module Fayde.Runtime {
    export interface ILoadAsyncable {
        LoadAsync(onLoaded: (state: any) => void);
    }

    export function LoadBatchAsync(loaders: ILoadAsyncable[], onLoaded: () => void) {
        var loadedcount = 0;
        var count = loaders.length;
        if (count === 0)
            return onLoaded();
        for (var i = 0; i < count; i++) {
            loaders[i].LoadAsync((state) => {
                loadedcount++;
                if (loadedcount >= count)
                    onLoaded();
            });
        }
    }
}