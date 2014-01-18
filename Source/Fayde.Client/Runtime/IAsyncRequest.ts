interface IAsyncRequest<T> {
    success(callback: (result: T) => void): IAsyncRequest<T>;
    error(callback: (error: any) => void): IAsyncRequest<T>;
}
interface IDeferrable<T> {
    resolve: (result: T) => void;
    reject: (error: any) => void;
    request: IAsyncRequest<T>;
}
function defer<T>(): IDeferrable<T> {
    var resolved = false;
    var errored = false;
    var resolvedobj: T = undefined;
    var errorobj: any = undefined;

    var s: (result: T) => void;
    var e: (error: any) => void;
    var c: () => void;
    var p: IAsyncRequest<T> = {
        success: function (callback: (result: T) => void): IAsyncRequest<T> {
            s = callback;
            if (resolved) callback(resolvedobj);
            return this;
        },
        error: function (callback: (error: any) => void): IAsyncRequest<T> {
            e = callback;
            if (errored) callback(errorobj);
            return this;
        }
    };

    var d: IDeferrable<T> = {
        request: p,
        resolve: function (result: T) {
            resolved = true;
            s && s(resolvedobj = result);
        },
        reject: function (error: any) {
            errored = true;
            e && e(errorobj = error);
        }
    };
    return d;
}