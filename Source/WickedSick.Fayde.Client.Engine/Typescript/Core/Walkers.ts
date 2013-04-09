/// CODE
/// <reference path="Style.ts" />

module Fayde {
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