
function SignupPage() {
  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="h-[85vh] w-[80vh] col-span-6 hidden md:block relative">
        <img
          src="https://img.freepik.com/free-vector/car-service-logo-design_23-2149750690.jpg?t=st=1717655993~exp=1717659593~hmac=2ef181f4aa878c2cc79d4580f692417493b1c54ec45f3bf30737939e5431b020&w=740"
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="flex flex-col justify-center h-[85vh] w-[75vh] bg-white p-8 rounded-r-lg">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 mt-5">Sign Up</h2>
        <div className="mb-6">
          <form>
            <input
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Email"
              type="email"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Phone Number"
              type="tel"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center mb-4">
              <input
                id="mechanic"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <label htmlFor="mechanic" className="ml-2 text-gray-700">
                Are you a mechanic?
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-blue-950 transition duration-300"
            >
              Submit
            </button>
          </form>
          <div className="mt-6">
            <p className="text-center mt-4 text-gray-600">
              You have an account?{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;