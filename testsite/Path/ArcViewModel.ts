import SweepDirection = minerva.SweepDirection;

class ArcViewModel extends Fayde.MVVM.ObservableObject {
    IsLargeArc = true;
    IsClockwise = true;
    SPointX = 100.0;
    SPointY = 100.0;
    PointX = 200.0;
    PointY = 200.0;
    SizeX = 5.0;
    SizeY = 5.0;
    RotationAngle = 0.0;

    get SweepDirection (): SweepDirection { return this.IsClockwise ? SweepDirection.Clockwise : SweepDirection.Counterclockwise; }
    get SPoint (): Point { return new Point(this.SPointX, this.SPointY); }
    get Point (): Point { return new Point(this.PointX, this.PointY); }
    get Size (): Size { return new Size(this.SizeX, this.SizeY); }

    OnPropertyChanged (propertyName: string) {
        super.OnPropertyChanged(propertyName);
        switch (propertyName) {
            case "IsClockwise":
                this.OnPropertyChanged("SweepDirection");
                break;
            case "SPointX":
            case "SPointY":
                this.OnPropertyChanged("SPoint");
                break;
            case "PointX":
            case "PointY":
                this.OnPropertyChanged("Point");
                break;
            case "SizeX":
            case "SizeY":
                this.OnPropertyChanged("Size");
                break;
        }
    }
}
Fayde.MVVM.NotifyProperties(ArcViewModel, ["IsClockwise", "SPointX", "SPointY", "PointX", "PointY", "SizeX", "SizeY", "RotationAngle"]);
export = ArcViewModel;