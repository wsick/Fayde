/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (Fayde) {
    function LayoutPass() {
        this.MeasureList = [];
        this.ArrangeList = [];
        this.SizeList = [];
        this.Count = 0;
        this.Updated = false;
        this.StartTime = new Date().getTime();
    }
    LayoutPass.MaxCount = 250;
    Fayde.LayoutPass = LayoutPass;
})(Nullstone.Namespace("Fayde"));