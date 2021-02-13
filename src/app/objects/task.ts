import {FormField} from "./form-field";

export interface Task {
    id: string;
    name: string;
    assignee: string;
    process: string;
    processInstanceId: string;
    variables: Map<string, any>;
    formFields: FormField[];
}
