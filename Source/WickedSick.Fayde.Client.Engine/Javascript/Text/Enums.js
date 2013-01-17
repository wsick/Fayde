
(function (namespace) {
    namespace._BreakType = {
        Unknown: 0,
        Space: 1,
        OpenPunctuation: 2,
        ClosePunctuation: 3,
        InFixSeparator: 4,
        Numeric: 5,
        Alphabetic: 6,
        WordJoiner: 7,
        ZeroWidthSpace: 8,
        BeforeAndAfter: 9,
        NonBreakingGlue: 10,
        Inseparable: 11,
        Before: 12,
        Ideographic: 13,
        CombiningMark: 14,
        Contingent: 15,
        Ambiguous: 16,
        Quotation: 17,
        Prefix: 18
    };
    namespace._LayoutWordType = {
        Unknown: 0,
        Numeric: 1,
        Alphabetic: 2,
        Ideographic: 3,
        Inseparable: 4
    };
    namespace._CharType = {
    };
})(window);