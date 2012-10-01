using System;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Fayde.Website
{
    public partial class gettingstarted : System.Web.UI.Page
    {
        private readonly string DEFAULT_FAP_XAML = 
@"<FaydeApplication
    xmlns=""WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Elements""
    xmlns:x=""WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Core""
    ScriptResolution=""scripts/"">
    <FaydeApplication.UriMappings>
        <UriMapping Uri="""" MappedUri=""/Views/home.fayde"" />
        <UriMapping Uri=""/{pageName}"" MappedUri=""/Views/{pageName}.fayde"" />
    </FaydeApplication.UriMappings>
    <FaydeApplication.Resources>
    </FaydeApplication.Resources>
    <Grid x:Name=""LayoutRoot"">
        <Frame x:Name=""ContentFrame"" />
    </Grid>
</FaydeApplication>";

        private readonly string HOME_XAML = 
@"<Page xmlns=""WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Elements""
      xmlns:x=""WickedSick.Server.XamlParser;WickedSick.Server.XamlParser.Core""
      Title=""Home"">
    <StackPanel>
        <TextBlock Text=""Hello World!"" />
    </StackPanel>
</Page>";

        protected void Page_Load(object sender, EventArgs e)
        {
            ltrlDefaultFapXaml.Text = Server.HtmlEncode(DEFAULT_FAP_XAML);
            ltrlHomeXaml.Text = Server.HtmlEncode(HOME_XAML);
        }
    }
}