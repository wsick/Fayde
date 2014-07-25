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
            resolvedobj = result;
            s && s(result);
        },
        reject: function (error: any) {
            errored = true;
            errorobj = error;
            e && e(error);
        }
    };
    return d;
}
function deferArraySimple(arr: IAsyncRequest<any>[]): IAsyncRequest<any> {
    var d = defer<any[]>();

    var os: any[] = [];
    var errors: any[] = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        arr[i].success(tryFinish)
            .error(error => {
                errors.push(error);
                tryFinish(null);
            });
    }

    function tryFinish(o: any) {
        os.push(o);
        if (os.length === arr.length) {
            if (errors.length > 0)
                return d.reject(errors);
            d.resolve(os);
        }
    }

    return d.request;
}
function deferArray<S, T>(arr: S[], resolver: (s: S) => IAsyncRequest<T>): IAsyncRequest<T[]> {
    var d = defer<T[]>();

    var ts: T[] = [];
    var errors: any[] = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        resolver(arr[i])
            .success(tryFinish)
            .error(error => {
                errors.push(error);
                tryFinish(null);
            });
    }

    function tryFinish(t: T) {
        ts.push(t);
        if (ts.length === arr.length) {
            if (errors.length > 0)
                return d.reject(errors);
            d.resolve(ts);
        }
    }

    return d.request;
}