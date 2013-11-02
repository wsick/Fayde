/// <reference path="TouchInterfaces.d.ts" />

module Fayde.Input {
    export enum TouchInputType {
        NoOp = 0,
        TouchDown = 1,
        TouchUp = 2,
        TouchMove = 3,
        TouchEnter = 4,
        TouchLeave = 5
    }
    export interface ITouchInterop {
        RegisterEvents(input: Engine.InputManager, canvas: HTMLCanvasElement);
        GetPosition(e: Touch): Point;
        HandleTouches(type: Input.TouchInputType, touches: ActiveTouch[], emitLeave?: boolean, emitEnter?: boolean): boolean;
    }
    export function CreateTouchInterop(): ITouchInterop {
        return new TouchInterop();
    }

    interface IOffset {
        left: number;
        top: number;
    }

    class TouchInterop implements ITouchInterop {
        private _Input: Engine.InputManager;
        private _CanvasOffset: IOffset = null;

        private _ActiveTouches: ActiveTouch[] = [];

        RegisterEvents(input: Engine.InputManager, canvas: HTMLCanvasElement) {
            this._Input = input;
            this._CanvasOffset = this._CalcOffset(canvas);

            canvas.addEventListener("touchstart", (e) => this._HandleTouchStart(window.event ? <any>window.event : e));
            canvas.addEventListener("touchend", (e) => this._HandleTouchEnd(window.event ? <any>window.event : e));
            canvas.addEventListener("touchmove", (e) => this._HandleTouchMove(window.event ? <any>window.event : e));
            canvas.addEventListener("touchenter", (e) => this._HandleTouchEnter(window.event ? <any>window.event : e));
            canvas.addEventListener("touchleave", (e) => this._HandleTouchLeave(window.event ? <any>window.event : e));
        }

        private _HandleTouchStart(e: TouchEvent) {
            e.preventDefault();
            Engine.Inspection.Kill();

            var newTouches = this.TouchArrayFromList(e.changedTouches);
            this._ActiveTouches = this._ActiveTouches.concat(newTouches);

            this._Input.SetIsUserInitiatedEvent(true);
            this.HandleTouches(Input.TouchInputType.TouchDown, newTouches);
            this._Input.SetIsUserInitiatedEvent(false);
        }
        private _HandleTouchEnd(e: TouchEvent) {
            var oldTouches = this.TouchArrayFromList(e.changedTouches);
            removeFromArray(this._ActiveTouches, oldTouches);

            this._Input.SetIsUserInitiatedEvent(true);
            this.HandleTouches(Input.TouchInputType.TouchUp, oldTouches);
            this._Input.SetIsUserInitiatedEvent(false);
        }
        private _HandleTouchMove(e: TouchEvent) {
            var touches = this.TouchArrayFromList(e.changedTouches);
            this.HandleTouches(Input.TouchInputType.TouchMove, touches);
        }
        private _HandleTouchEnter(e: TouchEvent) {
            var touches = this.TouchArrayFromList(e.changedTouches);
            this.HandleTouches(Input.TouchInputType.TouchEnter, touches);
        }
        private _HandleTouchLeave(e: TouchEvent) {
            var touches = this.TouchArrayFromList(e.changedTouches);
            this.HandleTouches(Input.TouchInputType.TouchLeave, touches);
        }
        HandleTouches(type: Input.TouchInputType, touches: ActiveTouch[], emitLeave?: boolean, emitEnter?: boolean): boolean {
            var touch;
            var handled = false;
            while (touch = touches.shift()) {
                var inputList = this._Input.HitTestPoint(touch.Position);
                if (inputList)
                    handled = handled || touch.Emit(type, inputList, emitLeave, emitEnter);
            }
            return handled;
        }

        private _CalcOffset(canvas: HTMLCanvasElement): IOffset {
            var left = 0;
            var top = 0;
            var cur: HTMLElement = canvas;
            if (cur.offsetParent) {
                do {
                    left += cur.offsetLeft;
                    top += cur.offsetTop;
                } while (cur = <HTMLElement>cur.offsetParent);
            }
            return { left: left, top: top };
        }
        GetPosition(e: Touch): Point {
            return new Point(
                e.clientX + window.pageXOffset + this._CanvasOffset.left,
                e.clientY + window.pageYOffset + this._CanvasOffset.top);
        }

        private TouchArrayFromList(list: TouchList) {
            var len = list.length;
            var touches: ActiveTouch[] = [];
            var curto: Touch;
            var existing;
            for (var i = 0; i < len; i++) {
                var curto = list.item(i);
                existing = this.FindTouchInList(curto);
                if (existing)
                    touches.push(existing);
                else
                    touches.push(new ActiveTouch(curto, this));
            }
            return touches;
        }
        private FindTouchInList(t: Touch) {
            var at = this._ActiveTouches;
            var len = at.length;
            for (var i = 0; i < len; i++) {
                if (at[i].Identifier === t.identifier)
                    return at[i];
            }
            return null;
        }
    }

    function removeFromArray(arr: ActiveTouch[], toRemove: ActiveTouch[]) {
        var len = toRemove.length;
        for (var i = 0; i < len; i++) {
            var index = arr.indexOf(toRemove[i]);
            if (index > -1)
                arr.splice(index, 1);
        }
    }
}