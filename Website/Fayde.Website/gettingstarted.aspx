<%@ Page Title="Fayde | Getting Started | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="gettingstarted.aspx.cs" Inherits="Fayde.Website.gettingstarted" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <h2>Download</h2>
    <ul>
		<li><asp:HyperLink ID="HyperLink1" NavigateUrl="~/drops/Fayde-0.9.2.0.zip" Text="Fayde 0.9.2.0" runat="server" /> (Contains TypeScript definition)</li>
		<li><asp:HyperLink ID="HyperLink2" NavigateUrl="~/drops/Fayde.zip" Text="Fayde 0.9.0.0" runat="server" /></li>
	</ul>
    <h2>Hello World Example</h2>
	<p>The zip file contains a Visual Studio 2012 solution that contains a project with a Hello World Example.</p>
    <p><asp:HyperLink NavigateUrl="~/drops/HelloWorldExample.zip" Text="HelloWorldExample.zip" runat="server" /></p>
	<ol>
		<li>Configure the web project to run in IIS or IIS Express. (Visual Studio Development Server will not work)</li>
		<li>Set the startup page to default.fap:
			<ol>
				<li>Right-click on web project.</li>
				<li>Click Properties.</li>
				<li>Choose the "Web" tab.</li>
				<li>Under Start Action, choose Specific Page radio button.</li>
				<li>Click the "..." button to browse for a file.</li>
				<li>Change the "Files of type" filter to include All Files.</li>
				<li>Select "default.fap". Click OK</li>
			</ol>
		</li>
		<li>Run the project.</li>
	</ol>
</asp:Content>