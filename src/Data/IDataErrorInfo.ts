module Fayde.Data {
    export interface IDataErrorInfo {
        Error: string;
        getError(propertyName: string): string;
    }
    export var IDataErrorInfo_ = new nullstone.Interface<IDataErrorInfo>("IDataErrorInfo");
}