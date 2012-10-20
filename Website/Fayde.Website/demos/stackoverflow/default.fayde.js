(function () {
    var Root = Nullstone.Create("Root", Page);

    Root.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    var QuestionsItemsControl;
    var PreviousPageButton;
    var NextPageButton;
    var PageNumber = 1;
    var Request;
    Root.Instance.OnLoaded = function (o, e) {
        QuestionsItemsControl = Nullstone.As(this.FindName("QuestionsItemsControl"), ItemsControl);
        PreviousPageButton = Nullstone.As(this.FindName("PreviousPageButton"), Button);
        NextPageButton = Nullstone.As(this.FindName("NextPageButton"), Button);

        NextPageButton.Click.Subscribe(this.Next_Click, this);
        this.GetPage(1);
    };

    Root.Instance.HandleQuestionResponse = function (json) {
        //debugger;
        QuestionsItemsControl.ItemsSource = json.items;
    };

    Root.Instance.Previous_Click = function (o, e) {
        PageNumber--;
        this.GetPage(PageNumber);
    };

    Root.Instance.Next_Click = function (o, e) {
        PageNumber++;
        this.GetPage(PageNumber);
    };

    Root.Instance.GetPage = function (page) {
        if (Request != null)
            return;
        var root = this;
        Request = new AjaxJsonRequest(
            function (json) { Request = null; root.HandleQuestionResponse(json); },
            function (error) { Request = null; });
        Request.Get("so.ashx", "tagged=silverlight&sort=activity&page=" + page);
    };

    Nullstone.FinishCreate(Root);

    return Root;
})()