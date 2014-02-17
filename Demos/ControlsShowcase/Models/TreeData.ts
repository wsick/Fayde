class TreeData extends Fayde.MVVM.ObservableObject{
    Children: Fayde.Collections.ObservableCollection<TreeData>;
    constructor(public Header?: string, public Url?: string, public imagePath?: string, public Index? : number) {
        super();
        this.Children = new Fayde.Collections.ObservableCollection<TreeData>();
    }
} 
export = TreeData;