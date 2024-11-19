import React, { useState, useEffect } from 'react';
import { fetchFunnels } from '../../api/funnelApi'; // Mocked fetch functions
import { fetchWorkflows } from '../../api/workflowApi'; // Mocked fetch functions
import WorkflowCard from '../Cards/WorkflowCard';
import FunnelCard from '../Cards/FunnelCard';
import Sidebar from '../Navigation/Sidebar';
import Header from '../Headers/Header';
import Spinner from '../Spinners/Spinner';

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);
  const [funnels, setFunnels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const workflowsData = await fetchWorkflows();
        const funnelsData = await fetchFunnels();
        setWorkflows(workflowsData);
        setFunnels(funnelsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Header />
        <input
          type="text"
          placeholder="Search workflows..."
          className="w-full px-4 py-2 border rounded-lg mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Workflows</h2>
            {filteredWorkflows.length > 0 ? (
              filteredWorkflows.map((workflow) => (
                <WorkflowCard key={workflow.id} workflow={workflow} />
              ))
            ) : (
              <p>No workflows found.</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Funnels</h2>
            {funnels.length > 0 ? (
              funnels.map((funnel) => (
                <FunnelCard key={funnel.id} funnel={funnel} />
              ))
            ) : (
              <p>No funnels found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
