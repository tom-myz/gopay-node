"use strict";

var configuration_1 = require("./configuration");
exports.storeCreateSchema = Object.assign({
    name: "required"
}, configuration_1.getConfigurationSchema("configuration."));
exports.storeUpdateSchema = Object.assign({
    name: "string"
}, configuration_1.getConfigurationSchema("configuration."));
//# sourceMappingURL=store.js.map