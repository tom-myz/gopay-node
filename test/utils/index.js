"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinonChai = require("sinon-chai");
/* Chai plugins */
chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
