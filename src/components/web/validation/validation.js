import * as yup from "yup";

export const registerSchema = yup.object({
    userName:yup.string().required("Username is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
});

export const loginSchema = yup.object({
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
});

export const resetPasswordSchema = yup.object({
    email:yup.string().required("Email is required").email(),
    password:yup.string().required("Password is required").min(3, "must be at least 3 characters").max(30, "must be at most 30 characters"),
    code:yup.string().required("Code is required").min(4, "must be 4 characters").max(4, "must be 4 characters"),
})

export const sendCodeSchema = yup.object({
    email:yup.string().required("Email is required").email(),
});

export const confirmOrderSchema = yup.object({
    phone:yup.number().required("Phone is required"),
    address:yup.string().required("Address is required").min(5, "must be at least 5 characters").max(30, "must be at most 30 characters"),
    couponName:yup.string().min(5, "must be 5 characters").max(5, "must be 5 characters"),
})

export const reviewSchema = yup.object({
    rating: yup.number().required("Rate is required"),
    comment: yup.string().required("Comment is required").min(3, "must be at least 3 characters").max(120, "must be at most 120 characters")
});