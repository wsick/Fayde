class ImageSetSourceViewModel extends Fayde.MVVM.ViewModelBase {
    SomeBuffer: ArrayBuffer = null;

    constructor () {
        super();
        this.Load();
    }

    Load () {
        var req = new XMLHttpRequest();
        req.overrideMimeType('text/plain; charset=x-user-defined');
        req.open('GET', 'Images/testing.jpg', true);
        req.responseType = 'arraybuffer';
        req.onload = () => this.SomeBuffer = req.response;
        req.send(null);
    }
}
Fayde.MVVM.NotifyProperties(ImageSetSourceViewModel, ["SomeBuffer"]);
export = ImageSetSourceViewModel;