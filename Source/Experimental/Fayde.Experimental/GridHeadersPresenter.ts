module Fayde.Experimental {
    import Grid = Fayde.Controls.Grid;
    import RowDefinition = Fayde.Controls.RowDefinition;
    import ColumnDefinition = Fayde.Controls.ColumnDefinition;

    export class GridHeadersPresenterNode extends FENode {
        XObject: GridHeadersPresenter;
        constructor(xobj: GridHeadersPresenter) {
            super(xobj);
        }

        private _ElementRoot: Grid;
        get ElementRoot(): Grid { return this._ElementRoot; }

        DoApplyTemplateWithError(error: BError): boolean {
            if (this._ElementRoot)
                return false;

            var xobj = this.XObject;
            var ghc = xobj.TemplateOwner;
            if (!(ghc instanceof GridHeadersControl))
                return false;

            this._ElementRoot = new Grid();

            if (!this.FinishApplyTemplateWithError(this._ElementRoot, error))
                return false;
            ghc.XamlNode.HeadersPresenter = xobj;
            for (var i = 0, headers = ghc.Headers.ToArray(), len = headers.length; i < len; i++) {
                xobj.OnHeaderAdded(i, headers[i]);
            }
            xobj.LinkControl(ghc.ItemsControl);
            return true;
        }
    }

    export class GridHeadersPresenter extends FrameworkElement {
        TemplateOwner: GridHeadersControl;
        XamlNode: GridHeadersPresenterNode;
        CreateNode(): GridHeadersPresenterNode { return new GridHeadersPresenterNode(this); }

        get GridHeadersControl(): GridHeadersControl {
            return this.TemplateOwner instanceof GridHeadersControl ? this.TemplateOwner : null;
        }
        get Panel(): Grid { return this.XamlNode.ElementRoot; }

        private _Headers: GridHeader[] = [];
        private _HeaderContainers: UIElement[] = [];

        OnHeaderAdded(index: number, header: GridHeader) {
            this._Headers.splice(index, 0, header);

            var grid = this.Panel;
            var coldef = new HeaderColumnDefinition();
            grid.ColumnDefinitions.Insert(index, coldef);
            var linkedGrid = this.LinkedItemsPanel;
            if (linkedGrid)
                coldef.Link(linkedGrid.ColumnDefinitions.GetValueAt(index));

            var containers = this._HeaderContainers;
            var cell = header.GetContainerForCell();
            containers.splice(index, 0, cell);
            header.PrepareContainerForCell(cell);

            for (var i = index, len = containers.length; i < len; i++) {
                Grid.SetColumn(containers[i], i);
            }

            grid.Children.Insert(index, cell);

        }
        OnHeaderRemoved(index: number) {
            var header = this._Headers[index];
            var containers = this._HeaderContainers;
            var grid = this.Panel;
            var coldefs = grid.ColumnDefinitions;

            var cell = containers.splice(index, 1)[0];
            header.ClearContainerForCell(cell);
            grid.Children.RemoveAt(index);

            (<HeaderColumnDefinition>coldefs.GetValueAt(index)).Unlink();
            coldefs.RemoveAt(index);

            for (var i = index, len = containers.length; i < len; i++) {
                Grid.SetColumn(containers[i], i);
            }
        }
        OnHeadersCleared() {
            var grid = this.Panel;
            var coldefs = grid.ColumnDefinitions;
            for (var i = 0, headers = this._Headers, containers = this._HeaderContainers, len = containers.length; i < len; i++) {
                var header = headers[i];
                header.ClearContainerForCell(containers[i]);
                (<HeaderColumnDefinition>coldefs.GetValueAt(i)).Unlink();
            }
            coldefs.Clear();
            grid.Children.Clear();
            this._Headers.length = 0;
            this._HeaderContainers.length = 0;
        }
        OnHeaderChanged(header: GridHeader) {
            var index = this._Headers.indexOf(header);
            var cell = this._HeaderContainers[index];
            header.PrepareContainerForCell(cell);
        }

        private _LinkedItemsControl: GridItemsControl = null;
        get LinkedItemsPanel(): Grid {
            var gic = this._LinkedItemsControl;
            if (!gic)
                return null;
            var presenter = gic.XamlNode.ItemsPresenter;
            if (!presenter)
                return null;
            return presenter.Panel;
        }
        LinkControl(gic: GridItemsControl) {
            this._LinkedItemsControl = gic;
            gic.XamlNode.ListenForPresenterCreated(presenter => this.FinishLinkControl(presenter));
        }
        private FinishLinkControl(presenter: GridItemsPresenter) {
            var grid = this.Panel;
            var linkedDefs = presenter.Panel.ColumnDefinitions;
            for (var i = 0, defs = grid.ColumnDefinitions, len = defs.Count; i < len; i++) {
                (<HeaderColumnDefinition>defs.GetValueAt(i)).Link(linkedDefs.GetValueAt(i));
            }
        }
        UnlinkControl(gic: GridItemsControl) {
            if (!gic)
                return;
            var grid = this.Panel;
            for (var i = 0, defs = grid.ColumnDefinitions, len = defs.Count; i < len; i++) {
                (<HeaderColumnDefinition>defs.GetValueAt(i)).Unlink();
            }
            this._LinkedItemsControl = null;
        }
    }
}