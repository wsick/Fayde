
namespace Fayde.Xaml
{
    public interface IJsonConvertible
    {
        string ToJson(int tabIndents, IJsonOutputModifiers outputMods);
    }
}