class TabIssueViewModel extends Fayde.MVVM.ViewModelBase {
    UserName: string = "";
    Password: string = "";

    constructor () {
        super();
    }
}
Fayde.MVVM.AutoModel(TabIssueViewModel)
    .Notify("UserName", "PasswordText")
    .Validate("PasswordText", (value, prop, ent) => {
        if (!value || value.Length <= 7)
            return ["Enter a valid password"];
        return null;
    })
    .Validate("UserName", (value, prop, ent) => {
        if (!value || value.indexOf("@") <= 1)
            return ["Enter a valid username"];

        return null;
    })
    .Finish();

export = TabIssueViewModel;