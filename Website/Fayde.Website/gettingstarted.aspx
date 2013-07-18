<%@ Page Title="Fayde | Getting Started | Silverlight & HTML5" Language="C#" MasterPageFile="~/default.Master" AutoEventWireup="true" CodeBehind="gettingstarted.aspx.cs" Inherits="Fayde.Website.gettingstarted" Theme="default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style type="text/css">
.nuget-badge code{-moz-border-radius:5px;-webkit-border-radius:5px;background-color:#202020;border:4px solid silver;border-radius:5px;box-shadow:2px 2px 3px #6e6e6e;color:#e2e2e2;display:block;font:1.5em 'andale mono','lucida console',monospace;line-height:1.5em;overflow:auto;padding:15px}
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cphBody" runat="server">
    	<h2>Quick Start</h2>
	<ol>
		<li>Install <a href="http://www.microsoft.com/en-us/download/details.aspx?id=34790" target="_blank">TypeScript 0.9.0.1</a>.</li>
		<li>Create a Web Application Project in Visual Studio. (NOT a Website)</li>
		<li>&nbsp;<div class="nuget-badge"><p><code>PM> Install-Package Fayde</code></p></div></li>
		<li>Open up Project properties. Click "Web" tab. Click "Create Virtual Directory".</li>
		<li>Run!</li>
	</ol>
    <h2>Contribute</h2>
    <p>How can I contribute?  Listed below is a set of roles that are needed for Fayde.  If any of these roles spark your interest, please email fayde.project@gmail.com.  If you see a role that isn't listed, feel free to email.</p>
    <p><b>Evangelist</b> Fayde needs support from the community to achieve its potential.  We need constant tweeting and advertising to push Fayde to the next level.</p>
    <p><b>Web Site/Branding</b> Fayde needs a professional website to serve as a launch point for developers interested in Fayde.  We would like someone passionate about Silverlight and strong in UI development to brand Fayde.</p>
    <p><b>Beta Testers</b> Fayde needs passionate developers that want to leisurely contribute.  We need people building small showcase applications that will demo current functionality and stretch the boundaries of what is possible.  You will have an opportunity to steer the direction of the product.</p>
    <p><b>Performance Gurus</b> Fayde will not have quite the performance that Silverlight has due to the fact that it sits on Javascript.  This means that Fayde's codebase must be critiqued by performance gurus.  All ideas and suggestions for optimizations are welcome.</p>
    <p><b>MVVM Experts</b> Fayde provides a new paradigm beyond the sandboxed Silverlight/WPF paradigm.  We have an opportunity to drive a new direction for web application development.  We need visionaries to help steer our development of Bindings and MVVM.</p>
</asp:Content>