"use strict";

var configuration_1 = require("./configuration");
exports.storeCreateSchema = Object.assign({
    name: "required|min:3|max:64"
}, configuration_1.getConfigurationSchema("configuration."));
exports.storeUpdateSchema = Object.assign({
    name: "string|min:3|max:64"
}, configuration_1.getConfigurationSchema("configuration."));
//# sourceMappingURL=store.js.map