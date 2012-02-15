using System;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Data;
using System.Collections.Generic;
using System.Windows.Markup;

namespace Parser
{
    internal sealed class SL3MarkupExpressionParser : MarkupExpressionParser
    {
        private IntPtr parser;
        private IntPtr target_data;

        public SL3MarkupExpressionParser(object target, string attribute_name, IntPtr parser, IntPtr target_data)
            : base(target, attribute_name)
        {
            this.parser = parser;
            this.target_data = target_data;
        }

        protected override bool ThrowOnNullConverter
        {
            get { return false; }
        }

        protected override object LookupNamedResource(DependencyObject dob, string name)
        {
            if (name == null)
                throw new XamlParseException("you must specify a key in {StaticResource}");

            IntPtr value_ptr = NativeMethods.xaml_lookup_named_item(parser, target_data, name);
            object o = Value.ToObject(null, value_ptr);
            if (value_ptr != IntPtr.Zero)
                NativeMethods.value_delete_value2(value_ptr);

            if (o == null && !parsingBinding)
                throw new XamlParseException(String.Format("Resource '{0}' must be available as a static resource", name));
            return o;
        }

        protected override PropertyPath ParsePropertyPath(string piece)
        {
            Kind k = Deployment.Current.Types.TypeToKind(typeof(PropertyPath));

            bool v_set;
            IntPtr unmanaged_value = IntPtr.Zero;
            try
            {
                if (!NativeMethods.xaml_value_from_str_with_parser(parser, k, AttributeName, piece, out unmanaged_value, out v_set) || !v_set)
                {
                    Console.Error.WriteLine("Unable to parse property path: '{0}'", piece);
                    return null;
                }

                object obj_value = Value.ToObject(typeof(PropertyPath), unmanaged_value);
                PropertyPath path = obj_value as PropertyPath;

                if (path != null)
                    return path;

                Console.Error.WriteLine("Unable to convert property path value: '{0}'", piece);
            }
            finally
            {
                if (unmanaged_value != IntPtr.Zero)
                    Mono.NativeMethods.value_delete_value2(unmanaged_value);
            }

            return null;
        }
    }

    internal sealed class SL4MarkupExpressionParser : MarkupExpressionParser
    {

        private XamlParser parser;
        private XamlObjectElement target_element;

        public SL4MarkupExpressionParser(object target, string attribute_name, XamlParser parser, XamlObjectElement target_element)
            : base(target, attribute_name)
        {
            this.parser = parser;
            this.target_element = target_element;
        }

        protected override bool ThrowOnNullConverter
        {
            get { return true; }
        }

        protected override object LookupNamedResource(DependencyObject dob, string name)
        {
            if (name == null)
                throw new XamlParseException("you must specify a key in {StaticResource}");

            object o = parser.LookupNamedItem(target_element, name);
            if (o == null && !parsingBinding)
                throw new XamlParseException(String.Format("Resource '{0}' must be available as a static resource", name));
            return o;
        }

        protected override PropertyPath ParsePropertyPath(string piece)
        {
            var converter = new XamlTypeConverter(parser, target_element, AttributeName, typeof(PropertyPath));
            var path = converter.ConvertFrom(piece) as PropertyPath;

            if (path == null)
            {
                Console.Error.WriteLine("Error parsing property path: '{0}'.", piece);
                return null;
            }

            return path;
        }
    }

    internal abstract class MarkupExpressionParser
    {

        private StringBuilder piece;
        private object target;
        private string attribute_name;

        protected bool parsingBinding;

        public MarkupExpressionParser()
        {
        }

        public MarkupExpressionParser(object target, string attribute_name)
        {
            this.target = target;
            this.attribute_name = attribute_name;
        }

        public string AttributeName
        {
            get { return attribute_name; }
        }

        protected abstract bool ThrowOnNullConverter
        {
            get;
        }

        public static bool IsTemplateBinding(string expression)
        {
            return MatchExpression("TemplateBinding", expression);
        }

        public static bool IsStaticResource(string expression)
        {
            return MatchExpression("StaticResource", expression);
        }

        public static bool IsBinding(string expression)
        {
            return MatchExpression("Binding", expression);
        }

        public static bool IsExplicitNull(string expression)
        {
            return MatchExpression("x:Null", expression);
        }

        public delegate object ExpressionHandler(ref string expression);

        public object ParseExpression(ref string expression)
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

        private static bool MatchExpression(string match, string expression)
        {
            int dummy;
            return MatchExpression(match, expression, out dummy);
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

        private bool TryHandler(string match, ExpressionHandler handler, ref string expression, out object result)
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
            result = handler(ref expression);
            return true;
        }

        public Binding ParseBinding(ref string expression)
        {
            Binding binding = new Binding();
            parsingBinding = true;
            char next;

            if (expression == "}")
                return binding;

            string remaining = expression;
            string piece = GetNextPiece(ref remaining, out next);

            if (piece.StartsWith("{"))
                throw new Exception("{{ not permissible in this context");

            if (next == '=')
                HandleProperty(binding, piece, ref remaining);
            else
                binding.Path = ParsePropertyPath(piece);

            while ((piece = GetNextPiece(ref remaining, out next)) != null)
            {
                HandleProperty(binding, piece, ref remaining);
            };

            parsingBinding = false;
            return binding;
        }

        public object ParseStaticResource(ref string expression)
        {
            if (!expression.EndsWith("}"))
                throw new Exception("Whitespace is not allowed after the end of the expression");

            char next;
            string name = GetNextPiece(ref expression, out next);

            object o = LookupNamedResource(null, name);

#if !__TESTING
            if (o == null)
                o = Application.Current.Resources[name];
#endif

            return o;
        }

        public object ParseTemplateBinding(ref string expression)
        {
            TemplateBindingExpression tb = new TemplateBindingExpression();

            char next;
            string prop = GetNextPiece(ref expression, out next);

            tb.SourcePropertyName = prop;
            // tb.Source will be filled in elsewhere between attaching the change handler.

            return tb;
        }

        public object ParseRelativeSource(ref string expression)
        {
            char next;
            string mode_str = GetNextPiece(ref expression, out next);

            try
            {
                return new RelativeSource((RelativeSourceMode)Enum.Parse(typeof(RelativeSourceMode), mode_str, true));
            }
            catch
            {
                throw new XamlParseException(String.Format("MarkupExpressionParser:  Error parsing RelativeSource, unknown mode: {0}", mode_str));
            }
        }

        private void HandleProperty(Binding b, string prop, ref string remaining)
        {
            char next;
            object value = null;
            string str_value = null;

            if (remaining.StartsWith("{"))
            {
                value = ParseExpression(ref remaining);
                remaining = remaining.TrimStart();

                if (remaining.Length > 0 && remaining[0] == ',')
                    remaining = remaining.Substring(1);

                if (value is string)
                    str_value = (string)value;
            }
            else
            {
                str_value = GetNextPiece(ref remaining, out next);
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
                    b.Path = ParsePropertyPath(str_value);
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
                    if (value == null && ThrowOnNullConverter)
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
                    break;
            }
        }

        private string GetNextPiece(ref string remaining, out char next)
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

            piece = piece ?? new StringBuilder();
            piece.Length = 0;
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

        protected abstract object LookupNamedResource(DependencyObject dob, string name);
        protected abstract PropertyPath ParsePropertyPath(string piece);
    }
}