import { useState } from 'react';
import Head from 'next/head';
import { IconMessage, IconUserPlus, IconCreditCard, IconCalendarEvent } from '@tabler/icons-react';

// Mock data
const activities = [
  { id: 1, type: 'message', title: 'New message', time: '5m ago', icon: IconMessage, color: 'bg-pink-500' },
  { id: 2, type: 'user', title: 'User signed up', time: '10m ago', icon: IconUserPlus, color: 'bg-yellow-500' },
  { id: 3, type: 'payment', title: 'Payment received', time: '15m ago', icon: IconCreditCard, color: 'bg-green-500' },
  { id: 4, type: 'event', title: 'New event', time: '2m ago', icon: IconCalendarEvent, color: 'bg-blue-500' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Head>
        <title>Startup Project Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gray-900">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-8">Acet Labs</h1>
            <nav>
              <ul className="space-y-2">
                {['Dashboard', 'Profile', 'Settings', 'Logout'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setActiveTab(item)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-md ${
                        activeTab === item ? 'bg-gray-800' : 'hover:bg-gray-800'
                      }`}
                    >
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="absolute bottom-0 p-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://placekitten.com/40/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span>John Doe</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold mb-6">{activeTab}</h2>
          
          {activeTab === 'Dashboard' && (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-gray-900 p-4 rounded-lg shadow-lg flex items-center space-x-4">
                  <div className={`${activity.color} p-2 rounded-full`}>
                    <activity.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{activity.title}</h3>
                    <p className="text-gray-400">Magic UI</p>
                  </div>
                  <div className="text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'Dashboard' && (
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <p>Content for {activeTab} goes here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}