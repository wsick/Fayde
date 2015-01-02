import Entity = Fayde.MVVM.Entity;

var NAME_REQUIRED = "Name is required.";

class NotifyTestEntity extends Entity {
    Id: number = -1;
    Name: string = "";
}
Fayde.MVVM.AutoModel(NotifyTestEntity)
    .Notify("Id", "Name")
    .Validate("Name", (value) => {
        if (!value)
            return [NAME_REQUIRED];
    })
    .Finish();
export = NotifyTestEntity;