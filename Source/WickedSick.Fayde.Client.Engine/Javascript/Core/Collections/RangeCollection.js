/// <reference path="../../Runtime/Nullstone.js" />
/// CODE

//#region Range
var Range = Nullstone.Create("Range", undefined, 2);

Range.Instance.Init = function (start, end) {
    this.Start = start;
    this.End = end;
};

Range.Instance.Count = function () {
    return this.End - this.Start + 1;
};

Nullstone.FinishCreate(Range);
//#endregion

//#region RangeCollection
var RangeCollection = Nullstone.Create("RangeCollection");

RangeCollection.Instance.Init = function () {
    this._ranges = [];
    this._generation = 0;
    this.Count = 0;
};

//#region Properties

Nullstone.Property(RangeCollection, "Ranges", {
    get: function () {
        return RangeCollection.CopyRangeArray(this._ranges, 0, this._ranges.length, 0);
    }
});

//#endregion

RangeCollection.CopyRangeArray = function (rangeArray, startIndex, length, destinationIndex) {
    var result = [];
    for (var i = startIndex; i < length; i++) {
        var r = rangeArray[i];
        result[destinationIndex] = new Range(r.Start, r.End);
        destinationIndex++;
    }
    return result;
};

RangeCollection.Instance.FindRangeIndexForValue = function (value) {
    var min = 0;
    var max = this._ranges.length - 1;
    while (min <= max) {
        var mid = Math.floor(min + ((max - min) / 2));
        var range = this._ranges[mid];
        if (value >= range.Start && value <= range.End)
            return mid;

        if (value < range.Start)
            max = mid - 1;
        else
            min = mid + 1;
    }
    return ~min;
};
RangeCollection.Instance.FindInsertionPosition = function (range) {
    var min = 0;
    var max = this._ranges.length - 1;
    while (min <= max) {
        var mid = Math.floor(min + ((max - min) / 2));
        var midRange = this._ranges[mid];
        if (midRange.End === range.End)
            return mid;

        if (midRange.End > range.End) {
            if (mid > 0 && (this._ranges[mid - 1].End < range.End))
                return mid;
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return min;
};

RangeCollection.Instance.IndexOf = function (value) {
    var offset = 0;
    for (var i = 0; i < this._ranges.length; i++) {
        var range = this._ranges[i];
        if (value >= range.Start && value <= range.End)
            return offset + (value - range.Start);

        offset = offset + (range.End - range.Start + 1);
    }
    return -1;
};
RangeCollection.Instance.Contains = function (value) {
    return this.FindRangeIndexForValue(value) >= 0;
};

RangeCollection.Instance.GetValueAt = function (index) {
    var i;
    var cuml_count;
    var rangeCount = this._ranges.length;
    for (i = 0, cuml_count = 0; i < rangeCount && index >= 0; i++) {
        cuml_count = cuml_count + this._ranges[i].Count();
        if (index < cuml_count)
            return this._ranges[i].End - (cuml_count - index) + 1;
    }

    throw new IndexOutOfRangeException(index);
};

RangeCollection.Instance.Add = function (value) {
    if (!this.Contains(value)) {
        this._generation++;
        this.InsertRange(new Range(value, value));
        this.Count++;
        return true;
    }
    return false;
};
RangeCollection.Instance.Insert = function (position, range) {
    this._ranges.splice(position, 0, range);
};
RangeCollection.Instance.InsertRange = function (range) {
    var position = this.FindInsertionPosition(range);
    var merged_left = this.MergeLeft(range, position);
    var merged_right = this.MergeRight(range, position);

    if (!merged_left && !merged_right) {
        this.Insert(position, range);
    } else if (merged_left && merged_right) {
        this._ranges[position - 1].End = this._ranges[position].End;
        this.RemoveAt(position);
    }
};
RangeCollection.Instance.Remove = function (value) {
    this._generation++;
    return this.RemoveIndexFromRange(value);
};
RangeCollection.Instance.RemoveAt = function (index) {
    this._ranges.splice(index, 1);
};
RangeCollection.Instance.RemoveIndexFromRange = function (index) {
    var range_index = this.FindRangeIndexForValue(index);
    if (range_index < 0)
        return false;

    var range = this._ranges[range_index];
    if (range.Start === index && range.End === index) {
        this.RemoveAt(range_index);
    } else if (range.Start === index) {
        range.Start++;
    } else if (range.End === index) {
        range.End--;
    } else {
        var split_range = new Range(index + 1, range.End);
        range.End = index - 1;
        this.Insert(range_index + 1, split_range);
    }

    this.Count--;
    return true;
};
RangeCollection.Instance.Clear = function () {
    this.Count = 0;
    this._ranges = [];
    this._generation++;
};

RangeCollection.Instance.MergeLeft = function (range, position) {
    var left = position - 1;
    if (left >= 0 && this._ranges[left].End + 1 == range.Start) {
        this._ranges[left].End = range.Start;
        return true;
    }
    return false;
};
RangeCollection.Instance.MergeRight = function (range, position) {
    if (position < this._ranges.length && this._ranges[position].Start - 1 == range.End) {
        this._ranges[position].Start = range.End;
        return true;
    }
    return false;
};

Nullstone.FinishCreate(RangeCollection);
//#endregion