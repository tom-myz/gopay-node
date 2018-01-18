import "ava"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"
import sinonChai from "sinon-chai"

/* Chai plugins */
chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()
