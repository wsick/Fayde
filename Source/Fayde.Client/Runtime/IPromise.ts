interface IPromise<T> {
    success(callback: (result: T) => void): IPromise<T>;
    error(callback: (error: any) => void): IPromise<T>;
}
interface IDeferrable<T> {
    resolve: (result: T) => void;
    reject: (error: any) => void;
    promise: IPromise<T>;
}
function defer<T>(): IDeferrable<T> {
    var resolved = false;
    var errored = false;
    var resolvedobj: T = undefined;
    var errorobj: any = undefined;

    var s: (result: T) => void;
    var e: (error: any) => void;
    var p: IPromise<T> = {
        success: function (callback: (result: T) => void): IPromise<T> {
            s = callback;
            if (resolved) callback(resolvedobj);
            return this;
        },
        error: function (callback: (error: any) => void): IPromise<T> {
            e = callback;
            if (errored) callback(errorobj);
            return this;
        }
    };

    var d: IDeferrable<T> = {
        promise: p,
        resolve: function (result: T) {
            s && s(resolvedobj = result);
        },
        reject: function (error: any) {
            e && e(errorobj = error);
        }
    };
    return d;
}