import { flatten } from "flat";

function isPrimitive(value: any): boolean {
    return typeof value === "object"
        ? value === null
        : typeof value !== "function";
}

function isObject(value: any): boolean {
    return value === Object(value);
}

/*
function isBlob(value: any): boolean {
    return value
        && typeof value.size === "number"
        && typeof value.type === "string"
        && typeof value.slice === "function";
}

function isFile(value: any): boolean {
    return isBlob(value)
        && (typeof value.lastModifiedDate === "object" || typeof value.lastModified === "number")
        && typeof value.name === "string";
}
*/

function isBuffer(value: any): boolean {
    return !!value.buffer
        && typeof value.byteOffset === "number";
}

/*
function isDate(value: any): boolean {
    return value instanceof Date;
}
*/

export function containsBinaryData(data: any): boolean {
    let hasBinary: boolean = false;

    if (isPrimitive(data)) {
        return hasBinary;
    } else if (isBuffer(data)) {
        hasBinary = true;
    } else if (Array.isArray(data)) {
        hasBinary = data.reduce((result: boolean, value: any) => result || containsBinaryData(value), hasBinary);
    } else if (isObject(data)) {
        hasBinary = Object.keys(data)
            .reduce((result: boolean, key: any) => result || containsBinaryData(data[key]), hasBinary);
    }

    return hasBinary;
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
