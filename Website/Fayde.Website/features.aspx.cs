using System;
using System.Linq;
using System.Web.UI.WebControls;
using Fayde.Website.Models;

namespace Fayde.Website
{
    public partial class features : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
                BindData();
        }

        private void BindData()
        {
            rptFeatures.DataSource = Fayde.Website.IO.FeaturesXmlLoader.Load(Server.MapPath("~/App_Data/features_list.xml"));
            rptFeatures.DataBind();
        }

        protected void rptFeatures_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType != ListItemType.AlternatingItem && e.Item.ItemType != ListItemType.Item)
                return;
            var feature = e.Item.DataItem as Feature;
            if (!feature.Features.Any())
                return;
            var phSubtree = e.Item.FindControl("phSubtree");
            var rpt = new Repeater();
            rpt.DataSource = feature.Features; 
            rpt.HeaderTemplate = (sender as Repeater).HeaderTemplate;
            rpt.FooterTemplate = (sender as Repeater).FooterTemplate;
            rpt.ItemTemplate = (sender as Repeater).ItemTemplate;
            rpt.ItemDataBound += rptFeatures_ItemDataBound;
            phSubtree.Controls.Add(rpt);
            rpt.DataBind();
        }

        protected string GetListItemClass(object dataItem)
        {
            var feature = dataItem as Feature;
            switch (feature.Type)
            {
                case FeatureTypes.Namespace:
                    return "feature_namespace";
                case FeatureTypes.Class:
                    return "feature_class";
                case FeatureTypes.AttachedDependencyProperty:
                case FeatureTypes.DependencyProperty:
                case FeatureTypes.Property:
                    return "feature_property";
                case FeatureTypes.Method:
                    return "feature_method";
                case FeatureTypes.Event:
                    return "feature_event";
            }
            return null;
        }

        protected string GetNameClass(object dataItem)
        {
            var feature = dataItem as Feature;
            return feature.Features.Any() ? "feature_has_children" : null;
        }

        protected string GetSupportLevelImgSrc(object dataItem)
        {
            var feature = dataItem as Feature;
            switch (feature.SupportLevel)
            {
                case SupportLevels.Full:
                    return "App_Themes/default/images/full.png";
                case SupportLevels.Partial:
                    return "App_Themes/default/images/partial.png";
                case SupportLevels.None:
                    return "App_Themes/default/images/none.png";
            }
            return null;
        }
    }
}