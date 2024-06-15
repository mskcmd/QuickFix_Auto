import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  { name: 'Jan', value: 800 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 1200 },
  { name: 'Apr', value: 900 },
  { name: 'May', value: 1500 },
  { name: 'Jun', value: 1100 },
  { name: 'Jul', value: 1400 },
  { name: 'Aug', value: 1200 },
  { name: 'Sep', value: 1600 },
  { name: 'Oct', value: 1300 },
  { name: 'Nov', value: 1800 },
  { name: 'Dec', value: 1700 },
];

function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4">Welcome, Admin</span>
            <img
              src="https://i.pinimg.com/originals/6a/44/f0/6a44f0e35b10e6ed063eeebf7ed844f9.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700">
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

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">User Growth</h2>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-gray-800 p-4 border-t border-gray-700 text-center">
        <p className="text-sm">Admin Dashboard &copy; 2024</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
