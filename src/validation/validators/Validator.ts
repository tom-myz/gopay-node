import { Required } from "./Required"
import { Numeric } from "./Numeric"
import { UUID } from "./UUID"
import { Email } from "./Email"
import { LengthMin } from "./LengthMin"
import { LengthMax } from "./LengthMax"
import { LengthBetween } from "./LengthBetween"
import { List } from "./List"
import { CardNumber } from "./CardNumber"


export interface IValidator {
    error: string
    valid(value: any): boolean
}

export default {
    Required,
    Numeric,
    UUID,
    Email,
    LengthMin,
    LengthMax,
    LengthBetween,
    List,
    CardNumber
}
