"use strict";

exports.webHookCreateSchema = {
    triggers: "required|array",
    url: "required|url"
};
exports.webHookUpdateSchema = {
    triggers: "array",
    url: "url"
};
//# sourceMappingURL=webhook.js.map