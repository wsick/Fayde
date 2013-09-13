<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="xaml.aspx.cs" ValidateRequest="false" Inherits="Fayde.Client.xaml" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" runat="server">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" name="form1" runat="server">
        <asp:ListBox runat="server" ID="faydeFiles" Width="800" Rows="1" />
        <asp:Button runat="server" ID="selectedFile" Text="Load" 
            onclick="selectedFile_Click" /><br />
        <asp:TextBox runat="server" TextMode="MultiLine" Wrap="true" ID="tb1" Height="800" Width="800" />
        <asp:TextBox runat="server" TextMode="MultiLine" ID="tb2" Height="800" Width="500" /><br />
        <asp:CheckBox ID="cacheNamespaces" Text="Cache Types" runat="server" />
        <asp:Button runat="server" ID="submit" onclick="submit_Click" Text="Convert"/>
        <br />
        <asp:Label ID="lblParseTime" runat="server" />
        <br />
        <asp:Label ID="lblSerializeTime" runat="server" />
    </form>
</body>
</html>