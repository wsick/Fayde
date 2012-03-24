using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;

namespace WickedSick.Fayde.Client.Engine.Tests
{
    [TestClass]
    public class SmokeTests
    {
        private string _FaydeCodeBase;

        [TestInitialize]
        public void Setup()
        {
            var fi = new FileInfo("../../../WickedSick.Fayde.Client.Engine/Fayde.js");
            using (var sr = new StreamReader(fi.OpenRead()))
            {
                _FaydeCodeBase = sr.ReadToEnd();
            }
        }

        [TestMethod]
        public void TestMethod1()
        {
        }
    }
}
