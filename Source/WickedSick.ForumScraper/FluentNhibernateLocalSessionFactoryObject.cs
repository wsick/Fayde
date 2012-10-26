using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Spring.Data.NHibernate;
using NHibernate.Cfg;
using NHibernate.Context;
using FluentNHibernate.Cfg;
using System.Reflection;

namespace WickedSick.ForumScraper
{
    public class FluentNhibernateLocalSessionFactoryObject : LocalSessionFactoryObject
    {
        private string[] fluentNhibernateMappingAssemblies;
        ///
        /// Sets the assemblies to load that contain fluent nhibernate mappings.
        ///
        /// The mapping assemblies.
        public string[] FluentNhibernateMappingAssemblies
        {
            get { return fluentNhibernateMappingAssemblies; }
            set { fluentNhibernateMappingAssemblies = value; }
        }

        ///
        /// Fluent configuration.
        ///
        protected override void PostProcessConfiguration(Configuration config)
        {
            base.PostProcessConfiguration(config);

            Fluently.Configure(config)
            .CurrentSessionContext<ThreadStaticSessionContext>()
            .Mappings(m =>
            {
                foreach (string assemblyName in fluentNhibernateMappingAssemblies)
                {
                    m.HbmMappings
                    .AddFromAssembly(Assembly.Load(assemblyName));

                    m.FluentMappings
                    .AddFromAssembly(Assembly.Load(assemblyName));
                }
            })
            .BuildConfiguration();
        }
    }
}
