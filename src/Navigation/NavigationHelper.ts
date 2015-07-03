module Fayde.Navigation {
    export function Navigate (source: DependencyObject, targetName: string, navigateUri: Uri) {
        if (!isExternalTarget(targetName)) {
            if (tryInternalNavigate(source, navigateUri))
                return;
            if (!this.IsUriValidForExternalNav())
                throw new NotSupportedException(Resx.GetString("HyperlinkButton_Internal_Navigate_Failed"));
        }
        if (!Application.Current.AllowNavigation)
            throw new InvalidOperationException(Resx.GetString("HyperlinkButton_Navigation_Not_Allowed"));
        var absoluteUri = getAbsoluteUri();
        if (absoluteUri.IsAbsoluteUri) {
            if (this.IsSafeDestination(absoluteUri)) {
                try {
                    if (!!targetName)
                        XcpImports.NavigateToSafeURI(absoluteUri.OriginalString, targetName, checkUserInitiatedAction);
                    else
                        XcpImports.NavigateToSafeURI(absoluteUri.OriginalString, "_self", checkUserInitiatedAction);
                    return;
                } catch (ioex) {
                    throw new InvalidOperationException("Navigation Failed [" + absoluteUri.toString() + "]");
                }
            }
        }
        throw new InvalidOperationException("Navigation Failed [" + absoluteUri.toString() + "]");
    }

    function isExternalTarget (targetName: string): boolean {
        switch (targetName) {
            case "_blank":
            case "_media":
            case "_search":
            case "_parent":
            case "_self":
            case "_top":
                return true;
            default:
                return false;
        }
    }

    function tryInternalNavigate (source: DependencyObject, navigateUri: Uri) {
        var reference = source;
        var lastSearchedSubtree = source;

        for (var en = walkUp(source); en.moveNext(); ) {
            
        }

        do
        {
            var parent = VisualTreeHelper.GetParent(reference);
            if (parent == null && reference instanceof FrameworkElement)
                parent = (<FrameworkElement>reference).Parent;
            if (parent != null && (INavigate_.is(parent) || VisualTreeHelper.GetParent(parent) == null)) {
                var navigator = findNavigator(parent as FrameworkElement, lastSearchedSubtree);
                if (navigator != null)
                    return navigator.Navigate(navigateUri);
                lastSearchedSubtree = parent;
            }
            reference = parent;
        } while (reference != null);
        return false;
    }

    function findNavigator (): INavigator {

    }

    function walkUp (xobj: XamlObject): nullstone.IEnumerator<XamlObject> {
        var e = {
            current: xobj,
            moveNext (): boolean {
                if (!e.current)
                    return false;
                e.current = e.current.Parent;
                return !!e.current;
            }
        };
        return e;
    }
}