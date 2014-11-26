module Fayde.Markup.Internal {
    export interface IPropertyActor {
        init(nstate: any);
        start(ownerType: any, name: string);
        end(ownerType: any, name: string);
        setContent(obj: any, key?: any);
        setContentText(text: string);
        addObject(obj: any, key?: any);
    }

    export function createPropertyActor (cur: IActiveObject, extractType: (text: string) => any, extractDP: (text: string) => any): IPropertyActor {
        var state = {
            $$coll: undefined,
            $$arr: undefined,
            $$cprop: undefined,
            $$objs: undefined,
            $$objkeys: undefined,
            $$apropd: undefined,
            $$aprop: undefined,
            $$eprop: undefined
        };

        function getContentProp (): DependencyProperty {
            return state.$$cprop = (state.$$cprop || Content.Get(cur.type));
        }

        function prepareContent (): boolean {
            if (state.$$coll || state.$$arr)
                return true;
            var cprop = getContentProp();
            if (!cprop)
                throw new XamlParseException("Cannot set content for object of type '" + cur.type.name + "'.");
            if (!cprop.IsImmutable)
                return false;
            var co = cur.dobj.GetValue(cprop);
            if (!co)
                return false;
            state.$$coll = nullstone.ICollection_.as(co);
            state.$$arr = (typeof co === "array") ? co : null;
            return true;
        }

        function convert (propd: DependencyProperty, obj: any): any {
            var tt = <any>propd.GetTargetType();
            var val = obj;
            if (typeof val === "string") {
                if (tt === IType_) //NOTE: Handles implicit types that are normally written as {x:Type ...}
                    return extractType(val);
                else if (propd === Setter.PropertyProperty)
                    return extractDP(val);
            } else if (val instanceof Expression) {
                return val;
            }
            return nullstone.convertAnyToType(val, tt);
        }

        function getImplicitKey (obj: any): any {
            if (obj instanceof DataTemplate) {
                var dt = (<DataTemplate>obj).DataType;
                if (!dt)
                    throw new XamlParseException("A DataTemplate in a ResourceDictionary must have x:Key or DataType.");
                return dt;
            } else if (obj instanceof Style) {
                var tt = (<Style>obj).TargetType;
                if (!tt)
                    throw new XamlParseException("A Style in a ResourceDictionary must have x:Key or TargetType.");
                return tt;
            }
        }

        function subscribeEvent (name: string, ebe: EventBindingExpression) {
            if (!(ebe instanceof EventBindingExpression))
                throw new XamlParseException("Cannot subscribe to event '" + name + "' without {EventBinding}.");
            ebe.Init(name);
            ebe.OnAttached(cur.dobj);
        }

        function prepareProperty (ownerType: any, name: string) {
            if (cur.dobj) {
                var otype = ownerType || cur.type;
                state.$$apropd = DependencyProperty.GetDependencyProperty(otype, name, true);
                if (!state.$$apropd) {
                    var ev = cur.dobj[name];
                    if (ev instanceof nullstone.Event)
                        state.$$eprop = name;
                    else
                        throw new XamlParseException("Cannot locate dependency property [" + otype.name + "].[" + name + "]");
                }
            } else if (cur.obj) {
                if (ownerType && cur.type !== ownerType)
                    throw new XamlParseException("Cannot set Attached Property on object that is not a DependencyObject.");
                state.$$aprop = name;
            }
        }

        function setProp (propd: DependencyProperty, objs: any[]) {
            if (propd.IsImmutable) {
                var co = cur.dobj.GetValue(propd);
                if (nullstone.ICollection_.is(co)) {
                    var coll = <nullstone.ICollection<any>>co;
                    for (var i = 0; i < objs.length; i++) {
                        coll.Add(objs[i]);
                    }
                } else if (typeof co === "array") {
                    var arr = <any[]>co;
                    for (var i = 0; i < objs.length; i++) {
                        arr.push(objs[i]);
                    }
                }
            } else {
                cur.dobj.SetValue(propd, convert(propd, objs[0]));
            }
        }

        return {
            init (nstate: any) {
                state = nstate;
            },
            start (ownerType: any, name: string) {
                var fullName = (ownerType ? ownerType.name + "." : "") + name;
                if (state[fullName] === true)
                    throw new XamlParseException("Cannot set '" + fullName + "' more than once.");
                state[fullName] = true;
                prepareProperty(ownerType, name);
            },
            end (ownerType: any, name: string) {
                var objs = state.$$objs;
                var single = objs[0];
                if (single === undefined)
                    return;

                if (state.$$eprop) {
                    subscribeEvent(state.$$eprop, single);
                } else if (state.$$aprop) {
                    cur.obj[state.$$aprop] = single;
                } else if (state.$$apropd) {
                    setProp(state.$$apropd, objs);
                }
            },
            setContent (obj: any, key?: any) {
                if (cur.rd) {
                    key = key || getImplicitKey(obj);
                    if (!key)
                        throw new XamlParseException("Items in a ResourceDictionary must have a x:Key.");
                    cur.rd.Set(key, obj);
                } else if (cur.coll) {
                    cur.coll.Add(obj);
                } else if (cur.arr) {
                    cur.arr.push(obj);
                } else if (cur.dobj) {
                    if (!prepareContent()) {
                        this.start(null, name);
                        cur.dobj.SetValue(state.$$cprop, obj);
                    } else if (state.$$coll) {
                        state.$$coll.Add(obj);
                    } else if (state.$$arr) {
                        state.$$arr.push(obj);
                    }
                }
            },
            setContentText (text: string) {
                if (!cur.dobj)
                    return;

                var tcprop = TextContent.Get(cur.type);
                if (tcprop) {
                    this.start(cur.type, tcprop.Name);
                    cur.dobj.SetValue(tcprop, text);
                    return;
                }

                var cprop = getContentProp();
                if (!cprop)
                    return;
                this.start(cur.type, cprop.Name);
                cur.dobj.SetValue(cprop, convert(cprop, text));
            },
            addObject (obj: any, key?: any) {
                if (!state.$$objs) {
                    state.$$objs = [];
                    state.$$objkeys = [];
                }
                state.$$objs.push(obj);
                state.$$objkeys.push(key);
            }
        };
    }
}