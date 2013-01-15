<%@ Page Title="Fayde | Getting Started | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="gettingstarted.aspx.cs" Inherits="Fayde.Website.gettingstarted" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <h3>Hello World Example</h3>
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