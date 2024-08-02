import { forwardRef, useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import Modal from "react-modal";
import * as Yup from "yup";
import { searchMechShop } from "../../Api/user";

export interface FormData {
  locationName: string;
  latitude: string;
  longitude: string;
  district: string;
  type: string;
}

const BookingForm = forwardRef<HTMLDivElement>((_props, ref) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [formData, setFormData] = useState<FormData>({
    locationName: "",
    latitude: "",
    longitude: "",
    district: "",
    type: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setSelectedLocation([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setFormData((prevData) => ({
          ...prevData,
          locationName: display_name,
          latitude: lat,
          longitude: lon,
        }));
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const handleLocationSelect = useCallback(async (lat: number, lng: number) => {
    setSelectedLocation([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const locationName = data.display_name || "Unknown location";
      const district = data.address?.county || data.address?.city || "Unknown district";

      setFormData((prevData) => ({
        ...prevData,
        latitude: lat.toString(),
        longitude: lng.toString(),
        locationName: locationName,
        district: district,
      }));
    } catch (error) {
      console.error("Error fetching location name:", error);
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat.toString(),
        longitude: lng.toString(),
        locationName: "Unknown location",
        district: "Unknown district",
      }));
    }

    closeMapModal();
  }, []);

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

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        handleLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    useEffect(() => {
      map.setView(mapCenter, map.getZoom());
    }, [map]);

    return selectedLocation ? <Marker position={selectedLocation}></Marker> : null;
  };

  const validationSchema = Yup.object().shape({
    locationName: Yup.string().required("Location is required"),
    latitude: Yup.string().required("Latitude is required"),
    longitude: Yup.string().required("Longitude is required"),
    type: Yup.string().required("Service type is required"),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log("Form data is valid", formData);
      await searchMechShop(formData)

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pt-10" ref={ref}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto transform  -translate-y-24">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Book Your Service</h2>
        <form  onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="flex">
              <input
                type="text"
                placeholder="Select Place"
                id="location"
                name="location"
                value={formData.locationName}
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
            {errors.locationName && <p className="text-red-600">{errors.locationName}</p>}
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Service Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full py-2 px-3 rounded-md border-gray-300 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select...</option>
              <option value="all">All</option>
              <option value="shop">Shop</option>
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>
            {errors.type && <p className="text-red-600">{errors.type}</p>}
          </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Book Now
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Choose Location</h2>
          <button
            onClick={closeMapModal}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
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
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Use Current Location
          </button>
        </div>
        <MapContainer center={mapCenter} zoom={8} className="h-96">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </Modal>
    </div>
  );
});

export default BookingForm;