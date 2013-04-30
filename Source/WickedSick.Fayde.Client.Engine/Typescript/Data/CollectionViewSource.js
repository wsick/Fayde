var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    /// <reference path="ICollectionView.ts" />
    (function (Data) {
        var CollectionViewSource = (function (_super) {
            __extends(CollectionViewSource, _super);
            function CollectionViewSource() {
                _super.apply(this, arguments);

            }
            CollectionViewSource.SourceProperty = DependencyProperty.Register("Source", function () {
                return Object;
            }, CollectionViewSource);
            CollectionViewSource.ViewProperty = DependencyProperty.Register("View", function () {
                return Data.ICollectionView_;
            }, CollectionViewSource);
            return CollectionViewSource;
        })(Fayde.DependencyObject);
        Data.CollectionViewSource = CollectionViewSource;        
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=CollectionViewSource.js.map
