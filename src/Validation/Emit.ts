module Fayde.Validation {
    export function Emit (fe: FrameworkElement, binding: Data.Binding, oldError: ValidationError, error: ValidationError) {
        if (oldError && error) {
            AddError(fe, error);
            RemoveError(fe, oldError);
            if (binding.NotifyOnValidationError) {
                raiseBindingValidationError(fe, new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
                raiseBindingValidationError(fe, new ValidationErrorEventArgs(ValidationErrorEventAction.Added, error));
            }
        } else if (oldError) {
            RemoveError(fe, oldError);
            if (binding.NotifyOnValidationError)
                raiseBindingValidationError(fe, new ValidationErrorEventArgs(ValidationErrorEventAction.Removed, oldError));
        } else if (error) {
            AddError(fe, error);
            if (binding.NotifyOnValidationError)
                raiseBindingValidationError(fe, new ValidationErrorEventArgs(ValidationErrorEventAction.Added, error));
        }
    }

    function raiseBindingValidationError (fe: FrameworkElement, args: Validation.ValidationErrorEventArgs) {
        args.OriginalSource = fe;
        for (var cur = fe; cur instanceof FrameworkElement && !args.Handled; cur = <FrameworkElement>cur.Parent) {
            cur.OnBindingValidationError(args);
        }
    }
}