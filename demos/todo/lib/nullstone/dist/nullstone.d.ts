declare module nullstone {
    var version: string;
}
declare module nullstone {
    class DirResolver implements ITypeResolver {
        public loadAsync(moduleName: string, name: string): async.IAsyncRequest<any>;
        public resolveType(moduleName: string, name: string, oresolve: IOutType): boolean;
    }
}
declare module nullstone {
    class Enum {
        public Object: any;
        constructor(Object: any);
        static fromAny<T>(enuType: any, val: any, fallback?: number): number;
    }
}
declare module nullstone {
    interface IEventArgs {
    }
    interface IEventCallback<T extends IEventArgs> {
        (sender: any, args: T): any;
    }
    class Event<T extends IEventArgs> {
        private $$callbacks;
        private $$scopes;
        public has : boolean;
        public on(callback: IEventCallback<T>, scope: any): void;
        public off(callback: IEventCallback<T>, scope: any): void;
        public raise(sender: any, args: T): void;
        public raiseAsync(sender: any, args: T): void;
    }
}
declare module nullstone {
    interface IInterfaceDeclaration<T> {
        name: string;
        is(o: any): boolean;
        as(o: any): T;
        mark(type: any): IInterfaceDeclaration<T>;
    }
    class Interface<T> implements IInterfaceDeclaration<T> {
        public name: string;
        constructor(name: string);
        public is(o: any): boolean;
        public as(o: any): T;
        public mark(type: any): Interface<T>;
    }
}
declare module nullstone {
    interface ICollection<T> extends IEnumerable<T> {
        Count: number;
        GetValueAt(index: number): T;
        SetValueAt(index: number, value: T): any;
        Insert(index: number, value: T): any;
        Add(value: T): any;
        Remove(value: T): boolean;
        RemoveAt(index: number): any;
        Clear(): any;
    }
    var ICollection_: Interface<ICollection<any>>;
}
declare module nullstone {
    interface IEnumerable<T> {
        getEnumerator(isReverse?: boolean): IEnumerator<T>;
    }
    interface IEnumerableDeclaration<T> extends IInterfaceDeclaration<T> {
        empty: IEnumerable<T>;
        fromArray(arr: T[]): IEnumerable<T>;
        toArray(en: IEnumerable<T>): T[];
    }
    var IEnumerable_: IEnumerableDeclaration<any>;
}
declare module nullstone {
    interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }
    interface IEnumeratorDeclaration<T> extends IInterfaceDeclaration<T> {
        empty: IEnumerator<T>;
        fromArray(arr: T[], isReverse?: boolean): IEnumerator<T>;
    }
    var IEnumerator_: IEnumeratorDeclaration<any>;
}
declare module nullstone {
    interface ITypeResolver {
        resolveType(moduleName: string, name: string, oresolve: IOutType): boolean;
    }
}
declare module nullstone {
    interface IIndexedPropertyInfo {
        getValue(obj: any, index: number): any;
        setValue(obj: any, index: number, value: any): any;
    }
    class IndexedPropertyInfo implements IIndexedPropertyInfo {
        public GetFunc: (index: number) => any;
        public SetFunc: (index: number, value: any) => any;
        public propertyType : Function;
        public getValue(ro: any, index: number): any;
        public setValue(ro: any, index: number, value: any): void;
        static find(typeOrObj: any): IndexedPropertyInfo;
    }
}
declare module nullstone {
    interface ILibrary {
        name: string;
        uri: Uri;
        sourcePath: string;
        useMin: boolean;
        exports: string;
        deps: string[];
        rootModule: any;
        loadAsync(): async.IAsyncRequest<Library>;
        resolveType(moduleName: string, name: string, oresolve: IOutType): boolean;
        add(type: any, name?: string): ILibrary;
        addPrimitive(type: any, name?: string): ILibrary;
        addEnum(enu: any, name: string): ILibrary;
    }
    class Library implements ILibrary {
        private $$module;
        private $$sourcePath;
        private $$primtypes;
        private $$types;
        private $$loaded;
        public name: string;
        public uri: Uri;
        public exports: string;
        public deps: string[];
        public useMin: boolean;
        public sourcePath : string;
        constructor(name: string);
        public rootModule : any;
        public loadAsync(): async.IAsyncRequest<Library>;
        private $configModule();
        public resolveType(moduleName: string, name: string, oresolve: IOutType): boolean;
        public add(type: any, name?: string): ILibrary;
        public addPrimitive(type: any, name?: string): ILibrary;
        public addEnum(enu: any, name: string): ILibrary;
    }
}
declare module nullstone {
    interface ILibraryResolver extends ITypeResolver {
        libraryCreated: Event<IEventArgs>;
        loadTypeAsync(uri: string, name: string): async.IAsyncRequest<any>;
        resolve(uri: string): ILibrary;
    }
    interface ILibraryCreatedEventArgs extends IEventArgs {
        library: ILibrary;
    }
    class LibraryResolver implements ILibraryResolver {
        private $$libs;
        public libraryCreated: Event<{}>;
        public dirResolver: DirResolver;
        public createLibrary(uri: string): ILibrary;
        public loadTypeAsync(uri: string, name: string): async.IAsyncRequest<any>;
        public resolve(uri: string): ILibrary;
        public resolveType(uri: string, name: string, oresolve: IOutType): boolean;
        private $$onLibraryCreated(lib);
    }
}
declare module nullstone {
    class Memoizer<T> {
        private $$creator;
        private $$cache;
        constructor(creator: (key: string) => T);
        public memoize(key: string): T;
    }
}
declare module nullstone {
    function getPropertyDescriptor(obj: any, name: string): PropertyDescriptor;
    function hasProperty(obj: any, name: string): boolean;
}
declare module nullstone {
    interface IPropertyInfo {
        name: string;
        getValue(obj: any): any;
        setValue(obj: any, value: any): any;
    }
    class PropertyInfo implements IPropertyInfo {
        private $$getFunc;
        private $$setFunc;
        public name: string;
        public getValue(obj: any): any;
        public setValue(obj: any, value: any): any;
        static find(typeOrObj: any, name: string): IPropertyInfo;
    }
}
declare module nullstone {
    function getTypeName(type: Function): string;
    function getTypeParent(type: Function): Function;
    function addTypeInterfaces(type: Function, ...interfaces: IInterfaceDeclaration<any>[]): void;
    function doesInheritFrom(t: Function, type: any): boolean;
}
declare module nullstone {
    function convertAnyToType(val: any, type: Function): any;
    function convertStringToEnum<T>(val: string, en: any): T;
    function registerTypeConverter(type: Function, converter: (val: any) => any): void;
    function registerEnumConverter(e: any, converter: (val: any) => any): void;
}
declare module nullstone {
    enum UriKind {
        RelativeOrAbsolute = 0,
        Absolute = 1,
        Relative = 2,
    }
    class Uri {
        private $$originalString;
        private $$kind;
        constructor(uri: Uri);
        constructor(uri: string, kind?: UriKind);
        public kind : UriKind;
        public host : string;
        public absolutePath : string;
        public scheme : string;
        public fragment : string;
        public originalString : string;
        public toString(): string;
        public equals(other: Uri): boolean;
        static isNullOrEmpty(uri: Uri): boolean;
    }
}
declare module nullstone {
    interface IOutType {
        type: any;
        isPrimitive: boolean;
    }
    interface ITypeManager {
        defaultUri: string;
        xUri: string;
        resolveLibrary(uri: string): ILibrary;
        loadTypeAsync(uri: string, name: string): async.IAsyncRequest<any>;
        resolveType(uri: string, name: string, oresolve: IOutType): boolean;
        add(uri: string, name: string, type: any): ITypeManager;
        addPrimitive(uri: string, name: string, type: any): ITypeManager;
        addEnum(uri: string, name: string, enu: any): ITypeManager;
    }
    class TypeManager implements ITypeManager {
        public defaultUri: string;
        public xUri: string;
        public libResolver: ILibraryResolver;
        constructor(defaultUri: string, xUri: string);
        public resolveLibrary(uri: string): ILibrary;
        public loadTypeAsync(uri: string, name: string): async.IAsyncRequest<any>;
        public resolveType(uri: string, name: string, oresolve: IOutType): boolean;
        public add(uri: string, name: string, type: any): ITypeManager;
        public addPrimitive(uri: string, name: string, type: any): ITypeManager;
        public addEnum(uri: string, name: string, enu: any): ITypeManager;
    }
}
declare module nullstone {
    function Annotation(type: Function, name: string, value: any, forbidMultiple?: boolean): void;
    function GetAnnotations(type: Function, name: string): any[];
    interface ITypedAnnotation<T> {
        (type: Function, ...values: T[]): any;
        Get(type: Function): T[];
    }
    function CreateTypedAnnotation<T>(name: string): ITypedAnnotation<T>;
}
declare module nullstone.async {
    interface IAsyncRequest<T> {
        then(success: (result: T) => any, errored?: (error: any) => any): IAsyncRequest<T>;
    }
    interface IAsyncResolution<T> {
        (resolve: (result: T) => any, reject: (error: any) => any): any;
    }
    function create<T>(resolution: IAsyncResolution<T>): IAsyncRequest<T>;
    function resolve<T>(obj: T): IAsyncRequest<T>;
    function reject<T>(err: any): IAsyncRequest<T>;
    function many<T>(arr: IAsyncRequest<T>[]): IAsyncRequest<T[]>;
}
declare module nullstone {
    function equals(val1: any, val2: any): boolean;
}
declare module nullstone {
    class AggregateError {
        public errors: any[];
        constructor(errors: any[]);
        public flat : any[];
    }
}
declare module nullstone {
    class DirLoadError {
        public path: string;
        public error: any;
        constructor(path: string, error: any);
    }
}
declare module nullstone {
    class LibraryLoadError {
        public library: Library;
        public error: Error;
        constructor(library: Library, error: Error);
    }
}
declare module nullstone.markup {
    interface IMarkupExtension {
        init(val: string): any;
        resolveTypeFields? (resolver: (full: string) => any): any;
        transmute? (os: any[]): any;
    }
    function finishMarkupExtension(me: IMarkupExtension, prefixResolver: INsPrefixResolver, resolver: events.IResolveType, os: any[]): any;
}
declare module nullstone.markup {
    interface INsPrefixResolver {
        lookupNamespaceURI(prefix: string): string;
    }
    interface IMarkupExtensionParser {
        setNamespaces(defaultXmlns: string, xXmlns: string): IMarkupExtensionParser;
        onResolveType(cb?: events.IResolveType): IMarkupExtensionParser;
        onResolveObject(cb?: events.IResolveObject): IMarkupExtensionParser;
        onResolvePrimitive(cb?: events.IResolvePrimitive): IMarkupExtensionParser;
        onError(cb?: events.IError): IMarkupExtensionParser;
        parse(val: string, resolver: INsPrefixResolver, os: any[]): any;
    }
}
declare module nullstone.markup {
    interface IMarkupParser<T> {
        on(listener: IMarkupSax<T>): IMarkupParser<T>;
        setNamespaces(defaultXmlns: string, xXmlns: string): IMarkupParser<T>;
        setExtensionParser(parser: IMarkupExtensionParser): IMarkupParser<T>;
        parse(root: T): any;
        skipBranch(): any;
        resolvePrefix(prefix: string): string;
        walkUpObjects(): IEnumerator<any>;
    }
    var NO_PARSER: IMarkupParser<any>;
    interface IMarkupSax<T> {
        resolveType?: events.IResolveType;
        resolveObject?: events.IResolveObject;
        resolvePrimitive?: events.IResolvePrimitive;
        resolveResources?: events.IResolveResources;
        branchSkip?: events.IBranchSkip<T>;
        object?: events.IObject;
        objectEnd?: events.IObjectEnd;
        contentText?: events.IText;
        name?: events.IName;
        propertyStart?: events.IPropertyStart;
        propertyEnd?: events.IPropertyEnd;
        attributeStart?: events.IAttributeStart;
        attributeEnd?: events.IAttributeEnd;
        error?: events.IResumableError;
        end?: () => any;
    }
    function createMarkupSax<T>(listener: IMarkupSax<T>): IMarkupSax<T>;
}
declare module nullstone.markup {
    class Markup<T> {
        public uri: Uri;
        public root: T;
        constructor(uri: string);
        public createParser(): IMarkupParser<T>;
        public resolve(typemgr: ITypeManager, customCollector?: ICustomCollector): async.IAsyncRequest<any>;
        public loadAsync(): async.IAsyncRequest<Markup<T>>;
        public loadRoot(data: string): T;
        public setRoot(markup: T): Markup<T>;
    }
}
declare module nullstone.markup {
    interface ICustomCollector {
        (ownerUri: string, ownerName: string, propName: string, val: any): any;
    }
    interface IMarkupDependencyResolver<T> {
        add(uri: string, name: string): boolean;
        collect(root: T, customCollector?: ICustomCollector): any;
        resolve(): async.IAsyncRequest<any>;
    }
    class MarkupDependencyResolver<T> implements IMarkupDependencyResolver<T> {
        public typeManager: ITypeManager;
        public parser: IMarkupParser<T>;
        private $$uris;
        private $$names;
        private $$resolving;
        constructor(typeManager: ITypeManager, parser: IMarkupParser<T>);
        public collect(root: T, customCollector?: ICustomCollector): void;
        public add(uri: string, name: string): boolean;
        public resolve(): async.IAsyncRequest<any>;
    }
}
declare module nullstone.markup.events {
    interface IResolveType {
        (xmlns: string, name: string): IOutType;
    }
    interface IResolveObject {
        (type: any): any;
    }
    interface IResolvePrimitive {
        (type: any, text: string): any;
    }
    interface IResolveResources {
        (owner: any, ownerType: any): any;
    }
    interface IBranchSkip<T> {
        (root: T, obj: any): any;
    }
    interface IObject {
        (obj: any, isContent: boolean): any;
    }
    interface IObjectEnd {
        (obj: any, key: any, isContent: boolean, prev: any): any;
    }
    interface IText {
        (text: string): any;
    }
    interface IName {
        (name: string): any;
    }
    interface IPropertyStart {
        (ownerType: any, propName: string): any;
    }
    interface IPropertyEnd {
        (ownerType: any, propName: string): any;
    }
    interface IAttributeStart {
        (ownerType: any, attrName: string): any;
    }
    interface IAttributeEnd {
        (ownerType: any, attrName: string, obj: any): any;
    }
    interface IResumableError {
        (e: Error): boolean;
    }
    interface IError {
        (e: Error): any;
    }
}
declare module nullstone.markup.xaml {
    class XamlExtensionParser implements IMarkupExtensionParser {
        private $$defaultXmlns;
        private $$xXmlns;
        private $$onResolveType;
        private $$onResolveObject;
        private $$onResolvePrimitive;
        private $$onError;
        public setNamespaces(defaultXmlns: string, xXmlns: string): XamlExtensionParser;
        public parse(value: string, resolver: INsPrefixResolver, os: any[]): any;
        private $$doParse(ctx, os);
        private $$parseName(ctx);
        private $$startExtension(ctx, os);
        private $$parseXNull(ctx);
        private $$parseXType(ctx);
        private $$parseXStatic(ctx);
        private $$parseKeyValue(ctx, os);
        private $$finishKeyValue(ctx, key, val, os);
        private $$parseSingleQuoted(ctx);
        private $$ensure();
        public onResolveType(cb?: events.IResolveType): XamlExtensionParser;
        public onResolveObject(cb?: events.IResolveObject): XamlExtensionParser;
        public onResolvePrimitive(cb?: events.IResolvePrimitive): XamlExtensionParser;
        public onError(cb?: events.IError): XamlExtensionParser;
    }
}
declare module nullstone.markup.xaml {
    class XamlMarkup extends Markup<Element> {
        static create(uri: string): XamlMarkup;
        static create(uri: Uri): XamlMarkup;
        public createParser(): XamlParser;
        public loadRoot(data: string): Element;
    }
}
declare module nullstone.markup.xaml {
    var DEFAULT_XMLNS: string;
    var DEFAULT_XMLNS_X: string;
    class XamlParser implements IMarkupParser<Element> {
        private $$onResolveType;
        private $$onResolveObject;
        private $$onResolvePrimitive;
        private $$onResolveResources;
        private $$onBranchSkip;
        private $$onObject;
        private $$onObjectEnd;
        private $$onContentText;
        private $$onName;
        private $$onPropertyStart;
        private $$onPropertyEnd;
        private $$onAttributeStart;
        private $$onAttributeEnd;
        private $$onError;
        private $$onEnd;
        private $$extension;
        private $$defaultXmlns;
        private $$xXmlns;
        private $$objectStack;
        private $$skipnext;
        private $$curel;
        private $$curkey;
        constructor();
        public on(listener: IMarkupSax<Element>): XamlParser;
        public setNamespaces(defaultXmlns: string, xXmlns: string): XamlParser;
        public setExtensionParser(parser: IMarkupExtensionParser): XamlParser;
        public parse(el: Element): XamlParser;
        public skipBranch(): void;
        public walkUpObjects(): IEnumerator<any>;
        public resolvePrefix(prefix: string): string;
        private $$handleElement(el, isContent);
        private $$handleResources(owner, ownerType, resEl);
        private $$tryHandleError(el, xmlns, name);
        private $$tryHandlePropertyTag(el, xmlns, name);
        private $$tryHandlePrimitive(el, oresolve, isContent);
        private $$processAttributes(el);
        private $$processAttribute(attr);
        private $$shouldSkipAttr(prefix, name);
        private $$tryHandleXAttribute(uri, name, value);
        private $$handleAttribute(uri, name, value, attr);
        private $$getAttrValue(val, attr);
        private $$destroy();
    }
}
