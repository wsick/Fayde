var Nullstone = (function () {
    function Nullstone() { }
    Nullstone.Equals = function Equals(val1, val2) {
        if(val1 == null && val2 == null) {
            return true;
        }
        if(val1 == null || val2 == null) {
            return false;
        }
        if(val1 === val2) {
            return true;
        }
        if(val1.Equals) {
            return val1.Equals(val2);
        }
        return false;
    };
    return Nullstone;
})();
//@ sourceMappingURL=Nullstone.js.map
