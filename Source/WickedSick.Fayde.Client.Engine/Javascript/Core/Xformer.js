/// <reference path="../Flags.js"/>
/// <reference path="UIElement.js"/>
/// CODE
/// <reference path="../../gl-matrix.js"/>
/// <reference path="../Primitives/Point.js"/>

var Fayde;
(function (Fayde) {
    var UIElementFlags = Fayde.UIElementFlags;

    var Xformer;
    if (Fayde.UseProjections) {
        Xformer = function () {
            this.AbsoluteXform = mat3.identity();
            this.LayoutXform = mat3.identity();
            this.LocalXform = mat3.identity();
            this.RenderXform = mat3.identity();
            //this.CacheXform = mat3.identity();

            this.LocalProjection = mat4.identity();
            this.AbsoluteProjection = mat4.identity();
            this.RenderProjection = mat4.identity();
        };
        Xformer.prototype._CarryParentTransform = function (uie, visualParent, parent) {
            if (visualParent != null) {
                mat3.set(visualParent._Xformer.AbsoluteXform, this.AbsoluteXform);
                mat4.set(visualParent._Xformer.AbsoluteProjection, this.AbsoluteProjection);
                return;
            }

            mat3.identity(this.AbsoluteXform);
            mat4.identity(this.AbsoluteProjection);

            var popup = Nullstone.As(parent, Fayde.Controls.Primitives.Popup);
            if (popup) {
                var el = popup;
                while (el != null) {
                    uie._Flags |= (el._Flags & UIElementFlags.RenderProjection);
                    el = el.GetVisualParent();
                }

                if (uie._Flags & UIElementFlags.RenderProjection) {
                    mat4.set(popup._Xformer.AbsoluteProjection, this.LocalProjection);
                    var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                    mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
                } else {
                    var pap = popup._Xformer.AbsoluteProjection;
                    var renderXform = this.RenderXform;
                    renderXform[0] = pap[0];
                    renderXform[1] = pap[1];
                    renderXform[2] = pap[3];
                    renderXform[3] = pap[4];
                    renderXform[4] = pap[5];
                    renderXform[5] = pap[7];
                    mat3.translate(renderXform, popup.HorizontalOffset, popup.VerticalOffset);
                }
            }
        };
        Xformer.prototype.ComputeTransform = function (uie, um) {
            var projection = uie.Projection;

            var oldProjection = mat4.clone(this.LocalProjection);
            var old = mat3.clone(this.AbsoluteXform);

            var renderXform = mat3.identity(this.RenderXform);
            mat4.identity(this.LocalProjection);
            var visualParent = uie.VisualParent;
            this._CarryParentTransform(uie, visualParent, um.Parent);
            mat3.multiply(renderXform, this.LayoutXform, renderXform); //render = layout * render
            mat3.multiply(renderXform, this.LocalXform, renderXform); //render = local * render

            var m = mat3.toAffineMat4(renderXform);
            mat4.multiply(this.LocalProjection, m, this.LocalProjection); //local = m * local

            if (false) {
                //TODO: Render To Intermediate not implemented
            } else {
                mat3.multiply(this.AbsoluteXform, this.RenderXform, this.AbsoluteXform); //abs = render * abs
            }

            if (projection) {
                m = projection.GetTransform();
                mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
                uie._Flags |= UIElementFlags.RenderProjection;
            }

            mat4.multiply(this.LocalProjection, this.AbsoluteProjection, this.AbsoluteProjection); //abs = abs * local

            if (uie instanceof Fayde.Controls.Primitives.Popup) {
                var popupChild = uie.Child;
                if (popupChild)
                    popupChild._UpdateTransform();
            }
            if (!mat4.equal(oldProjection, this.LocalProjection)) {
                if (visualParent)
                    visualParent._Invalidate(uie._GetSubtreeBounds());
                else if (um.IsTopLevel)
                    uie._InvalidateSubtreePaint();

                if (um.IsAttached)
                    App.Instance.MainSurface._AddDirtyElement(uie, _Dirty.NewBounds);
            }

            // render = local
            mat4.set(this.LocalProjection, this.RenderProjection);

            if (/* RUNTIME_INIT_USE_UPDATE_POSITION */false && !(uie._DirtyFlags & _Dirty.Bounds)) {
                uie._TransformBounds(old, this.AbsoluteXform);
            } else {
                uie._UpdateBounds();
            }

            uie._ComputeComposite();
        };
        Xformer.prototype.ComputeLocalProjection = function (uie) {
            /// <param name="uie" type="UIElement"></param>
            var projection = uie.Projection;
            if (!projection) {
                Fayde.Controls.Panel.SetZ(uie, NaN);
                return;
            }

            var s = uie._GetSizeForBrush();
            projection._SetObjectSize(s.Width, s.Height);
            Fayde.Controls.Panel.SetZ(uie, projection._GetDistanceFromXYPlane());
        };
        Xformer.prototype.TransformToVisual = function (toUie) {
            //1. invert transform from input element to top level
            //2. transform back down to this element
            var result = mat4.create();
            // A = From, B = To, M = what we want
            // A = M * B
            // => M = inv (B) * A
            if (toUie) {
                var inverse = mat4.create();
                mat4.inverse(toUie._Xformer.AbsoluteProjection, inverse);
                mat4.multiply(this.AbsoluteProjection, inverse, result); //result = inverse * abs
            } else {
                mat4.set(this.AbsoluteProjection, result); //result = absolute
            }

            var raw = mat4.toAffineMat3(result);
            if (raw) {
                var mt = new Fayde.Media.MatrixTransform();
                var m = new Matrix();
                m.raw = raw;
                mt._SetValue(Fayde.Media.MatrixTransform.MatrixProperty, m);
                return mt;
            }

            var it = new Fayde.Media.InternalTransform();
            it.raw = result;
            return it;
        };
        Xformer.prototype.TransformPoint = function (p) {
            /// <param name="p" type="Point"></param>
            var inverse = mat4.inverse(this.AbsoluteProjection, mat4.create());
            if (inverse == null) {
                Warn("Could not get inverse of Absolute Projection for UIElement.");
                return;
            }

            var p4 = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
            var m20 = inverse[2];
            var m21 = inverse[6];
            var m22 = inverse[10];
            var m23 = inverse[14];
            p4[2] = -(m20 * p4[0] + m21 * p4[1] + m23) / m22;

            mat4.transformVec4(inverse, p4);
            p.X = p4[0] / p4[3];
            p.Y = p4[1] / p4[3];
        };
        Xformer.prototype.ComputeTransformLegacy = function (uie) {
            var projection = uie.Projection;
            var cacheMode = uie.CacheMode;

            if (typeof Float32Array !== "undefined") {
                var oldProjection = new Float32Array(this.LocalProjection);
                var old = new Float32Array(this.AbsoluteXform);
                var oldCache = new Float32Array(this.CacheXform);
            } else {
                var oldProjection = this.LocalProjection.slice(0);
                var old = this.AbsoluteXform.slice(0);
                var oldCache = this.CacheXform.slice(0);
            }

            mat3.identity(this.RenderXform);
            mat3.identity(this.CacheXform);
            mat4.identity(this.LocalProjection);

            var renderXform = this.RenderXform;

            var visualParent = uie.GetVisualParent();
            if (visualParent != null) {
                mat3.set(visualParent._Xformer.AbsoluteXform, this.AbsoluteXform);
                mat4.set(visualParent._Xformer.AbsoluteProjection, this.AbsoluteProjection);
            } else {
                mat3.identity(this.AbsoluteXform);
                mat4.identity(this.AbsoluteProjection);
                if (uie._Parent != null && uie._Parent instanceof Fayde.Controls.Primitives.Popup) {
                    var popup = uie._Parent;
                    var el = popup;
                    while (el != null) {
                        uie._Flags |= (el._Flags & UIElementFlags.RenderProjection);
                        el = el.GetVisualParent();
                    }

                    if (uie._Flags & UIElementFlags.RenderProjection) {
                        mat4.set(popup._Xformer.AbsoluteProjection, uie.LocalProjection);
                        var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                        mat4.multiply(m, uie.LocalProjection, uie.LocalProjection); //local = local * m
                    } else {
                        var pap = popup._Xformer.AbsoluteProjection;
                        renderXform[0] = pap[0];
                        renderXform[1] = pap[1];
                        renderXform[2] = pap[3];
                        renderXform[3] = pap[4];
                        renderXform[4] = pap[5];
                        renderXform[5] = pap[7];
                        mat3.translate(renderXform, popup.HorizontalOffset, popup.VerticalOffset);
                    }
                }
            }

            mat3.multiply(renderXform, this.LayoutXform, renderXform); //render = layout * render
            mat3.multiply(renderXform, this.LocalXform, renderXform); //render = local * render


            var m = mat3.toAffineMat4(renderXform);
            mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m

            if (false) {
                //TODO: Render To Intermediate not implemented
            } else {
                mat3.multiply(this.AbsoluteXform, this.RenderXform, this.AbsoluteXform); //abs = render * abs
            }

            if (projection) {
                m = projection.GetTransform();
                mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
                uie._Flags |= UIElementFlags.RenderProjection;
            }

            mat4.multiply(this.LocalProjection, this.AbsoluteProjection, this.AbsoluteProjection); //abs = abs * local

            if (uie instanceof Fayde.Controls.Primitives.Popup) {
                var popupChild = uie.Child;
                if (popupChild)
                    popupChild._UpdateTransform();
            }
            if (!mat4.equal(oldProjection, this.LocalProjection)) {
                if (visualParent)
                    visualParent._Invalidate(uie._GetSubtreeBounds());
                else if (App.Instance.MainSurface._IsTopLevel(uie))
                    uie._InvalidateSubtreePaint();

                if (uie._IsAttached)
                    App.Instance.MainSurface._AddDirtyElement(uie, _Dirty.NewBounds);
            }

            if (cacheMode) {
                if (!uie.Effect)
                    cacheMode.GetTransform(this.CacheXform);

                if (!mat3.equal(oldCache, this.CacheXform))
                    uie._InvalidateBitmapCache();

                var inverse = mat3.inverse(this.CacheXform);
                mat4.toAffineMat4(inverse, m);
                mat4.multiply(m, this.LocalProjection, this.RenderProjection); //render = local * m
            } else {
                // render = local
                mat4.set(this.LocalProjection, this.RenderProjection);
            }

            if (/* RUNTIME_INIT_USE_UPDATE_POSITION */false && !(uie._DirtyFlags & _Dirty.Bounds)) {
                uie._TransformBounds(old, this.AbsoluteXform);
            } else {
                uie._UpdateBounds();
            }

            uie._ComputeComposite();
        };
    } else {
        Xformer = function () {
            this.AbsoluteXform = mat3.identity();
            this.LayoutXform = mat3.identity();
            this.LocalXform = mat3.identity();
            this.RenderXform = mat3.identity();
            //this.CacheXform = mat3.identity();
        };
        Xformer.prototype._CarryParentTransform = function (uie, visualParent, parent) {
            if (visualParent != null) {
                mat3.set(visualParent._Xformer.AbsoluteXform, this.AbsoluteXform);
                return;
            }

            mat3.identity(this.AbsoluteXform);

            var popup = Nullstone.As(parent, Fayde.Controls.Primitives.Popup);
            if (popup) {
                var renderXform = mat3.set(popup._Xformer.AbsoluteXform, this.RenderXform);
                mat3.translate(renderXform, popup.HorizontalOffset, popup.VerticalOffset);
            }
        };
        Xformer.prototype.ComputeTransform = function (uie, um) {
            var oldRender = mat3.clone(this.RenderXform);
            var old = mat3.clone(this.AbsoluteXform);

            var renderXform = mat3.identity(this.RenderXform);
            var visualParent = um.VisualParent;
            this._CarryParentTransform(uie, visualParent, um.Parent);
            mat3.multiply(renderXform, this.LayoutXform, renderXform); //render = layout * render
            mat3.multiply(renderXform, this.LocalXform, renderXform); //render = local * render

            if (false) {
                //TODO: Render To Intermediate not implemented
            } else {
                mat3.multiply(this.AbsoluteXform, this.RenderXform, this.AbsoluteXform); //abs = render * abs
            }

            if (uie instanceof Fayde.Controls.Primitives.Popup) {
                var popupChild = uie.Child;
                if (popupChild)
                    popupChild._UpdateTransform();
            }
            if (!mat3.equal(oldRender, this.RenderXform)) {
                if (visualParent)
                    visualParent._Invalidate(uie._GetSubtreeBounds());
                else if (um.IsTopLevel)
                    uie._InvalidateSubtreePaint();

                if (um.IsAttached)
                    App.Instance.MainSurface._AddDirtyElement(uie, _Dirty.NewBounds);
            }

            if (/* RUNTIME_INIT_USE_UPDATE_POSITION */false && !(uie._DirtyFlags & _Dirty.Bounds)) {
                uie._TransformBounds(old, this.AbsoluteXform);
            } else {
                uie._UpdateBounds();
            }

            uie._ComputeComposite();
        };
        Xformer.prototype.ComputeLocalProjection = function (uie) { };
        Xformer.prototype.TransformToVisual = function (toUie) {
            //1. invert transform from input element to top level
            //2. transform back down to this element
            var result = mat3.create();
            // A = From, B = To, M = what we want
            // A = M * B
            // => M = inv (B) * A
            if (toUie) {
                var inverse = mat3.create();
                mat3.inverse(toUie._Xformer.AbsoluteXform, inverse);
                mat3.multiply(this.AbsoluteXform, inverse, result); //result = inverse * abs
            } else {
                mat3.set(this.AbsoluteXform, result); //result = absolute
            }

            var mt = new Fayde.Media.MatrixTransform();
            var m = new Matrix();
            m.raw = result;
            mt._SetValue(Fayde.Media.MatrixTransform.MatrixProperty, m);
            return mt;
        };
        Xformer.prototype.TransformPoint = function (p) {
            /// <param name="p" type="Point"></param>
            var inverse = mat3.inverse(this.AbsoluteXform, mat3.create());
            if (inverse == null) {
                Warn("Could not get inverse of Absolute Transform for UIElement.");
                return;
            }

            var p2 = vec2.createFrom(p.X, p.Y);
            mat3.transformVec2(inverse, p2);
            p.X = p2[0];
            p.Y = p2[1];
        };
    }

    Xformer.prototype.ComputeLocalTransform = function (uie) {
        var transform = uie.RenderTransform;
        if (!transform)
            return;

        var transformOrigin = uie._GetTransformOrigin();
        mat3.identity(this.LocalXform);
        var render = mat3.create();
        mat3.set(transform.Value.raw, render);

        mat3.translate(this.LocalXform, transformOrigin.X, transformOrigin.Y);
        mat3.multiply(this.LocalXform, render, this.LocalXform); //local = render * local
        mat3.translate(this.LocalXform, -transformOrigin.X, -transformOrigin.Y);
    };
    Fayde.Xformer = Xformer;
})(Fayde || (Fayde = {}));