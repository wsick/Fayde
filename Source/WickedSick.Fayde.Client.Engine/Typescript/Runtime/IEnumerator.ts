module Fayde {
    export interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
}