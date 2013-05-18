
namespace WickedSick.Thea.Helpers
{
    public interface IJavascriptContext
    {
        void Execute(string expression);
        string Eval(string expression);
    }
}