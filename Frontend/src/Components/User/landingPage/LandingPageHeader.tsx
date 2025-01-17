import { Link } from 'react-router-dom'

function LandingPageHeader() {
    return (
        <>
            <nav className="bg-red-900 border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Luxury Auto Repair</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link to='/login'> <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Login</button>  </Link>
                        <Link to="/signup"> <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">User Signup</button>  </Link>
                        <Link to='/mechanic/signup'> <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Mechanic Signup</button>  </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default LandingPageHeader