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
            var testFiles = Directory.EnumerateFiles(Request.MapPath("Tests"), "*.fayde");
            faydeFiles.DataSource = styleFiles.Concat(testFiles);
            faydeFiles.DataBind();
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_Click(object sender, EventArgs e)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(tb1.Text);
            DependencyObject d = (DependencyObject)Parser.ParseXmlNode(doc.DocumentElement, null);
            tb2.Text = d.ToJson(0);
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