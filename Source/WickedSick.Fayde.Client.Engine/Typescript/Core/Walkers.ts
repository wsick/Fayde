/// <reference path="../Runtime/IEnumerator.ts" />
/// CODE
/// <reference path="Style.ts" />

module Fayde {
    export class VisualTreeWalker {
        static Logical(xnode: XamlNode): IEnumerator {
            return undefined;
        }
    }
    export class DeepStyleWalker {
        Step(): any {

        }

        static Single(style: Style): DeepStyleWalker {
            var walker = new DeepStyleWalker();
            return walker;
        }
        static Multiple(styles: Style[]): DeepStyleWalker {
            var walker = new DeepStyleWalker();
            return walker;
        }
    }
}