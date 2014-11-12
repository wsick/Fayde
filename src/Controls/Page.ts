/// <reference path="UserControl.ts" />

module Fayde.Controls {
    export class Page extends UserControl {
        static TitleProperty: DependencyProperty = DependencyProperty.Register("Title", () => String, Page);
        Title: string;

        constructor() {
            super();
            this.DefaultStyleKey = Page;
        }

        static GetAsync(url: string): IAsyncRequest<Page> {
            var d = defer<Page>();
            Xaml.XamlDocument.GetAsync(url)
                .success(xd => {
                    TimelineProfile.Parse(true, "Page");
                    var page = <Page>Xaml.Load(xd.Document);
                    TimelineProfile.Parse(false, "Page");
                    if (!(page instanceof Controls.Page))
                        d.reject("Xaml must be a Page.");
                    else
                        d.resolve(page);
                })
                .error(d.reject);
            return d.request;
        }
    }
    Fayde.RegisterType(Page, "Fayde.Controls", Fayde.XMLNS);
}