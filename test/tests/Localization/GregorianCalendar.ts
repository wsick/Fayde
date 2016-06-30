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
        
        
        var days = calendar.AddMonths(date,2);
        
        var dayOfWeek = calendar.GetDayOfWeek(date);
        
        var isLeapYear = calendar.IsLeapYear(1990);
            isLeapYear = calendar.IsLeapYear(1990,1);
        
        
        
    });
    
}