using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using WickedSick.Server.XamlParser.Elements.Bindings;
using WickedSick.Server.XamlParser;

namespace WickedSick.Server.XamlParser
{
    internal class MarkupExpressionParser
    {
        private delegate object ExpressionHandler(string expression);

        public static object ParseExpression(string expression)
        {
            if (expression.StartsWith("{}"))
                return expression.Substring(2);

            if (expression[expression.Length - 1] != '}')
                throw new Exception("Expression must end with '}'");

            object result = null;
            bool rv = false;

            if (!rv)
                rv = TryHandler("Binding", ParseBinding, ref expression, out result);
            if (!rv)
                rv = TryHandler("StaticResource", ParseStaticResource, ref expression, out result);
            if (!rv)
                rv = TryHandler("TemplateBinding", ParseTemplateBinding, ref expression, out result);
            if (!rv)
                rv = TryHandler("RelativeSource", ParseRelativeSource, ref expression, out result);

            return result;
        }

        private static bool MatchExpression(string match, string expression, out int end)
        {
            if (expression.Length < 2)
            {
                end = 1;
                return false;
            }

            if (expression[0] != '{')
            {
                end = 2;
                return false;
            }

            int i;
            bool found = false;
            for (i = 1; i < expression.Length; i++)
            {
                if (expression[i] == ' ')
                    continue;
                found = true;
                break;
            }

            if (!found)
            {
                end = 3;
                return false;
            }

            if (i + match.Length > expression.Length)
            {
                end = 4;
                return false;
            }

            int c;
            for (c = 0; c < match.Length; c++)
            {
                if (expression[i + c] == match[c])
                    continue;
                end = 5;
                return false;
            }

            if (c != match.Length)
            {
                end = 6;
                return false;
            }

            end = i + c;
            return true;
        }

        private static bool TryHandler(string match, ExpressionHandler handler, ref string expression, out object result)
        {
            int len;
            if (!MatchExpression(match, expression, out len))
            {
                result = null;
                return false;
            }

            expression = expression.Substring(len).TrimStart();
            if (expression.Length == 0)
                throw new Exception("Expression did not end in '}'");
            result = handler(expression);
            return true;
        }

        public static Binding ParseBinding(string expression)
        {
            Binding binding = new Binding();
            char next;

            if (expression == "}")
                return binding;

            string remaining = expression;
            string piece = GetNextPiece(remaining, out next);

            if (piece.StartsWith("{"))
                throw new Exception("{{ not permissible in this context");

            if (next == '=')
                HandleProperty(binding, piece, remaining);
            else
                binding.Path = piece;

            while ((piece = GetNextPiece(remaining, out next)) != null)
            {
                HandleProperty(binding, piece, remaining);
            };

            return binding;
        }

        public static StaticResource ParseStaticResource(string expression)
        {
            if (!expression.EndsWith("}"))
                throw new Exception("Whitespace is not allowed after the end of the expression");

            char next;
            string name = GetNextPiece(expression, out next);

            return new StaticResource(name);
        }

        public static TemplateBinding ParseTemplateBinding(string expression)
        {
            TemplateBinding tb = new TemplateBinding();

            char next;
            string prop = GetNextPiece(expression, out next);

            tb.SourcePropertyName = prop;
            // tb.Source will be filled in elsewhere between attaching the change handler.

            return tb;
        }

        public static RelativeSource ParseRelativeSource(string expression)
        {
            char next;
            string mode_str = GetNextPiece(expression, out next);

            try
            {
                return new RelativeSource((RelativeSourceMode)Enum.Parse(typeof(RelativeSourceMode), mode_str, true));
            }
            catch
            {
                throw new XamlParseException(String.Format("MarkupExpressionParser: Error parsing RelativeSource, unknown mode: {0}", mode_str));
            }
        }

