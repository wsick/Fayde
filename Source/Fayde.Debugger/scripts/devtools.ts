/// <reference path="typings/chrome/chrome.d.ts" />

module Gerudo {
    import panels = chrome.devtools.panels;

    var mainPanel = panels.create("Gerudo", null, "panel.html", (panel) => {
        panel.onShown.addListener((window) => {
            var pw = <any>window;
            pw.Gerudo.onPanelShown(pw.document);
        });
        panel.onHidden.addListener((window) => {
            var pw = <any>window;
            pw.Gerudo.onPanelHidden();
        });
    });
}