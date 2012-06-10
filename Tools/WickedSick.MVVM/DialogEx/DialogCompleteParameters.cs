
namespace WickedSick.MVVM.DialogEx
{
    internal class DialogCompleteParameters : IDialogCompleteParameters
    {
        public DialogCompleteParameters(bool? result, object data)
        {
            Result = result;
            Data = data;
        }

        public bool? Result { get; private set; }
        public object Data { get; private set; }
    }
}