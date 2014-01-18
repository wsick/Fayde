module Fayde {
    export class Theme {
        Resources: ResourceDictionary;

        GetImplicitStyle(type: any): Style {
            var rd = this.Resources;
            if (!rd)
                return;
            var style = <Style>rd.Get(type);
            if (style instanceof Style)
                return style;
            return undefined;
        }
    }
    Fayde.RegisterType(Theme, "Fayde", Fayde.XMLNS);
} 