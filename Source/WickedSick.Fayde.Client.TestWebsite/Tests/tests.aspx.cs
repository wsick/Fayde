using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;

namespace WickedSick.Fayde.Client.TestWebsite.Tests
{
    public partial class tests : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
                BindData();
        }

        protected void BindData()
        {
            rptTests.DataSource = FindTests();
            rptTests.DataBind();
        }

        protected IEnumerable<object> FindTests()
        {
            var localDir = new DirectoryInfo(Server.MapPath("~/Tests/"));
            var files = localDir.GetFiles("*.fap", SearchOption.AllDirectories);
            var root = Server.MapPath("~");
            return files.Select(fi => new
                {
                    RelativeLink = fi.FullName.Replace(root, "~"),
                    Name = fi.FullName.Replace(localDir.FullName, ""),
                });
        }
    }
}