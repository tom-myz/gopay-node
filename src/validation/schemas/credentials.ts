export function credentialsCreateSchema(gateway: string) {
    return Object.assign({
        gateway     : "required",
        currencies  : "required|array",
        credentials : "object"
    }, getCredendials(gateway, true))
}

export function credentialsUpdateSchema(gateway: string) {
    return Object.assign({
        gateway     : "string",
        currencies  : "array",
        credentials : "object"
    }, getCredendials(gateway, false))
}

function getCredendials (gateway: string, required: Boolean) {
    const prefix = "credentials."

    switch (gateway) {
        case "payvision" :
            return credentialsPayvision(prefix, required)

        case "world_pay" :
            return credentialsWorldpay(prefix, required)

        case "wirecard" :
            return credentialsWirecard(prefix, required)

        case "allied_wallet" :
            return credentialsAlliedWallet(prefix, required)
    }
}

export function credentialsPayvision (prefix: string = "", required: Boolean = false) {
    const requiredRule: string = required ? "required|" : ""

    return {
        [`${prefix}merchantId`]   : `${requiredRule}string`,
        [`${prefix}merchantGuid`] : `${requiredRule}uuid`
    }
}

export function credentialsWorldpay (prefix: string = "", required: Boolean = false) {
    const requiredRule: string = required ? "required|" : ""

    return {
        [`${prefix}merchantId`] : `${requiredRule}string`,
        [`${prefix}password`]   : `${requiredRule}string`
    }
}

export function credentialsWirecard (prefix: string = "", required: Boolean = false) {
    const requiredRule: string = required ? "required|" : ""

    return {
        [`${prefix}businessCase`] : `${requiredRule}string`,
        [`${prefix}username`]     : `${requiredRule}string`,
        [`${prefix}password`]     : `${requiredRule}string`,
        [`${prefix}cardBrands`]   : `${requiredRule}array`
    }
}

export function credentialsAlliedWallet (prefix: string = "", required: Boolean = false) {
    const requiredRule: string = required ? "required|" : ""

    return {
        [`${prefix}merchantId`] : `${requiredRule}uuid`,
        [`${prefix}siteId`]     : `${requiredRule}uuid`
    }
}
