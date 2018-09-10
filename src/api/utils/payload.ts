import { flatten } from "flat";

function isPrimitive(value: any): boolean {
    return typeof value === "object"
        ? value === null
        : typeof value !== "function";
}

function isObject(value: any): boolean {
    return value === Object(value);
}

function isClassInstance(value: any): boolean {
    return typeof value === "object"
        && !(value instanceof Array)
        && value.constructor !== Object;
}

export function containsBinaryData(data: any): boolean {
    if (isPrimitive(data)) {
        return false;
    } else if (isClassInstance(data)) {
        return true;
    } else if (Array.isArray(data)) {
        return data.reduce((result: boolean, value: any) => result || containsBinaryData(value), false);
    } else if (isObject(data)) {
        return Object.keys(data)
            .reduce((result: boolean, key: any) => result || containsBinaryData(data[key]), false);
    }
    
    return false;
}

export function objectToFormData(obj: any): FormData {
    const formData = new FormData();
    const flat = flatten(obj);

    Object.keys(flat).forEach((name: string) => {
        if (flat[name] !== undefined) {
            formData.append(name, flat[name] === null ? "" : flat[name]);
        }
    });

    return formData;
}
