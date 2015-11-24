module Fyade.Controls {
    import Input = Fayde.Input;
    import Control = Fayde.Controls.Control;
    import Media = Fayde.Media;
    import DependencyObject = Fayde.DependencyObject;
    import MediaElement = Fayde.Controls.MediaElement;
    import Uri = Fayde.Uri;
    import Enum = Fayde.Enum;
    import Button = Fayde.Controls.Button;
    import ProgressBar = Fayde.Controls.ProgressBar;
    import DpReaction = Fayde.DPReaction;

    export class Video extends Control {
        private Media: MediaElement;
        private PlayButton: Button;
        private PauseButton: Button;
        private PlayProgress: ProgressBar;
        private BufferProgress: ProgressBar;

        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Videos.VideoSource(new Uri(value));
            if (value instanceof Uri)
                return new Media.Videos.VideoSource(value);
            return value;
        }

        static SourceProperty = DependencyProperty.RegisterFull("Source", () => Media.Videos.VideoSource, Video, undefined, undefined, Video._SourceCoercer);
        static StretchProperty = DependencyProperty.RegisterCore("Stretch", () => new Enum(Media.Stretch), Video, Media.Stretch.Uniform);
        Source: Media.Videos.VideoSource;
        Stretch: Media.Stretch;

        constructor() {
            super();
            this.DefaultStyleKey = Video;
        }
        
        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.Media = <MediaElement>this.GetTemplateChild("PARTVideo", MediaElement);
            this.PlayButton = <Button>this.GetTemplateChild("PARTPlayButton", Button);
            this.PauseButton = <Button>this.GetTemplateChild("PARTPauseButton", Button);
            this.PlayProgress = <ProgressBar>this.GetTemplateChild("PARTPlayProgress", ProgressBar);
            this.BufferProgress = <ProgressBar>this.GetTemplateChild("PARTBufferProgress", ProgressBar);

            if (this.PlayButton)
                this.PlayButton.Command = new Fayde.MVVM.RelayCommand(par => this.PlayClicked(par));
            if (this.PauseButton)
                this.PauseButton.Command = new Fayde.MVVM.RelayCommand(par => this.PauseClicked(par));
        }

        OnMouseEnter(e: Input.MouseEventArgs) {
            super.OnMouseEnter(e);
            this.UpdateVisualState();
        }

        OnMouseLeave(e: Input.MouseEventArgs) {
            super.OnMouseLeave(e);
            this.UpdateVisualState();
        }

        PlayClicked(par: any) {
            this.Media.Play();
        }

        PauseClicked(par: any) {
            this.Media.Pause();
        }

        SetSource(value: any) {
            this.Source = value;
        }
    }

    Fayde.CoreLibrary.add(Video);

    Fayde.Controls.TemplateVisualStates(Video,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Disabled" });

    Fayde.Controls.TemplateParts(Video,
        { Name: "PARTMedia", Type: MediaElement },
        { Name: "PARTPlayButton", Type: Button },
        { Name: "PARTPauseButton", Type: Button },
        { Name: "PARTPlayProgress", Type: ProgressBar },
        { Name: "PARTBufferProgress", Type: ProgressBar });

    DpReaction<Media.Videos.VideoSource>(Video.SourceProperty, (vid: Video, ov, nv) => {
        vid.SetSource(nv);
    }, false);

    DpReaction<minerva.Stretch>(Video.StretchProperty, (vid: Video, ov, nv) => {
        vid.Stretch = nv;
    }, false);
}