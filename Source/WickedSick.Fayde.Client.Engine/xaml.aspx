<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xaml.aspx.cs" ValidateRequest="false" Inherits="WickedSick.Fayde.Client.Engine.xaml" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox runat="server" ID="tb1" Height="200" Width="800" /><br />
        <asp:TextBox runat="server" ID="tb2" Height="200" Width="800" /><br />
        <asp:Button runat="server" ID="submit" onclick="submit_Click" Text="Convert"/>
    </div>
    </form>
</body>
</html>
