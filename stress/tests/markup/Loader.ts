import StressTest = require('../StressTest');

class Loader extends StressTest {
    xm: nullstone.markup.xaml.XamlMarkup;

    prepare (ready?: () => any): boolean {
        Fayde.Markup.Resolve('lib/fayde/themes/Metro.theme.xml')
            .then(xm => {
                this.xm = xm;
                ready();
            }, err => console.error(err));
        return true;
    }

    runIteration () {
        var root = Fayde.Markup.Load(null, this.xm);
    }
}
export = Loader;