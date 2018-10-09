import { TemporaryTokenAliasItem } from "../../src/resources/TemporaryTokenAlias";
import uuid from "uuid";

export function generateFixture(): TemporaryTokenAliasItem {
    return {
        id: uuid(),
        transactionTokenId: uuid(),
        platformId: uuid(),
        merchantId: uuid(),
        storeId: uuid(),
        validUntil: new Date().toISOString(),
        metaData: {},
        createdOn: new Date().toISOString(),
        active: true
    }
}
