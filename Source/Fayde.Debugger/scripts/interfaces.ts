module Gerudo {
    export interface ITreeNode {
        ID: number;
        Name: string;
        TypeName: string;
        Children: ITreeNode[];
    }
}