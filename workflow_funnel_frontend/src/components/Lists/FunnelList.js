import FunnelCard from './FunnelCard';

const FunnelList = ({ funnels }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {funnels.map((funnel) => (
      <FunnelCard key={funnel.id} {...funnel} />
    ))}
  </div>
);

export default FunnelList;
