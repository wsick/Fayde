using System.ComponentModel;
using System.Windows;
using System.Windows.Media;

namespace LitmusTests.Tests
{
    public class ArcViewModel : INotifyPropertyChanged
    {
        public SweepDirection SweepDirection { get { return IsClockwise ? SweepDirection.Clockwise : SweepDirection.Counterclockwise; } }
        public Point SPoint { get { return new Point(SPointX, SPointY); } }
        public Point Point { get { return new Point(PointX, PointY); } }
        public Size Size { get { return new Size(SizeX, SizeY); } }

        private bool _IsLargeArc = true;
        public bool IsLargeArc
        {
            get { return _IsLargeArc; }
            set
            {
                _IsLargeArc = value;
                OnPropertyChanged("IsLargeArc");
            }
        }

        private bool _IsClockwise = true;
        public bool IsClockwise
        {
            get { return _IsClockwise; }
            set
            {
                _IsClockwise = value;
                OnPropertyChanged("IsClockwise");
                OnPropertyChanged("SweepDirection");
            }
        }

        private double _SPointX = 100.0;
        public double SPointX
        {
            get { return _SPointX; }
            set
            {
                _SPointX = value;
                OnPropertyChanged("SPointX");
                OnPropertyChanged("SPoint");
            }
        }

        private double _SPointY = 100.0;
        public double SPointY
        {
            get { return _SPointY; }
            set
            {
                _SPointY = value;
                OnPropertyChanged("SPointY");
                OnPropertyChanged("SPoint");
            }
        }

        private double _PointX = 200.0;
        public double PointX
        {
            get { return _PointX; }
            set
            {
                _PointX = value;
                OnPropertyChanged("PointX");
                OnPropertyChanged("Point");
            }
        }

        private double _PointY = 200.0;
        public double PointY
        {
            get { return _PointY; }
            set
            {
                _PointY = value;
                OnPropertyChanged("PointY");
                OnPropertyChanged("Point");
            }
        }

        private double _SizeX = 5.0;
        public double SizeX
        {
            get { return _SizeX; }
            set
            {
                _SizeX = value;
                OnPropertyChanged("SizeX");
                OnPropertyChanged("Size");
            }
        }

        private double _SizeY = 5.0;
        public double SizeY
        {
            get { return _SizeY; }
            set
            {
                _SizeY = value;
                OnPropertyChanged("SizeY");
                OnPropertyChanged("Size");
            }
        }

        private double _RotationAngle = 0.0;
        public double RotationAngle
        {
            get { return _RotationAngle; }
            set
            {
                _RotationAngle = value;
                OnPropertyChanged("RotationAngle");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string propertyName)
        {
            var obj = PropertyChanged;
            if (obj != null)
                obj(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}