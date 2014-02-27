<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="Fayde.TestSite.Tests.test" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="lib/requirejs/require.js"></script>
    <script>
        require.config({
            baseUrl: "./",
            paths: {
                "text": "lib/requirejs/text",
                "Fayde": "/Fayde/Fayde"
            },
            deps: ["text", "Fayde"],
            callback: function (text, Fayde) {
                Fayde.RegisterLibrary("Fayde", "Fayde", function (name) { return "/Fayde/Themes/" + name + ".theme.xml"; });
                Fayde.Run();
            },
            shim: {
                "Fayde": {
                    exports: "Fayde",
                },
                "lib/Fayde.Controls/Fayde.Controls": {
                    exports: "Fayde.Controls"
                }
            }
        });
    </script>
    <style>
        *
        {
            margin: 0;
            padding: 0;
        }
        html, body
        {
            width: 100%;
            height: 100%;
        }
        canvas
        {
            display: block;
        }
    </style>
</head>
<body faydeapp='<%= Request.QueryString["page"] %>'>
</body>
</html>