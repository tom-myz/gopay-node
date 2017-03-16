import "../utils"
import { test, TestContext } from "ava"
import { Resource } from "../../src/resources/Resource"

test("should compile correct urls", (t: TestContext) => {
    const asserts = [
        ["/foo", {}, "/foo"],
        ["/foo/:id", { id : 1 }, "/foo/1"],
        ["/foo/:id", {}, "/foo/:id"],
        ["/foo/:id", {}, "/foo/:id"],
        ["/foo/:fooId/bar", {}, "/foo/:fooId/bar"],
        ["/foo/:fooId/bar", { fooId : 1 }, "/foo/1/bar"],
        ["/foo/:fooId/bar/:id", { fooId : 1, id : 1 }, "/foo/1/bar/1"],
        ["/(foo/:fooId/)bar/:id", { fooId : 1, id : 1 }, "/foo/1/bar/1"],
        ["/(foo/:fooId/)bar/:id", { id : 1 }, "/bar/1"]
    ]

    asserts.forEach((a: any) => {
        t.deepEqual(Resource.compilePath(a[0], a[1]), a[2])
    })
})