        private static void HandleProperty(Binding b, string prop, string remaining)
        {
            char next;
            object value = null;
            string str_value = null;

            if (remaining.StartsWith("{"))
            {
                value = ParseExpression(remaining);
                remaining = remaining.TrimStart();

                if (remaining.Length > 0 && remaining[0] == ',')
                    remaining = remaining.Substring(1);

                if (value is string)
                    str_value = (string)value;
            }
            else
            {
                str_value = GetNextPiece(remaining, out next);
            }

            switch (prop)
            {
                case "FallbackValue":
                    b.FallbackValue = value ?? str_value;
                    break;
                case "Mode":
                    if (str_value == null)
                        throw new XamlParseException(String.Format("Invalid type '{0}' for Mode.", value == null ? "null" : value.GetType().ToString()));
                    str_value = str_value.Trim();
                    b.Mode = (BindingMode)Enum.Parse(typeof(BindingMode), str_value, true);
                    break;
                case "Path":
                    if (str_value == null)
                        throw new XamlParseException(String.Format("Invalid type '{0}' for Path.", value == null ? "null" : value.GetType().ToString()));
                    b.Path = str_value;
                    break;
                case "Source":
                    // if the expression was: Source="{StaticResource xxx}" then 'value' will be populated
                    // If the expression was  Source="5" then 'str_value' will be populated.
                    if (value is Binding)
                        throw new Exception("Cannot set Binding.Source using another binding");

                    b.Source = value ?? str_value;
                    break;
                case "BindsDirectlyToSource":
                    b.BindsDirectlyToSource = bool.Parse((string)value ?? str_value);
                    break;
                case "StringFormat":
                    b.StringFormat = (string)value ?? str_value;
                    break;
                case "Converter":
                    IValueConverter value_converter = value as IValueConverter;
                    if (value_converter == null && value != null)
                        throw new Exception("A Binding Converter must be of type IValueConverter.");
                    if (value == null)
                        throw new Exception("Binding Converter not found.");
                    b.Converter = value_converter;
                    break;
                case "ConverterCulture":
                    b.ConverterCulture = new System.Globalization.CultureInfo(str_value);
                    break;
                case "ConverterParameter":
                    b.ConverterParameter = value ?? str_value;
                    break;
                case "NotifyOnValidationError":
                    bool bl;
                    if (!Boolean.TryParse(str_value, out bl))
                        throw new Exception(String.Format("Invalid value {0} for NotifyValidationOnError.", str_value));
                    b.NotifyOnValidationError = bl;
                    break;
                case "TargetNullValue":
                    b.TargetNullValue = value ?? str_value;
                    break;
                case "ValidatesOnExceptions":
                    if (!Boolean.TryParse(str_value, out bl))
                        throw new Exception(String.Format("Invalid value {0} for ValidatesOnExceptions.", str_value));
                    b.ValidatesOnExceptions = bl;
                    break;
                case "ValidatesOnDataErrors":
                    if (!bool.TryParse(str_value, out bl))
                        throw new Exception(string.Format("Invalid value {0} for ValidatesOnDataErrors", str_value));
                    b.ValidatesOnDataErrors = bl;
                    break;
                case "ValidatesOnNotifyDataErrors":
                    if (!bool.TryParse(str_value, out bl))
                        throw new Exception(string.Format("Invalid value {0} for ValidatesOnNotifyDataErrors", str_value));
                    b.ValidatesOnNotifyDataErrors = bl;
                    break;
                case "RelativeSource":
                    RelativeSource rs = value as RelativeSource;
                    if (rs == null)
                        throw new Exception(String.Format("Invalid value {0} for RelativeSource.", value));
                    b.RelativeSource = rs;
                    break;
                case "ElementName":
                    b.ElementName = (string)value ?? str_value;
                    break;
                case "UpdateSourceTrigger":
                    b.UpdateSourceTrigger = (UpdateSourceTrigger)Enum.Parse(typeof(UpdateSourceTrigger), str_value, true);
                    break;
                default:
                    throw new Exception(string.Format("Property {0} is not valid for this Expression", prop));
            }
        }

        private static string GetNextPiece(string remaining, out char next)
        {
            bool inString = false;
            int end = 0;
            char stringTerminator = '\0';
            remaining = remaining.TrimStart();
            if (remaining.Length == 0)
            {
                next = Char.MaxValue;
                return null;
            }

            StringBuilder piece = new StringBuilder();
            // If we're inside a quoted string we append all chars to our piece until we hit the ending quote.
            while (end < remaining.Length && (inString || (remaining[end] != '}' && remaining[end] != ',' && remaining[end] != '=')))
            {
                if (inString)
                {
                    if (remaining[end] == stringTerminator)
                    {
                        inString = false;
                        end++;
                        break;
                    }
                }
                else
                {
                    if (remaining[end] == '\'' || remaining[end] == '"')
                    {
                        inString = true;
                        stringTerminator = remaining[end];
                        end++;
                        continue;
                    }
                }

                // If this is an escape char, consume it and append the next char to our piece.
                if (remaining[end] == '\\')
                {
                    end++;
                    if (end == remaining.Length)
                        break; ;
                }
                piece.Append(remaining[end]);
                end++;
            }

            if (inString && end == remaining.Length)
                throw new Exception("Unterminated quoted string");

            if (end == remaining.Length && !remaining.EndsWith("}"))
                throw new Exception("Binding did not end with '}'");

            if (end == 0)
            {
                next = Char.MaxValue;
                return null;
            }

            next = remaining[end];
            remaining = remaining.Substring(end + 1);

            // Whitespace is trimmed from the end of the piece before stripping
            // quote chars from the start/end of the string. 
            while (piece.Length > 0 && char.IsWhiteSpace(piece[piece.Length - 1]))
                piece.Length--;

            if (piece.Length >= 2)
            {
                char first = piece[0];
                char last = piece[piece.Length - 1];
                if ((first == '\'' && last == '\'') || (first == '"' && last == '"'))
                {
                    piece.Remove(piece.Length - 1, 1);
                    piece.Remove(0, 1);
                }
            }

            return piece.ToString();
        }
    }
}