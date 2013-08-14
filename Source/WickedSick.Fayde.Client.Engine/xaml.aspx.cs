using System;
using System.IO;
using Fayde.Xaml;

namespace WickedSick.Fayde.Client.Engine
{
    public partial class xaml : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            var styleFiles = Directory.EnumerateFiles(Request.MapPath("Themes"), "*.xml");
            faydeFiles.DataSource = styleFiles;
            faydeFiles.DataBind();
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_Click(object sender, EventArgs e)
        {
            var startTime = DateTime.Now;
            var parser = new XamlParser(GetType().Assembly);
            var result = parser.ParseXml(tb1.Text);
            var parseTime = DateTime.Now - startTime;
            startTime = DateTime.Now;
            var outputMods = new JsonOutputModifiers { IsNamespaceIncluded = !cacheNamespaces.Checked };
            var json = result.RootObject.ToJson(0, outputMods);
            var typeDeclarations = string.Empty;
            if (!outputMods.IsNamespaceIncluded)
                typeDeclarations = outputMods.SerializeLocalDeclarations();
            var serializeTime = DateTime.Now - startTime;
            tb2.Text = typeDeclarations + Environment.NewLine + "var json = " + json + ";";
            lblParseTime.Text = string.Format("Parse Time: {0} ms", parseTime.TotalMilliseconds);
            lblSerializeTime.Text = string.Format("Serialize Time: {0} ms", serializeTime.TotalMilliseconds);
        }

        protected void selectedFile_Click(object sender, EventArgs e)
        {
            tb2.Text = "";
            using (var sr = new StreamReader(File.Open(faydeFiles.SelectedValue, FileMode.Open, FileAccess.Read)))
            {
                tb1.Text = sr.ReadToEnd();
            }
        }
    }
}