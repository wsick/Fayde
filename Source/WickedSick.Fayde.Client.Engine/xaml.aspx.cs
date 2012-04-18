using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WickedSick.Server.XamlParser;
using System.Xml;
using WickedSick.Server.XamlParser.Elements;

namespace WickedSick.Fayde.Client.Engine
{
    public partial class xaml : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void submit_Click(object sender, EventArgs e)
        {
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(tb1.Text);
            DependencyObject d = (DependencyObject)Parser.ParseXmlNode(doc.DocumentElement, null);
            tb2.Text = d.toJson(0);
        }
    }
}