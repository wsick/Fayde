/// <reference path="UserControl.ts" />

module Fayde.Controls {
    export class Page extends UserControl {
        static TitleProperty = DependencyProperty.Register("Title", () => String, Page);
        Title: string;

        constructor() {
            super();
            this.DefaultStyleKey = Page;
        }

        static GetAsync(initiator: DependencyObject, url: string): Promise<Page> {
            return Markup.Resolve(url)
                .then(xm => {
                    TimelineProfile.Parse(true, "Page");
                    var page = Markup.Load<Page>(initiator.App, xm);
                    TimelineProfile.Parse(false, "Page");
                    if (!(page instanceof Controls.Page))
                        throw new Error("Markup must be a Page.");
                    return page;
                });
        }
    }
    Fayde.CoreLibrary.add(Page);
}