<%@ Page Title="Fayde | Download | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="download.aspx.cs" Inherits="Fayde.Website.download" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <p>
        <ul>
			<li><asp:HyperLink ID="HyperLink1" NavigateUrl="~/drops/Fayde-0.9.2.0.zip" Text="Fayde 0.9.2.0" runat="server" /> (Contains TypeScript definition)</li>
			<li><asp:HyperLink ID="HyperLink2" NavigateUrl="~/drops/Fayde.zip" Text="Fayde 0.9.0.0" runat="server" /></li>
		<ul>
    </p>
</asp:Content>