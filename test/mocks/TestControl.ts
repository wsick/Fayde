class TestControl extends Fayde.Controls.ContentControl {
    CallbackFired: boolean = false;
    TestCallback(sender: any, e: EventArgs) {
        this.CallbackFired = true;
    }
}
Fayde.RegisterType(TestControl, "window", "http://schemas.test.com/"); 