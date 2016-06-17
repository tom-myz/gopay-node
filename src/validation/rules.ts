export type RuleDefinition = [string, (val: any, req?: any, attr?: string) => boolean, string]

export const ruleBoolean: RuleDefinition = [
    "boolean",
    function (val: any): boolean {
        return typeof val === "boolean" || (typeof val === "number" && (val === 0 || val === 1))
    },
    "The :attribute is not of boolean type."
]

export const ruleObject: RuleDefinition = [
    "object",
    function (val: any): boolean {
        return typeof val === "object" && val !== null
    },
    "The :attribute is not object."
]

export const ruleUUID: RuleDefinition = [
    "uuid",
    function (val: string): boolean {
        return val.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).length !== null
    },
    "The :attribute is valid UUID."
]
