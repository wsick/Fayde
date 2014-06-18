/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/XamlObjectCollection.ts" />

module Fayde.Media.VSM {
    export class VisualStateChangedEventArgs extends EventArgs {
        OldState: VisualState;
        NewState: VisualState;
        Control: Controls.Control;
        constructor(oldState: VisualState, newState: VisualState, control: Controls.Control) {
            super();
            Object.defineProperty(this, "OldState", { value: oldState, writable: false });
            Object.defineProperty(this, "NewState", { value: newState, writable: false });
            Object.defineProperty(this, "Control", { value: control, writable: false });
        }
    }

    export class VisualStateGroup extends DependencyObject {
        static StatesProperty = DependencyProperty.RegisterImmutable<VisualStateCollection>("States", () => VisualStateCollection, VisualStateGroup);
        States: VisualStateCollection;

        static TransitionsProperty = DependencyProperty.RegisterImmutable<XamlObjectCollection<VisualTransition>>("Transitions", () => XamlObjectCollection, VisualStateGroup);
        Transitions: XamlObjectCollection<VisualTransition>;

        private _CurrentStoryboards: Animation.Storyboard[] = [];
        get CurrentStoryboards(): Animation.Storyboard[] {
            return this._CurrentStoryboards.slice(0);
        }
        CurrentStateChanging: MulticastEvent<VisualStateChangedEventArgs> = new MulticastEvent<VisualStateChangedEventArgs>();
        CurrentStateChanged: MulticastEvent<VisualStateChangedEventArgs> = new MulticastEvent<VisualStateChangedEventArgs>();
        CurrentState: VisualState = null;

        constructor() {
            super();
            VisualStateGroup.StatesProperty.Initialize(this);
            VisualStateGroup.TransitionsProperty.Initialize(this);
        }

        GetState(stateName: string): VisualState {
            var enumerator = this.States.GetEnumerator();
            var state: VisualState;
            while (enumerator.moveNext()) {
                state = enumerator.current;
                if (state.Name === stateName)
                    return state;
            }
            return null;
        }

        StartNewThenStopOld(element: FrameworkElement, newStoryboards: Animation.Storyboard[]) {
            var i: number;
            var storyboard: Animation.Storyboard;
            var res = element.Resources;
            for (i = 0; i < newStoryboards.length; i++) {
                storyboard = newStoryboards[i];
                if (storyboard == null)
                    continue;
                res.Set((<any>storyboard)._ID, storyboard);
                try {
                    storyboard.Begin();
                } catch (err) {
                    //clear storyboards on error
                    for (var j = 0; j <= i; j++) {
                        if (newStoryboards[j] != null)
                            res.Set((<any>newStoryboards[j])._ID, undefined);
                    }
                    console.warn(err);
                }
            }

            this.StopCurrentStoryboards(element);

            var curStoryboards = this._CurrentStoryboards;
            for (i = 0; i < newStoryboards.length; i++) {
                if (newStoryboards[i] == null)
                    continue;
                curStoryboards.push(newStoryboards[i]);
            }
        }
        StopCurrentStoryboards(element: FrameworkElement) {
            var curStoryboards = this._CurrentStoryboards;
            var enumerator = ArrayEx.GetEnumerator(curStoryboards);
            var storyboard: Animation.Storyboard;
            while (enumerator.moveNext()) {
                storyboard = enumerator.current;
                if (!storyboard)
                    continue;
                element.Resources.Set((<any>storyboard)._ID, undefined);
                storyboard.Stop();
            }
            this._CurrentStoryboards = [];
        }

        RaiseCurrentStateChanging(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control) {
            this.CurrentStateChanging.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
        }
        RaiseCurrentStateChanged(element: FrameworkElement, oldState: VisualState, newState: VisualState, control: Controls.Control) {
            this.CurrentStateChanged.Raise(this, new VisualStateChangedEventArgs(oldState, newState, control));
        }
    }
    Fayde.RegisterType(VisualStateGroup, "Fayde.Media.VSM", Fayde.XMLNS);
    Xaml.Content(VisualStateGroup, VisualStateGroup.StatesProperty);

    export class VisualStateGroupCollection extends XamlObjectCollection<VisualStateGroup> {
    }
    Fayde.RegisterType(VisualStateGroupCollection, "Fayde.Media.VSM", Fayde.XMLNS);
}