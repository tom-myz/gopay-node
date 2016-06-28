"use strict";
const configuration_1 = require("./configuration");
exports.storeCreateSchema = Object.assign({
    name: "required"
}, configuration_1.getConfigurationSchema("configuration."));
exports.storeUpdateSchema = Object.assign({
    name: ""
}, configuration_1.getConfigurationSchema("configuration."));
//# sourceMappingURL=store.js.map