var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    /// <reference path="Page.ts" />
    /// <reference path="../Primitives/Uri.ts" />
    /// <reference path="../Runtime/AjaxJsonRequest.ts" />
    /// <reference path="../Engine/XamlResolver.ts" />
    (function (Controls) {
        var Frame = (function (_super) {
            __extends(Frame, _super);
            //Navigated = new MulticastEvent();
            //Navigating = new MulticastEvent();
            //NavigationFailed = new MulticastEvent();
            //NavigationStopped = new MulticastEvent();
            //FragmentNavigation = new MulticastEvent();
            function Frame() {
                        _super.call(this);
                this.Loaded.Subscribe(this._FrameLoaded, this);
            }
            Frame.IsDeepLinkedProperty = DependencyProperty.Register("IsDeepLinked", function () {
                return Boolean;
            }, Frame, true);
            Frame.CurrentSourceProperty = DependencyProperty.RegisterReadOnly("CurrentSource", function () {
                return Uri;
            }, Frame);
            Frame.SourceProperty = DependencyProperty.Register("Source", function () {
                return Uri;
            }, Frame, undefined, function (d, args) {
                return (d).SourcePropertyChanged(args);
            });
            Frame.prototype.Navigate = function (uri) {
                var _this = this;
                this._Request = new Fayde.AjaxJsonRequest(function (result) {
                    return _this._HandleSuccessfulResponse(result);
                }, function (error) {
                    return _this._HandleErrorResponse(error);
                });
                this._Request.Get(uri.toString());
            };
            Frame.prototype.GoForward = function () {
                //TODO: Implement
                            };
            Frame.prototype.GoBackward = function () {
                //TODO: Implement
                            };
            Frame.prototype.StopLoading = function () {
                if(this._Request) {
                    this._Request.Cancel();
                    this._Request = null;
                }
            };
            Frame.prototype._FrameLoaded = function (sender, e) {
                this._NavService = App.Instance.NavService;
                if(this.IsDeepLinked) {
                    this._NavService.LocationChanged.Subscribe(this._HandleDeepLink, this);
                    this._HandleDeepLink();
                }
            };
            Frame.prototype._HandleDeepLink = function () {
                var source = this._NavService.Href + "#" + this._NavService.Hash;
                this.SetValueInternal(Frame.CurrentSourceProperty, source);
                this._LoadContent(this._NavService.Href, this._NavService.Hash);
            };
            Frame.prototype._LoadContent = function (href, hash) {
                var _this = this;
                this.StopLoading();
                var that = this;
                this._Resolver = new Fayde.XamlResolver(function (xamlResult, scriptResult) {
                    return _this._HandleSuccessfulResponse(xamlResult);
                }, function (xamlResult, scriptResult) {
                    return _this._HandleSuccessfulSubResponse(xamlResult);
                }, function (error) {
                    return _this._HandleErrorResponse(error);
                });
                this._Resolver.Load(href, hash);
            };
            Frame.prototype._HandleSuccessfulResponse = function (ajaxJsonResult) {
                var response = Fayde.JsonParser.Parse(ajaxJsonResult.CreateJson());
                if(response instanceof Controls.Page) {
                    var page = response;
                    document.title = page.Title;
                    //canProfile = profiles.frameUpdate;
                    this.Content = page;
                }
                this._Request = null;
            };
            Frame.prototype._HandleSuccessfulSubResponse = function (ajaxJsonResult) {
                var json = ajaxJsonResult.CreateJson();
                var jsType = json.ParseType;
                jsType.__TemplateJson = json;
            };
            Frame.prototype._HandleErrorResponse = function (error) {
                this._Resolver = null;
            };
            Frame.prototype.SourcePropertyChanged = function (args) {
                //TODO: Ignore in design mode
                if(true) {
                    //if loaded and not updating source from nav service
                    this.Navigate(args.NewValue);
                }
                //TODO: Show default content uri in Content when in design mode
                            };
            return Frame;
        })(Controls.ContentControl);
        Controls.Frame = Frame;        
        Nullstone.RegisterType(Frame, "Frame");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Frame.js.map
