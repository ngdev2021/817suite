import React, { useEffect, useState } from 'react';
import { fetchFunnels } from '../../api/funnelApi';

const FunnelList = () => {
  const [funnels, setFunnels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchFunnels();
        console.log('Fetched funnels:', data);
        setFunnels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching funnels:', error);
        setFunnels([]); // Fallback to an empty array
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h2>Funnels</h2>
      <ul>
        {funnels.length > 0 ? (
          funnels.map((funnel) => (
            <li key={funnel.id}>{funnel.name}</li>
          ))
        ) : (
          <li>No funnels available</li>
        )}
      </ul>
    </div>
  );
};

export default FunnelList;
