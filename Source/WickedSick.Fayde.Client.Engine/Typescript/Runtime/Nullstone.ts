class Nullstone {
    static Equals(val1: any, val2: any): bool {
        if (val1 == null && val2 == null)
            return true;
        if (val1 == null || val2 == null)
            return false;
        if (val1 === val2)
            return true;
        if (val1.Equals)
            return val1.Equals(val2);
        return false;
    }
}