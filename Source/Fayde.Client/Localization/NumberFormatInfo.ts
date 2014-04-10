module Fayde.Localization {
    export class NumberFormatInfo {
        CurrencyDecimalDigits: number = 2;
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

        NumberDecimalDigits: number = 2;
        NumberDecimalSeparator: string;
        NumberGroupSeparator: string;
        NumberGroupSizes: number[];
        NumberNegativePattern: number;

        PercentDecimalDigits: number = 2;
        PercentDecimalSeparator: string = ".";
        PercentGroupSeparator: string = ",";
        PercentGroupSizes: number[];
        PercentNegativePattern: number;
        PercentPositivePattern: number;
        PercentSymbol: string = "%";

        PerMilleSymbol: string = "‰";

        static Instance = new NumberFormatInfo();
    }

    // Currency Negative Patterns
    // 0      ($n)
    // 1      -$n
    // 2      $-n
    // 3      $n-
    // 4      (n$)
    // 5      -n$
    // 6      n-$
    // 7      n$-
    // 8      -n $
    // 9      -$ n
    // 10      n $-
    // 11      $ n-
    // 12      $ -n
    // 13      n- $
    // 14      ($ n)
    // 15      (n $)

    // Number Negative Patterns
    // 0      (n)
    // 1      -n
    // 2      - n
    // 3      n-
    // 4      n -

    // Percent Negative Patterns
    // 0      -n %
    // 1      -n%
    // 2      -%n
    // 3      %-n
    // 4      %n-
    // 5      n-%
    // 6      n%-
    // 7      -% n
    // 8      n %-
    // 9      % n-
    // 10     % -n
    // 11     n- %
}