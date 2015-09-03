class TextViewModel extends Fayde.MVVM.ViewModelBase {
    OnTextChanged(args: Fayde.IEventBindingArgs<Fayde.RoutedEventArgs>) {
        var tb = <Fayde.Controls.TextBox>args.sender;
        console.log("Text Changed", tb.Text);
    }
}
export = TextViewModel;