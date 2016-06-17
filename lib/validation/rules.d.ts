export declare type RuleDefinition = [string, (val: any, req?: any, attr?: string) => boolean, string];
export declare const ruleBoolean: RuleDefinition;
export declare const ruleObject: RuleDefinition;
export declare const ruleUUID: RuleDefinition;
