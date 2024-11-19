import React, { useEffect, useState } from 'react';
import { fetchWorkflows } from '../../api/workflowApi';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    console.log('WorkflowList mounted');
    const getData = async () => {
      try {
        console.log('Starting fetchWorkflows...');
        const data = await fetchWorkflows();
        console.log('Fetched workflows:', data);
        setWorkflows(data.workflows || []);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };
    getData();
  }, []);

  console.log('Rendering workflows:', workflows);

  return (
    <div>
      <h2>Workflows</h2>
      <ul>
        {workflows && workflows.length > 0 ? (
          workflows.map((workflow, index) => (
            <li key={index}>{workflow.name}</li>
          ))
        ) : (
          <li>No workflows available</li>
        )}
      </ul>
    </div>
  );
};

export default WorkflowList;
