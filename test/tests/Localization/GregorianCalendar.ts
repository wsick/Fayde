import GregorianCalendar = Fayde.Localization.GregorianCalendar;

export function load() {
    QUnit.module("Localization/GregorianCalendar");
    
    test("Days in month", () => {
        var calendar = new GregorianCalendar();
        
        var date = DateTime.Now;
        
        throws(() => {
            var days = calendar.GetDaysInMonth(0,0,0);
            console.log(days);
        }, undefined, "Should throw when getting days of invalid year/month or era.");
        
        
        try {
            var days = calendar.AddMonths(date,2);
            
        } catch (err) {
            ok(false, "adding months should not error. " + err.toString());
        }
        
        try {
            var dayOfWeek = calendar.GetDayOfWeek(date);
            
        } catch (err) {
            ok(false, "get day of week should not error. " + err.toString());
        }
        
        try {
            var isLeapYear = calendar.IsLeapYear(1990);
            isLeapYear = calendar.IsLeapYear(1990,1);
            
        } catch (err) {
            ok(false, "is leap year should not error. " + err.toString());
        }
        
        
        
    });
    
}