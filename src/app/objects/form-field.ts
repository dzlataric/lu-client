import {ValidationConstraint} from "./validation-constraint";

export interface FormField {
    id: string;
    label: string;
    type: any;
    value: any;
    validationConstraints: ValidationConstraint[];
}
