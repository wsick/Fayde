class TestControl extends Fayde.Controls.ContentControl {
    CallbackFired: boolean = false;
    TestCallback(sender: any, e: nullstone.IEventArgs) {
        this.CallbackFired = true;
    }
}
export = TestControl;