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
            XmlDocument doc = new XmlDocument();
            doc.Load(@"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.fayde");
            if (!doc.DocumentElement.Name.ToLower().Equals("page"))
                throw new Exception("We currently only support the Page element as the document root.");

            Page p = Parser.Parser.ParseXmlNode(doc.DocumentElement, null) as Page;

            using (FileStream fs = new FileStream(@"D:\Development\Home\Fayde\Prototype\Html5RenderEngineTests.Web\tests\grid\test4.html", FileMode.Create))
            using (StreamWriter sw = new StreamWriter(fs))
            {
                sw.Write(p.ToString());
            }
        }
    }
}
