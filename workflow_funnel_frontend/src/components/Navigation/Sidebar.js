import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="bg-primary text-white w-64 min-h-screen p-6 space-y-6">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    <ul>
      {['Workflows', 'Funnels', 'Settings'].map((item) => (
        <li key={item} className="mb-4">
          <Link
            to={`/${item.toLowerCase()}`}
            className="hover:text-accent"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
