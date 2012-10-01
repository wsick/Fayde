<%@ Page Title="" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="gettingstarted.aspx.cs" Inherits="Fayde.Website.gettingstarted" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <h3>Hello World Example</h3>
    <p>The following instructions are preliminary.  Templates are being created to ease this process.</p>
    <ol>
        <li>Download the latest drop on the <asp:HyperLink NavigateUrl="~/download.aspx" runat="server">download</asp:HyperLink> page.</li>
        <li>Create a new web application project in Visual Studio.</li>
        <li>Copy files in the "&lt;Zip File&gt;\bin" directory to a directory in your web application project.</li>
        <li>Add a reference to the dlls that were just extracted.</li>
        <li>Copy the javascript files in the "&lt;Zip File&gt;\jsbin" directory to a directory in your web application project.</li>
        <li>Create a Fayde application.
            <ol>
                <li>Add New Item > Text File > "default.fap".</li>
                <li>Add the following XAML to default.fap:
                    <div>
                        <code>
                            <asp:Literal ID="ltrlDefaultFapXaml" runat="server" />
                        </code>
                    </div>
                </li>
                <li>Replace ScriptResolution="scripts/" with a resolution from "default.fap" to the directory that contains Fayde.js and Fayde.Generic.js.</li>
            </ol>
        </li>
        <li>
            Create the default view.
            <ol>
                <li>Add New Folder > "Views".</li>
                <li>Add New Item > Text File > "home.fayde".</li>
                <li>Add the following XAML to home.fayde.
                    <div>
                        <code>
                            <asp:Literal ID="ltrlHomeXaml" runat="server" />
                        </code>
                    </div>
                </li>
            </ol>
        </li>
        <li>Set default.fap as your start page.
            <ol>
                <li>Open web application project properties.</li>
                <li>Choose Web tab.</li>
                <li>Choose "Specific Page" radio button.</li>
                <li>Type "default.fap".</li>
                <li>Save project.</li>
            </ol>
        </li>
        <li>Run web application.</li>
    </ol>
</asp:Content>