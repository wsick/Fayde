
module Fayde.Controls.Internal {
    export class ObservableObjectCollection extends Collections.ObservableCollection<any> {
        IsReadOnly: boolean = false;

        constructor(collection?: Fayde.IEnumerable<any>) {
            super();
            if (!collection)
                return;
            var enumerator = collection.GetEnumerator();
            while (enumerator.MoveNext()) {
                this.Add(enumerator.Current);
            }
        }

        Add(value: any) {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.Add(value);
        }
        AddRange(values: any[]) {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.AddRange(values);
        }
        Insert(item: any, index: number) {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.Insert(item, index);
        }
        RemoveAt(index: number) {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.RemoveAt(index);
        }
        SetValueAt(index: number, item: any) {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.SetValueAt(index, item);
        }
        Clear() {
            if (this.IsReadOnly)
                throw new InvalidOperationException("ObservableObjectCollection is read only.");
            super.Clear();
        }
    }
}