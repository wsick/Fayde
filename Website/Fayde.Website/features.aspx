<%@ Page Title="Fayde | Features | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="features.aspx.cs" Inherits="Fayde.Website.features" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
        function toggle(li) {
            if (!li.isopen) {
                li.isopen = true;
                li.className = li.className.replace("collapsed", "expanded");
            } else {
                li.isopen = false;
                li.className = li.className.replace("expanded", "collapsed");
            }
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <p>
        The following is an up-to-date status of implementation of individual components.
    </p>
    <div>
        Legend:
        <div style="padding-left: 2em;"><asp:Image ImageUrl="~/App_Themes/default/images/full.png" runat="server" /> Fully Implemented</div>
        <div style="padding-left: 2em;"><asp:Image ImageUrl="~/App_Themes/default/images/partial.png" runat="server" /> Partially Implemented</div>
        <div style="padding-left: 2em;"><asp:Image ImageUrl="~/App_Themes/default/images/none.png" runat="server" /> Not Implemented</div>
    </div>
    <asp:Repeater ID="rptFeatures" runat="server" OnItemDataBound="rptFeatures_ItemDataBound">
        <HeaderTemplate>
            <ul>
        </HeaderTemplate>
        <ItemTemplate>
            <li class="collapsed <%# GetListItemClass(Container.DataItem) %>">
                <span class="<%# GetNameClass(Container.DataItem) %>" onclick="toggle(this.parentNode);"><%# Eval("Name") %></span>
                &nbsp;&nbsp;&nbsp;<img src="<%# GetSupportLevelImgSrc(Container.DataItem) %>" />
                <div id="subtree">
                    <asp:PlaceHolder ID="phSubtree" runat="server" />
                </div>
            </li>
        </ItemTemplate>
        <FooterTemplate>
            </ul>
        </FooterTemplate>
    </asp:Repeater>
</asp:Content>