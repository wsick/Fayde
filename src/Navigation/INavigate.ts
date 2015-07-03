module Fayde.Navigation {
    export interface INavigate {
        Navigate(source: Uri): boolean;
    }
    export var INavigate_ = new nullstone.Interface<INavigate>("INavigate");
    INavigate_.is = (o: any): boolean => {
        return o && typeof o.Navigate === "function";
    };
}