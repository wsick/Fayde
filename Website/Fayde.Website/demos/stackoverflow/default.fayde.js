(function () {
    var Root = Nullstone.Create("Root", Page);

    Root.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    var QuestionsItemsControl;
    Root.Instance.OnLoaded = function (o, e) {
        QuestionsItemsControl = Nullstone.As(this.FindName("QuestionsItemsControl"), ItemsControl);

        var root = this;
        var request = new AjaxJsonRequest(
            function (json) { root.HandleQuestionResponse(json); },
            function (error) { });
        request.Get("so.ashx", "pagesize=10&order=desc&sort=activity&tagged=silverlight&site=stackoverflow");
    };

    Root.Instance.HandleQuestionResponse = function (json) {
        debugger;
        QuestionsItemsControl.ItemsSource = json.items;
    };

    Nullstone.FinishCreate(Root);

    return Root;
})()