import Card from './Card';

const FunnelCard = ({ funnel }) => (
  <Card
    title={funnel.name}
    gradient={{ from: 'purple-500', via: 'pink-500', to: 'red-500' }}
  >
    <div className="text-sm">
      <div className="mb-2">
        <span className="font-semibold">Steps:</span>
        <ul className="list-disc ml-5 mt-1">
          {funnel.steps && funnel.steps.length > 0 ? (
            funnel.steps.map((step, index) => (
              <li key={index} className="text-gray-100">
                {step}
              </li>
            ))
          ) : (
            <li className="text-gray-100">No steps available</li>
          )}
        </ul>
      </div>
      <div>
        <span className="font-semibold">Analytics:</span>
        <ul className="list-disc ml-5 mt-1">
          {funnel.analytics &&
          Object.keys(funnel.analytics).length > 0 ? (
            Object.entries(funnel.analytics).map(([key, value]) => (
              <li key={key} className="text-gray-100">
                {`${key}: ${value}`}
              </li>
            ))
          ) : (
            <li className="text-gray-100">
              No analytics data available
            </li>
          )}
        </ul>
      </div>
    </div>
    <button className="mt-4 bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-gray-100">
      View Funnel
    </button>
  </Card>
);

export default FunnelCard;
