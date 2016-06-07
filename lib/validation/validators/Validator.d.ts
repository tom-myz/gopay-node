import { Required } from "./Required";
import { Numeric } from "./Numeric";
import { UUID } from "./UUID";
import { Email } from "./Email";
import { LengthMin } from "./LengthMin";
import { LengthMax } from "./LengthMax";
import { LengthBetween } from "./LengthBetween";
import { List } from "./List";
import { CardNumber } from "./CardNumber";
export interface IValidator {
    error: string;
    valid(value: any): boolean;
}
declare var _default: {
    Required: typeof Required;
    Numeric: typeof Numeric;
    UUID: typeof UUID;
    Email: typeof Email;
    LengthMin: typeof LengthMin;
    LengthMax: typeof LengthMax;
    LengthBetween: typeof LengthBetween;
    List: typeof List;
    CardNumber: typeof CardNumber;
};
export default _default;
