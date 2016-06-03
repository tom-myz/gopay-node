import { LocaleDefinition } from "./I18n"


const locale: LocaleDefinition = {
    "en": {
        /* Validation */
        "VALIDATION_ERROR": "Input data is invalid",
        "REQUIRED_VALUE": "Field %{field} is required",
        "INVALID_FORMAT": "Field %{field} is not in correct format",
        "INVALID_FORMAT_CARD_NUMBER": "Field %{field} is not a valid card number",
        "INVALID_FORMAT_EMAIL": "Field %{field} is not a valid email",
        "INVALID_FORMAT_LENGTH_BETWEEN": "Field %{field} has incorrect length",
        "INVALID_FORMAT_LENGTH_MIN": "Field %{field} is too short",
        "INVALID_FORMAT_LENGTH_MAX": "Field %{field} is too long",
        "INVALID_FORMAT_LIST": "Field %{field} is not a list",
        "INVALID_FORMAT_NUMERIC": "Field %{field} does not have numeric value",
        "INVALID_FORMAT_UUID": "Field %{field} is not valid UUID",

        /* SDK Specific Codes */
        "ACTION_NOT_PERMITTED": "Action is not allowed",
        "NOT_AUTHORIZED": "Not authorized to perform action",
        "FORBIDDEN_ACCESS": "Access denied to perform action",
        "CONFLICTED_RESOURCE": "Data is in the conflict with other resource",
        "NOT_FOUND": "Resource not found",
        "INTERNAL_ERROR": "Error occurred while processing request on the server",
        "BAD_REQUEST": "Data sent to the server could not be processed",

        /* API Responses */
        "INVALID_PAYMENT_TYPE": "Incorrect payment type",
        "INVALID_PAYMENT_PROCESS": "Could not process payment",
        "UNKNOWN_ERROR": "Unknown error occurred",
        "INVALID_CREDENTIALS": "Provided credentials are invalid",
        "EMAIL_EXISTS": "Email already exists in the database",
        "DB_ERROR": "Database error occurred",
        "STORE_EXISTS": "Store exists in the database",
        "TOKEN_GENERATION_EXEPTION": "Error occured while generating token",
        "TRANSACTION_TOKEN_NOT_FOUND": "Transaction token not found in the database",
        "STORE_NOT_FOUND": "Store not found in the database",
        "INVALID_REQUEST": "Invalid request",
        "BANK_ACCOUNT_EXISTS": "Bank account already exists in the database"
    }
}

export default locale
