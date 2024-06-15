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

export const LoginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterValidation = Yup.object({  
  role: Yup.string().required('Role is required'),
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  services: Yup.string().required('Services are required'),
  employeeCount: Yup
    .string()
    // .matches(/^\d+$/, 'Employee count must be a number')
    .required('Employee count is required'),
  companyCertificate: Yup.string().required('Company certificate is required'),
  licenseNumber: Yup.string().required('License number is required'),
  images: Yup.string().required('Images are required'),
  companyDescription: Yup.string().required('Company description is required'),
  experience: Yup.string().required('Experience is required'),
  
});

