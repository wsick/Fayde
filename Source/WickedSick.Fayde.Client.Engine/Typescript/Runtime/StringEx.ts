class StringEx {
    static Format(format: string, ...items: any[]): string {
        var args = arguments;
        return format.replace(/{(\d+)}/g, function (match: string, num: string) {
            var i = parseInt(num);
            return typeof items[i] != 'undefined'
              ? items[i]
              : match;
        });
    }
}