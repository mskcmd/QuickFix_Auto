import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 500 },
  { name: 'Mar', value: 300 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 800 },
  { name: 'Jun', value: 500 },
];

const barData = [
  { name: 'Oil Change', value: 2400 },
  { name: 'Tire Rotation', value: 1398 },
  { name: 'Brake Repair', value: 9800 },
  { name: 'Engine Tune-up', value: 3908 },
  { name: 'Battery Replacement', value: 4800 },
];

function MechanicHome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Logo" className="h-8 mr-2" />
            <span className="text-white font-bold">Mechanic Home</span>
          </div>
          <div>
            <a href="#" className="text-white mx-4 hover:text-gray-400">
              Home
            </a>
            <a href="#" className="text-white mx-4 hover:text-gray-400">
              Services
            </a>
            <a href="#" className="text-white mx-4 hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 h-screen">
      <ul className="space-y-2">
        <li>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Users
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Mechanics
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Reports
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200">
            Subscriptions
          </a>
        </li>
      </ul>
    </aside>

        {/* Main Content */}
        <div className="flex-grow p-8 flex">
          <div className="w-2/3 pr-8">
            <h1 className="text-3xl font-bold mb-4">Mechanic Home</h1>
            <p className="mb-4">Welcome to the Mechanic Home page!</p>

            {/* Graphs */}
            <div className="flex mb-8">
              <div className="mr-8">
                <h2 className="text-xl font-bold mb-2">Sales Graph</h2>
                <LineChart width={400} height={300} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Service Revenue</h2>
                <BarChart width={400} height={300} data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-auto">
        <div className="container mx-auto text-center text-white">
          &copy; 2023 Mechanic Home. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MechanicHome;
