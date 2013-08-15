<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="tests.aspx.cs" Inherits="Fayde.TestSite.Tests.tests" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <ul>
        <asp:Repeater ID="rptTests" runat="server">
            <ItemTemplate>
                <li>
                    <asp:HyperLink NavigateUrl='<%# Eval("RelativeLink") %>' Text='<%# Eval("Name") %>' runat="server" />
                </li>
            </ItemTemplate>
        </asp:Repeater>
        </ul>
    </div>
    </form>
</body>
</html>