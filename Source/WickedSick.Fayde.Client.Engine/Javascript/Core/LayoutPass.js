/// CODE

//#region LayoutPass
function LayoutPass() {
    this.MeasureList = [];
    this.ArrangeList = [];
    this.SizeList = [];
    this.Count = 0;
    this.Updated = false;
    this.StartTime = new Date().getTime();
}
LayoutPass.MaxCount = 250;
//#endregion