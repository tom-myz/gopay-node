import pathToRegex from "path-to-regexp";
import { MockMatcher } from "fetch-mock";

export function pathToRegexMatcher(path: string): MockMatcher {
    return function (url: string) {
        return pathToRegex(path).exec(url) !== null;
    }
}
