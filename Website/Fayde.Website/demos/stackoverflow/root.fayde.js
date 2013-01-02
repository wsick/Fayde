/// <reference path="../../scripts/Fayde.js"/>

var Fayde;
(function (Fayde) {
    var Demos;
    (function (Demos) {
        var StackOverflow;
        (function (StackOverflow) {
            var Root = Nullstone.Create("Root", Page);

            Root.Instance.Init = function () {
                this.Init$Page();
                this.$PageNumber = 1;
                this.Loaded.Subscribe(this.OnLoaded, this);
            };

            Root.Instance.OnLoaded = function (o, e) {
                this.$QuestionsItemsControl = Nullstone.As(this.FindName("QuestionsItemsControl"), ItemsControl);
                this.$PreviousPageButton = Nullstone.As(this.FindName("PreviousPageButton"), Button);
                this.$NextPageButton = Nullstone.As(this.FindName("NextPageButton"), Button);

                this.$NextPageButton.Click.Subscribe(this.Next_Click, this);
                this.GetPage(1);
            };


            Root.Instance.HandleQuestionResponse = function (json) {
                //debugger;
                this.$QuestionsItemsControl.ItemsSource = json.items;
            };

            Root.Instance.Previous_Click = function (o, e) {
                this.$PageNumber--;
                this.GetPage(this.$PageNumber);
            };

            Root.Instance.Next_Click = function (o, e) {
                this.$PageNumber++;
                this.GetPage(this.$PageNumber);
            };

            Root.Instance.GetPage = function (page) {
                if (this.$Request != null)
                    return;
                var root = this;
                this.$Request = new AjaxJsonRequest(
                    function (json) { root.$Request = null; root.HandleQuestionResponse(json); },
                    function (error) { root.$Request = null; });
                this.$Request.Get("so.ashx", "tagged=silverlight&sort=activity&page=" + page);
            };

            Nullstone.FinishCreate(Root);
            StackOverflow.Root = Root;
        })(StackOverflow || (StackOverflow = {}));
        Demos.StackOverflow = StackOverflow;
    })(Demos || (Demos = {}));
    Fayde.Demos = Demos;
})(Fayde || (Fayde = {}));