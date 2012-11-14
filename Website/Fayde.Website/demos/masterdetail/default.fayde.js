(function () {
    var Root = Nullstone.Create("Root", Page);

    Root.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    Root.Instance.OnLoaded = function (o, e) {
        
    };

    Nullstone.FinishCreate(Root);

    return Root;
})()