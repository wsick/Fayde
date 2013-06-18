
namespace WickedSick.Thea.Helpers
{
    public interface IJavascriptContext
    {
        bool IsAlive { get; }
        void Execute(string expression);
        string Eval(string expression);
    }
}