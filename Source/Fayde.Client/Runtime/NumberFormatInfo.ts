
class NumberFormatInfo {
    CurrencyDecimalDigits: number;
    CurrencyDecimalSeparator: string;
    CurrencyGroupSeparator: string;
    CurrencyGroupSizes: number[];
    CurrencyNegativePattern: number;
    CurrencyPositivePattern: number;
    CurrencySymbol: string;
    
    NaNSymbol: string;
    NegativeInfinitySymbol: string;
    PositiveInfinitySymbol: string;
    NegativeSign: string;
    PositiveSign: string;
    
    NumberDecimalDigits: number;
    NumberDecimalSeparator: string;
    NumberGroupSeparator: string;
    NumberGroupSizes: number[];
    NumberNegativePattern: number;

    PercentDecimalDigits: number;
    PercentDecimalSeparator: string;
    PercentGroupSeparator: string;
    PercentGroupSizes: number[];
    PercentNegativePattern: number;
    PercentPositivePattern: number;
    PercentSymbol: string;

    PerMilleSymbol: string;

    static Instance = new NumberFormatInfo();
} 