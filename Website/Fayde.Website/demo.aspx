﻿<%@ Page Title="Fayde | Demo | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="demo.aspx.cs" Inherits="Fayde.Website.demo" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <p>These demos open in a new window. They are currently best viewed in Chrome.</p>
    <ul>
        <li><asp:HyperLink NavigateUrl="~/demos/stackoverflow/default.fap" Target="_blank" runat="server">Stack Overflow Viewer</asp:HyperLink></li>
    </ul>
</asp:Content>