module Fayde {
    interface IThemesHash {
        [name: string]: Theme;
    }

    export class ThemedLibrary extends nullstone.Library {
        private $$themes: IThemesHash = {};
        private $$activeTheme: Theme = null;
        private $$activeThemeName: string;

        get activeTheme(): Theme {
            return this.$$activeTheme;
        }

        loadAsync(): nullstone.async.IAsyncRequest<nullstone.Library> {
            return nullstone.async.create((resolve, reject) => {
                super.loadAsync()
                    .then(() => this.ensureThemeLoaded()
                        .then(() => resolve(this), reject));
            })
        }

        protected ensureThemeLoaded(): nullstone.async.IAsyncRequest<Theme> {
            if (this.$$activeTheme)
                return nullstone.async.resolve(this.$$activeTheme);
            if (!this.$$activeThemeName)
                return nullstone.async.resolve(null);
            return this.changeActiveTheme(this.$$activeThemeName);
        }

        getTheme(name: string): Theme {
            var theme = this.$$themes[name];
            if (!theme)
                theme = this.$$themes[name] = new Theme(name, this.uri);
            return theme;
        }

        changeActiveTheme(name: string): nullstone.async.IAsyncRequest<Theme> {
            this.$$activeThemeName = name;
            var theme = this.getTheme(name);
            return nullstone.async.create((resolve, reject) => {
                theme.LoadAsync()
                    .then(() => {
                        this.$$activeTheme = theme;
                        resolve(theme);
                    }, reject);
            });
        }
    }
}