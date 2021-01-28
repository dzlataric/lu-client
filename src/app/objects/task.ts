import {FormField} from "./form-field";

export interface Task {
    id: string;
    name: string;
    assignee: string;
    formFields: FormField[];
}
