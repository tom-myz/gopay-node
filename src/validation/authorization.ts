//import { Rules } from "validatorjs"

export const authorizeSchema = {
    email    : "required|email",
    password : "required|between:8,32"
}