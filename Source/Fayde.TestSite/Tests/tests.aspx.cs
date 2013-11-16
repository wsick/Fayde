using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;

namespace Fayde.TestSite.Tests
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
            var files = localDir.GetFiles("*.*", SearchOption.AllDirectories);
            var root = Server.MapPath("~");
            root += "\\Tests\\";
            return files
                .Where(fi => fi.Extension == ".fap" || fi.Extension == ".html")
                .Select(fi => new
                {
                    RelativeLink = GetRelativeLink(fi, root),
                    Name = fi.FullName.Replace(localDir.FullName, ""),
                });
        }
        private static string GetRelativeLink(FileInfo fi, string root)
        {
            var rel = fi.FullName.Replace(root, "").Replace("\\", "/");
            if (fi.Extension == ".html")
                return string.Format(rel);
            return string.Format("test.aspx?page={0}", rel);
        }
    }
}