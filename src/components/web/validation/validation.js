import * as yup from "yup";

export const registerSchema = yup.object({
    userName:yup.string().required("Username is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
});