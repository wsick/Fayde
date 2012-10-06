
namespace WickedSick.Thea.Helpers
{
    public interface IJavascriptContext
    {
        int? ID { get; }
        void Execute(string expression);
        string Eval(string expression);
    }
}