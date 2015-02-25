import PathSegment = Fayde.Media.PathSegment;
import LineSegment = Fayde.Media.LineSegment;

function randomInt(low: number, high: number): number {
    return (Math.random() * (high - low)) + low;
}

class PathBoundViewModel extends Fayde.MVVM.ViewModelBase {
    Segments = new Fayde.Collections.ObservableCollection<PathSegment>();

    AddSegment () {
        var segment = new LineSegment();
        var width = 500;
        var height = 500;
        segment.Point = new Point(randomInt(0, width), randomInt(0, height));
        this.Segments.Add(segment);
    }
}
export = PathBoundViewModel;