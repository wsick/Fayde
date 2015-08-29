class MediaControlViewModel extends Fayde.MVVM.ViewModelBase {

    Play: Fayde.MVVM.RelayCommand;
    Pause: Fayde.MVVM.RelayCommand;

    constructor() {
        super();

        this.Play = new Fayde.MVVM.RelayCommand(par => this.PlayVideo(par));
        this.Pause = new Fayde.MVVM.RelayCommand(par => this.PauseVideo(par));
    }

    PlayVideo(par: any) {
        var vid = <Fayde.Controls.MediaElement>par;
        vid.Play();
    }

    PauseVideo(par: any) {
        var vid = <Fayde.Controls.MediaElement>par;
        vid.Pause();
    }
}

Fayde.MVVM.AutoModel(MediaControlViewModel)
    .Notify("Play", "Pause")
    .Finish();

export = MediaControlViewModel;