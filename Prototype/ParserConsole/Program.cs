using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using Parser.Elements;
using System.IO;

namespace ParserConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var source = @"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.fayde";
            var destination = @"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.html";

            var doc = new XmlDocument();
            doc.Load(source);
            if (!doc.DocumentElement.Name.ToLower().Equals("page"))
                throw new Exception("We currently only support the Page element as the document root.");

            var p = Parser.Parser.ParseXmlNode(doc.DocumentElement, null) as Page;

            using (var fs = new FileStream(destination, FileMode.Create))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(p.ToString());
            }
        }
    }
}
