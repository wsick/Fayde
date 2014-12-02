module Fayde.Markup.Internal {
    export interface IResourcesActor {
        start();
        end();
        get(): ResourceDictionary[];
    }

    export function createResourcesActor (cur: IActiveObject): IResourcesActor {
        var stack: ResourceDictionary[] = [];
        return {
            start () {
                if (cur.rd)
                    stack.push(cur.rd);
            },
            end () {
                if (cur.rd)
                    stack.pop();
            },
            get (): ResourceDictionary[] {
                var res = stack.slice(0);
                if (cur.dobj instanceof FrameworkElement) {
                    var crd = cur.dobj.ReadLocalValue(FrameworkElement.ResourcesProperty);
                    if (crd)
                        res.push(crd);
                }
                return res;
            }
        }
    }
}