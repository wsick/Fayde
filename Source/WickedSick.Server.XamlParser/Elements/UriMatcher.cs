using System;
using System.Collections.Generic;
using System.Linq;

namespace WickedSick.Server.XamlParser.Elements
{
    internal class UriMatcher
    {
        protected string MatchTemplate;
        protected int i;
        protected string Actual;
        protected int j;
        protected string OutputTemplate;

        protected bool IsSuccess;
        protected string MappedUri;

        protected List<TokenInfo> Tokens;

        protected UriMatcher(string matchTemplate, string outputTemplate, string actual)
        {
            MatchTemplate = matchTemplate;
            OutputTemplate = outputTemplate;
            Actual = actual;
        }

        public static bool TryMatch(string matchTemplate, string outputTemplate, string actual, out string mappedUri)
        {
            mappedUri = null;
            var matcher = new UriMatcher(matchTemplate, outputTemplate, actual);
            matcher.Match();
            if (!matcher.IsSuccess)
                return false;
            mappedUri = matcher.MappedUri;
            return true;
        }

        private void Match()
        {
            Tokens = new List<TokenInfo>();
            IsSuccess = false;
            MappedUri = string.Empty;
            i = 0;
            j = 0;
            if (MatchTemplate.Length == 0)
            {
                IsSuccess = Actual.Length == 0;
                MappedUri = IsSuccess ? BuildMappedUri() : null;
                return;
            }
            while (i < MatchTemplate.Length && j < Actual.Length)
            {
                if (MatchTemplate[i] == '{')
                {
                    var tokenInfo = CollectTokenInfo();
                    Tokens.Add(tokenInfo);
                    FindTokenValue(tokenInfo);
                    continue;
                }
                if (MatchTemplate[i] != Actual[j])
                    return;
                i++;
                j++;
            }
            MappedUri = BuildMappedUri();
            IsSuccess = true;
        }

        private void FindTokenValue(TokenInfo tokenInfo)
        {
            if (tokenInfo.Terminator == '\0')
            {
                tokenInfo.Value = Actual.SubstringSafe(j);
                if (tokenInfo.Value != null)
                    j += tokenInfo.Value.Length;
                return;
            }
            tokenInfo.Value = string.Empty;
            while (j < Actual.Length)
            {
                if (Actual[j] == tokenInfo.Terminator)
                    return;
                tokenInfo.Value += Actual[j];
                j++;
            }
        }

        private TokenInfo CollectTokenInfo()
        {
            var tokenInfo = new TokenInfo();
            var index = MatchTemplate.IndexOf('}', i);
            if (index < 0)
                throw new InvalidOperationException("Invalid Uri format. '{' needs a closing '}'.");
            var len = index - i + 1; //length of '{test}' = 6
            tokenInfo.Identifier = MatchTemplate.SubstringSafe(i + 1, len - 2);
            if (string.IsNullOrWhiteSpace(tokenInfo.Identifier))
                throw new InvalidOperationException("Invalid Uri format. '{}' must contain an identifier.");
            i += len; //advances i just past '}'
            tokenInfo.Terminator = (i + 1) < MatchTemplate.Length ? MatchTemplate[i] : '\0';
            return tokenInfo;
        }

        private string BuildMappedUri()
        {
            return Tokens.Aggregate(OutputTemplate, (cur, token) => cur.Replace("{" + token.Identifier + "}", token.Value));
        }

        protected class TokenInfo
        {
            public string Identifier;
            public char Terminator;
            public string Value;
        }
    }

    internal static class StringEx
    {
        public static string SubstringSafe(this string s, int index)
        {
            if ((index + 1) >= s.Length)
                return null;
            return s.Substring(index);
        }

        public static string SubstringSafe(this string s, int index, int len)
        {
            if (len <= 0)
                return null;
            if ((index + len) >= s.Length)
                return null;
            return s.Substring(index, len);
        }
    }
}