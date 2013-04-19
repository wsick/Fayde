/// <reference path="../../Runtime/Nullstone.ts" />
/// <reference path="ImageSource.ts"/>
/// CODE
/// <reference path="../../Primitives/Uri.ts"/>

module Fayde.Media.Imaging {
    declare var Info;

    export interface IImageLoadListener {
        OnImageErrored(source: BitmapSource, e: Event);
        OnImageLoaded(source: BitmapSource, e: Event);
    }

    function intGreaterThanZeroValidator(instance: DependencyObject, propd: DependencyProperty, value: any) {
        if (typeof value !== "number")
            return false;
        return value > 0;
    }

    export class BitmapSource extends ImageSource {
        static PixelWidthProperty: DependencyProperty = DependencyProperty.RegisterFull("PixelWidth", () => Number, BitmapSource, 0, undefined, undefined, undefined, undefined, intGreaterThanZeroValidator);
        static PixelHeightProperty: DependencyProperty = DependencyProperty.RegisterFull("PixelHeight", () => Number, BitmapSource, 0, undefined, undefined, undefined, undefined, intGreaterThanZeroValidator);

        private _Listener: IImageLoadListener = null;
        private _Image: HTMLImageElement;

        ResetImage() {
            this._Image = new Image();
            this._Image.onerror = (e) => this._OnErrored(e);
            this._Image.onload = (e) => this._OnLoad(e);
            this.PixelWidth = 0;
            this.PixelHeight = 0;
        }
        UriSourceChanged(oldValue: Uri, newValue: Uri) {
            this._Image.src = newValue.toString();
        }

        Listen(listener: IImageLoadListener) { this._Listener = listener; }
        Unlisten(listener: IImageLoadListener) { if (this._Listener === listener) this._Listener = null; }

        _OnErrored(e: Event) {
            Info("Failed to load: " + this._Image.src.toString());
            var listener = this._Listener;
            if (listener)
                listener.OnImageErrored(this, e);
        }
        _OnLoad(e: Event) {
            this.PixelWidth = this._Image.naturalWidth;
            this.PixelHeight = this._Image.naturalHeight;
            var listener = this._Listener;
            if (listener)
                listener.OnImageLoaded(this, e);
        }
    }
    Nullstone.RegisterType(BitmapSource, "BitmapSource");
}