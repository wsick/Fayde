<%@ Page Title="Fayde | Getting Started | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="gettingstarted.aspx.cs" Inherits="Fayde.Website.gettingstarted" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    <h2>Download</h2>
    <ul>
        <li>
            <asp:HyperLink NavigateUrl="~/drops/Fayde-0.9.3.0.zip" Text="Fayde 0.9.3.0" runat="server" />
            <ul>
                <li>Migrated classes out of global "window" scope.</li>
                <li>Fixed Border rendering.</li>
                <li>Implemented VirtualizingStackPanel.</li>
                <li>Migrated Canvas.ZIndex to Panel.ZIndex.</li>
                <li>Introduced experimental toggle to switch between HTML and Canvas rendering.</li>
                <li>Better support for TypeScript work.</li>
                <li>Improved class instantiation performance.</li>
            </ul>
        </li>
		<li>
            <asp:HyperLink ID="HyperLink1" NavigateUrl="~/drops/Fayde-0.9.2.0.zip" Text="Fayde 0.9.2.0" runat="server" />
            <ul>
                <li>Added TypeScript definition.</li>
            </ul>
		</li>
		<li><asp:HyperLink NavigateUrl="~/drops/Fayde.zip" Text="Fayde 0.9.0.0" runat="server" /></li>
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
    <h2>Contribute</h2>
    <p>How can I contribute?  Listed below is a set of roles that are needed for Fayde.  If any of these roles spark your interest, please email fayde.project@gmail.com.  If you see a role that isn't listed, feel free to email.</p>
    <p><b>Evangelist</b> Fayde needs support from the community to achieve its potential.  We need constant tweeting and advertising to push Fayde to the next level.</p>
    <p><b>Web Site/Branding</b> Fayde needs a professional website to serve as a launch point for developers interested in Fayde.  We would like someone passionate about Silverlight and strong in UI development to brand Fayde.</p>
    <p><b>Beta Testers</b> Fayde needs passionate developers that want to leisurely contribute.  We need people building small showcase applications that will demo current functionality and stretch the boundaries of what is possible.  You will have an opportunity to steer the direction of the product.</p>
    <p><b>Performance Gurus</b> Fayde will not have quite the performance that Silverlight has due to the fact that it sits on Javascript.  This means that Fayde's codebase must be critiqued by performance gurus.  All ideas and suggestions for optimizations are welcome.</p>
    <p><b>MVVM Experts</b> Fayde provides a new paradigm beyond the sandboxed Silverlight/WPF paradigm.  We have an opportunity to drive a new direction for web application development.  We need visionaries to help steer our development of Bindings and MVVM.</p>
</asp:Content>