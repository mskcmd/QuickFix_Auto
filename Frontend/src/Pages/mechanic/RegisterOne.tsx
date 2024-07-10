import React, { useState, FormEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-modal";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Model.css";
import { LatLngTuple } from "leaflet";
Modal.setAppElement("#root");

const MechanicRegisterForm: React.FC = () => {
   const [formData, setFormData] = useState({
    type: "",
    licenseNumber: "",
    yearsOfExperience: "",
    specialization: "",
    location: "",
    locationName: "",
    services: [] as string[],
    description: "",
    profileImages: [] as File[],
    certificate: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([0, 0]);

  const [searchQuery, setSearchQuery] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "services") {
      setServiceInput(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "profileImages") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData.profileImages, ...Array.from(files)],
        }));

        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews((prev) => [...prev, reader.result as string]);
          };
          reader.readAsDataURL(file);
        });
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      }
    }
  };

  const handleDescriptionChange = (content: string) => {
    setFormData((prevData) => ({ ...prevData, description: content }));
  };

  const removeImage = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImages: prevData.profileImages.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
  
    if (!formData.type) newErrors.type = "Please select your type";
    
    if (!formData.licenseNumber || !/^\d+$/.test(formData.licenseNumber) || formData.licenseNumber.length < 10)
      newErrors.licenseNumber = "License number must be a positive number with at least 10 digits";
    
    if (!formData.yearsOfExperience || !/^\d+$/.test(formData.yearsOfExperience))
      newErrors.yearsOfExperience = "Years of experience must be a positive number";
    
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    
    if (!formData.location)
      newErrors.location = "Location is required";
    
    if (formData.services.length === 0 || formData.services.length < 10)
      newErrors.services = "At least 10 services are required";
    
    if (!formData.description)
      newErrors.description = "Description is required";
    
    if (formData.profileImages.length === 0 || formData.profileImages.length < 4)
      newErrors.profileImages = "At least 4 profile images are required";
    
    if (!formData.certificate || !formData.certificate.name.toLowerCase().endsWith(".pdf"))
      newErrors.certificate = "Certificate file is required in PDF format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
      
    } else {
      console.log("Form has errors");
    }
  };

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);
    const coordinates = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const locationName = data.display_name || "Unknown location";

      setFormData((prevData) => ({
        ...prevData,
        location: coordinates,
        locationName: locationName,
      }));
    } catch (error) {
      console.error("Error fetching location name:", error);
      setFormData((prevData) => ({
        ...prevData,
        location: coordinates,
        locationName: "Unknown location",
      }));
    }

    closeMapModal();
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          handleLocationSelect(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setFormData((prevData) => ({
          ...prevData,
          location: `${lat}, ${lon}`,
          locationName: display_name || "Unknown location",
        }));
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    React.useEffect(() => {
      map.setView(mapCenter, map.getZoom());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapCenter]);

    return selectedLocation ? (
      <Marker position={selectedLocation}></Marker>
    ) : null;
  };

  const handleServiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && serviceInput.trim() !== "") {
      e.preventDefault();
      addService();
    }
  };

  const addService = () => {
    if (serviceInput.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const removeService = (indexToRemove: number) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Mechanic Registration
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Are you
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select...</option>
              <option value="shop">Shop</option>
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="licenseNumber"
              className="block text-sm font-medium text-gray-700"
            >
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.licenseNumber}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="yearsOfExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.yearsOfExperience && (
              <p className="text-red-500 text-xs mt-1">
                {errors.yearsOfExperience}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.specialization && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specialization}
              </p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.locationName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  readOnly
                />
                <button
                  type="button"
                  onClick={openMapModal}
                  className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Choose
                </button>
              </div>
            </div>
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="services"
              className="block text-sm font-medium text-gray-700"
            >
              Services
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.services.map((service, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded flex items-center"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                id="services"
                name="services"
                value={serviceInput}
                onChange={handleInputChange}
                onKeyDown={handleServiceKeyDown}
                className="mt-1 block w-full py-2 px-3 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter a service and press Enter"
              />
              <button
                type="button"
                onClick={addService}
                className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            {errors.services && (
              <p className="text-red-500 text-xs mt-1">{errors.services}</p>
            )}
          </div>

          <div className="sm:col-span-2 md:col-span-3">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              id="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              className="mt-1 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="sm:col-span-2 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label
                htmlFor="profileImages"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Images
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.profileImages.map((_, index) => (
                  <div key={index} className="w-24 h-24 relative">
                    <img
                      src={imagePreviews[index]}
                      alt={`Profile Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <label
                  htmlFor="profileImages"
                  className="flex flex-col items-center justify-center w-24 h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-2">
                    <svg
                      className="w-6 h-6 mb-1 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 00 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">Add Image</p>
                  </div>
                  <input
                    id="profileImages"
                    name="profileImages"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
              </div>
              {errors.profileImages && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.profileImages}
                </p>
              )}
            </div>

            <div className="md:col-span-1">
              <label
                htmlFor="certificate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Certificate
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="certificate"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {formData.certificate ? (
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-8 h-8 mb-1 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <p className="text-xs text-gray-500">
                        {formData.certificate.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-3 pb-2">
                      <svg
                        className="w-6 h-6 mb-1 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX</p>
                    </div>
                  )}
                  <input
                    id="certificate"
                    name="certificate"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {errors.certificate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.certificate}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 md:col-span-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>

      <Modal
        isOpen={isMapModalOpen}
        onRequestClose={closeMapModal}
        contentLabel="Choose Location"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Choose Location</h2>
        <div className="mb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={searchLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
          <button
            onClick={getCurrentLocation}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Get Current Location
          </button>
        </div>
        <div className="h-96 w-full">
          <MapContainer
            key={mapCenter.join(",")}
            center={mapCenter}
            zoom={9}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
        <button
          onClick={closeMapModal}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MechanicRegisterForm;

