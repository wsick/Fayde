var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// CODE
        /// <reference path="../ScrollViewer.ts" />
        (function (Primitives) {
            var ScrollData = (function () {
                function ScrollData() {
                    this.CanHorizontallyScroll = false;
                    this.CanVerticallyScroll = false;
                    this.ScrollOwner = null;
                    this.OffsetX = 0;
                    this.OffsetY = 0;
                    this.CachedOffsetX = 0;
                    this.CachedOffsetY = 0;
                    this.ViewportWidth = 0;
                    this.ViewportHeight = 0;
                    this.ExtentWidth = 0;
                    this.ExtentHeight = 0;
                    this.MaxDesiredWidth = 0;
                    this.MaxDesiredHeight = 0;
                }
                return ScrollData;
            })();
            Primitives.ScrollData = ScrollData;            
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollData.js.map
