import {Validator} from "./validators/Validator";

export type ValidationSchema = {
    [field: string]: Array<Validator>
}
