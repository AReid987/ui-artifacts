import { useState } from 'react';
import Head from 'next/head';
import { IconMenu2, IconX, IconDashboard, IconUser, IconSettings, IconLogout, IconMicrophone, IconBrain, IconSpider } from '@tabler/icons-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-900`}>
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <span className="text-2xl font-semibold text-white">Acet Labs</span>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <IconX size={24} />
          </button>
        </div>
        <ul className="space-y-2">
          {[
            { icon: IconDashboard, text: 'Dashboard' },
            { icon: IconUser, text: 'Profile' },
            { icon: IconSettings, text: 'Settings' },
            { icon: IconLogout, text: 'Logout' },
          ].map(({ icon: Icon, text }) => (
            <li key={text}>
              <a href="#" className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700">
                <Icon size={20} />
                <span className="ml-3">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const DotPattern = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px'
    }}></div>
  </div>
);

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Head>
        <title>AI-Powered Project Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DotPattern />

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <button onClick={toggleSidebar} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-400 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
            <IconMenu2 size={24} />
          </button>

          <h1 className="mb-4 text-4xl font-extrabold">Project Dashboard</h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-gray-800">
              <h2 className="mb-2 text-2xl font-bold">Voice-Enabled Multi-Agent System</h2>
              <p>Integrate voice commands and multi-agent interactions here.</p>
              <IconMicrophone size={24} className="mt-2" />
              {/* Add voice command interface and multi-agent system components */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-gray-800">
              <h2 className="mb-2 text-2xl font-bold">GraphRAG Knowledge Base</h2>
              <p>Connect to the GraphRAG knowledge base for intelligent information retrieval.</p>
              <IconBrain size={24} className="mt-2" />
              {/* Add GraphRAG integration components */}
            </div>
            <div className="p-4 rounded-lg bg-gray-800">
              <h2 className="mb-2 text-2xl font-bold">Web Crawler / Scraper</h2>
              <p>Set up and manage web crawling and scraping tasks.</p>
              <IconSpider size={24} className="mt-2" />
              {/* Add web crawler/scraper interface components */}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-gray-800">
              <h2 className="mb-2 text-2xl font-bold">Project Overview</h2>
              <p>Display project statistics, timelines, and team member activities here.</p>
              {/* Add project overview components */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}