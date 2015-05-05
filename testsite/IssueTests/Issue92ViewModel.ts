class Issue92ViewModel extends Fayde.MVVM.ViewModelBase {
    constructor() {
        super();
    }

    Loaded(e: Fayde.IEventBindingArgs<nullstone.IEventArgs>) {
        // ------------- Test 1 --------------
        // Setting colors using #ff000000 or name notation fails
        this.SetProperty("tb0", "Text", "Setting brush using #ff000000 notation fails.  See the javascript console");
        this.SetProperty("tb0", "Foreground", "#ffff0000");
        this.SetProperty("border0", "Background", "#fff0f0ff");
        this.SetProperty("border0", "Background", "Green");
        this.SetProperty("border0", "Background", Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Wheat));
        this.SetProperty("tb0", "Foreground", Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Blue));

        // ------------- Test 2 --------------
        // Setting the width of the border to zero causes a busy loop or a render failure.
        // If Height or Width is set to zero, the Border appears not to clip.
        this.SetProperty("tb1", "Text", "Setting the padding, margin and width to zero causes a busy loop or a render failure.\nUncomment Padding, Margin, Height and Width setting in MainViewModel.ts to see this.\nAlso, Border is not clipping its child when width or height is zero.\nTry uncommenting different blocks of code in MainViewModel.ts");
        // Uncomment the following four lines to see a render failure
        //this.SetProperty("border1", "Padding", "0,0,0,0");
        //this.SetProperty("border1", "Margin", "0,0,0,0");
        //this.SetProperty("border1", "Width", 0);
        //this.SetProperty("border1", "Height", 0);

        // Or uncomment the next two lines to generate a busy loop.
        //this.SetProperty("tb1", "TextWrapping", true);
        //this.SetProperty("border1", "Width", 0);

        // Or uncomment the next line to see a border clipping failure
        //this.SetProperty("border1", "Width", 0);

        // ------------- Test 3 --------------
        // Setting the BorderThickness or CornerRadius causes the Background to be ignored
        this.SetProperty("tb2", "Text", "Setting BorderThickness or CornerRadius causes background to be ignored. Background here should be Green.\nComment settings for BorderThickness and CornerRadius to see Green.");
        this.SetProperty("border2", "Background", Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.LightGreen));
        this.SetProperty("border2", "BorderThickness", "0,0,0,0");
        this.SetProperty("border2", "CornerRadius", "0,0,0,0");
    }

    SetProperty(elementName: string, propertyName: string, value : any) {
        try {
            var root = Fayde.Application.Current;
            var element = <Fayde.FrameworkElement>root.FindName(elementName);
            console.log ("Setting " + elementName + "." + propertyName + " = " + value);
            var propd = DependencyProperty.GetDependencyProperty(element.constructor, propertyName);
            element.SetValue(propd, nullstone.convertAnyToType(value, <any>propd.GetTargetType()));
            //element[propertyName] = value;
        } catch (e) {
            console.log ("Failed to set " + elementName + "." + propertyName + ": " + e);
        }
    }

}
export = Issue92ViewModel;