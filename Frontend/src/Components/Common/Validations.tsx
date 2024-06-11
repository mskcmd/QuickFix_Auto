/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

const MOBILE_NUM_REGEX = /^[0-9]{10}$/;

export const SignupValidation = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: Yup.string()
        .matches(MOBILE_NUM_REGEX, "Phone number is not valid")
        .required("Phone number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null as any], "Passwords must match")
        .required("Confirm Password is required"),
});
