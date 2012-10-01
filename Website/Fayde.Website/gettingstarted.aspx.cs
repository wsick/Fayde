using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Linq;

namespace Fayde.Website
{
    public partial class gettingstarted : System.Web.UI.Page
    {
        private readonly List<string> DEFAULT_FAP_XAMLS = new List<string>{
            "<FaydeApplication",
            "\txmlns=\"WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Elements\"",
            "\txmlns:x=\"WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Core\"",
            "\tScriptResolution=\"scripts/\">",
            "\t<FaydeApplication.UriMappings>",
            "\t\t<UriMapping Uri=\"\" MappedUri=\"/Views/home.fayde\" />",
            "\t</FaydeApplication.UriMappings>",
            "\t<FaydeApplication.Resources>",
            "\t</FaydeApplication.Resources>",
            "\t<Grid x:Name=\"LayoutRoot\">",
            "\t\t<Frame x:Name=\"ContentFrame\" />",
            "\t</Grid>",
            "</FaydeApplication>",
        };

        private readonly List<string> HOME_XAMLS = new List<string>{
            "<Page xmlns=\"WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Elements\"",
            "\txmlns:x=\"WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Core\"",
            "\tTitle=\"Home\">",
            "\t<StackPanel>",
            "\t\t<TextBlock Text=\"Hello World!\" />",
            "\t</StackPanel>",
            "</Page>",
        };

        protected void Page_Load(object sender, EventArgs e)
        {
            ltrlDefaultFapXaml.Text = string.Join("<br />", DEFAULT_FAP_XAMLS.Select(x => Server.HtmlEncode(x).Replace("\t", "&nbsp;&nbsp;&nbsp;")));
            ltrlHomeXaml.Text = string.Join("<br />", HOME_XAMLS.Select(x => Server.HtmlEncode(x).Replace("\t", "&nbsp;&nbsp;&nbsp;")));
        }
    }
}