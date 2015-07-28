class ImageSetSourceViewModel extends Fayde.MVVM.ViewModelBase {
    SomeBuffer: ArrayBuffer = null;
    AnotherBuffer: ArrayBuffer = null;

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

        var req2 = new XMLHttpRequest();
        req2.overrideMimeType('text/plain; charset=x-user-defined');
        req2.open('GET', 'Images/twitter.png', true);
        req2.responseType = 'arraybuffer';
        req2.onload = () => this.AnotherBuffer = req2.response;
        req2.send(null);
    }
}
Fayde.MVVM.NotifyProperties(ImageSetSourceViewModel, ["SomeBuffer", "AnotherBuffer"]);
export = ImageSetSourceViewModel;