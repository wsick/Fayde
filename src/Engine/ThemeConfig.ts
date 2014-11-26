module Fayde {
    export module ThemeConfig {
        var configs = {};

        var DEFAULT_TEMPLATE_URI = "lib/<libname>/themes/<themename>.Theme.xml";

        export function GetRequestUri (uri: Uri, name: string): string {
            if (Uri.isNullOrEmpty(uri))
                return null;
            var config = configs[uri.toString()];
            var templateUri = ((config) ? config.requestTemplateUri : null) || DEFAULT_TEMPLATE_URI;
            return processTemplate(uri, name, templateUri);
        }

        export function OverrideRequestUri (uri: Uri, templateUri: string) {
            configs[uri.toString()] = {
                requestTemplateUri: templateUri
            };
        }

        function processTemplate (uri: Uri, name: string, template: string): string {
            var libName = uri.host;
            var rv = template;
            rv = rv.replace("<libname>", libName);
            rv = rv.replace("<themename>", name);
            return rv;
        }

        OverrideRequestUri(new Uri(Fayde.XMLNS), "lib/Fayde/themes/<themename>.theme.xml");
    }
}