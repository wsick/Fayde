module Fayde.MVVM {
    export interface INotifyEntity extends INotifyPropertyChanged, Data.INotifyDataErrorInfo {
    }

    export class NotifyEntity implements INotifyEntity {
        PropertyChanged = new nullstone.Event<PropertyChangedEventArgs>();

        OnPropertyChanged (propertyName: string) {
            this.PropertyChanged.raise(this, new PropertyChangedEventArgs(propertyName));
        }

        private _Errors: any = {};

        ErrorsChanged = new nullstone.Event<Data.DataErrorsChangedEventArgs>();

        get HasErrors (): boolean {
            return Object.keys(this._Errors).length > 0;
        }

        AddError (propertyName: string, errorMessage: string) {
            var errs = this._Errors[propertyName];
            if (!errs) {
                this._Errors[propertyName] = [errorMessage];
            } else {
                errs.push(errorMessage);
            }
            this.ErrorsChanged.raise(this, new Data.DataErrorsChangedEventArgs(propertyName));
        }

        RemoveError (propertyName: string, errorMessage: string) {
            var errs = this._Errors[propertyName];
            if (!errs)
                return;
            var index = errs.indexOf(errorMessage);
            if (index >= 0)
                errs.splice(index, 1);
            if (errs.length < 1)
                delete this._Errors[propertyName];
            this.ErrorsChanged.raise(this, new Data.DataErrorsChangedEventArgs(propertyName));
        }

        ClearErrors (propertyName: string) {
            var errs = this._Errors[propertyName];
            if (!errs)
                return;
            delete this._Errors[propertyName];
            this.ErrorsChanged.raise(this, new Data.DataErrorsChangedEventArgs(propertyName));
        }

        GetErrors (propertyName: string): nullstone.IEnumerable<string> {
            var errs = this._Errors[propertyName];
            if (!errs)
                return null;
            return nullstone.IEnumerable_.fromArray(errs);
        }

        static applyTo<TIn, TOut extends INotifyEntity>(model: TIn): TOut {
            // TODO: Apply
            // Mark interface on model
            return <TOut><any>model;
        }
    }
    Data.INotifyDataErrorInfo_.mark(NotifyEntity);
}