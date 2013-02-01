using System;
using System.Text;
using WickedSick.Server.XamlParser.Elements.Core;
using WickedSick.Server.XamlParser.Elements.Data;

namespace WickedSick.Server.XamlParser
{
    internal class MarkupExpressionParser
    {
        private string _remaining;
        private char _next;

        private delegate object ExpressionHandler();

        public MarkupExpressionParser(string expression)
        {
            _remaining = expression;
        }

        public object ParseExpression()
        {
            if (_remaining.StartsWith("{}"))
                return _remaining.Substring(2);

            if (_remaining[_remaining.Length - 1] != '}')
                throw new Exception("Expression must end with '}'");

            object result = null;
            bool rv = false;

            if (!rv)
                rv = TryHandler("Binding", ParseBinding, out result);
            if (!rv)
                rv = TryHandler("StaticResource", ParseStaticResource, out result);
            if (!rv)
                rv = TryHandler("TemplateBinding", ParseTemplateBinding, out result);
            if (!rv)
                rv = TryHandler("RelativeSource", ParseRelativeSource, out result);

            return result;
        }

        private bool MatchExpression(string match, out int end)
        {
            if (_remaining.Length < 2)
            {
                end = 1;
                return false;
            }

            if (_remaining[0] != '{')
            {
                end = 2;
                return false;
            }

            int i;
            bool found = false;
            for (i = 1; i < _remaining.Length; i++)
            {
                if (_remaining[i] == ' ')
                    continue;
                found = true;
                break;
            }

            if (!found)
            {
                end = 3;
                return false;
            }

            if (i + match.Length > _remaining.Length)
            {
                end = 4;
                return false;
            }

            int c;
            for (c = 0; c < match.Length; c++)
            {
                if (_remaining[i + c] == match[c])
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

        private bool TryHandler(string match, ExpressionHandler handler, out object result)
        {
            int len;
            if (!MatchExpression(match, out len))
            {
                result = null;
                return false;
            }

            _remaining = _remaining.Substring(len).TrimStart();
            if (_remaining.Length == 0)
                throw new Exception("Expression did not end in '}'");
            result = handler();
            return true;
        }

        public Binding ParseBinding()
        {
            Binding binding = new Binding();

            if (_remaining == "}")
                return binding;

            string piece = GetNextPiece();

            if (piece.StartsWith("{"))
                throw new Exception("{{ not permissible in this context");

            if (_next == '=')
                HandleProperty(binding, piece);
            else
                binding.Path = piece;

            while ((piece = GetNextPiece()) != null)
            {
                HandleProperty(binding, piece);
            };

            return binding;
        }

        public StaticResource ParseStaticResource()
        {
            if (!_remaining.EndsWith("}"))
                throw new Exception("Whitespace is not allowed after the end of the expression");

            string name = GetNextPiece();

            return new StaticResource(name);
        }

        public TemplateBinding ParseTemplateBinding()
        {
            TemplateBinding tb = new TemplateBinding();

            string prop = GetNextPiece();

            tb.SourcePropertyName = prop;
            // tb.Source will be filled in elsewhere between attaching the change handler.

            return tb;
        }

        public RelativeSource ParseRelativeSource()
        {
            string mode_str = GetNextPiece();

            try
            {
                return new RelativeSource((RelativeSourceMode)Enum.Parse(typeof(RelativeSourceMode), mode_str, true));
            }
            catch
            {
                throw new XamlParseException(string.Format("MarkupExpressionParser: Error parsing RelativeSource, unknown mode: {0}", mode_str));
            }
        }

        private void HandleProperty(Binding b, string prop)
        {
            object value = null;
            string str_value = null;

            if (_remaining.StartsWith("{"))
            {
                value = ParseExpression();
                _remaining = _remaining.TrimStart();

                if (_remaining.Length > 0 && _remaining[0] == ',')
                    _remaining = _remaining.Substring(1);

                if (value is string)
                    str_value = (string)value;
            }
            else
            {
                str_value = GetNextPiece();
            }

            switch (prop)
            {
                case "FallbackValue":
                    b.FallbackValue = value ?? str_value;
                    break;
                case "Mode":
                    if (str_value == null)
                        throw new XamlParseException(string.Format("Invalid type '{0}' for Mode.", value == null ? "null" : value.GetType().ToString()));
                    str_value = str_value.Trim();
                    b.Mode = (BindingMode)Enum.Parse(typeof(BindingMode), str_value, true);
                    break;
                case "Path":
                    if (str_value == null)
                        throw new XamlParseException(string.Format("Invalid type '{0}' for Path.", value == null ? "null" : value.GetType().ToString()));
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
                    if (!bool.TryParse(str_value, out bl))
                        throw new Exception(string.Format("Invalid value {0} for NotifyValidationOnError.", str_value));
                    b.NotifyOnValidationError = bl;
                    break;
                case "TargetNullValue":
                    b.TargetNullValue = value ?? str_value;
                    break;
                case "ValidatesOnExceptions":
                    if (!bool.TryParse(str_value, out bl))
                        throw new Exception(string.Format("Invalid value {0} for ValidatesOnExceptions.", str_value));
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
                        throw new Exception(string.Format("Invalid value {0} for RelativeSource.", value));
                    b.RelativeSource = rs;
                    break;
                case "ElementName":
                    b.ElementName = (string)value ?? str_value;
                    break;
                case "UpdateSourceTrigger":
                    b.UpdateSourceTrigger = (UpdateSourceTrigger)Enum.Parse(typeof(UpdateSourceTrigger), str_value, true);
                    break;
                default:
                    throw new XamlParseException("Unknown Binding property");
            }
        }

        private string GetNextPiece()
        {
            bool inString = false;
            int end = 0;
            char stringTerminator = '\0';
            _remaining = _remaining.TrimStart();
            if (_remaining.Length == 0)
            {
                _next = Char.MaxValue;
                return null;
            }

            StringBuilder piece = new StringBuilder();
            // If we're inside a quoted string we append all chars to our piece until we hit the ending quote.
            while (end < _remaining.Length && (inString || (_remaining[end] != '}' && _remaining[end] != ',' && _remaining[end] != '=')))
            {
                if (inString)
                {
                    if (_remaining[end] == stringTerminator)
                    {
                        inString = false;
                        end++;
                        break;
                    }
                }
                else
                {
                    if (_remaining[end] == '\'' || _remaining[end] == '"')
                    {
                        inString = true;
                        stringTerminator = _remaining[end];
                        end++;
                        continue;
                    }
                }

                // If this is an escape char, consume it and append the next char to our piece.
                if (_remaining[end] == '\\')
                {
                    end++;
                    if (end == _remaining.Length)
                        break; ;
                }
                piece.Append(_remaining[end]);
                end++;
            }

            if (inString && end == _remaining.Length)
                throw new Exception("Unterminated quoted string");

            if (end == _remaining.Length && !_remaining.EndsWith("}"))
                throw new Exception("Binding did not end with '}'");

            if (end == 0)
            {
                _next = Char.MaxValue;
                return null;
            }

            _next = _remaining[end];
            _remaining = _remaining.Substring(end + 1);

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