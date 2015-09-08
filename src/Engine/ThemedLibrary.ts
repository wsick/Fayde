module Fayde {
    interface IThemesHash {
        [name: string]: Theme;
    }

    export class ThemedLibrary extends nullstone.Library {
        private $$themes: IThemesHash = {};
        private $$activeTheme: Theme = null;
        private $$activeThemeName: string = null;

        get activeTheme(): Theme {
            return this.$$activeTheme;
        }

        loadAsync(): Promise<nullstone.Library> {
            return super.loadAsync()
                .tap(() => this.ensureThemeLoaded());
        }

        protected ensureThemeLoaded(): Promise<Theme> {
            if (this.$$activeTheme)
                return Promise.resolve(this.$$activeTheme);
            if (!this.$$activeThemeName)
                return Promise.resolve(null);
            return this.changeActiveTheme(this.$$activeThemeName);
        }

        getTheme(name: string): Theme {
            var theme = this.$$themes[name];
            if (!theme)
                theme = this.$$themes[name] = new Theme(name, this.uri);
            return theme;
        }

        changeActiveTheme(name: string): Promise<Theme> {
            this.$$activeThemeName = name;
            var theme = this.getTheme(name);
            return theme.LoadAsync()
                .then(() => this.$$activeTheme = theme);
        }
    }
}