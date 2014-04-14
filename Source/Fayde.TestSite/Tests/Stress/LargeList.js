define(["require", "exports"], function(require, exports) {
    var LargeListViewModel = (function () {
        function LargeListViewModel() {
            this.Items = [];
            for (var i = 0; i < 1000000; i++) {
                this.Items.push("ListBoxItem " + i);
            }
        }
        return LargeListViewModel;
    })();
    
    return LargeListViewModel;
});
