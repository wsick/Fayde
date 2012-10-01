<%@ Page Title="" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="download.aspx.cs" Inherits="Fayde.Website.download" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <p>
        <asp:HyperLink NavigateUrl="~/drops/Fayde.zip" Text="Fayde.zip" runat="server" />
    </p>
</asp:Content>