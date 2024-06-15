import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterValidation } from "../../Common/Validations";
import { register } from "../../../Api/mechanic";
import { useAppSelector } from "../../../app/store";

export interface RegData {
  // mechanicId:string
  role: string;
  name: string;
  location: string;
  services: string;
  employeeCount: string;
  companyCertificate: string;
  licenseNumber: string;
  images: string;
  companyDescription: string;
  experience: string;
}

interface InitValues {
  // mechanicId:string
  role: string;
  name: string;
  location: string;
  services: string;
  employeeCount: string;
  companyCertificate: string;
  licenseNumber: string;
  images: string;
  companyDescription: string;
  experience: string;
}

const initialValues: InitValues = {
  // mechanicId:"",
  role: "",
  name: "",
  location: "",
  services: "",
  employeeCount: "",
  companyCertificate: "",
  licenseNumber: "",
  images: "",
  companyDescription: "",
  experience: "",
};

const RegisterOne: React.FC = () => {
    const [compoundIndex, setCompoundIndex] = useState<number>(0);
    const data = ["COMPANY", "SHOP", "FREELANCER"];
    const [selectedValue, setSelectedValue] = useState<string>("");

    const mechanicData = useAppSelector((state) => state.auth.mechanicData);
     console.log("mechanicData",mechanicData);
    const formik = useFormik({
        initialValues,
        validationSchema: RegisterValidation,
        onSubmit: async (values) => {
          console.log("Submitting form with values:", values);
        const regData: RegData = {
          role: values.role, 
          name: values.name,
          location: values.location,
          services: values.services,
          employeeCount: values.employeeCount,
          companyCertificate: values.companyCertificate,
          licenseNumber: values.licenseNumber,
          images: values.images,
          companyDescription: values.companyDescription,
          experience: values.experience,
        };
    
        console.log("Form data:", regData);
    
        try {
          await register(regData);
          console.log("Registration successful!"); // Add a log for successful registration
        } catch (error) {
          console.error("Error registering:", error);
        }
      },
    });
    
    console.log("Formik values:", formik.values); // Log formik values for debugging
    console.log("Formik errors:", formik.errors); // Log formik errors for debugging
    
  const handleButtonClick = (value: string) => {
    setSelectedValue((prevValue) => (prevValue === value ? "" : value));
    formik.setFieldValue("role", value === formik.values.role ? "" : value);
  };
  
  const handleNextClick = (): void => {
    setCompoundIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const handlePrevClick = (): void => {
    if (compoundIndex === 0) return;
    setCompoundIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };

  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="bg-white flex flex-col items-center w-[100vh] justify-center h-[75vh] rounded-3xl shadow-2xl">
        <form onSubmit={formik.handleSubmit}>
          {compoundIndex === 0 && (
            <div className="mt-4 space-y-2 rounded-full flex flex-col">
              {data.map((value, index) => (
               <button
               key={index}
               type="button"
               className={`text-white rounded-full p-2 pl-16 pr-16 text-center font-black ${
                 selectedValue === value ? "bg-black" : "bg-gray-800"
               }`}
               onClick={() => handleButtonClick(value)}
             >
               {value}
             </button>
              ))}
            </div>
          )}

          {compoundIndex === 1 && (
            <div className="mt-4 space-y-4">
              <div className="input-container">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.name && (
                  <div className="text-red-600">{formik.errors.name}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.location && (
                  <div className="text-red-600">{formik.errors.location}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="services"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Services
                </label>
                <input
                  id="services"
                  type="text"
                  name="services"
                  value={formik.values.services}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.services && (
                  <div className="text-red-600">{formik.errors.services}</div>
                )}
              </div>
            </div>
          )}

          {compoundIndex === 2 && (
            <div className="mt-4 space-y-4">
              <div className="input-container">
                <label
                  htmlFor="employeeCount"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Employee Count
                </label>
                <input
                  id="employeeCount"
                  type="text"
                  name="employeeCount"
                  value={formik.values.employeeCount}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.employeeCount && (
                  <div className="text-red-600">{formik.errors.employeeCount}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="companyCertificate"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Company Certificate
                </label>
                <input
                  id="companyCertificate"
                  type="text"
                  name="companyCertificate"
                  value={formik.values.companyCertificate}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.companyCertificate && (
                  <div className="text-red-600">{formik.errors.companyCertificate}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="licenseNumber"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  License Number
                </label>
                <input
                  id="licenseNumber"
                  type="text"
                  name="licenseNumber"
                  value={formik.values.licenseNumber}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.licenseNumber && (
                  <div className="text-red-600">{formik.errors.licenseNumber}</div>
                )}
              </div>
            </div>
          )}

          {compoundIndex === 3 && (
            <div className="mt-4 space-y-4">
              <div className="input-container">
                <label
                  htmlFor="images"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Images
                </label>
                <input
                  id="images"
                  type="text"
                  name="images"
                  value={formik.values.images}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.images && (
                  <div className="text-red-600">{formik.errors.images}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="companyDescription"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Company Description
                </label>
                <input
                  id="companyDescription"
                  type="text"
                  name="companyDescription"
                  value={formik.values.companyDescription}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.companyDescription && (
                  <div className="text-red-600">{formik.errors.companyDescription}</div>
                )}
              </div>
              <div className="input-container">
                <label
                  htmlFor="experience"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  type="text"
                  name="experience"
                  value={formik.values.experience}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="px-6 py-3 rounded w-96 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-md"
                />
                {formik.errors.experience && (
                  <div className="text-red-600">{formik.errors.experience}</div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrevClick}
              className="px-6 py-3 rounded-full bg-gray-800 text-white shadow-md"
              disabled={compoundIndex === 0}
            >
              Previous
            </button>
            {compoundIndex === 3 ? (
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-blue-600 text-white shadow-md"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextClick}
                className="px-6 py-3 rounded-full bg-blue-600 text-white shadow-md"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOne;
