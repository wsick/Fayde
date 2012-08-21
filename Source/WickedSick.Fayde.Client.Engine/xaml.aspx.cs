using System;
using System.IO;
using System.Linq;
using System.Xml;
using WickedSick.Server.XamlParser;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Fayde.Client.Engine
{
    public partial class xaml : System.Web.UI.Page
    {
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            var styleFiles = Directory.EnumerateFiles(Request.MapPath("Styles"), "*.xml");
            faydeFiles.DataSource = styleFiles;
            faydeFiles.DataBind();
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_Click(object sender, EventArgs e)
        {
            var dobj = Parser.ParseXml(tb1.Text);
            tb2.Text = dobj.ToJson(0);
        }

        protected void selectedFile_Click(object sender, EventArgs e)
        {
            tb2.Text = "";
            StreamReader sr = new StreamReader(File.Open(faydeFiles.SelectedValue, FileMode.Open, FileAccess.Read));
            tb1.Text = sr.ReadToEnd();
            sr.Close();
        }
    }
}