import uuid = require("uuid");
import { MerchantItem } from "../../src/resources/Merchants";
import { generateFixture as generateConfiguration } from "./common/configuration";
import { generateFixture as generateTransferSchedule } from "./common/transfer-schedule";
import { RecurringTokenPrivilege } from "../../src/resources/Verification";

export function generateFixture(): MerchantItem {
    return {
        id                 : uuid(),
        verificationDataId : uuid(),
        name               : "Joe Doe",
        email              : "test@fake.com",
        verified           : true,
        configuration: {
            ...generateConfiguration(),
            waitPeriod       : "P7D",
            transferSchedule : generateTransferSchedule(),
            recurringTokenConfiguration : {
                recurringType    : RecurringTokenPrivilege.NONE,
                chargeWaitPeriod : "P1D"
            },
            language: "JA_JP"
        },
        createdOn : new Date().toISOString()
    }
}
