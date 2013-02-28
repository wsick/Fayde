using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements.Controls;
using WickedSick.Server.XamlParser.Elements.Types;

namespace Fayde.Demos.MarchMadnessDemo
{
    public class Bracket : UserControl
    {
        public static readonly PropertyDescription RoundNumberProperty = PropertyDescription.Register("RoundNumber", typeof(int), typeof(Bracket));
        public static readonly PropertyDescription BracketBorderThicknessProperty = PropertyDescription.Register("BracketBorderThickness", typeof(Thickness), typeof(Bracket));
        public static readonly PropertyDescription InitialMarginProperty = PropertyDescription.Register("InitialMargin", typeof(double), typeof(Bracket));
        public static readonly PropertyDescription DirectionProperty = PropertyDescription.Register("Direction", typeof(BracketDirection), typeof(Bracket));

        public Bracket()
        {
            SetResources("Fayde.Demos.MarchMadnessDemo.Bracket.fayde", "Fayde.Demos.MarchMadnessDemo.Bracket.fayde.js");
        }
    }

    public enum BracketDirection
    {
        Right,
        Left,
        Center,
    }
}