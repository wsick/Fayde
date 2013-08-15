var TimelineProfile = (function () {
    function TimelineProfile() {
    }
    TimelineProfile.Parse = function (isStart, name) {
        if (!isStart)
            return TimelineProfile._FinishEvent("Parse", name);
        TimelineProfile._Events.push({
            Type: "Parse",
            Name: name,
            Time: new Date().valueOf()
        });
    };
    TimelineProfile.Navigate = function (isStart, name) {
        if (!isStart)
            return TimelineProfile._FinishEvent("Navigate", name);
        TimelineProfile._Events.push({
            Type: "Navigate",
            Name: name,
            Time: new Date().valueOf()
        });
    };
    TimelineProfile.LayoutPass = function (isStart) {
        if (!TimelineProfile.IsNextLayoutPassProfiled)
            return;
        if (!isStart) {
            TimelineProfile.IsNextLayoutPassProfiled = false;
            return TimelineProfile._FinishEvent("LayoutPass");
        }
        TimelineProfile._Events.push({
            Type: "LayoutPass",
            Name: "",
            Time: new Date().valueOf()
        });
    };

    TimelineProfile._FinishEvent = function (type, name) {
        var evts = TimelineProfile._Events;
        var len = evts.length;
        var evt;
        for (var i = len - 1; i >= 0; i--) {
            evt = evts[i];
            if (evt.Type === type && (!name || evt.Name === name)) {
                evts.splice(i, 1);
                break;
            }
            evt = null;
        }
        if (!evt)
            return;
        TimelineProfile.Groups.push({
            Type: evt.Type,
            Data: evt.Name,
            Start: evt.Time - TimelineProfile.TimelineStart,
            Length: new Date().valueOf() - evt.Time
        });
    };
    TimelineProfile._Events = [];
    TimelineProfile.Groups = [];
    TimelineProfile.TimelineStart = 0;

    TimelineProfile.IsNextLayoutPassProfiled = true;
    return TimelineProfile;
})();
//# sourceMappingURL=TimelineProfile.js.map
