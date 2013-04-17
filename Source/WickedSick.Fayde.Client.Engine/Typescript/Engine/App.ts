/// CODE
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />

class App {
    static Version: string = "0.9.4.0";
    static Instance: App;
    MainSurface: Surface;
    Resources: Fayde.ResourceDictionary;
    private _IsRunning: bool = false;
    private _Storyboards: any[] = [];
    constructor() {
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
    }
    get RootVisual(): Fayde.UIElement {
        return this.MainSurface._TopLevel;
    }

    private _Tick(lastTime:number, nowTime:number) {
        this.ProcessStoryboards(lastTime, nowTime);
        this.Update();
        this.Render();
    }
    private ProcessStoryboards(lastTime: number, nowTime: number) {
        var sbs = this._Storyboards;
        var len = sbs.length;
        for (var i = 0; i < len; i++) {
            sbs[i].Update(nowTime);
        }
    }
    private Update() {
        if (this._IsRunning)
            return;

        //var startLayoutTime;
        //var isLayoutPassTimed;
        //if (isLayoutPassTimed = (this._DebugFunc[3] != null))
            //startLayoutTime = new Date().getTime();

        this._IsRunning = true;
        //try {
        var updated = this.MainSurface.ProcessDirtyElements();
        //} catch (err) {
        //Fatal("An error occurred processing dirty elements: " + err.toString());
        //}
        this._IsRunning = false;

        //if (updated && isLayoutPassTimed)
            //this._NotifyDebugLayoutPass(new Date().getTime() - startLayoutTime);
    }
    private Render() {
        this.MainSurface.Render();
    }
}