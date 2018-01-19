import "ava"

import chai = require("chai")
import chaiAsPromised = require("chai-as-promised")
import sinonChai = require("sinon-chai")

/* Chai plugins */
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()
